import { useTemplatesStore } from "~/store/templates";

export function TemplateSelector() {
  const { templates, activeTemplate, setActiveTemplate } = useTemplatesStore();

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50">
        <span>Change Template</span>
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div className="absolute top-full mt-2 w-72 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <div className="grid grid-cols-2 gap-2 p-2">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setActiveTemplate(template.id)}
              className={`p-2 rounded hover:bg-gray-50 transition-colors ${
                activeTemplate === template.id ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full aspect-[1/1.4] object-cover rounded mb-2"
              />
              <span className="text-sm font-medium">{template.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
