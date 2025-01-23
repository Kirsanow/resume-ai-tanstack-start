// app/routes/index.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import Hero from "~/components/marketing/Hero";
import LogoClouds from "~/components/marketing/LogoClouds";
import WithLargeScreenshot from "~/components/marketing/WithLargeScreenshot";
import { Button } from "~/components/ui/button";
4;
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main>
      <WithLargeScreenshot />
    </main>
  );
}
