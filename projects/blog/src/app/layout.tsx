import './globals.css'

export default async function Layout({ children }: Core.Layout) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
