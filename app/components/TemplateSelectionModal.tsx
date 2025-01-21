import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { useTemplatesStore } from "~/store/templates";
import { cn } from "~/utils";
import { Check } from "lucide-react";

interface TemplateSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TemplateSelectionModal({
  open,
  onOpenChange,
}: TemplateSelectionModalProps) {
  const { templates, activeTemplate, setActiveTemplate } = useTemplatesStore();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Choose a Template</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 p-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={cn(
                "relative overflow-hidden aspect-[210/297] rounded-lg border-2 cursor-pointer transition-all hover:border-primary",
                activeTemplate === template.id
                  ? "border-primary ring-2 ring-primary ring-offset-2"
                  : "border-muted"
              )}
              onClick={() => {
                setActiveTemplate(template.id);
                onOpenChange(false);
              }}
            >
              {/* Template Preview */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: template.colors.background,
                }}
              >
                {/* Mock content to show template style */}
                <div className="p-4">
                  <div
                    className="mb-4 w-full h-8 rounded"
                    style={{ backgroundColor: template.colors.primary }}
                  />
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-full h-2 rounded"
                        style={{ backgroundColor: template.colors.secondary }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Template Name & Selected Indicator */}
              <div className="absolute right-0 bottom-0 left-0 p-2 backdrop-blur-sm bg-background/90">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium capitalize">
                    {template.layout}
                  </span>
                  {activeTemplate === template.id && (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
