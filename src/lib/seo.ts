/**
 * Truncates a title to at most `maxLen` characters on a clean word boundary
 * so that `<title>` with ` | TenantFig` (12 chars) stays <= 60 characters.
 */
export function fitTitle(text: string, maxLen = 48): string {
  const clean = text.trim().replace(/\s+/g, ' ');
  if (clean.length <= maxLen) return clean;
  const slice = clean.slice(0, maxLen);
  const lastSpace = slice.lastIndexOf(' ');
  const trimmed = (lastSpace > 0 ? slice.slice(0, lastSpace) : slice).replace(/[\s\-–—:,;]+$/, '');
  return trimmed || slice;
}
