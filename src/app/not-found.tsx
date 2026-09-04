import Link from "next/link";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-background px-5 text-center">
      <h1 className="font-display text-[clamp(28px,8vw,40px)] tracking-[0.02em]">
        Page not found
      </h1>
      <p className="text-xs tracking-[0.06em]">
        That address is not part of {site.name}&apos;s portfolio.
      </p>
      <Link href="/" className="cursor-custom text-xs tracking-[0.06em]">
        Back to {site.title}
      </Link>
    </main>
  );
}
