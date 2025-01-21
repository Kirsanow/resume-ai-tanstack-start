import type { ResumeData } from "~/types";
import { Section } from "./Section";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { updateResume } from "~/server/resumes";
import { useParams } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface EducationProps {
  data: ResumeData["education"];
}

export function Education({ data = [] }: EducationProps) {
  const { resumeId } = useParams({ from: "/resumes/$resumeId/edit" });
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);

  const updateEducation = async (newEducation: ResumeData["education"]) => {
    await updateResume({
      data: {
        id: resumeId,
        data: {
          education: newEducation,
        },
      },
    });
    queryClient.invalidateQueries({ queryKey: ["resume", resumeId] });
  };

  const addEducation = async () => {
    setIsAdding(true);
    await updateEducation([
      ...data,
      {
        institution: "",
        degree: "",
        field: "",
        graduationDate: "",
      },
    ]);
    setIsAdding(false);
  };

  const updateEducationField = (
    index: number,
    field: keyof ResumeData["education"][number],
    value: string
  ) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    updateEducation(newData);
  };

  const removeEducation = (index: number) => {
    updateEducation(data.filter((_, i) => i !== index));
  };

  return (
    <Section title="Education">
      <div className="space-y-6">
        {data?.map((edu, index) => (
          <div key={index} className="pt-4 space-y-4 first:pt-0">
            {index > 0 && <hr className="border-border" />}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Education {index + 1}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeEducation(index)}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Institution</Label>
                <Input
                  className="mt-1"
                  placeholder="e.g. Stanford University"
                  defaultValue={edu?.institution || ""}
                  onChange={(e) =>
                    updateEducationField(index, "institution", e.target.value)
                  }
                />
              </div>
              <div>
                <Label className="text-muted-foreground">Degree</Label>
                <Input
                  className="mt-1"
                  placeholder="e.g. Bachelor of Science"
                  defaultValue={edu?.degree || ""}
                  onChange={(e) =>
                    updateEducationField(index, "degree", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Field of Study</Label>
                <Input
                  className="mt-1"
                  placeholder="e.g. Computer Science"
                  defaultValue={edu?.field || ""}
                  onChange={(e) =>
                    updateEducationField(index, "field", e.target.value)
                  }
                />
              </div>
              <div>
                <Label className="text-muted-foreground">Graduation Date</Label>
                <Input
                  className="mt-1"
                  placeholder="e.g. May 2023"
                  defaultValue={edu?.graduationDate || ""}
                  onChange={(e) =>
                    updateEducationField(
                      index,
                      "graduationDate",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          className="flex gap-2 justify-center items-center w-full"
          onClick={addEducation}
          disabled={isAdding}
        >
          {isAdding ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          Add Education
        </Button>
      </div>
    </Section>
  );
}
