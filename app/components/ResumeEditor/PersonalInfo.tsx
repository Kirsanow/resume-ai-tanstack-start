import type { ResumeData } from "~/types";
import { Section } from "./Section";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { updateResume } from "~/server/resumes";
import { useParams } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

interface PersonalInfoProps {
  data: ResumeData;
}

export function PersonalInfo({ data }: PersonalInfoProps) {
  const { resumeId } = useParams({ from: "/resumes/$resumeId/edit" });
  const queryClient = useQueryClient();

  const updatePersonalInfo = async (
    field: keyof ResumeData["personalInfo"],
    value: string
  ) => {
    await updateResume({
      data: {
        id: resumeId,
        data: {
          personalInfo: {
            ...data.personalInfo,
            [field]: value,
          },
        },
      },
    });
    queryClient.invalidateQueries({ queryKey: ["resume", resumeId] });
  };

  return (
    <Section title="Personal Information">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-muted-foreground">Name</Label>
            <Input
              className="mt-1"
              type="text"
              defaultValue={data?.personalInfo?.name || ""}
              onChange={(e) => updatePersonalInfo("name", e.target.value)}
            />
          </div>

          <div>
            <Label className="text-muted-foreground">Email</Label>
            <Input
              className="mt-1"
              type="email"
              defaultValue={data?.personalInfo?.email || ""}
              onChange={(e) => updatePersonalInfo("email", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-muted-foreground">Phone</Label>
            <Input
              className="mt-1"
              type="tel"
              defaultValue={data?.personalInfo?.phone || ""}
              onChange={(e) => updatePersonalInfo("phone", e.target.value)}
            />
          </div>

          <div>
            <Label className="text-muted-foreground">Location</Label>
            <Input
              className="mt-1"
              type="text"
              defaultValue={data?.personalInfo?.location || ""}
              onChange={(e) => updatePersonalInfo("location", e.target.value)}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
