import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
        ];
    },
};

export default nextConfig;
