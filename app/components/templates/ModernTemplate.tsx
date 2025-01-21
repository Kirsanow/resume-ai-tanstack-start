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
    <div className="text-gray-900 bg-white font-inter">
      <header
        className="p-8 text-white"
        style={{ backgroundColor: styles.colors.primary }}
      >
        <h1 className="text-3xl font-bold">{data?.personalInfo?.name || ""}</h1>
        <div className="mt-2 text-sm opacity-90">
          {data?.personalInfo?.email || ""} • {data?.personalInfo?.phone || ""}
        </div>
      </header>

      <main className="grid grid-cols-12 gap-8 p-8">
        {/* Left Column */}
        <div className="col-span-8 space-y-8">
          {/* Experience Section */}
          <section>
            <h2 className="mb-4 text-xl font-semibold">Experience</h2>
            <div className="space-y-6">
              {data?.experience?.map((exp, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="font-medium">{exp?.position || ""}</h3>
                  <div className="text-sm text-gray-600">
                    {exp?.company || ""} • {exp?.startDate || ""} -{" "}
                    {exp?.endDate || ""}
                  </div>
                  <p className="text-sm">{exp?.description || ""}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section>
            <h2 className="mb-4 text-xl font-semibold">Education</h2>
            <div className="space-y-4">
              {data?.education?.map((edu, i) => (
                <div key={i}>
                  <h3 className="font-medium">{edu?.degree || ""}</h3>
                  <div className="text-sm text-gray-600">
                    {edu?.institution || ""} • {edu?.graduationDate || ""}
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
            <h2 className="mb-4 text-xl font-semibold">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data?.skills?.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm rounded-full"
                  style={{
                    backgroundColor: styles.colors.secondary,
                    color: styles.colors.background,
                  }}
                >
                  {skill?.name || ""}
                </span>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
