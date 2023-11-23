import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../utils/supabaseClient";
import Router from "next/router";

const LoginPage = () => {
  const handleAuthSuccess = () => {
    Router.push("http://localhost:3000/contact");
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-white rounded-md shadow-md max-w-md">
      <h1 className="text-3xl font-semibold mb-6">Login to Your Account</h1>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["google", "github"]}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default LoginPage;
