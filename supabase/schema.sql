-- CUPID Matchmaking Database Schema
-- Run this script in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    age INTEGER NOT NULL CHECK (age >= 18),
    gender TEXT NOT NULL, -- 'female', 'male', 'non_binary', etc.
    location TEXT NOT NULL,
    profile_photo_url TEXT,
    bio TEXT,
    communication_style TEXT, -- 'expressive', 'deep_listener', 'direct', 'playful'
    social_energy TEXT, -- 'extrovert', 'introvert', 'ambivert'
    lifestyle TEXT, -- 'early_bird', 'night_owl', 'active', 'relaxed'
    core_values TEXT[], -- Array of core value tags
    relationship_expectations TEXT,
    instagram_handle TEXT, -- Private by default, only revealed on mutual match consent
    is_18_plus BOOLEAN DEFAULT false CHECK (is_18_plus = true),
    is_profile_complete BOOLEAN DEFAULT false,
    completion_percentage INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PARTNER PREFERENCES TABLE
CREATE TABLE IF NOT EXISTS public.partner_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    preferred_gender TEXT DEFAULT 'no_preference',
    preferred_min_age INTEGER DEFAULT 18,
    preferred_max_age INTEGER DEFAULT 35,
    max_age_gap INTEGER DEFAULT 3 CHECK (max_age_gap <= 5), -- Age gap policy (approx 2-3 years max)
    location_preference TEXT DEFAULT 'no_preference',
    relationship_intention TEXT DEFAULT 'long_term',
    height_preference TEXT DEFAULT 'no_preference',
    body_type_preference TEXT DEFAULT 'no_preference', -- Neutral body-type options
    style_presentation TEXT DEFAULT 'no_preference',
    personality_preference TEXT[],
    communication_preference TEXT[],
    lifestyle_preference TEXT[],
    dealbreakers TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PERSONALITY ANSWERS TABLE
CREATE TABLE IF NOT EXISTS public.personality_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL,
    answer_value TEXT NOT NULL,
    score_contribution JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, question_id)
);

-- 4. INTERESTS MASTER TABLE
CREATE TABLE IF NOT EXISTS public.interests (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    name TEXT NOT NULL,
    icon TEXT
);

-- Seed basic interests
INSERT INTO public.interests (id, category, name, icon) VALUES
('coffee', 'lifestyle', 'Specialty Coffee', 'Coffee'),
('reading', 'intellectual', 'Literature & Books', 'BookOpen'),
('hiking', 'outdoors', 'Hiking & Nature', 'Trees'),
('cooking', 'lifestyle', 'Culinary Arts', 'Utensils'),
('art', 'creative', 'Modern Art & Galleries', 'Palette'),
('music', 'creative', 'Indie & Live Music', 'Music'),
('travel', 'adventure', 'Cultural Travel', 'Compass'),
('fitness', 'health', 'Wellness & Fitness', 'Activity'),
('film', 'creative', 'Cinema & Film Analysis', 'Film'),
('tech', 'intellectual', 'Tech & Future Trends', 'Cpu')
ON CONFLICT (id) DO NOTHING;

-- 5. USER INTERESTS LINK TABLE
CREATE TABLE IF NOT EXISTS public.user_interests (
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    interest_id TEXT NOT NULL REFERENCES public.interests(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, interest_id)
);

-- 6. VALUES MASTER TABLE
CREATE TABLE IF NOT EXISTS public.values (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT
);

-- Seed core values
INSERT INTO public.values (id, category, name, description) VALUES
('honesty', 'character', 'Radical Honesty', 'Direct, open and truthful communication at all times'),
('growth', 'mindset', 'Personal Growth', 'Continuous self-improvement, learning and evolution'),
('family', 'lifestyle', 'Family & Community', 'Deep bonds with family, friends and loved ones'),
('ambition', 'career', 'Ambition & Drive', 'Passion for creating, achieving and excelling'),
('empathy', 'relational', 'Empathy & Kindness', 'Deep understanding, emotional intelligence and care'),
('independence', 'autonomy', 'Healthy Autonomy', 'Respect for personal space, identity and individual goals')
ON CONFLICT (id) DO NOTHING;

-- 7. USER VALUES LINK TABLE
CREATE TABLE IF NOT EXISTS public.user_values (
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    value_id TEXT NOT NULL REFERENCES public.values(id) ON DELETE CASCADE,
    importance_rating INTEGER DEFAULT 5 CHECK (importance_rating BETWEEN 1 AND 5),
    PRIMARY KEY (user_id, value_id)
);

-- 8. MATCHES TABLE
CREATE TABLE IF NOT EXISTS public.matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user1_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    user2_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    compatibility_score NUMERIC(5,2) NOT NULL, -- Overall score (e.g. 94.50)
    personality_score NUMERIC(5,2) NOT NULL, -- 40% weight
    values_score NUMERIC(5,2) NOT NULL, -- 30% weight
    interests_score NUMERIC(5,2) NOT NULL, -- 30% weight
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'accepted', 'archived')),
    user1_consented BOOLEAN DEFAULT false,
    user2_consented BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_pair UNIQUE(user1_id, user2_id)
);

-- 9. MATCH EXPLANATIONS TABLE
CREATE TABLE IF NOT EXISTS public.match_explanations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    match_id UUID UNIQUE NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
    personality_summary TEXT NOT NULL,
    values_summary TEXT NOT NULL,
    lifestyle_summary TEXT NOT NULL,
    interests_summary TEXT NOT NULL,
    why_we_matched TEXT[] NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    razorpay_order_id TEXT UNIQUE NOT NULL,
    razorpay_payment_id TEXT UNIQUE,
    razorpay_signature TEXT,
    amount NUMERIC(10,2) NOT NULL,
    currency TEXT DEFAULT 'INR',
    pass_type TEXT NOT NULL CHECK (pass_type IN ('female_pass', 'male_pass')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'cancelled')),
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- 'match_found', 'payment_success', 'consent_request'
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. CONSENTS TABLE
CREATE TABLE IF NOT EXISTS public.consents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    match_id UUID NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
    consent_given BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, match_id)
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personality_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_explanations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consents ENABLE ROW LEVEL SECURITY;

-- Profiles: view own profile or view matches' public profile (excluding instagram_handle unless consent is given)
CREATE POLICY "Users can view own profile" ON public.profiles 
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles 
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles 
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Partner Preferences: only owner
CREATE POLICY "Users manage own partner preferences" ON public.partner_preferences 
    FOR ALL USING (auth.uid() = user_id);

-- Personality Answers: only owner
CREATE POLICY "Users manage own personality answers" ON public.personality_answers 
    FOR ALL USING (auth.uid() = user_id);

-- User Interests: only owner
CREATE POLICY "Users manage own interests" ON public.user_interests 
    FOR ALL USING (auth.uid() = user_id);

-- User Values: only owner
CREATE POLICY "Users manage own values" ON public.user_values 
    FOR ALL USING (auth.uid() = user_id);

-- Matches: user can view matches where user1_id or user2_id is their id
CREATE POLICY "Users view own matches" ON public.matches 
    FOR SELECT USING (auth.uid() = user1_id OR auth.uid() = user2_id);

-- Match Explanations: user can view explanation if part of match
CREATE POLICY "Users view own match explanations" ON public.match_explanations 
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.matches m 
            WHERE m.id = match_explanations.match_id 
            AND (m.user1_id = auth.uid() OR m.user2_id = auth.uid())
        )
    );

-- Payments: only owner
CREATE POLICY "Users manage own payments" ON public.payments 
    FOR ALL USING (auth.uid() = user_id);

-- Notifications: only owner
CREATE POLICY "Users view own notifications" ON public.notifications 
    FOR ALL USING (auth.uid() = user_id);

-- Consents: only owner
CREATE POLICY "Users manage own consent" ON public.consents 
    FOR ALL USING (auth.uid() = user_id);
