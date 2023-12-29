import Header from "./header";
import Footer from "./footer";

export default function RootLayout({ children }) {
  return (
    <div className="relative">
        <Header className="z-50" />
        {children}
        <Footer />
    </div>
  );
}