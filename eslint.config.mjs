import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextCoreWebVitals,
  globalIgnores([".next/**", "out/**", "public/**", "next-env.d.ts"]),
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/next-script-for-ga": "off",
      // New in eslint-plugin-react-hooks 7 (Next 16); existing code predates them.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
    },
  },
]);
