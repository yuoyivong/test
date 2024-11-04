/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["false", "class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(avatar|button|tabs|ripple|spinner).js",
  ],
  theme: {
    extend: {
      width: {
        "btn-width": "130px",
      },
      height: {
        "btn-height": "44px",
      },
      container: {
        center: "true",
        padding: "1rem",
        margin: "0px 5px",
        screens: {
          sm: "640px",
          md: "728px",
          lg: "984px",
          xl: "1520px",
        },
      },
      boxShadow: {
        soft: "0 0 1px rgba(0, 0, 0, .4)",
      },
      dropShadow: {
        soft: "0 0 1px rgba(0, 0, 0, .18)",
      },
      backgroundImage: {
        "magic-pattern": "url('/public/images/patternDamn.jpg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderWidth: {
        "1px": "1px",
      },
      borderRadius: {
        radiusUi: "16px",
        radiusBorder: "12px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        primaryCherUi: "#F4F6FA",
        lessWhiteUi: "#F7F9FB",
        blueUi: "#007AFF",
        greenUi: "#17C964",
        blackUi: "#344054",
        gentleBlueUi: "#F3F9FF",
        gentleBlue: "#F3F9FF",
        lessBlackUi: "#98A2B3",
        btnWhiteUi: "#F4F4F5",
        btnBorderUi: "#D4D4D8",
        privateColor: "#105DFF",
        publicColor: "#36CC66",
        deleteColor: "#CE0000",
        bgBlur: "#787878",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
