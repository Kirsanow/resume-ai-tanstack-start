import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { PreviewControls } from "~/components/PreviewControls";
import { ResumeEditor } from "~/components/ResumeEditor";
import { ResumePreview } from "~/components/ResumePreview";
import { TemplateSelector } from "~/components/TemplateSelector";
import { Button } from "~/components/ui/button";
import { useTemplatesStore } from "~/store/templates";
import type { ResumeData } from "~/types";

export const Route = createFileRoute("/resumes/$resumeId/edit")({
  component: EditResumePage,
});

const DEFAULT_RESUME_DATA: ResumeData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
  },
  experience: [],
  education: [],
  skills: [],
};

function EditResumePage() {
  const { resumeId } = useParams({ from: Route.id });
  const { templates, activeTemplate } = useTemplatesStore();
  const [resumeData, setResumeData] = useState<ResumeData>(DEFAULT_RESUME_DATA);

  // Find the currently selected template
  const selectedTemplate = templates.find((t) => t.id === activeTemplate);
  if (!selectedTemplate) {
    return <div>Template not found</div>;
  }

  return (
    <main className="h-screen bg-gray-50">
      {/* Main Layout - Split Screen */}
      <div className="flex h-full">
        {/* Left Panel - Resume Editor */}
        <div className="overflow-y-auto p-6 w-1/2 bg-white">
          <Link to="/resumes">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4" />
              Go back
            </Button>
          </Link>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-center text-foreground">
              Untitled resume
            </h1>
            <p className="text-sm text-center text-muted-foreground/70">
              Last edited on {new Date().toLocaleDateString()}
            </p>
          </div>

          <ResumeEditor data={resumeData} onChange={setResumeData} />
        </div>

        {/* Right Panel - Preview */}
        <div className="w-1/2">
          <div className="flex flex-col p-6 h-full">
            {/* Preview Controls */}
            <div className="flex justify-between items-center mb-4">
              <TemplateSelector />
              <PreviewControls />
            </div>

            {/* Resume Preview */}
            <div className="overflow-hidden flex-1 bg-white rounded-lg shadow-lg">
              <ResumePreview data={resumeData} template={selectedTemplate} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
