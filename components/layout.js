import Header from "./header";
import Footer from "./footer";

export default function RootLayout({ children }) {
  return (
    <div>
        <Header />
        {children}
        <Footer />
    </div>
  );
}
