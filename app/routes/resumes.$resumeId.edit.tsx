import { createFileRoute, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Document, Page, PDFViewer } from "@react-pdf/renderer";
import { ResumeForm } from "~/components/ResumeForm";
import { ResumePDFTemplate } from "~/components/ResumePDFTemplate";
import type { ResumeData } from "~/types";

export const Route = createFileRoute("/resumes/$resumeId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { resumeId } = useParams({ from: Route.id });
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
    },
    experience: [],
    education: [],
    skills: [],
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Form Section - Left Side */}
      <div className="w-1/2 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Edit Resume #{resumeId}
        </h1>
        <ResumeForm data={resumeData} onChange={setResumeData} />
      </div>

      {/* Preview Section - Right Side */}
      <div className="w-1/2 p-6 bg-gray-100">
        <div className="h-full rounded-lg shadow-lg">
          <PDFViewer width="100%" height="100%">
            <Document>
              <ResumePDFTemplate data={resumeData} />
            </Document>
          </PDFViewer>
        </div>
      </div>
    </div>
  );
}
