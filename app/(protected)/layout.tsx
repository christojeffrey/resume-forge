import NavBar from "./_components/navbar";
import { Separator } from "@/components/ui/separator";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <NavBar />
      <Separator />
      <div className="flex-1">{children}</div>
    </div>
  );
}
