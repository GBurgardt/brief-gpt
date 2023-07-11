
import { useState } from "react";
import { Form, useActionData } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { processAudio } from "../server/briefing.server";

export let action = async ({ request }) => {
  const formData = await request.formData();
  const youtubeUrl = formData.get("youtube-url");

  console.log("youtubeUrl", youtubeUrl);

  try {
    return await processAudio(youtubeUrl);    
  } catch (error) {
    return redirect("/", { headers: { 'X-Error': 'Ocurrió un error al generar el resumen' } });
  }
};


export default function Index() {
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const data = useActionData();
  const highlights = data?.highlights ? data.highlights : null;

  return (
    <div style={{ minHeight: "100vh", padding: "10px", backgroundColor: "#F0F0F0" }}>
      <div
        style={{
          margin: "auto",
          width: "100%",
          maxWidth: "600px",
          borderRadius: "10px",
          backgroundColor: "white",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          padding: "20px",
          color: "black"
        }}
      >
        <h2 style={{ fontSize: "20px" }}>YouTube Briefing</h2>

      <Form method="POST">
        <label htmlFor="youtube-url">URL de YouTube</label>
        <input
          type="url"
          name="youtube-url"
          id="youtube-url"
          value={youtubeUrl}
          onChange={e => setYoutubeUrl(e.target.value)}
          style={{ width: "100%", marginTop: "10px" }}
        />
        <button
          type="submit"
          style={{ display: "block", width: "100%", marginTop: "20px" }}
        >
          Generar Resumen
        </button>
      </Form>

        {highlights && (
          <div
            style={{
              marginTop: "20px",
              borderWidth: "1px",
              borderRadius: "10px",
              padding: "20px",
              borderColor: "#DDD"
            }}
          >
            {/* <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Destacados:</h3> */}
            <p style={{ whiteSpace: "pre-line" }}>{highlights}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};