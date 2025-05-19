// Front Layout
import Navbar from "@/components/front/Navbar";
import Footer from "@/components/front/Footer";

export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <div className="container mx-auto p-4">{children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
}
