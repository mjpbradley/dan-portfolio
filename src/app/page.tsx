import { AgentReadableContent } from "@/components/agent-readable";
import { Gallery } from "@/components/gallery";
import { mailtoHref, site } from "@/content/site";

export default function Home() {
  return (
    <>
      <main className="relative box-border flex min-h-dvh flex-col items-center justify-between bg-background px-5 py-[7vh] pb-[5vh] min-[641px]:grid min-[641px]:h-dvh min-[641px]:min-h-0 min-[641px]:grid-cols-[1fr_auto_1fr] min-[641px]:items-center min-[641px]:overflow-hidden min-[641px]:p-0">
        <div className="flex flex-col items-center gap-2.5 min-[641px]:justify-self-center min-[641px]:items-end min-[641px]:gap-2">
          <h1 className="whitespace-nowrap font-display text-[clamp(28px,8vw,40px)] tracking-[0.02em] min-[641px]:text-[clamp(26px,2.3vw,44px)]">
            {site.name.toUpperCase()}
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
          <p className="whitespace-nowrap font-display text-[clamp(28px,8vw,40px)] tracking-[0.02em] min-[641px]:text-[clamp(26px,2.3vw,44px)]">
            {site.jobTitle.toUpperCase()}
          </p>
          <p className="text-xs tracking-[0.06em]">
            {site.location.toUpperCase()}
          </p>
        </div>

        <a
          href={site.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-custom mt-[7vh] text-xs tracking-[0.06em] min-[641px]:absolute min-[641px]:bottom-[4.5vh] min-[641px]:left-1/2 min-[641px]:mt-0 min-[641px]:-translate-x-1/2"
        >
          LISTEN TO SOME MUSIC
        </a>
      </main>
      <AgentReadableContent />
    </>
  );
}
