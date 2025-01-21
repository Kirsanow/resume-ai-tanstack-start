import type { ResumeData } from "~/types";
import { Section } from "./Section";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { updateResume } from "~/server/resumes";
import { useParams } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface SkillsProps {
  data: ResumeData["skills"];
}

export function Skills({ data = [] }: SkillsProps) {
  const { resumeId } = useParams({ from: "/resumes/$resumeId/edit" });
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);

  const updateSkills = async (newSkills: ResumeData["skills"]) => {
    await updateResume({
      data: {
        id: resumeId,
        data: {
          skills: newSkills,
        },
      },
    });
    queryClient.invalidateQueries({ queryKey: ["resume", resumeId] });
  };

  const addSkill = async () => {
    setIsAdding(true);
    await updateSkills([
      ...data,
      { name: "", level: "Intermediate", category: "" },
    ]);
    setIsAdding(false);
  };

  const updateSkillField = (
    index: number,
    field: keyof ResumeData["skills"][number],
    value: string
  ) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    updateSkills(newData);
  };

  const removeSkill = (index: number) => {
    updateSkills(data.filter((_, i) => i !== index));
  };

  const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  return (
    <Section title="Skills">
      <div className="space-y-4">
        {data.map((skill, index) => (
          <div key={index} className="flex gap-4 items-end">
            <div className="flex-[2]">
              <Label className="text-muted-foreground">Skill</Label>
              <Input
                className="mt-1"
                placeholder="e.g. JavaScript, Project Management"
                defaultValue={skill?.name || ""}
                onChange={(e) =>
                  updateSkillField(index, "name", e.target.value)
                }
              />
            </div>
            <div className="flex-1">
              <Label className="text-muted-foreground">Level</Label>
              <select
                className="px-3 py-2 mt-1 w-full h-10 text-sm rounded-md border border-input bg-background ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                defaultValue={skill?.level || ""}
                onChange={(e) =>
                  updateSkillField(index, "level", e.target.value)
                }
              >
                {skillLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <Label className="text-muted-foreground">Category</Label>
              <Input
                className="mt-1"
                placeholder="e.g. Technical"
                defaultValue={skill?.category || ""}
                onChange={(e) =>
                  updateSkillField(index, "category", e.target.value)
                }
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeSkill(index)}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}

        <Button
          variant="outline"
          className="flex gap-2 justify-center items-center w-full"
          onClick={addSkill}
          disabled={isAdding}
        >
          {isAdding ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          Add Skill
        </Button>

        {data.length > 0 && (
          <div className="pt-4">
            <Label className="block mb-2 text-muted-foreground">Preview</Label>
            <div className="flex flex-wrap gap-2">
              {data.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs font-normal"
                >
                  {skill.name}
                  {skill.level && (
                    <span className="ml-1 opacity-50">• {skill.level}</span>
                  )}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
