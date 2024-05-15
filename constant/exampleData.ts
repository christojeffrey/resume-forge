import { ResumeItem } from "@/src/lib/type";

export const hardCodedData: ResumeItem[] = [
  {
    type: "title",
    data: "Jeffrey",
    draft: false,
    id: "1",
  },
  {
    id: "2",
    type: "links",
    data: [
      {
        text: "christojeffrey.com",
        href: "https://christojeffrey.com",
      },
      {
        text: "github.com/christojeffrey",
        href: "https://github.com/christojeffrey",
      },
    ],
    draft: false,
  },
  {
    id: "3",
    type: "heading",
    data: "Education",
    draft: false,
  },
  {
    id: "4",
    type: "section",
    data: {
      title: "Institut Teknologi Bandung",
      subtitle: "Computer Science",
      date: "2020 - 2024",
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
    id: "5",
    type: "divider",
    draft: false,
  },
];
