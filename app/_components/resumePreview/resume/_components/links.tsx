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
        <Text key={index} style={{ margin: 1 }}>
          <Link src={link.href}>{link.text}</Link>
        </Text>
      ))}
    </View>
  );
}
