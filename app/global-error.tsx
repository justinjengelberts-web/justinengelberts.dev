"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <main
          style={{
            minHeight: "100vh",
            backgroundColor: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 1.5rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1
              style={{
                fontSize: "6rem",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "1rem",
              }}
            >
              500
            </h1>
            <p
              style={{
                color: "#a1a1aa",
                fontSize: "1.125rem",
                marginBottom: "2rem",
              }}
            >
              Er ging iets mis. Probeer het opnieuw.
            </p>
            <button
              onClick={() => reset()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#fff",
                backgroundColor: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "9999px",
                cursor: "pointer",
              }}
            >
              Probeer opnieuw
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
