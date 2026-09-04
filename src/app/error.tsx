"use client";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-background px-5 text-center">
      <h1 className="font-display text-[clamp(28px,8vw,40px)] tracking-[0.02em]">
        Something went wrong
      </h1>
      <button
        type="button"
        onClick={() => reset()}
        className="cursor-custom border-0 bg-transparent p-0 text-xs tracking-[0.06em]"
      >
        Try again
      </button>
    </main>
  );
}
