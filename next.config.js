/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    /* peerjs needs this sometimes to avoid issues with SSR or specific environments */
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
            };
        }
        return config;
    },
};

module.exports = nextConfig;
