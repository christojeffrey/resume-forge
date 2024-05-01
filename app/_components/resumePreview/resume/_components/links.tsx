import { Text, View, Link } from "@react-pdf/renderer";
type ResumeLink = {
  text: string;
  href: string;
};
export default function ResumeLinks({ data }: { data: ResumeLink[] }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {data.map((link, index) => (
        <Link
          key={index}
          src={link.href}
          style={{ margin: 1, textDecoration: "underline", color: "black" }}
        >
          {link.text}
        </Link>
      ))}
    </View>
  );
}
