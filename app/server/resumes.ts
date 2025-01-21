import { createServerFn } from "@tanstack/start";
import { createSupabaseServerClient } from "../lib/supabase.server";
import { z } from "zod";

export const getResumes = createServerFn({
  method: "GET",
}).handler(async () => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("resumes").select("*");

  // if (error) throw new Error("Failed to fetch resumes");
  return data ?? [];
});

export const createResume = createServerFn({
  method: "POST",
}).handler(async () => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("resumes")
    .insert({
      title: "New Resume",
      content: {},
    })
    .select()
    .single();

  if (error) throw new Error("Failed to create resume");
  return data;
});

export const deleteResume = createServerFn({
  method: "POST",
})
  .validator(z.string())
  .handler(async ({ data }) => {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("resumes").delete().eq("id", data);
    if (error) throw new Error("Failed to delete resume");
  });
