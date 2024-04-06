// landing

import { Button } from "@/components/ui/button";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default async function Home() {
  // const data = await fetch(`${process.env.BASE_URL}/api/resume/testingID`);
  // const json = await data.json();
  // console.log(json);
  return (
    <main>
      authenticated!
      <Button>
        <LogoutLink>Sign out</LogoutLink>
      </Button>
    </main>
  );
}
