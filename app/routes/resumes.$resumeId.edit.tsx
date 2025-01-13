import { createFileRoute, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { PreviewControls } from "~/components/PreviewControls";
import { ResumeEditor } from "~/components/ResumeEditor";
import { ResumePreview } from "~/components/ResumePreview";
import { TemplateSelector } from "~/components/TemplateSelector";
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
        <div className="w-1/2 p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Edit Resume #{resumeId}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Fill in your details below and see them update in real-time.
            </p>
          </div>

          <ResumeEditor data={resumeData} onChange={setResumeData} />
        </div>

        {/* Right Panel - Preview */}
        <div className="w-1/2 bg-gray-100">
          <div className="p-6 h-full flex flex-col">
            {/* Preview Controls */}
            <div className="flex items-center justify-between mb-4">
              <TemplateSelector />
              <PreviewControls />
            </div>

            {/* Resume Preview */}
            <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden">
              <ResumePreview data={resumeData} template={selectedTemplate} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
