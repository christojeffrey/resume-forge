import { Text, View, Link } from "@react-pdf/renderer";
type ResumeLink = {
  title: string;
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
          <Link src={link.href}>{link.title}</Link>
        </Text>
      ))}
    </View>
  );
}
