import Divider from "./_components/divider";
import ResumeHeading from "./_components/heading";
import ResumeSection from "./_components/section";
import ResumeLinks from "./_components/links";
import ResumeTitle from "./_components/title";
import { Page, Document } from "@react-pdf/renderer";
import { ResumeData } from "@/src/lib/type";

const typeToResumeComponents: {
  [key: string]: any;
} = {
  title: ResumeTitle,
  links: ResumeLinks,
  heading: ResumeHeading,
  section: ResumeSection,
  divider: Divider,
};

export const Resume = ({ resumeData = [] }: { resumeData: ResumeData }) => {
  // console.log("resumedata", resumeData);
  return (
    <Document>
      <Page
        style={{
          fontSize: 12,
          fontFamily: "Times-Roman",
          paddingTop: 10,
          paddingBottom: 10,
          paddingHorizontal: 10,
          fontWeight: 900,
        }}
      >
        {resumeData.map((item, index: number) => {
          const { type, id, draft } = item;
          if (draft) {
            return null;
          }
          const Component = typeToResumeComponents[type];
          if (!Component) {
            return null;
          }
          return <Component key={id} item={item} />;
        })}
      </Page>
    </Document>
  );
};
