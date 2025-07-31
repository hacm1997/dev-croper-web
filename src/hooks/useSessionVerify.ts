import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { verifySessionThunk } from "@/modules/auth/thunks/verifySessionThunk";

export function useSessionVerify() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { email, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    let ignore = false;
    async function verify() {
      const result = await dispatch(verifySessionThunk());
      if (
        verifySessionThunk.fulfilled.match(result) &&
        !result.payload.authenticated &&
        !ignore
      ) {
        router.replace("/");
      }
      if (verifySessionThunk.rejected.match(result) && !ignore) {
        router.replace("/");
      }
    }
    verify();
    return () => {
      ignore = true;
    };
  }, [dispatch, router]);

  return { email, loading };
}
