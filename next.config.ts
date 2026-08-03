import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lsdpolsrrpgdiinwazst.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        // Temporary placeholder images for Phase 1/2 dummy data — remove once Phase 4 wires real Storage images.
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
