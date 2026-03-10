"use client";

import { useState, useTransition, useRef } from "react";
import { analyzeRecipe } from "@/data/gemini";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function UploadPage() {
  const [data, setData] = useState<Awaited<
    ReturnType<typeof analyzeRecipe>
  > | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // This handles both the click and the drop
  const processUpload = (file: File) => {
    // 5MB Limit
    if (file.size > 5 * 1024 * 1024) {
      alert("File too large (Max 5MB)");
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append("image", file);
      const result = await analyzeRecipe(formData);
      setData(result);
    });
  };

  return (
    <main
      // This allows dragging ANYWHERE on the page
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) processUpload(file);
      }}
      className="min-h-screen p-12 flex flex-col items-center justify-center bg-black text-white"
    >
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold">Upload Your Recipe</h1>
        <p className="text-zinc-300">
          Click the button or drag an image anywhere on this screen.
        </p>

        {/* Hidden Native Input */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) =>
            e.target.files?.[0] && processUpload(e.target.files[0])
          }
        />

        <Button
          size="lg"
          disabled={isPending}
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-8 text-lg transition-colors"
        >
          {isPending ? <Spinner className="mr-2" /> : null}
          {isPending ? "Analyzing..." : "Choose Image"}
        </Button>

        {data && !isPending && (
          <div className="mt-8 p-6 bg-black border border-zinc-700 rounded-xl text-left text-white">
            <h2 className="text-xl font-bold mb-4">{data.recipeName}</h2>
            <ul className="list-disc pl-5">
              {data.ingredients.map((ing: string, i: number) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
