import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { createResume, getResumes } from "../server/resumes";
import { useQueryClient } from "@tanstack/react-query";

const resumesQueryOptions = {
  queryKey: ["resumes"],
  queryFn: async () => {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Resumes ({resumes.length})
          </h1>
          <button
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
            onClick={async () => {
              const resume = await createResume();
              queryClient.setQueryData(
                ["resumes"],
                (old: typeof resumes = []) => {
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
            Create New Resume
          </button>
        </div>
        {resumes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">
              No resumes yet. Create your first one!
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <Link
                  to="/resumes/$resumeId/edit"
                  params={{ resumeId: resume.id }}
                >
                  Resume #{resume.id}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
