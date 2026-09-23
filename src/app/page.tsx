import { AgentReadableContent } from "@/components/agent-readable";
import { Gallery } from "@/components/gallery";
import { mailtoHref, site } from "@/content/site";

export default function Home() {
  return (
    <>
      <main className="relative box-border flex min-h-dvh flex-col items-center justify-center gap-12 bg-background px-5 pt-14 pb-10 min-[641px]:grid min-[641px]:h-dvh min-[641px]:min-h-0 min-[641px]:grid-cols-[1fr_auto_1fr] min-[641px]:items-center min-[641px]:gap-0 min-[641px]:overflow-hidden min-[641px]:p-0">
        <div className="flex flex-col items-center gap-2.5 min-[641px]:justify-self-center min-[641px]:items-end min-[641px]:gap-2">
          <h1 className="whitespace-nowrap font-display text-[clamp(36px,10vw,52px)] tracking-[-0.02em] min-[641px]:text-[clamp(34px,3.1vw,56px)]">
            {site.name}
          </h1>
          <a
            href={mailtoHref()}
            className="cursor-custom text-xs tracking-[0.06em]"
          >
            CONTACT
          </a>
        </div>

        <Gallery images={[...site.gallery]} />

        <div className="flex flex-col items-center gap-2.5 min-[641px]:justify-self-center min-[641px]:items-start min-[641px]:gap-2">
          <p className="whitespace-nowrap font-display text-[clamp(36px,10vw,52px)] tracking-[-0.02em] min-[641px]:text-[clamp(34px,3.1vw,56px)]">
            {site.jobTitle}
          </p>
          <p className="text-xs tracking-[0.06em]">
            {site.location.toUpperCase()}
          </p>
        </div>

        <a
          href={site.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-custom mt-2 text-xs tracking-[0.06em] min-[641px]:absolute min-[641px]:bottom-[4.5vh] min-[641px]:left-1/2 min-[641px]:mt-0 min-[641px]:-translate-x-1/2"
        >
          LISTEN TO SOME MUSIC
        </a>
      </main>
      <AgentReadableContent />
    </>
  );
}
