import Link from 'next/link'
import type { ReactNode } from 'react'

interface ButtonProps {
  href?: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

const variants = {
  primary:
    'bg-gold hover:bg-gold-light text-primary-dark font-bold shadow-lg shadow-gold/20 hover:shadow-gold/30',
  secondary:
    'bg-offwhite/10 hover:bg-offwhite/20 text-offwhite border border-offwhite/20 backdrop-blur-sm',
  outline:
    'bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-primary-dark',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center font-heading rounded-lg transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
