import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const authState = {
  user: null,
  profile: null,
  isLoading: true,
  listeners: []
};

export function subscribeToAuthChanges(listener) {
  authState.listeners.push(listener);
  return () => {
    authState.listeners = authState.listeners.filter(l => l !== listener);
  };
}

function notifyListeners() {
  authState.listeners.forEach(listener => listener(authState));
}

export async function initializeAuth() {
  try {
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
      authState.user = session.user;
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle();

      authState.profile = profile;
    }

    authState.isLoading = false;
    notifyListeners();

    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        authState.user = session.user;
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();

        authState.profile = profile;
      } else {
        authState.user = null;
        authState.profile = null;
      }

      notifyListeners();
    });
  } catch (error) {
    console.error('Auth initialization error:', error);
    authState.isLoading = false;
    notifyListeners();
  }
}

export async function signUp(email, password, fullName, role) {
  try {
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password
    });

    if (signUpError) throw signUpError;
    if (!user) throw new Error('User creation failed');

    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        full_name: fullName,
        username: email.split('@')[0],
        role: role
      });

    if (profileError) throw profileError;

    return { user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
}

export async function signIn(email, password) {
  try {
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return { user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    authState.user = null;
    authState.profile = null;
    notifyListeners();
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
}

export async function updateProfile(updates) {
  try {
    if (!authState.user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', authState.user.id);

    if (error) throw error;

    authState.profile = { ...authState.profile, ...updates };
    notifyListeners();
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
}

export async function updateProfile(updates) {
  try {
    if (!authState.user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', authState.user.id);

    if (error) throw error;

    authState.profile = { ...authState.profile, ...updates };
    notifyListeners();
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
}