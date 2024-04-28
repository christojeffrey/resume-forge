import Title from "./Title";


const Links = ({ data }: any) => {
  return (
    <div>
      {data.map((link: any, index: number) => (
        <a href={link.href} key={index}>
          {link.text}
        </a>
      ))}
    </div>
  );
};

const Heading = ({ data }: any) => {
  return <h2>{data}</h2>;
};

const Item = ({ data }: any) => {
  return (
    <div>
      <h3>{data.title}</h3>
      <h4>{data.subtitle}</h4>
      <p>{data.date}</p>
      <p>{data.moreInformation}</p>
      <ul>
        {data.details.map((detail: string, index: number) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
    </div>
  );
};
const Divider = () => {
  return <hr />;
};
export const typeToComponents = [
  { type: "title", component: Title },
  { type: "links", component: Links },
  { type: "heading", component: Heading },
  { type: "item", component: Item },
  { type: "divider", component: Divider },
];
