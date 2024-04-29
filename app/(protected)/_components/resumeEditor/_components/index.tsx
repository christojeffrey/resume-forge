import Divider from "./Divider";
import Heading from "./Heading";
import Item from "./Item";
import Links from "./Links";
import Title from "./Title";

export const typeToComponents = [
  { type: "title", component: Title },
  { type: "links", component: Links },
  { type: "heading", component: Heading },
  { type: "item", component: Item },
  { type: "divider", component: Divider },
];
