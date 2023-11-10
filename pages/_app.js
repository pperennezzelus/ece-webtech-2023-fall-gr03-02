import "../styles/global.css";
import RootLayout from "../components/layout";
import { UserProvider } from "../components/UserContext";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </UserProvider>
  );
}

export default MyApp;
