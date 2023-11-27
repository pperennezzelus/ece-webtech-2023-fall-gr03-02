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
    <div className="container mx-auto mt-8 p-8 bg-white rounded-md shadow-md max-w-md">
      <h1 className="text-3xl font-semibold mb-6">Login to Your Account</h1>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["github"]}
        redirectTo="https://ece-webtech-2023-fall-gr03-02.vercel.app/login"
      />
    </div>
  );
};

export default LoginPage;
