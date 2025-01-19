// app/routes/index.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
4;
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/login">
        <Button>Login</Button>
      </Link>
    </div>
  );
}
