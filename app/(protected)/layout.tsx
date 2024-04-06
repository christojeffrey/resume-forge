import { redirect } from "next/navigation";
import { getKindeServerSession, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Button>
        <LogoutLink>Sign out</LogoutLink>
      </Button>
      {children}
    </>
  );
}
