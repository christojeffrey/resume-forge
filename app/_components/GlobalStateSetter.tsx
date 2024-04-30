"use client";

import { isAuthenticatedAtom, resumeDataAtom, userAtom } from "@/store";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function GlobalStateSetter({
  user,
  isAuthenticated,
  children,
  resumeData,
}: any) {
  const [_user, setUser] = useAtom(userAtom);
  const [_isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  const [_resumeData, setResumeData] = useAtom(resumeDataAtom);
  useEffect(() => {
    setUser(user);
    setIsAuthenticated(isAuthenticated);
    setResumeData(resumeData);
  }, []);

  return <>{children}</>;
}
