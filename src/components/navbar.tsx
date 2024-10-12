import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "./ui/button";
import ThemeSwitch from "./theme-switch";
import SignInButton from "./sign-in-button";
import SignOutButton from "./sign-out-button";

export default function NavBar({ user }: { user: any }) {
  return (
    <NavigationMenu className="w-full max-w-full">
      <NavigationMenuList className="w-lvw justify-between p-2 border-b border-b-stone-300">
        <NavigationMenuItem>
          <NavigationMenuLink href="/" asChild>
            <Link href={user ? "/dashboard" : "/"} title="Home">
              <Button variant="ghost" className="text-xl">
                MemoryVault
              </Button>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="flex gap-2 justify-center items-center">
         
          {user ? (
            <>
              <span className="mr-2">Hello, {user?.user?.name}</span>
              <SignOutButton />
            </>
          ) : (
            <SignInButton />
          )}
           <ThemeSwitch />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
