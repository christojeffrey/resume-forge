"use client";

import { hardCodedData } from "@/constant/exampleData";
import { ResumeData } from "@/src/lib/type";
import {
  generateID,
  isAuthenticatedAtom,
  resumeDataAtom,
  userAtom,
} from "@/src/store";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function GlobalStateSetter({
  user,
  isAuthenticated,
  children,
  resumeData,
}: {
  user: KindeUser | null;
  isAuthenticated: boolean;
  children: React.ReactNode;
  resumeData: ResumeData;
}) {
  const [_user, setUser] = useAtom(userAtom);
  const [_isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [isSet, setIsSet] = useState(false);
  const [_resumeData, setResumeData] = useAtom(resumeDataAtom);
  useEffect(() => {
    setUser(user);
    setIsAuthenticated(isAuthenticated);
    // if authenticated, use the one from server. if not, check localstorage. if doesn't exist, use hardcoded
    const localResumeData = localStorage.getItem("resumeData")
      ? JSON.parse(localStorage.getItem("resumeData") as string)
      : hardCodedData;

    const validResumeData = isAuthenticated ? resumeData : localResumeData;
    setResumeData(generateID(validResumeData));
    setIsSet(true);
  }, []);

  return <>{isSet && children}</>;
}