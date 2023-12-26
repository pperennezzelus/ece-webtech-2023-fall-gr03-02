import { useEffect, useContext } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import { useUser } from "../components/UserContext"; 
import { DarkModeContext } from '../components/DarkModeContext'; 

const LoginPage = () => {
  const router = useRouter();
  const { user } = useUser(); 
  const { isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user, router]);

  return (
    <div className={`flex items-center justify-center min-h-screen bg-cover h-14 ${isDarkMode ? 'bg-gradient-to-b from-indigo-950 to-slate-950' : 'bg-gradient-to-b from-white to-slate-400'}`}>
      <div className={`container mx-auto mt-8 p-8 rounded-md shadow-md max-w-md mb-64 ${isDarkMode ? 'bg-black bg-opacity-40' : 'bg-white'}`}>
        <h1 className={`text-3xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Login to Your Account</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["github"]}
          redirectTo="localhost:3000/profile"
        />
      </div>
    </div>
  );
};

export default LoginPage;