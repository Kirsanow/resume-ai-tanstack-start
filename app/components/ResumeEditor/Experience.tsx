import type { ResumeData } from "~/types";
import { Section } from "./Section";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { updateResume } from "~/server/resumes";
import { useParams } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface ExperienceProps {
  data: ResumeData["experience"];
}

export function Experience({ data = [] }: ExperienceProps) {
  const { resumeId } = useParams({ from: "/resumes/$resumeId/edit" });
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);

  const updateExperience = async (newExperience: ResumeData["experience"]) => {
    await updateResume({
      data: {
        id: resumeId,
        data: {
          experience: newExperience,
        },
      },
    });
    queryClient.invalidateQueries({ queryKey: ["resume", resumeId] });
  };

  const addExperience = async () => {
    setIsAdding(true);
    await updateExperience([
      ...data,
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
    setIsAdding(false);
  };

  const updateExperienceField = (
    index: number,
    field: string,
    value: string
  ) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      [field]: value,
    };
    updateExperience(newData);
  };

  const removeExperience = (index: number) => {
    updateExperience(data.filter((_, i) => i !== index));
  };

  return (
    <Section title="Experience">
      <div className="space-y-6">
        {data?.map((exp, index) => (
          <div key={index} className="pt-4 space-y-4 first:pt-0">
            {index > 0 && <hr className="border-gray-200" />}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Position {index + 1}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(index)}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Company</Label>
                <Input
                  className="mt-1"
                  type="text"
                  defaultValue={exp?.company || ""}
                  onChange={(e) =>
                    updateExperienceField(index, "company", e.target.value)
                  }
                />
              </div>
              <div>
                <Label className="text-muted-foreground">Position</Label>
                <Input
                  className="mt-1"
                  type="text"
                  defaultValue={exp?.position || ""}
                  onChange={(e) =>
                    updateExperienceField(index, "position", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Start Date</Label>
                <Input
                  className="mt-1"
                  type="text"
                  defaultValue={exp?.startDate || ""}
                  onChange={(e) =>
                    updateExperienceField(index, "startDate", e.target.value)
                  }
                />
              </div>
              <div>
                <Label className="text-muted-foreground">End Date</Label>
                <Input
                  className="mt-1"
                  type="text"
                  defaultValue={exp?.endDate || ""}
                  onChange={(e) =>
                    updateExperienceField(index, "endDate", e.target.value)
                  }
                />
              </div>
            </div>

            <div>
              <Label className="text-muted-foreground">Description</Label>
              <Textarea
                className="mt-1"
                defaultValue={exp?.description || ""}
                onChange={(e) =>
                  updateExperienceField(index, "description", e.target.value)
                }
                rows={3}
              />
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          className="flex gap-2 justify-center items-center w-full"
          onClick={addExperience}
          disabled={isAdding}
        >
          {isAdding ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          Add Experience
        </Button>
      </div>
    </Section>
  );
}
