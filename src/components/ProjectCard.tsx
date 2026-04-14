import Link from 'next/link'
import Image from 'next/image'
import { MapPin } from 'lucide-react'

interface ProjectCardProps {
  title: string
  image: string
  category: string
  location?: string
  href: string
}

export function ProjectCard({ title, image, category, location, href }: ProjectCardProps) {
  return (
    <Link href={href} className="group block flex-shrink-0 w-[340px] md:w-[400px]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-gold/90 backdrop-blur-sm text-primary-dark font-heading font-bold text-xs px-3 py-1.5 rounded-full">
            {category}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-heading font-bold text-lg text-offwhite">{title}</h3>
          {location && (
            <p className="flex items-center gap-1 mt-1 text-xs text-offwhite/70">
              <MapPin className="w-3 h-3" /> {location}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
