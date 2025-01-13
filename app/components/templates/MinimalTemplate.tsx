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

export function MinimalTemplate({ data, styles }: TemplateProps) {
  return (
    <div className="font-inter text-gray-900 bg-white min-h-full">
      {/* Header */}
      <header className="px-8 py-12 text-center">
        <h1
          className="text-4xl font-light tracking-wide"
          style={{ color: styles.colors.primary }}
        >
          {data.personalInfo.name}
        </h1>
        <div className="mt-3 text-sm tracking-wider space-x-3 text-gray-600">
          <span>{data.personalInfo.email}</span>
          <span>•</span>
          <span>{data.personalInfo.phone}</span>
          <span>•</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </header>

      {/* Content */}
      <main className="px-8 py-6 max-w-3xl mx-auto">
        {/* Experience */}
        <section className="mb-8">
          <h2
            className="text-sm font-semibold tracking-wider uppercase mb-4"
            style={{ color: styles.colors.secondary }}
          >
            Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <h3 className="font-medium">{exp.position}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {exp.company} | {exp.startDate} - {exp.endDate}
                </p>
                <p className="text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2
            className="text-sm font-semibold tracking-wider uppercase mb-4"
            style={{ color: styles.colors.secondary }}
          >
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm rounded-full"
                style={{
                  backgroundColor: styles.colors.primary + "10",
                  color: styles.colors.primary,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
