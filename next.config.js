/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  basePath: '/dapp/decoder',
  assetPrefix: '/dapp/decoder',
  publicRuntimeConfig: {
    basePath: '/dapp/decoder'
  }
};

module.exports = nextConfig;
