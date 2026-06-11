import './globals.css';

export const metadata = {
  title: 'Septiyan E.P.',
  description: 'Fullstack Web Developer — Portfolio & Catalog',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
