/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
  
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true, // or false for a temporary redirect
      },
    ];
  },
};

export default nextConfig;
