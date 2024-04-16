import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
export default function Page() {
  return (
    <main>
      landing
      <Button>




        <LoginLink>Sign in</LoginLink>
      </Button>




      
      <Button>
        <RegisterLink>Sign up</RegisterLink>
      </Button>
    </main>
  );
}
