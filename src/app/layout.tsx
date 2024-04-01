import type { Metadata } from "next";
import { DM_Sans, Inter, Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/navbar/Navbar";
import Modal from "./components/modals/Modal";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./components/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnarToaster } from '@/components/ui/sonner';
import ModalProvider from "@/providers/modal-provider";

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Novera - World Best Web Platform For Businesses",
  description: "Novera - World Best Platform For Businesses",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const currentUser = await getCurrentUser();

  return (
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <RegisterModal />
            <LoginModal />
            <ToasterProvider />
            <Toaster />
            <SonnarToaster position="bottom-left" />
            <ModalProvider>
              {children}
            </ModalProvider>
          </ThemeProvider>
        </body>
      </html>
  );
}