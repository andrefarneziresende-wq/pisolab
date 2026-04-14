'use client'

export default function Logo() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
        padding: '20px 0 12px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0',
        }}
      >
        <span
          style={{
            fontSize: '32px',
            fontWeight: 900,
            letterSpacing: '-1px',
            lineHeight: 1,
          }}
        >
          piso
        </span>
        <span
          style={{
            fontSize: '32px',
            fontWeight: 900,
            color: '#ac8256',
            lineHeight: 1,
          }}
        >
          .
        </span>
        <span
          style={{
            fontSize: '32px',
            fontWeight: 300,
            letterSpacing: '-0.5px',
            lineHeight: 1,
          }}
        >
          lab
        </span>
      </div>
      <span
        style={{
          fontSize: '8px',
          letterSpacing: '4px',
          textTransform: 'uppercase' as const,
          opacity: 0.4,
          fontWeight: 600,
          marginTop: '2px',
        }}
      >
        ADMIN
      </span>
    </div>
  )
}
