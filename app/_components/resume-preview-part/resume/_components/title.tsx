import { Text } from "@react-pdf/renderer";

export default function ResumeTitle({ data }: { data: string }) {
  return (
    <>
      <Text style={{ fontSize: 14, textAlign: "center" }}>{data}</Text>
    </>
  );
}
