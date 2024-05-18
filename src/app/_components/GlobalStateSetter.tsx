"use client";

import { ResumeData } from "@/src/lib/type";
import {
  isAuthenticatedAtom,
  mixPanelAtom,
  resumeDataAtom,
  updateResumesDataEffect,
  userAtom,
} from "@/src/store";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import Mixpanel from "mixpanel";
import { generateID } from "@/src/lib/utils";

// Create an instance of the mixpanel client
export default function GlobalStateSetter({
  user,
  isAuthenticated,
  children,
  resumesData,
}: {
  user: KindeUser | null;
  isAuthenticated: boolean;
  children: React.ReactNode;
  resumesData: { [key: string]: ResumeData };
}) {
  useAtom(updateResumesDataEffect);

  const [_user, setUser] = useAtom(userAtom);
  const [_isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [isSet, setIsSet] = useState(false);
  const [_resumeData, setResumeData] = useAtom(resumeDataAtom);
  const [mixPanel, setMixPanel] = useAtom(mixPanelAtom);
  useEffect(() => {
    setUser(user);
    setIsAuthenticated(isAuthenticated);
    // if authenticated, use the one from server. if not, check localstorage.
    const localResumesData = localStorage.getItem("resumesData")
      ? JSON.parse(localStorage.getItem("resumesData") as string)
      : {
          "1": [],
        };

    const validResumesData =
      isAuthenticated && resumesData ? resumesData : localResumesData;

    console.log("validResumesData");
    setResumeData(generateID(validResumesData["1"]));
    let mixpanel = Mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || "");
    setMixPanel(mixpanel);
    if (user) {
      mixpanel.people.set(user.id, {
        $name: user.family_name + " " + user.given_name,
        $email: user.email,
      });
    }
    setIsSet(true);
  }, []);

  return <>{isSet && children}</>;
}
