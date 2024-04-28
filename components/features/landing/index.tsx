import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { Spotlight } from "@/components/ui/spotlight";
export default function Page() {
  return (
    <>
      <div className="flex-col h-screen w-full flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <FloatingNav
          navItems={[
            { name: "Home", link: "/" },
            { name: "About", link: "/about" },
            { name: "Contact", link: "/contact" },
          ]}
        />
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Resume Forge
          </h1>
          <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
            Create your resume with ease
          </p>
        </div>
        <div className="flex gap-2 m-4">
          <Button>
            <LoginLink>Sign in</LoginLink>
          </Button>
          <Button>
            <RegisterLink>Sign up</RegisterLink>
          </Button>
        </div>
      </div>
    </>
  );
}
