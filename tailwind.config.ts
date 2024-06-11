import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        yalenewroman: ["yalenewroman"],
        proximanova: ["proximanova"],
      },
    },
  },
  plugins: [],
} satisfies Config;
