import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
        yalenewroman: ['yalenewroman'],
        proximanova: ['proximanova'],
      },
      boxShadow: {
        yale: '1px 1px 6px rgba(0,0,0,.16)',
      },
      colors: {
        // Core colors that maintain brand identity
        yale: {
          blue: '#00356b',
          black: '#222222',
        },

        // Primary color roles
        primary: {
          DEFAULT: '#222222', // Main text color (previously yaleblack)
          muted: '#4a4a4a', // Secondary text (previously darkgray)
          subtle: '#6e6e6e', // Tertiary text (previously textgray)
          ghost: '#aaaaaa', // Muted text (previously reallylightgray)
        },

        // Surface and background colors
        surface: {
          DEFAULT: '#ffffff', // Main background
          secondary: '#f5f5f5', // Light background (previously backgroundgray)
          paper: '#f0eee6', // Paper-like background (previously headingsbackground)
          pale: '#eff7fa', // Very light background (previously lightmist)
          warm: '#fef4d4', // Warm background (previously parchment)
        },

        // Border colors
        border: {
          DEFAULT: '#d3d3d3', // Default border (previously inputborder)
          strong: '#bebebe', // Stronger border (previously resultsborder)
          light: '#dddddd', // Light border (previously lightgray)
        },

        // Accent colors for special UI elements
        accent: {
          blue: {
            DEFAULT: '#286dc0', // previously medblue
            light: '#63aaff', // previously liteblue
            pale: '#d9e9f2', // previously sky
          },
          teal: {
            DEFAULT: '#0d99aa',
            light: '#8ec8cc',
            pale: '#d9e6e7',
          },
          warm: {
            red: '#ca6251',
            orange: '#f48734',
            yellow: {
              DEFAULT: '#f9be00',
              light: '#fce188',
            },
          },
        },
        /* legacy colors for reference
        // grays
        yaleblack: "#222222",
        darkgray: "#4a4a4a",
        textgray: "#6e6e6e",
        lightgray: "#dddddd",
        backgroundgray: "#f5f5f5",
        inputborder: "#d3d3d3",
        resultsborder: "#bebebe",
        reallylightgray: "#aaaaaa",

        // blues
        yaleblue: "#00356b",
        medblue: "#286dc0",
        liteblue: "#63aaff",
        sky: "#d9e9f2",

        // Teals
        teal: "#0d99aa",
        robinegg: "#8ec8cc",
        mist: "#d9e6e7",
        lightmist: "#eff7fa",

        // warm
        fortunoff: "#ca6251",
        haas: "#f48734",
        marigold: "#f9be00",
        notepad: "#fce188",
        parchment: "#fef4d4",

        // misc
        headingsbackground: "#f0eee6",
       */
      },
    },
  },
  plugins: [],
} satisfies Config;
