"use client";

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
    // if authenticated, use the one from server. if not, check localstorage.
    const localResumeData = localStorage.getItem("resumeData")
      ? JSON.parse(localStorage.getItem("resumeData") as string)
      : [];

    const validResumeData =
      isAuthenticated && resumeData ? resumeData : localResumeData;

    console.log("validResumeData");
    console.log(resumeData);
    console.log(localResumeData);
    setResumeData(generateID(validResumeData));
    setIsSet(true);
  }, []);

  return <>{isSet && children}</>;
}
