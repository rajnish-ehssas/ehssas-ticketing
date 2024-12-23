'use client'
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2>Something went wrong! global errror </h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}