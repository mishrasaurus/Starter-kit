/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard/all",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [],
  },
  modularizeImports: {
    // to reduce bundle size
    "@mui/icons-material/?(((\\w*)?/?)*)": {
      transform: "@mui/icons-material/{{ matches.[1] }}/{{member}}",
    },
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
