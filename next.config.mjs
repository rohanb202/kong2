/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};
import withBundleAnalyzer from '@next/bundle-analyzer';
const nextConfigWithBundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
// module.exports = withBundleAnalyzer(nextConfig);
export default nextConfigWithBundleAnalyzer;
