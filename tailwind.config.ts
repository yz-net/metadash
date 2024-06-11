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
      boxShadow: {
        yale: "1px 1px 6px rgba(0,0,0,.16)",
      },
    },
  },
  plugins: [],
} satisfies Config;
