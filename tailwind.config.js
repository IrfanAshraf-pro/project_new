module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        150: "150px",
        190: "190px",
        225: "225px",
        275: "275px",
        300: "300px",
        340: "340px",
        350: "350px",
        375: "375px",
        460: "460px",
        656: "656px",
        880: "880px",
        508: "508px",
      },
      height: {
        80: "80px",
        150: "150px",
        225: "225px",
        300: "300px",
        340: "340px",
        370: "370px",
        420: "420px",
        510: "510px",
        600: "600px",
        650: "650px",
        685: "685px",
        800: "800px",
        "90vh": "90vh",
        "100vh": "100vh",
      },
      minWidth: {
        210: "210px",
        350: "350px",
        620: "620px",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  daisyui: {
    themes: [
      {
        customtheme: {
          primary: "#f5f7fa",

          secondary: "#061426",

          accent: "#0077ff",

          neutral: "#dae1e8",

          "base-100": "#FAFAFA",

          info: "#42BEEB",

          success: "#158447",

          warning: "#9D5707",

          error: "#F2212C",
          
        },
        darkcustom: {
          secondary: "#C4E70F",

          primary: "#0A2DEC",

          accent: "#F8E4FF",

          neutral: "#001540",

          "base-100": "#3D35BC",

          info: "#42BEEB",

          success: "#158447",

          warning: "#9D5707",

          error: "#F2212C",
        },
      },
      "dark","dracula","night","synthwave","aqua","luxury","lofi","cupcake"
    ],
  },
  plugins: [require("daisyui"),require('@tailwindcss/forms')],
};

// require("@tailwindcss/forms")