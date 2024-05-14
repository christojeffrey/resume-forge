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
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAtom } from "jotai";
import { isAuthenticatedAtom, modeAtom, userAtom } from "@/store";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function NavBar() {
  const [user] = useAtom(userAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [mode, setMode] = useAtom(modeAtom);
  console.log("user", user);
  return (
    <>
      <nav className="flex justify-between items-center w-3/4 mx-auto my-2">
        <div className="font-bold">Resume Forge</div>
        <div className="flex gap-6">
          {/* mode */}
          <div className="hidden xl:block">
            <Select
              onValueChange={value => {
                console.log("value", value);
                setMode(value as "edit" | "view");
              }}
              defaultValue={mode}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="view">View</SelectItem>
                <SelectItem value="edit">AI Edit</SelectItem>
              </SelectContent>
            </Select>
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
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </LogoutLink>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              {/* login sign in */}
              <LoginLink>
                <Button variant="outline">Sign in</Button>
              </LoginLink>
              <RegisterLink>
                <Button>Sign up</Button>
              </RegisterLink>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
