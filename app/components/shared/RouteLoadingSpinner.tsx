import { Loader2 } from "lucide-react";

export function RouteLoadingSpinner() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center min-h-[400px]">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  );
}
