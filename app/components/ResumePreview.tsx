import type { ResumeData } from "~/types";
import type { Template } from "~/store/templates";
import { ModernTemplate } from "./templates/ModernTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
interface ResumePreviewProps {
  data: ResumeData;
  template: Template;
}

export function ResumePreview({ data, template }: ResumePreviewProps) {
  // Select template component based on layout
  const TemplateComponent = {
    modern: ModernTemplate,
    creative: CreativeTemplate,
    minimal: MinimalTemplate,
    classic: ClassicTemplate,
  }[template.layout];

  if (!TemplateComponent) {
    return <div>Template not found</div>;
  }

  return (
    <div className="w-full h-full">
      <TemplateComponent data={data} styles={{ colors: template.colors }} />
    </div>
  );
}
