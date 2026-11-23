import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 92],
  },
  async redirects() {
    return [{
      source: "/projects/framepop/workbench.webp",
      destination: "/projects/framepop/video-models.webp",
      permanent: true,
    }];
  },
};

export default nextConfig;
