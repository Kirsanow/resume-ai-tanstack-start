import { pdf } from "@react-pdf/renderer";
import type { ResumeData } from "~/types";
import type { Template } from "~/store/templates";

export async function generatePDF(data: ResumeData, template: Template) {
  // Create PDF-specific template component
  const PDFTemplate = await import(`~/components/templates/${template.layout}PDF`);
  
  // Generate PDF blob
  const blob = await pdf(
    <PDFTemplate.default data={data} styles={template.styles} />
  ).toBlob();
  
  return blob;
} 