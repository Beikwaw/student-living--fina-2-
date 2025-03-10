-- Create a custom type for user roles
CREATE TYPE user_role AS ENUM ('admin', 'user');

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create admins table
CREATE TABLE admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    is_super_admin BOOLEAN DEFAULT false
);

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    phone_number TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role DEFAULT 'user'
);

-- Create indexes for better query performance
CREATE INDEX idx_admins_email ON admins(email);
CREATE INDEX idx_admins_auth_user_id ON admins(auth_user_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_auth_user_id ON users(auth_user_id);

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_admins_updated_at
    BEFORE UPDATE ON admins
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for admins table
CREATE POLICY "Admins can view all admins"
    ON admins FOR SELECT
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM admins a
        WHERE a.auth_user_id = auth.uid()
    ));

CREATE POLICY "Super admins can insert admins"
    ON admins FOR INSERT
    TO authenticated
    WITH CHECK (EXISTS (
        SELECT 1 FROM admins a
        WHERE a.auth_user_id = auth.uid()
        AND a.is_super_admin = true
    ));

CREATE POLICY "Super admins can update admins"
    ON admins FOR UPDATE
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM admins a
        WHERE a.auth_user_id = auth.uid()
        AND a.is_super_admin = true
    ));

-- Create policies for users table
CREATE POLICY "Admins can view all users"
    ON users FOR SELECT
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM admins a
        WHERE a.auth_user_id = auth.uid()
    ));

CREATE POLICY "Users can view their own data"
    ON users FOR SELECT
    TO authenticated
    USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can update their own data"
    ON users FOR UPDATE
    TO authenticated
    USING (auth.uid() = auth_user_id);

-- Insert a sample super admin (you'll need to replace with actual auth.users id)
-- Note: You should create the user through Supabase Auth first, then use their ID here
INSERT INTO admins (email, first_name, last_name, auth_user_id, is_super_admin)
VALUES ('admin@example.com', 'Super', 'Admin', '00000000-0000-0000-0000-000000000000', true);

-- Create a function to automatically create user profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (email, auth_user_id)
    VALUES (NEW.email, NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the function after a user signs up
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user(); 