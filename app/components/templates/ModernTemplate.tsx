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

export function ModernTemplate({ data, styles }: TemplateProps) {
  return (
    <div className="font-inter text-gray-900 bg-white">
      <header
        className="p-8 text-white"
        style={{ backgroundColor: styles.colors.primary }}
      >
        <h1 className="text-3xl font-bold">{data.personalInfo.name}</h1>
        <div className="mt-2 text-sm opacity-90">
          {data.personalInfo.email} • {data.personalInfo.phone}
        </div>
      </header>

      <main className="p-8 grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-8 space-y-8">
          {/* Experience Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Experience</h2>
            <div className="space-y-6">
              {data.experience.map((exp, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="font-medium">{exp.position}</h3>
                  <div className="text-sm text-gray-600">
                    {exp.company} • {exp.startDate} - {exp.endDate}
                  </div>
                  <p className="text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <h3 className="font-medium">{edu.degree}</h3>
                  <div className="text-sm text-gray-600">
                    {edu.institution} • {edu.graduationDate}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="col-span-4 space-y-8">
          {/* Skills Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    backgroundColor: styles.colors.secondary,
                    color: styles.colors.background,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
