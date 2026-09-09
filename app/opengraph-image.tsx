import { ImageResponse } from 'next/og'

export const alt = 'Abod — Software Engineer & Content Creator'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          background: '#f3efe4',
          color: '#111318',
          border: '18px solid #111318',
          fontFamily: 'sans-serif'
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 20,
            letterSpacing: 3
          }}
        >
          <span>ABOD.DEV / LIVE SIGNAL</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: 1000,
              fontSize: 100,
              fontWeight: 800,
              letterSpacing: -7,
              lineHeight: 0.92
            }}
          >
            <span>I build software.</span>
            <span style={{ color: '#1f4fff' }}>I teach the messy parts.</span>
          </div>
          <div style={{ marginTop: 36, fontSize: 25 }}>
            Abdulqader Mohammed — Software Engineer & Creator
          </div>
        </div>
      </div>
    ),
    size
  )
}
