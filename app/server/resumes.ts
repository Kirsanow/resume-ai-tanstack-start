import { createServerFn } from "@tanstack/start";
import { createSupabaseServerClient } from "../lib/supabase.server";
import { redirect } from "@tanstack/react-router";

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
