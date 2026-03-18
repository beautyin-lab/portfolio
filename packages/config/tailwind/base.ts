import type { Config } from "tailwindcss";

const baseConfig: Partial<Config> = {
  content: [
    "../../packages/ui/src/**/*.{ts,tsx}",
    "../../packages/theme/src/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
};

export default baseConfig;
