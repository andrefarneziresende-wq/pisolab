'use client'

export default function Icon() {
  return (
    <div
      style={{
        width: '24px',
        height: '24px',
        borderRadius: '6px',
        background: 'linear-gradient(135deg, #ac8256, #8a6a45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontSize: '13px',
          fontWeight: 900,
          color: '#fff',
          lineHeight: 1,
          letterSpacing: '-0.5px',
        }}
      >
        p.
      </span>
    </div>
  )
}
