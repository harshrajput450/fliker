import { Profile, PartnerPreference, MatchResult } from './types';
import { MOCK_CANDIDATES } from './mockData';

export function calculateMatchCompatibility(
  userProfile: Profile,
  userPrefs: PartnerPreference,
  candidate: Profile & { preferences: PartnerPreference }
): { matchResult: MatchResult | null; rejectionReason?: string } {
  // 1. HARD FILTER: 18+ Verification
  if (!userProfile.is_18_plus || userProfile.age < 18) {
    return { matchResult: null, rejectionReason: 'Underage user (18+ policy enforced)' };
  }
  if (!candidate.is_18_plus || candidate.age < 18) {
    return { matchResult: null, rejectionReason: 'Candidate fails 18+ policy' };
  }

  // 2. HARD FILTER: Profile Completeness
  if (!userProfile.is_profile_complete) {
    return { matchResult: null, rejectionReason: 'User profile incomplete' };
  }

  // 3. HARD FILTER: Gender Matching
  if (userPrefs.preferred_gender !== 'no_preference' && userPrefs.preferred_gender !== candidate.gender) {
    return { matchResult: null, rejectionReason: 'Gender preference mismatch' };
  }
  if (candidate.preferences.preferred_gender !== 'no_preference' && candidate.preferences.preferred_gender !== userProfile.gender) {
    return { matchResult: null, rejectionReason: 'Candidate gender preference mismatch' };
  }

  // 4. HARD FILTER: Age-Gap Policy (Approx 2-3 years max gap)
  const maxAllowedGap = Math.min(userPrefs.max_age_gap || 3, candidate.preferences.max_age_gap || 3, 3);
  const ageDifference = Math.abs(userProfile.age - candidate.age);

  if (ageDifference > maxAllowedGap) {
    return { matchResult: null, rejectionReason: `Age gap (${ageDifference} yrs) exceeds hard limit (${maxAllowedGap} yrs)` };
  }

  // Check min/max age bounds
  if (candidate.age < userPrefs.preferred_min_age || candidate.age > userPrefs.preferred_max_age) {
    return { matchResult: null, rejectionReason: 'Age outside user preference range' };
  }

  // 5. HARD FILTER: Dealbreakers
  const userDealbreakers = userPrefs.dealbreakers || [];
  const candidateDealbreakers = candidate.preferences.dealbreakers || [];
  
  // Check dealbreakers against lifestyle / bio
  for (const db of userDealbreakers) {
    if (candidate.lifestyle?.toLowerCase().includes(db) || candidate.bio?.toLowerCase().includes(db)) {
      return { matchResult: null, rejectionReason: `Triggered user dealbreaker: ${db}` };
    }
  }
  for (const db of candidateDealbreakers) {
    if (userProfile.lifestyle?.toLowerCase().includes(db) || userProfile.bio?.toLowerCase().includes(db)) {
      return { matchResult: null, rejectionReason: `Triggered candidate dealbreaker: ${db}` };
    }
  }

  // --- SCORING ENGINE ---

  // A. Personality / Vibe Score (40% Weight)
  let personalityRawScore = 70; // Base baseline
  if (userProfile.communication_style === candidate.communication_style) {
    personalityRawScore += 15;
  } else {
    // Complementary styles (e.g. expressive + deep_listener)
    const complementary = (
      (userProfile.communication_style === 'expressive' && candidate.communication_style === 'deep_listener') ||
      (userProfile.communication_style === 'deep_listener' && candidate.communication_style === 'expressive') ||
      (userProfile.communication_style === 'playful' && candidate.communication_style === 'direct') ||
      (userProfile.communication_style === 'direct' && candidate.communication_style === 'playful')
    );
    if (complementary) personalityRawScore += 20;
  }

  if (userProfile.social_energy === candidate.social_energy) {
    personalityRawScore += 10;
  } else if (userProfile.social_energy === 'ambivert' || candidate.social_energy === 'ambivert') {
    personalityRawScore += 8;
  }

  const personalityScore = Math.min(Math.max(personalityRawScore, 65), 98);

  // B. Core Values / Lifestyle Score (30% Weight)
  let valuesRawScore = 60;
  const userValues = userProfile.core_values || [];
  const candidateValues = candidate.core_values || [];
  const sharedValues = userValues.filter(v => candidateValues.includes(v));

  valuesRawScore += sharedValues.length * 10;
  if (userProfile.lifestyle === candidate.lifestyle) valuesRawScore += 10;
  
  const valuesScore = Math.min(Math.max(valuesRawScore, 60), 96);

  // C. Shared Interests / Activities Score (30% Weight)
  const userInterests = userProfile.interests || [];
  const candidateInterests = candidate.interests || [];
  const sharedInterests = userInterests.filter(i => candidateInterests.includes(i));
  
  let interestsRawScore = 50 + (sharedInterests.length * 12);
  const interestsScore = Math.min(Math.max(interestsRawScore, 55), 99);

  // Calculate Weighted Overall Compatibility Score
  const overallScore = Number((
    (personalityScore * 0.40) +
    (valuesScore * 0.30) +
    (interestsScore * 0.30)
  ).toFixed(1));

  // Generate Match Summaries & "Why We Matched"
  const whyWeMatched: string[] = [];

  if (sharedValues.length > 0) {
    whyWeMatched.push(`Shared foundational values in ${sharedValues.slice(0, 2).join(' & ')}.`);
  } else {
    whyWeMatched.push('Mutual commitment to deep personal growth and relationship intentionality.');
  }

  if (sharedInterests.length > 0) {
    whyWeMatched.push(`Both enjoy ${sharedInterests.slice(0, 3).join(', ')}.`);
  }

  if (userProfile.communication_style === candidate.communication_style) {
    whyWeMatched.push(`Matching ${userProfile.communication_style.replace('_', ' ')} communication style for effortless connection.`);
  } else {
    whyWeMatched.push(`Balanced communication dynamics: ${userProfile.communication_style.replace('_', ' ')} paired with ${candidate.communication_style.replace('_', ' ')}.`);
  }

  whyWeMatched.push(`Curated age compatibility (${userProfile.age} & ${candidate.age}) respecting strict 2-3 year gap preferences.`);

  // Safe candidate profile without exposed private info (e.g., instagram handle hidden by default)
  const safeCandidateProfile = {
    ...candidate,
    instagram_handle: undefined, // hidden until mutual consent
  };

  const matchResult: MatchResult = {
    id: `match_${userProfile.id}_${candidate.id}`,
    matched_profile: safeCandidateProfile,
    compatibility_score: overallScore,
    personality_score: Number(personalityScore.toFixed(1)),
    values_score: Number(valuesScore.toFixed(1)),
    interests_score: Number(interestsScore.toFixed(1)),
    why_we_matched: whyWeMatched,
    explanations: {
      personality: `High resonance (${personalityScore}%). Your ${userProfile.social_energy} vibe creates a natural rhythm with ${candidate.full_name}'s ${candidate.social_energy} energy.`,
      values: `Strong alignment (${valuesScore}%). Shared focus on ${sharedValues.length > 0 ? sharedValues.join(', ') : 'intentional living & respect'}.`,
      lifestyle: `Compatible rhythms. ${candidate.full_name} is a ${candidate.lifestyle.replace('_', ' ')} based in ${candidate.location}.`,
      interests: `Shared passions (${interestsScore}%). Connected over ${sharedInterests.length > 0 ? sharedInterests.join(', ') : 'exploring new cultural experiences'}.`,
    },
    consent_given: false,
    matched_user_consented: false,
  };

  return { matchResult };
}

export function findCuratedMatches(
  userProfile: Profile,
  userPrefs: PartnerPreference
): MatchResult[] {
  const eligibleMatches: { result: MatchResult; score: number }[] = [];

  for (const candidate of MOCK_CANDIDATES) {
    // Avoid self matching
    if (candidate.id === userProfile.id || candidate.email === userProfile.email) continue;

    const { matchResult } = calculateMatchCompatibility(userProfile, userPrefs, candidate);
    if (matchResult) {
      eligibleMatches.push({ result: matchResult, score: matchResult.compatibility_score });
    }
  }

  // Sort descending by score
  eligibleMatches.sort((a, b) => b.score - a.score);

  // STRICT RULE: MAXIMUM 2 MATCHES!
  return eligibleMatches.slice(0, 2).map(m => m.result);
}
