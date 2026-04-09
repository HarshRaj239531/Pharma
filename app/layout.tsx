import "@/app/globals.css";
import { AuthProvider } from "@/src/context/AuthContext";
import { Navbar } from "@/src/components/Layout/Navbar";
import Footer from "@/src/components/Layout/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow relative z-10">{children}</main>
          <Footer className="relative z-10" />
        </AuthProvider>
      </body>
    </html>
  );
}