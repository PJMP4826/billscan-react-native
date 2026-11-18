module.exports = {
  globDirectory: "dist",
  globPatterns: [
    "**/*.{js,css,html,ico,png,svg,webmanifest,ttf,woff,woff2}",
  ],
  globIgnores: ["**/sw.js", "**/workbox-*.js"],
  swDest: "dist/sw.js",
  maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
  inlineWorkboxRuntime: true,
  cleanupOutdatedCaches: true,
  clientsClaim: true,
  skipWaiting: false,
  directoryIndex: "index.html",
  dontCacheBustURLsMatching: /-[a-f0-9]{32}\./,
  sourcemap: false,
  manifestTransforms: [
    async (entries) => {
      const manifest = entries.filter((entry) => !entry.url.includes("[id]"));
      return { manifest, warnings: [] };
    },
  ],
  runtimeCaching: [
    {
      urlPattern: ({ request, url }) =>
        request.mode === "navigate" &&
        url.origin === self.location.origin,
      handler: "NetworkFirst",
      options: {
        cacheName: "pages",
        networkTimeoutSeconds: 5,
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        },
        precacheFallback: {
          fallbackURL: "/index.html",
        },
      },
    },
    {
      urlPattern: ({ request }) => request.destination === "font",
      handler: "CacheFirst",
      options: {
        cacheName: "fonts",
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 365 * 24 * 60 * 60,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: ({ request }) => request.destination === "image",
      handler: "CacheFirst",
      options: {
        cacheName: "images",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
};
