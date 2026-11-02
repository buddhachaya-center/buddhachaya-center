import '../globals.css'
import { fontVariables } from '@/lib/fonts'

export const metadata = {
  title: 'Admin | Buddhachaya',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  )
}
