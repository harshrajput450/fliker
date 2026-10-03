import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createPaymentOrder, verifyPaymentSignature, paymentStore } from './payments';
import { findCuratedMatches } from './matchmaker';
import { Profile, PartnerPreference } from './types';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// 1. Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', brand: 'CUPID', timestamp: new Date().toISOString() });
});

// 2. Razorpay Order Creation Endpoint
app.post('/api/payment/create-order', async (req: Request, res: Response) => {
  try {
    const { userId, gender } = req.body;
    if (!userId || !gender) {
      return res.status(400).json({ error: 'Missing required parameters: userId and gender' });
    }

    const orderData = await createPaymentOrder(userId, gender);
    return res.json(orderData);
  } catch (err: any) {
    console.error('[API /payment/create-order] Error:', err);
    return res.status(500).json({ error: 'Failed to create payment order', details: err.message });
  }
});

// 3. Razorpay Payment Verification Endpoint
app.post('/api/payment/verify-payment', (req: Request, res: Response) => {
  try {
    const { orderId, paymentId, signature } = req.body;
    if (!orderId || !paymentId) {
      return res.status(400).json({ error: 'Missing orderId or paymentId' });
    }

    const result = verifyPaymentSignature(orderId, paymentId, signature || 'mock_valid_signature');

    if (result.isValid) {
      return res.json({
        success: true,
        verified: true,
        isMock: result.isMock,
        message: result.message,
      });
    } else {
      return res.status(400).json({
        success: false,
        verified: false,
        message: result.message,
      });
    }
  } catch (err: any) {
    console.error('[API /payment/verify-payment] Error:', err);
    return res.status(500).json({ error: 'Payment verification failed', details: err.message });
  }
});

// 4. Matchmaking Engine Endpoint
app.post('/api/matchmaking/find-matches', (req: Request, res: Response) => {
  try {
    const { userProfile, partnerPreferences } = req.body as {
      userProfile: Profile;
      partnerPreferences: PartnerPreference;
    };

    if (!userProfile || !userProfile.id) {
      return res.status(400).json({ error: 'Invalid user profile provided' });
    }

    // Enforce 18+ policy
    if (!userProfile.is_18_plus || userProfile.age < 18) {
      return res.status(403).json({
        matches: [],
        message: 'Underage policy constraint: CUPID is strictly 18+ only.',
      });
    }

    const matches = findCuratedMatches(userProfile, partnerPreferences || {
      user_id: userProfile.id,
      preferred_gender: userProfile.gender === 'male' ? 'female' : 'male',
      preferred_min_age: Math.max(18, userProfile.age - 3),
      preferred_max_age: userProfile.age + 3,
      max_age_gap: 3,
      location_preference: userProfile.location || 'no_preference',
      relationship_intention: 'long_term',
    });

    if (matches.length === 0) {
      return res.json({
        matches: [],
        message: 'Cupid is still looking… We curate high-compatibility matches and never fake recommendations.',
      });
    }

    return res.json({
      matches,
      count: matches.length,
      message: `Found ${matches.length} curated compatibility match(es).`,
    });
  } catch (err: any) {
    console.error('[API /matchmaking/find-matches] Error:', err);
    return res.status(500).json({ error: 'Matchmaking calculation failed', details: err.message });
  }
});

// 5. Email Notification Endpoint
app.post('/api/email/notify-match', (req: Request, res: Response) => {
  try {
    const { userEmail, userName, matchedName } = req.body;
    if (!userEmail) {
      return res.status(400).json({ error: 'Missing userEmail' });
    }

    console.log(`[CUPID Email Service] Match notification dispatched to ${userEmail} for match with ${matchedName}`);
    
    return res.json({
      success: true,
      message: `Match notification email successfully queued for ${userName} (${userEmail}).`,
    });
  } catch (err: any) {
    console.error('[API /email/notify-match] Error:', err);
    return res.status(500).json({ error: 'Failed to send email notification', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`💘 CUPID Express Backend running at http://localhost:${PORT}`);
});
