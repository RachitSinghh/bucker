// Tailwind v4 is used ONLY by the shadcn-based auth pages (app/auth.css). The
// plugin only transforms files that contain `@import "tailwindcss"`, so the
// Bootstrap storefront CSS (app/globals.css) passes through untouched.
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
