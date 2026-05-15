import "./globals.css";

export const metadata = {
  title: "noops-basic-template",
  description: "Minimal noops-ready Next.js and PostgreSQL template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
