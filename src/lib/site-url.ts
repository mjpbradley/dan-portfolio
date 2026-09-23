const fallbackSiteUrl = "http://localhost:3000";

function stripTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}

function httpsOrigin(host: string): string {
  return `https://${stripTrailingSlash(host)}`;
}

export function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) {
    return stripTrailingSlash(explicit);
  }

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (process.env.VERCEL_ENV === "production" && productionHost) {
    return httpsOrigin(productionHost);
  }

  const deploymentHost = process.env.VERCEL_URL;
  if (deploymentHost) {
    return httpsOrigin(deploymentHost);
  }

  return fallbackSiteUrl;
}
