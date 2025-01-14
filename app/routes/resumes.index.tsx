import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { createResume, getResumes } from "../server/resumes";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "~/components/ui/button";
import { Resume } from "~/types";
import { PlusCircle, FileText } from "lucide-react";

const resumesQueryOptions = {
  queryKey: ["resumes"] as const,
  queryFn: async (): Promise<Resume[]> => {
    return await getResumes();
  },
};

export const Route = createFileRoute("/resumes/")({
  loader: async ({ context }) => {
    const data = await context.queryClient.ensureQueryData(resumesQueryOptions);
    return { resumes: data };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { resumes } = Route.useLoaderData();
  const router = useRouter();
  const queryClient = useQueryClient();
  return (
    <div className="min-h-screen bg-gray-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              My Resumes
            </h1>
            <p className="text-muted-foreground">
              Manage and create your professional resumes
            </p>
          </div>
          <Button
            size="lg"
            className="flex items-center gap-2"
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
            <PlusCircle className="w-5 h-5" />
            Create New Resume
          </Button>
        </div>

        {resumes.length === 0 ? (
          <div className="bg-card rounded-xl shadow-xs border border-border p-12">
            <div className="text-center max-w-md mx-auto">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No resumes yet
              </h3>
              <p className="text-muted-foreground mb-6">
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
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume: Resume) => (
              <Link
                key={resume.id}
                to="/resumes/$resumeId/edit"
                params={{ resumeId: resume.id }}
                className="group block"
              >
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 hover:border-blue-100">
                  <div className="flex items-start justify-between mb-4">
                    <FileText className="w-6 h-6 text-blue-500" />
                    <span className="text-sm text-gray-400">
                      Resume #{resume.id}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    View and Edit Resume
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Last modified: Recently
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
