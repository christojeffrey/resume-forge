import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ResumeData } from "./type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateID = (data: ResumeData) => {
  return data.map((item, index) => {
    return {
      ...item,
      id: `id-${index}`,
    };
  });
};

//   TODO: turn this into markdown instead
export function resumeDataToPlainText(
  resumeData: ResumeData,
  filterDraft = true
) {
  let newResumeText = "";
  resumeData.forEach(item => {
    if (filterDraft && !item.draft) {
      if (item.type === "title") {
        newResumeText += item.data + "\n";
      }
      if (item.type === "links") {
        newResumeText += item.data.map(link => link.href).join("\n") + "\n";
      }
      if (item.type === "heading") {
        newResumeText += "# " + item.data + "\n";
      }
      if (item.type === "section") {
        newResumeText += item.data.title + "\n";
        newResumeText += item.data.subtitle + "\n";
        newResumeText += item.data.date + "\n";
        newResumeText += item.data.moreInformation + "\n";
        newResumeText += item.data.details.htmlValue + "\n";
      }
      if (item.type === "divider") {
        newResumeText += "----------------\n";
      }
    }
  });

  return newResumeText;
}
