import "../styles/global.css";
import RootLayout from "../components/layout";
import { UserProvider } from "../components/UserContext";
import { DarkModeProvider } from '../components/DarkModeContext';

import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  return (
    <UserProvider>
      <DarkModeProvider>
        <RootLayout>
          <SessionContextProvider
            supabaseClient={supabaseClient}
            initialSession={pageProps.initialSession}
          >
            <Component {...pageProps} />
          </SessionContextProvider>
        </RootLayout>
      </DarkModeProvider>
    </UserProvider>
  );
}

export default MyApp;