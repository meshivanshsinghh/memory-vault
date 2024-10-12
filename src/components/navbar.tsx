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
            <Link href="/" title="Home">
              <Button variant="ghost" className="text-xl">
                MemoryVault
              </Button>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="flex gap-2 justify-center items-center">
          {user ? (
            <>
              <Link href={user ? "/all-vaults" : "/"} title="Home">
                <Button variant="default" className="text-base">
                  Dashboard
                </Button>
              </Link>
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
