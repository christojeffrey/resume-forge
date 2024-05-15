import { ResumeItem } from "@/lib/type";

export const hardCodedData: ResumeItem[] = [
  {
    type: "title",
    data: "Jeffrey",
    draft: false,
  },
  {
    type: "links",
    data: [
      {
        text: "christojeffrey.com",
        href: "https://christojeffrey.com",
      },
      {
        text: "christojeffrey.com",
        href: "https://christojeffrey.com",
      },
      {
        text: "christojeffrey.com",
        href: "https://christojeffrey.com",
      },
    ],
    draft: false,
  },
  {
    type: "heading",
    data: "Education",
    draft: false,
  },
  {
    type: "section",
    data: {
      title: "Institut Teknologi Bandung",
      subtitle: "Computer Science",
      date: "2020 - 202",
      moreInformation: "GPA: 3.00/4.00",
      details: {
        htmlValue:
          "<p>- excellent student, number one in the field</p><p>- Took courses in data structures, algorithms, and machine learning.</p><p>- Proficient in Python, with 3 years of experience.</p><p>- Designed and implemented a database system for a small business.</p>",
        objectValue: [
          {
            insert:
              "- excellent student, number one in the field\n- Took courses in data structures, algorithms, and machine learning.\n- Proficient in Python, with 3 years of experience.\n- Designed and implemented a database system for a small business.\n",
          },
        ],
      },
    },
    draft: false,
  },
  {
    type: "divider",
    draft: false,
  },
];
