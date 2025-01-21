import { Database } from "./supabase";

export type { Database } from "./supabase";

export type Resume = Database["public"]["Tables"]["resumes"]["Row"];

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;

  professionalSummary: string;
  links: Array<{
    label: string;
    url: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    graduationDate: string;
  }>;
  skills: Array<{
    name: string;
    level: string;
    category: string;
  }>;
}
