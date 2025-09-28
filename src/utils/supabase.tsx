import { createClient } from '@supabase/supabase-js';
// eslint-disable-next-line import/no-unresolved
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';

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
export const getAnnouncements = async (limit?: number) => {
  let query = supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  return { data, error };
};

export const getAnnouncementById = async (id: string) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
};

export const createAnnouncement = async (title: string, content: string, userId: string) => {
  const { data, error } = await supabase
    .from('posts')
    .insert([{ title, content, user_id: userId }]);
  return { data, error };
};