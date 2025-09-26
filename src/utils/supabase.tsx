import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from 'react-native-dotenv';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Auth helpers
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Database helpers
export const getAnnouncements = async () => {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
};

export const getEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });
  return { data, error };
};

export const createAnnouncement = async (title: string, content: string, userId: string) => {
  const { data, error } = await supabase
    .from('announcements')
    .insert([{ title, content, user_id: userId }]);
  return { data, error };
};

export const createEvent = async (title: string, description: string, date: string, userId: string) => {
  const { data, error } = await supabase
    .from('events')
    .insert([{ title, description, date, user_id: userId }]);
  return { data, error };
};