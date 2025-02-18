import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#fcf3f6",
          "100": "#fbe8f0",
          "200": "#f8d2e1",
          "300": "#f4adc8",
          "400": "#ef94b4",
          "500": "#e15381",
          "600": "#cf335d",
          "700": "#b32346",
          "800": "#94203b",
          "900": "#7c1f34",
        },
        secondary: {
          "50": "#f0f8ff",
          "100": "#e0f0fe",
          "200": "#bae2fd",
          "300": "#7ccbfd",
          "400": "#37b1f9",
          "500": "#0d97ea",
          "600": "#016fb9",
          "700": "#025fa2",
          "800": "#065186",
          "900": "#0c446e",
        },

        //base colours
        black: "#1f1f1f",
        white: "#FFFFFF",

        //base colour themes
        heading: "#1f1f1f",
        paragraph: "#4b5563",
        labels: "#1f1f1f",
        placeholder: "#9ca3af",
        table: colors.gray[900],
        backgroundDisable: "#F3F4F6",

        border: "#E5E7EB",
        "input-border": colors.gray[300],
        icon: colors.gray[500],
      },

      //Typography
      //fontFamily: {},

      fontSize: {
        sm: "0.8rem",
        base: "1rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",

        //custom font size
        h1: [
          "4rem",
          {
            lineHeight: "5rem",
            letterSpacing: "0.0375rem",
            fontWeight: "700",
          },
        ],
        h2: [
          "3rem",
          {
            lineHeight: "2rem",
            letterSpacing: "0.035rem",
            fontWeight: "700",
          },
        ],
        h3: [
          "2.5rem",
          {
            lineHeight: "3.5rem",
            letterSpacing: "0.05rem",
            fontWeight: "700",
          },
        ],

        h4: [
          "2rem",
          {
            lineHeight: "2.75rem",
            letterSpacing: "0rem",
            fontWeight: "700",
          },
        ],
        h5: [
          "1.5rem",
          {
            lineHeight: "2.5rem",
            letterSpacing: "0rem",
            fontWeight: "600",
          },
        ],
        h6: [
          "1.25rem",
          {
            lineHeight: "2rem",
            letterSpacing: "0rem",
            fontWeight: "600",
          },
        ],
        p: [
          "1.25rem",
          {
            lineHeight: "2rem",
            letterSpacing: "0rem",
            fontWeight: "500",
          },
        ],
        div: [
          "1rem",
          {
            lineHeight: "1.5rem",
            letterSpacing: "0em",
            fontWeight: "400",
          },
        ],
        span: [
          "0.75rem",
          {
            lineHeight: "1.5rem",
            letterSpacing: "0em",
            fontWeight: "400",
          },
        ],
      },

      fontWeight: {
        thin: "100",
        hairline: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        "extra-bold": "800",
        black: "900",
      },

      //screen sizes min width
      screens: {
        xs: "360px",
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1480px",
        // => @media (min-width: 1480px) { ... }
        "3xl": "1680px",
        // => @media (min-width: 1680px) { ... }
        "4xl": "1920px",
        // => @media (min-width: 1920px) { ... }
      },

      //screens max-width

      container: {
        center: true,
        screens: {
          xs: "360px",
          sm: "640px",
          // => @media (max-width: 640px) { ... }

          md: "768px",
          // => @media (max-width: 768px) { ... }

          lg: "1024px",
          // => @media (max-width: 1024px) { ... }

          xl: "1280px",
          // => @media (max-width: 1280px) { ... }

          "2xl": "1480px",
          // => @media (max-width: 1480px) { ... }
          "3xl": "1680px",
          // => @media (max-width: 1680px) { ... }
          "4xl": "1920px",
          // => @media (max-width: 1920px) { ... }
        },

        padding: {
          DEFAULT: "0rem",
          xs: "0rem",
          sm: "0rem",
          md: "0rem",
          lg: "0rem",
          xl: "0rem",
          "2xl": "2rem",
          "3xl": "2rem",
          "4xl": "2rem",
        },
      },

      // borderRadius: {
      //   lg: "var(--radius)",
      //   md: "calc(var(--radius) - 2px)",
      //   sm: "calc(var(--radius) - 4px)",
      // },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
