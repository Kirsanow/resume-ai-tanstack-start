import { create } from "zustand";

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
  };
  layout: "modern" | "classic" | "minimal" | "creative";
}

interface TemplatesState {
  templates: Template[];
  activeTemplate: string;
  setActiveTemplate: (id: string) => void;
}

export const useTemplatesStore = create<TemplatesState>((set) => ({
  templates: [
    {
      id: "modern-professional",
      name: "Modern Professional",
      thumbnail: "/templates/modern-professional.png",
      colors: {
        primary: "#2563eb",
        secondary: "#64748b",
        text: "#1e293b",
        background: "#ffffff",
      },
      layout: "modern",
    },
    {
      id: "minimal-clean",
      name: "Minimal Clean",
      thumbnail: "/templates/minimal-clean.png",
      colors: {
        primary: "#18181b",
        secondary: "#71717a",
        text: "#27272a",
        background: "#ffffff",
      },
      layout: "minimal",
    },
    {
      id: "classic-elegant",
      name: "Classic Elegant",
      thumbnail: "/templates/classic-elegant.png",
      colors: {
        primary: "#1e293b",
        secondary: "#475569",
        text: "#334155",
        background: "#f8fafc",
      },
      layout: "classic",
    },
    {
      id: "creative-bold",
      name: "Creative Bold",
      thumbnail: "/templates/creative-bold.png",
      colors: {
        primary: "#6366f1",
        secondary: "#a855f7",
        text: "#1f2937",
        background: "#ffffff",
      },
      layout: "creative",
    },
  ],
  activeTemplate: "modern-professional",
  setActiveTemplate: (id: string) => set({ activeTemplate: id }),
}));
