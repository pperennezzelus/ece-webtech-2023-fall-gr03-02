import { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let session;
    try {
      session = supabase.auth.session();
    } catch (error) {
      console.error("Error fetching Supabase session:", error);
    }
    setUser(session?.user || null);
    setIsLoggedIn(!!session?.user);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        setIsLoggedIn(!!session?.user);
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
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
