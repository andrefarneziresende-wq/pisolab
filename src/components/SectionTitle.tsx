interface SectionTitleProps {
  title: string
  subtitle?: string
  light?: boolean
  centered?: boolean
}

export function SectionTitle({ title, subtitle, light, centered = true }: SectionTitleProps) {
  return (
    <div className={centered ? 'text-center' : ''}>
      {subtitle && (
        <span
          className={`font-display italic text-lg md:text-xl ${
            light ? 'text-gold-light' : 'text-gold'
          }`}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={`font-heading font-black text-3xl md:text-4xl lg:text-5xl mt-1 ${
          light ? 'text-offwhite' : 'text-primary-dark'
        }`}
      >
        {title}
      </h2>
    </div>
  )
}
