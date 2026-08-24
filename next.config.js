const legacyRedirects = [
  {
    source: '/everything-you-need-to-know-about-python-strings',
    destination: '/blog/everything-you-need-to-know-about-python-strings'
  },
  {
    source: '/how-to-run-postgresql-using-docker',
    destination: '/blog/how-to-run-postgresql-using-docker'
  },
  {
    source: '/key-attributes-of-a-website-that-meets-the-standards-of-2022',
    destination:
      '/blog/key-attributes-of-a-website-that-meets-the-standards-of-2022'
  },
  {
    source: '/why-you-must-have-a-website-for-your-business',
    destination: '/blog/why-you-must-have-a-website-for-your-business'
  },
  {
    source:
      '/everything-you-need-to-know-about-python-strings-e293f4ba8be849d6a0aceba480f925aa',
    destination: '/blog/everything-you-need-to-know-about-python-strings'
  },
  {
    source:
      '/how-to-run-postgresql-using-docker-723c2ec8bf09444ab6d512dfe3a27031',
    destination: '/blog/how-to-run-postgresql-using-docker'
  },
  {
    source:
      '/key-attributes-of-a-website-that-meets-the-standards-of-2022-f35c6c4d951b4ba4855accbdc65fb09c',
    destination:
      '/blog/key-attributes-of-a-website-that-meets-the-standards-of-2022'
  },
  {
    source:
      '/why-you-must-have-a-website-for-your-business-d13ca1ac315d434c9a0246d6912f81b7',
    destination: '/blog/why-you-must-have-a-website-for-your-business'
  }
]

const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp']
  },
  async redirects() {
    return legacyRedirects.map((redirect) => ({ ...redirect, permanent: true }))
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
        ]
      }
    ]
  }
}

export default nextConfig
