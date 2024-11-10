import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { supabase } from 'supabaseClient';

declare module 'supabaseClient' {
  export const supabase: ReturnType<typeof createClient>;
}

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else console.log('User signed up:', user);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) setError(error.message);
    else {
      console.log('User logged in:', user);
      fetchUserData(user.id); // Fetch user data after login
    }
  };

  const fetchUserData = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_data') // Replace with your actual table name
      .select('*')
      .eq('user_id', userId);
    if (error) setError(error.message);
    else setUserData(data);
  };

  useEffect(() => {
    const session = supabase.auth.session();
    if (session) {
      fetchUserData(session.user.id); // Fetch user data on component mount
    }
  }, []);

  return (
    <div>
      <h2>Authentication</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      <form onSubmit={handleLogin}>
        <button type="submit">Log In</button>
      </form>
      {/* Render user data or other components here */}
      {userData && <div>{JSON.stringify(userData)}</div>}
    </div>
  );
};

export default Auth; 