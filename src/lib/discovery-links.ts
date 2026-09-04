export const discoveryLinkHeader = [
  '</index.md>; rel="alternate"; type="text/markdown"',
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</sitemap.xml>; rel="sitemap"',
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"',
  '</agents.md>; rel="service-doc"; type="text/markdown"',
  '</.well-known/ai-catalog.json>; rel="ai-catalog"',
  '</.well-known/ard.json>; rel="ard"',
].join(", ");
