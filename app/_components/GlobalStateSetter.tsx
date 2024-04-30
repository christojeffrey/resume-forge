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

  const [_resumeData, setResumeData] = useAtom(resumeDataAtom);
  const [isSet, setIsSet] = useState(true);

  useEffect(() => {
    setIsSet(false);
    console.log("setting global state");
    setUser(user);
    setIsAuthenticated(isAuthenticated);
    console.log("isAuthenticated", isAuthenticated);
    console.log("resumeData", resumeData);
    console.log("user", user);

    setResumeData(generateID(isAuthenticated ? resumeData : hardCodedData));
    setIsSet(true);
  }, []);

  return <>{isSet && children}</>;
}
