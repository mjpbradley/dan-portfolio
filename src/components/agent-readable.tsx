import { absoluteUrl, mailtoHref, site } from "@/content/site";

export function AgentReadableContent() {
  return (
    <section className="sr-only" aria-label="Portfolio details">
      <h2>About</h2>
      <p>{site.description}</p>
      <p>
        {site.name} is a {site.jobTitle} in {site.location}. The public work is
        the single-page portfolio titled {site.title}.
      </p>
      <h2>Work</h2>
      <p>
        The gallery contains {site.gallery.length} designed pages. Click the
        current page or press the right arrow key to advance. After the first
        move, the left arrow key goes back. Pages loop.
      </p>
      <ol>
        {site.gallery.map((image, index) => (
          <li key={image.src}>
            <a href={absoluteUrl(image.src)}>
              {image.alt}
              {` (${index + 1} of ${site.gallery.length})`}
            </a>
          </li>
        ))}
      </ol>
      <h2>Contact</h2>
      <p>
        Email <a href={mailtoHref()}>{site.email}</a>.
      </p>
      <p>
        <a href={site.spotifyUrl} rel="noopener noreferrer">
          Listen to some music
        </a>
      </p>
      <h2>Glossary</h2>
      <p>
        Definitions for Stay A While, gallery pages, and how to retrieve this
        site as markdown are in the{" "}
        <a href="/glossary.md">glossary</a>.
      </p>
    </section>
  );
}
