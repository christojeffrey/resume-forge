import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  return (
    <>
      <nav className="border-2 border-black">
        <Button>
          <LogoutLink>Sign out</LogoutLink>
        </Button>
      </nav>
    </>
  );
}
