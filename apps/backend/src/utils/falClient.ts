export async function startFalGeneration(prompt: string, imageId: string) {
  const resp = await fetch("https://fal.run/api/v1/async/flux-pro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Key ${process.env.FAL_KEY}`,
    },
    body: JSON.stringify({
      prompt,
      webhook_url: `${process.env.BACKEND_URL}/api/webhooks/fal`,
      metadata: { generationId: imageId },
    }),
  });

  if (!resp.ok) throw new Error("Fal.ai request failed");
  return resp.json(); 
}
