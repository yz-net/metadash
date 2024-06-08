/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import path from "path";

/** @type {import("next").NextConfig} */
const config = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

export default config;
