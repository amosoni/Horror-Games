/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 可按需要关闭类型错误导致的构建失败
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig; 