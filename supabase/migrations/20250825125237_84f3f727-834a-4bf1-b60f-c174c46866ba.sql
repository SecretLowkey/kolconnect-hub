-- Create users table for profile information
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type TEXT NOT NULL CHECK (user_type IN ('kol', 'project')),
  twitter_username TEXT,
  twitter_id TEXT,
  twitter_verified BOOLEAN DEFAULT false,
  twitter_followers_count INTEGER DEFAULT 0,
  avatar_url TEXT,
  bio TEXT,
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create KOL profiles table
CREATE TABLE public.kol_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  display_name TEXT NOT NULL,
  specialties TEXT[] DEFAULT '{}',
  hourly_rate DECIMAL,
  rating DECIMAL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  total_campaigns INTEGER DEFAULT 0,
  total_earnings DECIMAL DEFAULT 0,
  languages TEXT[] DEFAULT '{}',
  time_zone TEXT DEFAULT 'UTC',
  availability BOOLEAN DEFAULT true,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create Project profiles table
CREATE TABLE public.project_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT NOT NULL,
  industry TEXT,
  company_size TEXT,
  website_url TEXT,
  description TEXT,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  total_campaigns INTEGER DEFAULT 0,
  total_spent DECIMAL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create campaigns table
CREATE TABLE public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  budget_min DECIMAL,
  budget_max DECIMAL,
  duration_days INTEGER,
  deliverables TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed', 'cancelled')),
  application_deadline TIMESTAMP WITH TIME ZONE,
  campaign_start_date TIMESTAMP WITH TIME ZONE,
  campaign_end_date TIMESTAMP WITH TIME ZONE,
  applications_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create campaign applications table
CREATE TABLE public.campaign_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE NOT NULL,
  kol_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  proposed_rate DECIMAL NOT NULL,
  cover_letter TEXT,
  deliverables TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create messages table
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  recipient_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,
  subject TEXT,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create analytics table
CREATE TABLE public.analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE NOT NULL,
  kol_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  metric_name TEXT NOT NULL,
  metric_value DECIMAL NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kol_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for kol_profiles
CREATE POLICY "KOL profiles are publicly viewable" ON public.kol_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own KOL profile" ON public.kol_profiles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.users WHERE users.id = kol_profiles.user_id AND users.id = auth.uid())
  );

CREATE POLICY "Users can insert their own KOL profile" ON public.kol_profiles
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.users WHERE users.id = kol_profiles.user_id AND users.id = auth.uid())
  );

-- RLS Policies for project_profiles
CREATE POLICY "Project profiles are publicly viewable" ON public.project_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own project profile" ON public.project_profiles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.users WHERE users.id = project_profiles.user_id AND users.id = auth.uid())
  );

CREATE POLICY "Users can insert their own project profile" ON public.project_profiles
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.users WHERE users.id = project_profiles.user_id AND users.id = auth.uid())
  );

-- RLS Policies for campaigns
CREATE POLICY "Campaigns are publicly viewable" ON public.campaigns
  FOR SELECT USING (true);

CREATE POLICY "Project users can manage their campaigns" ON public.campaigns
  FOR ALL USING (auth.uid() = project_id);

-- RLS Policies for campaign_applications
CREATE POLICY "Applications viewable by campaign owner and applicant" ON public.campaign_applications
  FOR SELECT USING (
    auth.uid() = kol_id OR 
    EXISTS (SELECT 1 FROM public.campaigns WHERE campaigns.id = campaign_applications.campaign_id AND campaigns.project_id = auth.uid())
  );

CREATE POLICY "KOLs can create applications" ON public.campaign_applications
  FOR INSERT WITH CHECK (auth.uid() = kol_id);

CREATE POLICY "Users can update their own applications" ON public.campaign_applications
  FOR UPDATE USING (
    auth.uid() = kol_id OR 
    EXISTS (SELECT 1 FROM public.campaigns WHERE campaigns.id = campaign_applications.campaign_id AND campaigns.project_id = auth.uid())
  );

-- RLS Policies for messages
CREATE POLICY "Users can view their messages" ON public.messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- RLS Policies for analytics
CREATE POLICY "Analytics viewable by campaign owner" ON public.analytics
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.campaigns WHERE campaigns.id = analytics.campaign_id AND campaigns.project_id = auth.uid())
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_kol_profiles_updated_at BEFORE UPDATE ON public.kol_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_project_profiles_updated_at BEFORE UPDATE ON public.project_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON public.campaigns
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_campaign_applications_updated_at BEFORE UPDATE ON public.campaign_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, user_type, twitter_username, twitter_id, twitter_verified, twitter_followers_count, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'kol'),
    NEW.raw_user_meta_data->>'user_name',
    NEW.raw_user_meta_data->>'provider_id',
    COALESCE((NEW.raw_user_meta_data->>'verified')::boolean, false),
    COALESCE((NEW.raw_user_meta_data->>'public_metrics_followers_count')::integer, 0),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();