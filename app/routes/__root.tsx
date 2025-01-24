// app/routes/__root.tsx
import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";
import { lazy, Suspense, type ReactNode } from "react";
import { NotFound } from "../components/not-found";
import { DefaultCatchBoundary } from "../components/dafault-catch-boundary";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import appCss from "../styles/globals.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  ssr: true,
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}
const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body className="h-full">
        {children}
        <ScrollRestoration />
        {process.env.NODE_ENV === "development" && (
          <>
            <Suspense fallback={null}>
              <ReactQueryDevtools buttonPosition="bottom-left" />
            </Suspense>
            <Suspense fallback={null}>
              <TanStackRouterDevtools position="bottom-right" />
            </Suspense>
          </>
        )}
        <Scripts />
        {/* <Toaster /> */}
      </body>
    </html>
  );
}
