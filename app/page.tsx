import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default async function Home() {
  const data = await fetch(`${process.env.BASE_URL}/api/resume/testingID`);
  const json = await data.json();
  console.log(json);
  return (
    <main>
      <LoginLink>Sign in</LoginLink>
      <RegisterLink>Sign up</RegisterLink>
    </main>
  );
}
