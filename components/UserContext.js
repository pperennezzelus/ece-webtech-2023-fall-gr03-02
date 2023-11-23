import { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../utils/supabaseClient"; // Import supabase client

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check active sessions and set user
    let session;
    try {
      session = supabase.auth.session();
    } catch (error) {
      console.error("Error fetching Supabase session:", error);
      // Optionally, handle the error more gracefully here
    }
    setUser(session?.user || null);

    // Listen for changes to authentication state
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) throw error;
    setUser(user);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
