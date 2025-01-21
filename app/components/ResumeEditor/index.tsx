import type { ResumeData } from "~/types";
import { PersonalInfo } from "./PersonalInfo";
import { Experience } from "./Experience";
import { ProfessionalSummary } from "./ProfessionalSummary";
import { Education } from "./Education";
import { Skills } from "./Skills";
import { Links } from "./Links";

interface ResumeEditorProps {
  data: ResumeData;
}

export function ResumeEditor({ data }: ResumeEditorProps) {
  const updateSection = <K extends keyof ResumeData>(
    section: K,
    value: ResumeData[K]
  ) => {
    console.log(value);
  };

  return (
    <div className="space-y-6">
      <PersonalInfo data={data} />

      <Links data={data.links} />

      <ProfessionalSummary data={data.professionalSummary} />

      <Experience data={data.experience} onChange={() => {}} />

      <Education
        data={data.education}
        onChange={(value) => updateSection("education", value)}
      />

      <Skills
        data={data.skills}
        onChange={(value) => updateSection("skills", value)}
      />
    </div>
  );
}
