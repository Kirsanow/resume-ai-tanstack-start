import type { ResumeData } from "~/types";
import { Section } from "./Section";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Bold,
  Italic,
  List,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
} from "lucide-react";
import { updateResume } from "~/server/resumes";
import { useParams } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useEffect, useState } from "react";

interface Props {
  data: ResumeData["professionalSummary"];
}

export function ProfessionalSummary({ data }: Props) {
  const { resumeId } = useParams({ from: "/resumes/$resumeId/edit" });
  const queryClient = useQueryClient();
  const [charCount, setCharCount] = useState(0);

  const updateField = async (value: string) => {
    await updateResume({
      data: {
        id: resumeId,
        data: {
          professionalSummary: value,
        },
      },
    });
    queryClient.invalidateQueries({ queryKey: ["resume", resumeId] });
  };

  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
  }, []);

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.innerHTML;
    updateField(content);
  };

  // Calculate character count on client-side only
  useEffect(() => {
    if (typeof window !== "undefined" && data) {
      const temp = document.createElement("div");
      temp.innerHTML = data;
      setCharCount(temp.textContent?.length || 0);
    }
  }, [data]);

  return (
    <Section title="Professional Summary">
      <div className="space-y-4">
        <div className="rounded-lg border bg-background">
          {/* Toolbar */}
          <div className="flex gap-1 items-center p-2 border-b">
            <div className="flex gap-1 items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => execCommand("bold")}
              >
                <Bold className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => execCommand("italic")}
              >
                <Italic className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const size = prompt("Enter font size (1-7):", "3");
                  if (size) execCommand("fontSize", size);
                }}
              >
                <Type className="w-4 h-4" />
              </Button>
            </div>
            <div className="mx-2 w-px h-6 bg-border" />
            <div className="flex gap-1 items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => execCommand("justifyLeft")}
              >
                <AlignLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => execCommand("justifyCenter")}
              >
                <AlignCenter className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => execCommand("justifyRight")}
              >
                <AlignRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="mx-2 w-px h-6 bg-border" />
            <div className="flex gap-1 items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => execCommand("insertUnorderedList")}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const url = prompt("Enter URL:", "https://");
                  if (url) execCommand("createLink", url);
                }}
              >
                <LinkIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Editor */}
          <div
            className="min-h-[200px] p-3 focus:outline-none"
            contentEditable
            dangerouslySetInnerHTML={{ __html: data || "" }}
            onInput={handleContentChange}
          />

          {/* Footer */}
          <div className="flex justify-between items-center p-2 border-t">
            <div className="text-sm text-muted-foreground">
              Recruiter tip: write 400-600 characters to increase interview
              chances
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-sm text-muted-foreground">
                {charCount} / 600
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
