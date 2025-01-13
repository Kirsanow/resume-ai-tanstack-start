import type { ResumeData } from "~/types";

interface TemplateProps {
  data: ResumeData;
  styles: {
    colors: {
      primary: string;
      secondary: string;
      text: string;
      background: string;
    };
  };
}

export function CreativeTemplate({ data, styles }: TemplateProps) {
  return (
    <div
      className="min-h-full p-12 font-sans"
      style={{ backgroundColor: styles.colors.background }}
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-12">
        <div className="max-w-2xl">
          <h1
            className="text-5xl font-bold mb-4"
            style={{ color: styles.colors.primary }}
          >
            {data.personalInfo.name}
          </h1>
          <div
            className="flex items-center gap-6 text-sm"
            style={{ color: styles.colors.text }}
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>{data.personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>{data.personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{data.personalInfo.location}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-12">
        {/* Skills Section */}
        <div className="col-span-4">
          <div
            className="p-6 rounded-lg"
            style={{ backgroundColor: styles.colors.primary + "10" }}
          >
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: styles.colors.primary }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    backgroundColor: styles.colors.secondary + "20",
                    color: styles.colors.text,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="col-span-8">
          <h2
            className="text-2xl font-bold mb-8"
            style={{ color: styles.colors.primary }}
          >
            Professional Experience
          </h2>
          <div className="space-y-8">
            {data.experience.map((exp, i) => (
              <div
                key={i}
                className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px"
                style={{
                  borderColor: styles.colors.secondary,
                  ["--tw-before-bg-opacity"]: "0.2",
                  ["--before-background-color"]: styles.colors.primary,
                }}
              >
                <div className="mb-2">
                  <h3
                    className="text-xl font-bold"
                    style={{ color: styles.colors.primary }}
                  >
                    {exp.position}
                  </h3>
                  <p
                    className="text-lg"
                    style={{ color: styles.colors.secondary }}
                  >
                    {exp.company}
                  </p>
                </div>
                <p className="text-sm mb-3 opacity-75">
                  {exp.startDate} - {exp.endDate}
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: styles.colors.text }}
                >
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
