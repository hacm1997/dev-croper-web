"use client";
import MainLayout from "@/components/organisms/dashboard/layout/main-layout";
import { useSessionVerify } from "@/hooks/useSessionVerify";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useSessionVerify();
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}
