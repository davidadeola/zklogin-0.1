import Header from "./header";
import Footer from "./footer";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className=" relative flex w-full h-screen flex-col">
      <Header />
      <main className="flex items-center justify-center px-6 h-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
