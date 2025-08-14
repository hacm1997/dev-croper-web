"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginThunk } from "@/modules/auth/thunks/loginThunk";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Button } from "primereact/button";
import Link from "next/link";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, loading } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    await dispatch(loginThunk({ email, password }));
  };

  // Redirige si el login fue exitoso (no hay error, no está cargando y se intentó enviar)
  useEffect(() => {
    if (submitted && !loading && !error) {
      console.log("entry to redirect");
      router.push("/dashboard");
    }
  }, [error, loading, router, submitted]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[95vh]">
        <h1 className="font-bold text-[32px] py-6">Project Managment</h1>
        <div className="flex justify-center w-[80%] md:w-[70%] xl:w-[28%] rounded-[8px] transition-all duration-75 hover:shadow-cyan-glow bg-[#1A1E28] ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full p-8"
          >
            <h2 className="text-center text-[24px] pb-2 font-semibold">
              Welcome!
            </h2>
            <input
              className="h-[40px] bg-transparent border-[1px] border-[#1c7eda] p-2 rounded-md"
              type="text"
              placeholder="Email o username"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="h-[40px] bg-transparent border-[1px] border-[#1c7eda] p-2 rounded-md"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex gap-4 justify-between">
              <Link href="sign-up" title="signup" className="w-[44%]">
                <Button
                  type="button"
                  className="w-[150px] rounded-2xl h-[40px] bg-[#8f8f8f] transition-all duration-150 hover:bg-[#646464]"
                  label="Sign up"
                />
              </Link>
              <Button
                type="submit"
                className="w-[150px] rounded-2xl h-[40px] bg-[#1c7eda] transition-all duration-150 hover:bg-[#1463ac]"
                label={loading ? "Logging in..." : "Login"}
              />
            </div>
            <div className="flex justify-center">
              {error && <p className="text-red-500 text-center">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
