import { ImageResponse } from 'next/og'

export const alt = 'Whitney Stevenson — Executive Leadership, Strategy & Advisory'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#111827',
          color: '#f8fafc',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 20, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#fbbf24', fontWeight: 700 }}>
            WHITNEYSTEVENSON.COM
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '960px' }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, color: '#ffffff' }}>
            Whitney Stevenson
          </div>
          <div style={{ fontSize: 32, lineHeight: 1.35, color: '#cbd5e1', fontWeight: 400 }}>
            Executive Leadership, Strategy & Advisory
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.14)', paddingTop: '24px', fontSize: 20, color: '#94a3b8' }}>
          <div>https://whitneystevenson.com</div>
          <div>Verified Architecture & Research</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
