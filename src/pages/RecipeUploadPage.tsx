import React, { useRef, useState } from "react";

type UploadState =
  | { status: "idle" }
  | { status: "ready" }
  | { status: "uploading"; progress: number }
  | { status: "error"; message: string };

const MAX_BYTES = 10 * 1024 * 1024; // 10MB
const ACCEPTED = ["application/pdf", "image/jpeg", "image/png"];

function isAccepted(file: File) {
  // Some browsers may leave file.type empty, so also check extension
  const ext = file.name.split(".").pop()?.toLowerCase();
  const extOk = ext === "pdf" || ext === "jpg" || ext === "jpeg" || ext === "png";
  return ACCEPTED.includes(file.type) || extOk;
}

export default function RecipeUploadPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [state, setState] = useState<UploadState>({ status: "idle" });

  function pickFile() {
    inputRef.current?.click();
  }

  function validateAndSet(f: File) {
    if (!isAccepted(f)) {
      setFile(null);
      setState({ status: "error", message: "Unsupported file type. Use PDF, JPG, or PNG." });
      return;
    }
    if (f.size > MAX_BYTES) {
      setFile(null);
      setState({ status: "error", message: "File too large. Max size is 10MB." });
      return;
    }
    setFile(f);
    setState({ status: "ready" });
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) validateAndSet(f);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) validateAndSet(f);
  }

  async function startUpload() {
    if (!file) {
      setState({ status: "error", message: "Please choose a file first." });
      return;
    }

    setState({ status: "uploading", progress: 0 });

    // Upload with progress using XHR
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/recipes/upload");
    xhr.responseType = "json";

    xhr.upload.onprogress = (evt) => {
      if (!evt.lengthComputable) return;
      const pct = Math.round((evt.loaded / evt.total) * 100);
      setState({ status: "uploading", progress: pct });
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const recipeId = xhr.response?.recipeId ?? xhr.response?.id;
        // For now we just show success; later you’ll redirect to editor
        if (recipeId) {
          // TODO: redirect to editor page, e.g. /recipes/:id/edit
          alert(`Uploaded! recipeId = ${recipeId}`);
        } else {
          setState({ status: "error", message: "Upload succeeded but no recipeId returned." });
        }
      } else {
        setState({ status: "error", message: `Upload failed (HTTP ${xhr.status}).` });
      }
    };

    xhr.onerror = () => {
      setState({ status: "error", message: "Network error while uploading." });
    };

    const form = new FormData();
    form.append("file", file);
    xhr.send(form);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0b1220", color: "#e5e7eb", padding: 24 }}>
      <div style={{ maxWidth: 720, margin: "0 auto", paddingTop: 40 }}>
        <h1 style={{ textAlign: "center", fontSize: 32, marginBottom: 8 }}>Upload Recipe</h1>
        <p style={{ textAlign: "center", opacity: 0.8, marginBottom: 24 }}>
          Import a recipe from an image or PDF using Gemini AI.
        </p>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragging(false);
          }}
          onDrop={onDrop}
          style={{
            border: "2px dashed",
            borderColor: dragging ? "#34d399" : "#334155",
            borderRadius: 16,
            padding: 36,
            textAlign: "center",
            background: dragging ? "rgba(52, 211, 153, 0.08)" : "rgba(15, 23, 42, 0.5)",
          }}
        >
          <p style={{ fontWeight: 600, marginBottom: 8 }}>Click to upload or drag and drop</p>
          <p style={{ fontSize: 12, opacity: 0.75 }}>PDF, JPG, PNG up to 10MB</p>

          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
            onChange={onInputChange}
            style={{ display: "none" }}
          />

          <button
            onClick={pickFile}
            disabled={state.status === "uploading"}
            style={{
              marginTop: 16,
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #334155",
              background: "rgba(15, 23, 42, 0.8)",
              color: "#e5e7eb",
              cursor: "pointer",
            }}
          >
            Choose file
          </button>

          {file && (
            <div style={{ marginTop: 16, fontSize: 14, opacity: 0.9 }}>
              Selected: <strong>{file.name}</strong>
            </div>
          )}
        </div>

        {state.status === "uploading" && (
          <div style={{ marginTop: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, opacity: 0.85 }}>
              <span>Uploading…</span>
              <span>{state.progress}%</span>
            </div>
            <div style={{ height: 8, background: "#1f2937", borderRadius: 999, overflow: "hidden", marginTop: 8 }}>
              <div style={{ height: "100%", width: `${state.progress}%`, background: "#34d399" }} />
            </div>
          </div>
        )}

        {state.status === "error" && (
          <div
            style={{
              marginTop: 18,
              background: "rgba(239, 68, 68, 0.12)",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              padding: 12,
              borderRadius: 12,
            }}
          >
            {state.message}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center", marginTop: 22 }}>
          <button
            onClick={startUpload}
            disabled={!file || state.status === "uploading"}
            style={{
              padding: "12px 18px",
              borderRadius: 12,
              border: "none",
              background: "#34d399",
              color: "#0b1220",
              fontWeight: 700,
              cursor: "pointer",
              opacity: !file || state.status === "uploading" ? 0.6 : 1,
            }}
          >
            {state.status === "uploading" ? "Uploading…" : "Start Processing"}
          </button>
        </div>
      </div>
    </div>
  );
}
