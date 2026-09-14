/** @type {import('next').NextConfig} */
const { withBotId } = require('botid/next/config')

const securityHeaders = [
  // X-Frame-Options omitido intencionalmente: estos storefronts se embeben
  // en el onboarding del Panel Admin como previews. El Panel Admin sí tiene SAMEORIGIN.
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',     value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
]

const nextConfig = {
  transpilePackages: ['@creart/tienda-core'],
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
  images: {
    // deviceSizes/imageSizes acotados a los anchos reales usados en la tienda
    // (ver sizes= en ProductCard/ProductGallery/CarritoPage/CheckoutPage de tienda-core),
    // en vez de los 16 breakpoints por default de Next, para bajar transformaciones.
    // Prueba puntual con "Whang Mandu" en bazaar antes de replicar en el resto. 2026-09-14.
    deviceSizes: [384, 640, 750, 1080, 1200, 1920],
    imageSizes: [56, 96, 120, 160, 256],
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co', pathname: '/storage/v1/object/public/**' },
    ],
  },
}

module.exports = withBotId(nextConfig)