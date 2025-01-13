import type { ResumeData } from "~/types";
import { PersonalInfo } from "./PersonalInfo";
import { Experience } from "./Experience";
// import { Education } from "./Education";
// import { Skills } from "./Skills";

interface ResumeEditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export function ResumeEditor({ data, onChange }: ResumeEditorProps) {
  const updateSection = <K extends keyof ResumeData>(
    section: K,
    value: ResumeData[K]
  ) => {
    onChange({
      ...data,
      [section]: value,
    });
  };

  return (
    <div className="space-y-6">
      <PersonalInfo
        data={data.personalInfo}
        onChange={(value) => updateSection("personalInfo", value)}
      />

      <Experience
        data={data.experience}
        onChange={(value) => updateSection("experience", value)}
      />

      {/* <Education
        data={data.education}
        onChange={(value) => updateSection("education", value)}
      />

      <Skills
        data={data.skills}
        onChange={(value) => updateSection("skills", value)}
      /> */}
    </div>
  );
}
