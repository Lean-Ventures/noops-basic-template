import "./globals.css";

export const metadata = {
  title: "Noops E2E Smoke",
  description: "Minimal deployment smoke app",
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

