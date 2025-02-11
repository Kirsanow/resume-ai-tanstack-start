import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/_dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const headerItems = [
    {
      label: "Resumes",
      to: "/resumes",
    },
    {
      label: "Templates",
      to: "/templates",
    },
  ];
  return (
    <>
      <header className="flex sticky top-0 z-10 gap-2 items-center px-[100px] py-4 border-b border-border-muted bg-background">
        <Link
          className="mr-4 text-xl font-bold tracking-tight text-primary"
          to="/"
        >
          Resumix
        </Link>
        {headerItems.map((item) => (
          <Link
            key={item.label}
            className="px-4 py-2 font-semibold rounded-md hover:bg-border-muted text-muted-foreground"
            to={item.to}
            activeProps={{
              className: "bg-border-muted text-secondary-foreground",
            }}
          >
            {item.label}
          </Link>
        ))}
        <div className="flex-1"></div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </>
  );
}
