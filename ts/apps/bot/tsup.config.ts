import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"],
  skipNodeModulesBundle: true,
  tsconfig: "tsconfig.json",
  noExternal: ["@packages/db"],
  clean: true,
});
