import Navbar from "@/components/Navbar";
import "./globals.css";
export const metadata = {
  title: 'Professor.ai',
  description: 'A simple AI app to chat with your PDFs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
