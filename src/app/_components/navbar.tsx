"use client";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { useAtom } from "jotai";
import {
  isAuthenticatedAtom,
  mixPanelAtom,
  modeAtom,
  userAtom,
} from "@/src/store";
import { Button } from "@/src/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";

import { Bot } from "lucide-react";
export default function NavBar() {
  const [user] = useAtom(userAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [mode, setMode] = useAtom(modeAtom);
  const [mixPanel] = useAtom(mixPanelAtom);
  console.log("user", user);
  return (
    <div className="w-full">
      <nav className="flex justify-between items-center w-full xl:w-3/4 xl:mx-auto my-2">
        <div className="font-bold">Resume Forge</div>
        <div className="flex gap-6">
          {/* mode */}
          <div className="hidden xl:block">
            <div className="">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Bot
                      size={36}
                      className={`cursor-pointer ${
                        mode === "edit" ? "text-blue-500" : "text-gray-500"
                      }`}
                      onClick={() => {
                        mixPanel.track("AI Mode", {
                          distinct_id: user?.id,
                        });
                        setMode(mode === "edit" ? "view" : "edit");
                      }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    {mode === "edit" ? "Disable AI Edit" : "Enable AI Edit"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={user?.picture || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user?.email || "User"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <LogoutLink>
                  <DropdownMenuItem
                    onClick={() => {
                      localStorage.removeItem("resumesData");
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </LogoutLink>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              {/* login sign in */}
              <LoginLink>
                <Button
                  variant="outline"
                  onClick={() => {
                    mixPanel.track("Sign In", {
                      distinct_id: user?.id,
                      "Sign In Method": "Nav Bar Button Click",
                    });
                  }}
                >
                  Sign in
                </Button>
              </LoginLink>
              <RegisterLink>
                <Button>Sign up</Button>
              </RegisterLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
