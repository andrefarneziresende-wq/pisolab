import { Star } from 'lucide-react'
import Image from 'next/image'

interface TestimonialCardProps {
  name: string
  text: string
  rating: number
  service?: string
  photo?: string
}

export function TestimonialCard({ name, text, rating, service, photo }: TestimonialCardProps) {
  return (
    <div className="bg-offwhite rounded-2xl p-8 shadow-sm">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-gold fill-gold' : 'text-brown/20'}`}
          />
        ))}
      </div>
      <p className="font-body text-primary-dark/80 leading-relaxed italic">
        &ldquo;{text}&rdquo;
      </p>
      <div className="flex items-center gap-3 mt-6">
        {photo ? (
          <Image
            src={photo}
            alt={name}
            width={44}
            height={44}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-gold/20 flex items-center justify-center">
            <span className="font-heading font-bold text-gold text-sm">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <p className="font-heading font-bold text-sm text-primary-dark">{name}</p>
          {service && (
            <p className="text-xs text-brown font-body">{service}</p>
          )}
        </div>
      </div>
    </div>
  )
}
