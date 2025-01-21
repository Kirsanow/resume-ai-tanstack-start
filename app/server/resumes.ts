import { createServerFn } from "@tanstack/start";
import { createSupabaseServerClient } from "../lib/supabase.server";
import { z } from "zod";
import { Resume } from "~/types";

export const getResumes = createServerFn({
  method: "GET",
}).handler(async () => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw new Error("Failed to get user");
  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("user_id", user?.id)
    .order("updated_at", { ascending: false });

  return data ?? [];
});

export const createResume = createServerFn({
  method: "POST",
}).handler(async () => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw new Error("Failed to get user");
  const { data, error } = await supabase
    .from("resumes")
    .insert({
      title: "New Resume",
      content: {},
      user_id: user?.id,
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

export const getResume = createServerFn({
  method: "POST",
})
  .validator(z.string())
  .handler(async ({ data }) => {
    const supabase = await createSupabaseServerClient();
    const { data: resume, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("id", data)
      .single();
    if (error) throw new Error("Failed to fetch resume");
    return resume;
  });

export const updateResume = createServerFn({
  method: "POST",
})
  .validator(
    z.object({
      id: z.string(),
      title: z.string().optional(),
      data: z.record(z.any()),
    })
  )
  .handler(async ({ data }) => {
    const supabase = await createSupabaseServerClient();
    const { data: resume, error: fetchError } = await supabase
      .from("resumes")
      .select("*")
      .eq("id", data.id)
      .single();
    if (fetchError) throw new Error("Failed to fetch resume");
    const { error: updateError } = await supabase
      .from("resumes")
      .update({
        title: data.title,
        content: {
          ...resume.content,
          ...data.data,
        },
      })
      .eq("id", data.id);
    if (updateError) throw new Error("Failed to update resume");
  });
