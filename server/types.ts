export interface Profile {
  id: string;
  email: string;
  full_name: string;
  date_of_birth: string;
  age: number;
  gender: string;
  location: string;
  profile_photo_url: string;
  bio: string;
  communication_style: string;
  social_energy: string;
  lifestyle: string;
  core_values: string[];
  relationship_expectations: string;
  instagram_handle?: string;
  is_18_plus: boolean;
  is_profile_complete: boolean;
  completion_percentage: number;
  interests?: string[];
  created_at?: string;
}

export interface PartnerPreference {
  user_id: string;
  preferred_gender: string;
  preferred_min_age: number;
  preferred_max_age: number;
  max_age_gap: number; // e.g. 2 or 3 years
  location_preference: string;
  relationship_intention: string;
  height_preference?: string;
  body_type_preference?: string;
  style_presentation?: string;
  personality_preference?: string[];
  communication_preference?: string[];
  lifestyle_preference?: string[];
  dealbreakers?: string[];
}

export interface PersonalityAnswer {
  question_id: string;
  answer_value: string;
  score_contribution?: Record<string, number>;
}

export interface MatchResult {
  id: string;
  matched_profile: Omit<Profile, 'instagram_handle'> & { instagram_handle?: string };
  compatibility_score: number; // 0-100
  personality_score: number; // 40%
  values_score: number; // 30%
  interests_score: number; // 30%
  why_we_matched: string[];
  explanations: {
    personality: string;
    values: string;
    lifestyle: string;
    interests: string;
  };
  consent_given?: boolean;
  matched_user_consented?: boolean;
}

export interface PaymentRecord {
  id: string;
  user_id: string;
  razorpay_order_id: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  amount: number;
  currency: string;
  pass_type: 'female_pass' | 'male_pass';
  status: 'pending' | 'success' | 'failed' | 'cancelled';
  verified_at?: string;
  created_at: string;
}
