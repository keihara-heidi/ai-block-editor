/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    TIPTAP_APP_ID: process.env.TIPTAP_APP_ID,
    TIPTAP_JWT: process.env.TIPTAP_JWT,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_API_URL: process.env.OPENAI_API_URL,
  },
};

export default nextConfig;
