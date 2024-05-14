import { CoreMessage } from "ai";
import { atom } from "jotai";

export const recomputePreviewAtom = atom(true);
export const userAtom = atom<any>(undefined);
export const isAuthenticatedAtom = atom(false);
export const isSavingAtom = atom(false);
export const modeAtom = atom<"edit" | "view">("edit");

// AI stuff
export const messagesAtom = atom<CoreMessage[]>([]);
export const latestAnalysisAtom = atom<any>({});

export const generateID = (data: any[]) => {
  return data.map((item, index) => {
    return {
      ...item,
      id: `id-${index}`,
    };
  });
};
// main page
export const resumeDataAtom = atom<any>([]);
