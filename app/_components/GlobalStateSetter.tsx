"use client";

import { hardCodedData } from "@/constant/exampleData";
import {
  generateID,
  isAuthenticatedAtom,
  resumeDataAtom,
  userAtom,
} from "@/store";
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
    setResumeData(generateID(resumeData ? resumeData : hardCodedData));
  }, []);

  return <>{children}</>;
}
