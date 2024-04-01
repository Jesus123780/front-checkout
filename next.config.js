// next.config.js
const withTM = require('next-transpile-modules')(['pkg-components', 'npm-pkg-hook']);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = withTM(nextConfig);
