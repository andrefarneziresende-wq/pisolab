import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'

interface ServiceCardProps {
  title: string
  description: string
  image: string
  href: string
  index?: number
}

export function ServiceCard({ title, description, image, href, index = 0 }: ServiceCardProps) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <Link href={href} className="group block">
        <div className="relative aspect-square overflow-hidden rounded-2xl">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-transparent" />
        </div>
        <div className="mt-4">
          <h3 className="font-heading font-bold text-xl text-primary-dark group-hover:text-gold transition-colors">
            {title}
          </h3>
          <p className="mt-1 text-sm text-brown line-clamp-2 font-body">{description}</p>
          <span className="inline-flex items-center gap-1 mt-3 text-sm font-heading font-bold text-gold group-hover:gap-2 transition-all">
            Saber más <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </ScrollReveal>
  )
}
