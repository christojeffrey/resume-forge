import Divider from "./_components/divider";
import ResumeHeading from "./_components/heading";
import ResumeItem from "./_components/item";
import ResumeLinks from "./_components/links";
import ResumeTitle from "./_components/title";
import { Page, Document } from "@react-pdf/renderer";

const typeToComponents = [
  { type: "title", component: ResumeTitle },
  { type: "links", component: ResumeLinks },
  { type: "heading", component: ResumeHeading },
  { type: "item", component: ResumeItem },
  { type: "divider", component: Divider },
];

export const Resume = (resumeData: any) => {
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
        {resumeData.map((item: any, index: number) => {
          const { type, data, id, draft } = item;
          if (draft) {
            return null;
          }
          const Component = typeToComponents.find(
            component => component.type === type
          )?.component;
          if (!Component) {
            return null;
          }
          return <Component key={id} data={data} />;
        })}
      </Page>
    </Document>
  );
};
