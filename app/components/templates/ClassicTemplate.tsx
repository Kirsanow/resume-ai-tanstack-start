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

export function ClassicTemplate({ data, styles }: TemplateProps) {
  return (
    <div
      className="font-serif min-h-full p-8"
      style={{ backgroundColor: styles.colors.background }}
    >
      {/* Header */}
      <header
        className="text-center border-b pb-6"
        style={{ borderColor: styles.colors.secondary }}
      >
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: styles.colors.primary }}
        >
          {data.personalInfo.name}
        </h1>
        <div
          className="text-sm space-x-4"
          style={{ color: styles.colors.text }}
        >
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </header>

      {/* Content */}
      <main className="mt-8 grid grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          <section>
            <h2
              className="text-xl font-bold mb-4 pb-1 border-b"
              style={{
                color: styles.colors.primary,
                borderColor: styles.colors.secondary,
              }}
            >
              Professional Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp, i) => (
                <div key={i}>
                  <h3 className="font-bold">{exp.position}</h3>
                  <p className="text-sm italic mb-1">{exp.company}</p>
                  <p className="text-sm mb-2">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <p className="text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <section>
            <h2
              className="text-xl font-bold mb-4 pb-1 border-b"
              style={{
                color: styles.colors.primary,
                borderColor: styles.colors.secondary,
              }}
            >
              Skills
            </h2>
            <div className="space-y-2">
              {data.skills.map((skill, i) => (
                <p
                  key={i}
                  className="text-sm"
                  style={{ color: styles.colors.text }}
                >
                  {skill}
                </p>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
