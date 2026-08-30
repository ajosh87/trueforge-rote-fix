import { pathToFileURL } from 'url';

// Intercept dynamic imports of bare Windows absolute paths (C:\...) and
// convert them to proper file:// URLs that Node.js ESM loader accepts.
export async function resolve(specifier, context, nextResolve) {
  if (/^[A-Za-z]:[/\\]/.test(specifier)) {
    return nextResolve(pathToFileURL(specifier).href, context);
  }
  return nextResolve(specifier, context);
}
