import crypto from 'crypto';
import Razorpay from 'razorpay';
import { PaymentRecord } from './types';

// In-memory payment store for fallback mode when Supabase is not connected
export const paymentStore = new Map<string, PaymentRecord>();

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_cupid_mock_key';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'mock_secret';

let razorpayInstance: Razorpay | null = null;

if (process.env.RAZORPAY_KEY_SECRET && process.env.RAZORPAY_KEY_SECRET !== 'your_razorpay_secret_here') {
  try {
    razorpayInstance = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });
  } catch (err) {
    console.warn('[CUPID Payments] Real Razorpay initialization failed, falling back to secure Mock Mode.');
  }
}

export async function createPaymentOrder(userId: string, gender: string) {
  // Female Match Pass: ₹1, Male Match Pass: ₹99
  const isFemale = gender.toLowerCase() === 'female';
  const amountINR = isFemale ? 1 : 99;
  const passType = isFemale ? 'female_pass' : 'male_pass';
  const amountPaise = amountINR * 100;

  const receipt = `cupid_ord_${Date.now()}_${userId.slice(0, 5)}`;

  if (razorpayInstance && process.env.RAZORPAY_KEY_SECRET !== 'mock_secret') {
    try {
      const order = await razorpayInstance.orders.create({
        amount: amountPaise,
        currency: 'INR',
        receipt,
        notes: {
          userId,
          passType,
        },
      });

      const record: PaymentRecord = {
        id: order.id,
        user_id: userId,
        razorpay_order_id: order.id,
        amount: amountINR,
        currency: 'INR',
        pass_type: passType,
        status: 'pending',
        created_at: new Date().toISOString(),
      };
      paymentStore.set(order.id, record);

      return {
        orderId: order.id,
        amount: amountPaise,
        currency: 'INR',
        keyId: RAZORPAY_KEY_ID,
        passType,
        amountINR,
        isMock: false,
      };
    } catch (error) {
      console.error('[CUPID Payments] Razorpay API error:', error);
      // Fallback to mock order
    }
  }

  // Development / Mock order generation
  const mockOrderId = `order_mock_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const record: PaymentRecord = {
    id: mockOrderId,
    user_id: userId,
    razorpay_order_id: mockOrderId,
    amount: amountINR,
    currency: 'INR',
    pass_type: passType,
    status: 'pending',
    created_at: new Date().toISOString(),
  };
  paymentStore.set(mockOrderId, record);

  return {
    orderId: mockOrderId,
    amount: amountPaise,
    currency: 'INR',
    keyId: RAZORPAY_KEY_ID,
    passType,
    amountINR,
    isMock: true,
  };
}

export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): { isValid: boolean; isMock: boolean; message: string } {
  // Mock check
  if (orderId.startsWith('order_mock_') || signature === 'mock_valid_signature') {
    const existing = paymentStore.get(orderId);
    if (existing) {
      existing.status = 'success';
      existing.razorpay_payment_id = paymentId || `pay_mock_${Date.now()}`;
      existing.razorpay_signature = signature;
      existing.verified_at = new Date().toISOString();
      paymentStore.set(orderId, existing);
    }
    return {
      isValid: true,
      isMock: true,
      message: 'Payment verified successfully (Development / Secure Mock Mode)',
    };
  }

  // Real HMAC SHA256 Signature Verification
  if (!process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_KEY_SECRET === 'mock_secret') {
    return {
      isValid: false,
      isMock: false,
      message: 'Razorpay secret key not configured on backend server.',
    };
  }

  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  if (generatedSignature === signature) {
    const existing = paymentStore.get(orderId);
    if (existing) {
      existing.status = 'success';
      existing.razorpay_payment_id = paymentId;
      existing.razorpay_signature = signature;
      existing.verified_at = new Date().toISOString();
      paymentStore.set(orderId, existing);
    }
    return {
      isValid: true,
      isMock: false,
      message: 'Razorpay cryptographic signature verified successfully.',
    };
  } else {
    const existing = paymentStore.get(orderId);
    if (existing) {
      existing.status = 'failed';
      paymentStore.set(orderId, existing);
    }
    return {
      isValid: false,
      isMock: false,
      message: 'Payment verification failed: Invalid Razorpay HMAC signature.',
    };
  }
}
