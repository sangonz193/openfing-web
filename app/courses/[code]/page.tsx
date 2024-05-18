import { createClient } from "@/utils/supabase/server";

export default async function Page({ params }: { params: { code: string } }) {
  const supabase = createClient();
  const course = await supabase
    .from("courses")
    .select("*")
    .eq("code", params.code)
    .single();

  return (
    <div>
      <pre>{JSON.stringify(course.data, null, 2)}</pre>

      <video controls autoPlay>
        <source
          src={`https://open.fing.edu.uy/media/${course.data.code}/${course.data.code}_01.mp4`}
        />
      </video>
    </div>
  );
}
