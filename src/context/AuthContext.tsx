import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  dob: string;
  age: number;
  gender: 'female' | 'male' | 'non_binary' | '';
  location: string;
  photoUrl: string;
  bio: string;
  communicationStyle: string;
  socialEnergy: string;
  lifestyle: string;
  coreValues: string[];
  interests: string[];
  instagramHandle: string;
  is18Plus: boolean;
  isProfileComplete: boolean;
  completionPercentage: number;
  partnerPreferences: {
    preferredGender: string;
    minAge: number;
    maxAge: number;
    maxAgeGap: number;
    locationPref: string;
    intention: string;
    heightPref: string;
    bodyTypePref: string;
    stylePref: string;
    dealbreakers: string[];
  };
  personalityQuiz: Record<string, string>;
  paymentVerified: boolean;
  paymentOrder?: {
    orderId: string;
    amountINR: number;
    verifiedAt: string;
  };
}

const DEFAULT_PROFILE: UserProfile = {
  id: 'user_demo_101',
  email: 'alex.cupid@example.com',
  fullName: 'Alex Vance',
  dob: '1998-06-15',
  age: 26,
  gender: 'male',
  location: 'Mumbai, MH',
  photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800',
  bio: 'Product strategist passionate about architectural design, indie music, specialty pourovers, and meaningful conversations.',
  communicationStyle: 'deep_listener',
  socialEnergy: 'ambivert',
  lifestyle: 'early_bird',
  coreValues: ['Personal Growth', 'Radical Honesty', 'Healthy Autonomy', 'Empathy & Kindness'],
  interests: ['Specialty Coffee', 'Literature & Books', 'Modern Art & Galleries', 'Indie & Live Music', 'Cultural Travel'],
  instagramHandle: '@alexvance_design',
  is18Plus: true,
  isProfileComplete: true,
  completionPercentage: 100,
  partnerPreferences: {
    preferredGender: 'female',
    minAge: 22,
    maxAge: 28,
    maxAgeGap: 3,
    locationPref: 'Mumbai, MH',
    intention: 'long_term',
    heightPref: 'no_preference',
    bodyTypePref: 'no_preference',
    stylePref: 'no_preference',
    dealbreakers: ['smoking'],
  },
  personalityQuiz: {
    q1_communication: 'deep_listener',
    q2_energy: 'ambivert',
    q3_lifestyle: 'early_bird',
    q4_conflict: 'calm_dialogue',
  },
  paymentVerified: false,
};

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  signup: (email: string, fullName: string, dob: string, gender: 'female' | 'male' | 'non_binary') => Promise<{ requiresOtp: boolean }>;
  verifyOtp: (code: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updatePartnerPreferences: (prefs: Partial<UserProfile['partnerPreferences']>) => void;
  setPaymentSuccess: (orderId: string, amountINR: number) => void;
  deleteAccount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('cupid_user_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('cupid_user_profile', JSON.stringify(user));
    } else {
      localStorage.removeItem('cupid_user_profile');
    }
  }, [user]);

  const login = async (email: string) => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signInWithOtp({ email });
      }
      // Set active user state
      if (!user) {
        setUser({ ...DEFAULT_PROFILE, email });
      } else {
        setUser({ ...user, email });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    email: string,
    fullName: string,
    dob: string,
    gender: 'female' | 'male' | 'non_binary'
  ) => {
    setIsLoading(true);
    try {
      // Calculate Age & 18+ check
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      const is18Plus = age >= 18;

      const newUser: UserProfile = {
        id: `user_${Date.now()}`,
        email,
        fullName,
        dob,
        age,
        gender,
        location: 'Mumbai, MH',
        photoUrl: gender === 'female' 
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
        bio: '',
        communicationStyle: '',
        socialEnergy: '',
        lifestyle: '',
        coreValues: [],
        interests: [],
        instagramHandle: '',
        is18Plus,
        isProfileComplete: false,
        completionPercentage: 20,
        partnerPreferences: {
          preferredGender: gender === 'male' ? 'female' : 'male',
          minAge: Math.max(18, age - 3),
          maxAge: age + 3,
          maxAgeGap: 3,
          locationPref: 'no_preference',
          intention: 'long_term',
          heightPref: 'no_preference',
          bodyTypePref: 'no_preference',
          stylePref: 'no_preference',
          dealbreakers: [],
        },
        personalityQuiz: {},
        paymentVerified: false,
      };

      setUser(newUser);
      return { requiresOtp: true };
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (code: string) => {
    setIsLoading(true);
    try {
      // Simple OTP verification simulation
      if (code === '123456' || code.length === 6) {
        return true;
      }
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    if (isSupabaseConfigured) {
      supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('cupid_user_profile');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      // Recalculate completion percentage
      let score = 0;
      if (updated.fullName) score += 10;
      if (updated.dob && updated.is18Plus) score += 10;
      if (updated.photoUrl) score += 15;
      if (updated.bio && updated.bio.length > 20) score += 15;
      if (updated.communicationStyle && updated.socialEnergy) score += 15;
      if (updated.coreValues.length >= 2) score += 15;
      if (updated.interests.length >= 3) score += 20;

      updated.completionPercentage = Math.min(score, 100);
      updated.isProfileComplete = updated.completionPercentage >= 90;
      return updated;
    });
  };

  const updatePartnerPreferences = (prefs: Partial<UserProfile['partnerPreferences']>) => {
    if (!user) return;
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        partnerPreferences: {
          ...prev.partnerPreferences,
          ...prefs,
        },
      };
    });
  };

  const setPaymentSuccess = (orderId: string, amountINR: number) => {
    if (!user) return;
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        paymentVerified: true,
        paymentOrder: {
          orderId,
          amountINR,
          verifiedAt: new Date().toISOString(),
        },
      };
    });
  };

  const deleteAccount = () => {
    setUser(null);
    localStorage.removeItem('cupid_user_profile');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user && user.is18Plus),
        isLoading,
        login,
        signup,
        verifyOtp,
        logout,
        updateProfile,
        updatePartnerPreferences,
        setPaymentSuccess,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
