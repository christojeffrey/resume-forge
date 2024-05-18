import { ResumeData, ResumeItem } from "@/src/lib/type";
import { CoreMessage } from "ai";
import { atom } from "jotai";

export const recomputePreviewAtom = atom(true);
export const userAtom = atom<any>(undefined);
export const isAuthenticatedAtom = atom(false);
export const isSavingAtom = atom(false);

export const modeAtom = atom<"edit" | "view">("view");

export const isEditingAtom = atom(false);

export const currentItemEditedAtom = atom<ResumeItem | null>(null);

// main page
export const resumeDataAtom = atom<ResumeData>([]);

export const currentResumeWorkspaceAtom = atom<string>("1");

export const resumesDataAtom = atom<{ [key: string]: ResumeData }>({
  "1": [],
});

import { atomEffect } from "jotai-effect";

export const updateResumeDataBasedOnCurrentWorkspaceEffect = atomEffect(
  (get, set) => {
    const currentResumeWorkspace = get(currentResumeWorkspaceAtom);
    set(resumeDataAtom, get(resumesDataAtom)[currentResumeWorkspace] || []);
  }
);

// update resumesData everytime resumeData changes
export const updateResumesDataEffect = atomEffect((get, set) => {
  const resumesData = get(resumesDataAtom);
  const currentResumeWorkspace = get(currentResumeWorkspaceAtom);
  const resumeData = get(resumeDataAtom);
  set(resumesDataAtom, {
    ...resumesData,
    [currentResumeWorkspace]: resumeData,
  });
});

// future paywall?
export const maxResumeDataAtom = atom<number>(1);

export const mixPanelAtom = atom<any>(undefined);
