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
      <div className='pl-[20px] md:pl-[300px] flex flex-col gap-10 pt-[50px] w-[94%] h-auto'>
        {children}
      </div>
    </MainLayout>
  );
}
