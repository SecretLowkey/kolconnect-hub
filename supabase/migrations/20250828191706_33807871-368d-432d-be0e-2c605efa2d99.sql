-- Fix security issue: Set search_path for handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (
    id, 
    user_type, 
    twitter_username, 
    twitter_id, 
    twitter_verified, 
    twitter_followers_count, 
    avatar_url,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'kol'),
    NEW.raw_user_meta_data->>'user_name',
    NEW.raw_user_meta_data->>'provider_id',
    COALESCE((NEW.raw_user_meta_data->>'verified')::boolean, false),
    COALESCE((NEW.raw_user_meta_data->>'public_metrics_followers_count')::integer, 0),
    NEW.raw_user_meta_data->>'avatar_url',
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$;

-- Also fix the update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;