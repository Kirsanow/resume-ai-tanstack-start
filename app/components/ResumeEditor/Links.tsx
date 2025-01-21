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

interface LinksProps {
  data: ResumeData["links"];
}

export function Links({ data = [] }: LinksProps) {
  const { resumeId } = useParams({ from: "/resumes/$resumeId/edit" });
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);

  const updateLinks = async (newLinks: ResumeData["links"]) => {
    await updateResume({
      data: {
        id: resumeId,
        data: {
          links: newLinks,
        },
      },
    });
    queryClient.invalidateQueries({ queryKey: ["resume", resumeId] });
  };

  const addLink = async () => {
    setIsAdding(true);
    await updateLinks([...data, { label: "", url: "" }]);
    setIsAdding(false);
  };

  const updateLink = (index: number, field: "label" | "url", value: string) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    updateLinks(newData);
  };

  const removeLink = (index: number) => {
    updateLinks(data.filter((_, i) => i !== index));
  };

  return (
    <Section title="Links">
      <div className="space-y-4">
        {data?.map((link, index) => (
          <div key={index} className="flex gap-4 items-end">
            <div className="flex-1">
              <Label className="text-muted-foreground">Label</Label>
              <Input
                className="mt-1"
                placeholder="e.g. LinkedIn, GitHub, Portfolio"
                defaultValue={link.label}
                onChange={(e) => updateLink(index, "label", e.target.value)}
              />
            </div>
            <div className="flex-[2]">
              <Label className="text-muted-foreground">URL</Label>
              <Input
                className="mt-1"
                type="url"
                placeholder="https://"
                defaultValue={link.url}
                onChange={(e) => updateLink(index, "url", e.target.value)}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeLink(index)}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}

        <Button
          variant="outline"
          className="flex gap-2 justify-center items-center w-full"
          onClick={addLink}
          disabled={isAdding}
        >
          {isAdding ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          Add Link
        </Button>
      </div>
    </Section>
  );
}
