import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className='flex-grow max-w-2xl mx-auto w-full flex flex-col'>{children}</main>
      <Footer />
    </>
  );
}
