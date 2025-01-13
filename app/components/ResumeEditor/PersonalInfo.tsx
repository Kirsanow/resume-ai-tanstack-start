import type { ResumeData } from "~/types";
import { Section } from "./Section";

interface PersonalInfoProps {
  data: ResumeData["personalInfo"];
  onChange: (data: ResumeData["personalInfo"]) => void;
}

export function PersonalInfo({ data, onChange }: PersonalInfoProps) {
  const updateField = (
    field: keyof ResumeData["personalInfo"],
    value: string
  ) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <Section title="Personal Information">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => updateField("location", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </Section>
  );
}
