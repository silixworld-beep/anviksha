declare module 'node:fs' {
  export function existsSync(path: string | URL): boolean;
}

interface ImportMeta {
  readonly url: string;
}

declare const URL: {
  new (url: string, base?: string): URL;
};
