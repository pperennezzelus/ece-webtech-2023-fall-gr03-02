import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import { useUser } from "../components/UserContext"; // import useUser

const LoginPage = () => {
  const router = useRouter();
  const { user } = useUser(); // use useUser to get the current user

  useEffect(() => {
    if (user) {
      router.push("/profile"); // Redirect to profile if already logged in
    }
  }, [user, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover h-14 bg-gradient-to-b from-indigo-950 to-slate-950">
    <div className="container mx-auto mt-8 p-8 bg-white rounded-md shadow-md max-w-md mb-64">
      <h1 className="text-3xl font-semibold mb-6">Login to Your Account</h1>
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
