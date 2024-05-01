"use client";

import { hardCodedData } from "@/constant/exampleData";
import {
  generateID,
  isAuthenticatedAtom,
  resumeDataAtom,
  userAtom,
} from "@/store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function GlobalStateSetter({
  user,
  isAuthenticated,
  children,
  resumeData,
}: any) {
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
