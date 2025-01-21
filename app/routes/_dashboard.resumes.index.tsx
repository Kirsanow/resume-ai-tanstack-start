import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { createResume, deleteResume, getResumes } from "../server/resumes";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "~/components/ui/button";
import { Resume } from "~/types";
import {
  PlusCircle,
  FileText,
  Trash2,
  Download,
  Home,
  Wifi,
  MoreHorizontal,
  Heart,
} from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

const resumesQueryOptions = {
  queryKey: ["resumes"] as const,
  queryFn: async (): Promise<Resume[]> => {
    return await getResumes();
  },
};

export const Route = createFileRoute("/_dashboard/resumes/")({
  loader: async ({ context }) => {
    context.queryClient.ensureQueryData(resumesQueryOptions);
    // return { resumes: data };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data: resumes } = useSuspenseQuery(resumesQueryOptions);
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <div className="min-h-screen">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              My Resumes
            </h1>
            <p className="text-muted-foreground">
              Manage and create your professional resumes
            </p>
          </div>
          <Button
            className="flex gap-2 items-center"
            onClick={async () => {
              const resume = await createResume();
              queryClient.setQueryData(["resumes"], (old: Resume[] = []) => {
                return [...old, resume];
              });
              router.navigate({
                to: "/resumes/$resumeId/edit",
                params: {
                  resumeId: resume.id,
                },
              });
            }}
          >
            <PlusCircle className="w-4 h-4" />
            Create New
          </Button>
        </div>

        {resumes.length === 0 ? (
          <Card className="p-12">
            <div className="mx-auto max-w-md text-center">
              <FileText className="mx-auto mb-4 w-12 h-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                No resumes yet
              </h3>
              <p className="mb-6 text-muted-foreground">
                Create your first resume and start your professional journey
              </p>
              <Button
                onClick={async () => {
                  const resume = await createResume();
                  queryClient.setQueryData(
                    ["resumes"],
                    (old: Resume[] = []) => {
                      return [...old, resume];
                    }
                  );
                  router.navigate({
                    to: "/resumes/$resumeId/edit",
                    params: {
                      resumeId: resume.id,
                    },
                  });
                }}
              >
                Create Your First Resume
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {resumes.map((resume: Resume) => (
              <Card key={resume.id} className="overflow-hidden relative group">
                <CardContent className="flex p-0">
                  <Link
                    to="/resumes/$resumeId/edit"
                    params={{ resumeId: resume.id }}
                    className="w-[200px] shrink-0"
                  >
                    <div className="relative h-full bg-navy-900">
                      {/* Preview would go here */}
                      <div className="flex absolute inset-0 justify-center items-center">
                        <FileText className="w-12 h-12 text-white/50" />
                      </div>
                    </div>
                  </Link>

                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-medium">
                          {resume?.title || "Untitled resume"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Updated 13 January, 15:47
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <FileText className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-1 items-center mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        4.9 resume score
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="flex gap-2 justify-start items-center"
                      >
                        Download PDF
                      </Button>
                      <Button
                        variant="outline"
                        className="flex gap-2 justify-start items-center"
                      >
                        Export to docx
                      </Button>
                      <Button
                        variant="outline"
                        className="flex gap-2 justify-start items-center"
                      >
                        Wi-Fi
                      </Button>
                      <Button
                        variant="outline"
                        className="flex gap-2 justify-start items-center"
                      >
                        More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
