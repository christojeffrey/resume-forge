import { hardCodedData } from "@/constant/exampleData";
import { atom } from "jotai";

export const recomputePreviewAtom = atom(true);

export const generateID = (data: any[]) => {
  return data.map((item, index) => {
    return {
      ...item,
      id: `id-${index}`,
    };
  });
};
// main page
export const resumeDataAtom = atom(generateID(hardCodedData));
