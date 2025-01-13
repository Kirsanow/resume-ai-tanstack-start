// app/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
4;
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
