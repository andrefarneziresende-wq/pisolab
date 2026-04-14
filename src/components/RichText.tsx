import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export function RichText({ data }: { data: SerializedEditorState | null | undefined }) {
  if (!data) return null
  return (
    <div className="prose prose-brown max-w-none font-body text-primary-dark/80 leading-relaxed [&_h2]:font-heading [&_h2]:font-bold [&_h2]:text-xl [&_h2]:text-primary-dark [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:font-heading [&_h3]:font-bold [&_h3]:text-lg [&_h3]:text-primary-dark [&_a]:text-gold [&_a:hover]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_p]:mb-4">
      <PayloadRichText data={data} />
    </div>
  )
}
