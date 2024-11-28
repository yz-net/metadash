/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    unoptimized: true,
    path: "/",
  },
  output: "export",
  sassOptions: {
    implementation: "sass-embedded",
    api: "modern-compiler",
    silenceDeprecations: ["legacy-js-api"], // TODO: Remove this when https://github.com/vercel/next.js/issues/71638 is fixed
  },
};

export default config;
