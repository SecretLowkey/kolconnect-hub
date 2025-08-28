-- Fix the handle_new_user function to properly create profiles based on user_type
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_type_value TEXT;
BEGIN
  -- Get user_type from metadata, default to 'kol' if not found
  user_type_value := COALESCE(NEW.raw_user_meta_data->>'user_type', 'kol');
  
  -- Insert into users table
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
    user_type_value,
    NEW.raw_user_meta_data->>'user_name',
    NEW.raw_user_meta_data->>'provider_id',
    COALESCE((NEW.raw_user_meta_data->>'verified')::boolean, false),
    COALESCE((NEW.raw_user_meta_data->>'public_metrics_followers_count')::integer, 0),
    NEW.raw_user_meta_data->>'avatar_url',
    NOW(),
    NOW()
  );
  
  -- Create the appropriate profile based on user_type
  IF user_type_value = 'kol' THEN
    INSERT INTO public.kol_profiles (
      user_id,
      display_name,
      created_at,
      updated_at
    ) VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'user_name', 'Anonymous KOL'),
      NOW(),
      NOW()
    );
  ELSIF user_type_value = 'project' THEN
    INSERT INTO public.project_profiles (
      user_id,
      company_name,
      created_at,
      updated_at
    ) VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'user_name', 'Company'),
      NOW(),
      NOW()
    );
  END IF;
  
  RETURN NEW;
END;
$$;