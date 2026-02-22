"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-white mb-4">500</h1>
        <p className="text-zinc-400 text-lg mb-8">
          Er ging iets mis. Probeer het opnieuw.
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors"
        >
          Probeer opnieuw
        </button>
      </div>
    </main>
  );
}
