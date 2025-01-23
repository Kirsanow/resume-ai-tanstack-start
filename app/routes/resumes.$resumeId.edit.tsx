import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  PencilIcon,
  Check,
  Loader2,
  GalleryVerticalEnd,
} from "lucide-react";
import { useState } from "react";
import { PreviewControls } from "~/components/PreviewControls";
import { ResumeEditor } from "~/components/ResumeEditor";
import { ResumePreview } from "~/components/ResumePreview";
import { TemplateSelectionModal } from "~/components/TemplateSelectionModal";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { getResume, updateResume } from "~/server/resumes";
import { useTemplatesStore } from "~/store/templates";
import type { ResumeData } from "~/types";
import { format } from "date-fns";

export const Route = createFileRoute("/resumes/$resumeId/edit")({
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(
      queryOptions({
        queryKey: ["resume", params.resumeId],
        queryFn: () => getResume({ data: params.resumeId }),
      })
    ),
  component: EditResumePage,
});

// const useResumeData = (initialData?: ResumeData) => {
//   const [resumeData, setResumeData] = useState<ResumeData>(
//     initialData ?? {
//       personalInfo: {
//         name: "",
//         email: "",
//         phone: "",
//         location: "",
//       },
//       professionalSummary: "",
//       links: [],
//       experience: [],
//       education: [],
//       skills: [],
//     }
//   );

//   return {
//     resumeData,
//     setResumeData,
//   };
// };
function EditResumePage() {
  const { resumeId } = useParams({ from: Route.id });
  const { data: resume } = useSuspenseQuery({
    queryKey: ["resume", resumeId],
    queryFn: async () => await getResume({ data: resumeId }),
  });
  const { templates, activeTemplate } = useTemplatesStore();
  const queryClient = useQueryClient();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(resume?.title || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  const handleTitleSubmit = async () => {
    setIsSaving(true);
    await updateResume({
      data: {
        id: resumeId,
        title: titleValue,
        data: {},
      },
    });
    queryClient.invalidateQueries({ queryKey: ["resume", resumeId] });
    setIsEditingTitle(false);
    setIsSaving(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTitleSubmit();
    } else if (e.key === "Escape") {
      setTitleValue(resume?.title || "");
      setIsEditingTitle(false);
    }
  };

  // Find the currently selected template
  const selectedTemplate = templates.find((t) => t.id === activeTemplate);
  if (!selectedTemplate) {
    return <div>Template not found</div>;
  }

  return (
    <main className="h-screen bg-gray-50">
      <TemplateSelectionModal
        open={isTemplateModalOpen}
        onOpenChange={setIsTemplateModalOpen}
      />
      {/* Main Layout - Split Screen */}
      <div className="flex h-full">
        {/* Left Panel - Resume Editor */}
        <div className="overflow-y-auto p-6 w-1/2 bg-white">
          <div className="flex justify-between mb-4">
            <Link to="/resumes">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4" />
                Go back
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => setIsTemplateModalOpen(true)}
              className="flex gap-2 items-center"
            >
              <GalleryVerticalEnd className="w-4 h-4" />
              Templates
            </Button>
          </div>
          <div className="mb-6">
            <div className="relative group">
              {isEditingTitle ? (
                <div className="flex gap-2 justify-center items-center">
                  <Input
                    value={titleValue}
                    onChange={(e) => setTitleValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-auto text-2xl font-semibold text-center"
                    autoFocus
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleTitleSubmit}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              ) : (
                <h1
                  className="text-2xl font-semibold text-center cursor-pointer text-foreground group-hover:underline"
                  onClick={() => {
                    setIsEditingTitle(true);
                    setTitleValue(resume?.title || "");
                  }}
                >
                  {resume?.title || "Untitled resume"}
                  <span className="absolute top-1/2 ml-2 opacity-0 -translate-y-1/2 group-hover:opacity-100">
                    <PencilIcon className="w-4 h-4 text-muted-foreground" />
                  </span>
                </h1>
              )}
            </div>
            <p className="text-sm text-center text-muted-foreground/70">
              Last edited on{" "}
              {format(resume?.updated_at, "MMM d, yyyy") || "N/A"}
            </p>
          </div>

          <ResumeEditor data={resume.content} />
        </div>

        {/* Right Panel - Preview */}
        <div className="w-1/2">
          <div className="flex flex-col p-6 h-full">
            {/* Preview Controls */}
            {/* <div className="flex justify-between items-center mb-4">
              <PreviewControls />
            </div> */}

            {/* Resume Preview */}
            <div className="overflow-hidden flex-1 bg-white rounded-lg shadow-lg">
              <ResumePreview
                data={resume.content}
                template={selectedTemplate}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
