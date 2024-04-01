/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        'uploadthing.com',
        'utfs.io',
        'lh3.googleusercontent.com',
        'img.clerk.com',
        'subdomain',
        'files.stripe.com',
      ],
    },
    reactStrictMode: false,
  }

export default nextConfig;