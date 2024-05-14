export type ResumeTitle = {
  type: "title";
  data: string;
  draft: boolean;
};

export type ResumeLinks = {
  type: "links";
  data: {
    text: string;
    href: string;
  }[];
  draft: boolean;
};

export type ResumeHeading = {
  type: "heading";
  data: string;
  draft: boolean;
};

export type ResumeItem = {
  type: "item";
  data: {
    title: string;
    subtitle: string;
    date: string;
    moreInformation: string;
    details: {
      htmlValue: string;
      objectValue: { insert: string }[];
    };
  };
  draft: boolean;
};

export type ResumeDivider = {
  type: "divider";
  draft: boolean;
};

export type ResumeData =
  | ResumeTitle
  | ResumeLinks
  | ResumeHeading
  | ResumeItem
  | ResumeDivider;

export const hardCodedData: ResumeData[] = [
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
    type: "item",
    data: {
      title: "Bachelor of Science in Computer Science",
      subtitle: "University of the Philippines Los Baños",
      date: "2018-2022",
      moreInformation: "GPA: 3.00/4.00",
      details: {
        htmlValue: "<p>asfd</p>",
        objectValue: [
          {
            insert: "asfd\n",
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
