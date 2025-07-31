"use client";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks";
import { logoutThunk } from "@/modules/auth/thunks/logoutThunk";
import { Button } from "primereact/button";

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    router.push("/");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={handleLogout} className="mt-4" label="Logout" />
    </div>
  );
}