import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { CoffeeCard } from "@/components/card";
import { Header } from "@/components/header";
import { ProductoRow, getProductos } from "@/lib/db/queries/products";
import Head from 'next/head'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home({ products }: { products: ProductoRow[]}) {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} flex min-h-screen items-center justify-center bg-background font-sans dark:bg-black`}
    >
      <main>
        {/* barra de navegacion principal */}
        <Header/>

        {/* contenido principal */}
        <div className="flex h-screen w-screen items-center flex-col">
          <div className="flex w-full h-1/2 justify-end fondo">
              <Image
                src="/el-cafe-adulto-cosechando.jpg"
                alt="Logo"
                width={800}
                height={800}
                className="absolute -top-4 -right-4 brightness-75 "
              />
            <div className="absolute top-1/3 left-16 z-10 text-primary text-4xl font-bold leading-tight">
              El café que deseas,<br />del origen más puro.
            </div>
            <div className="absolute bottom-10 left-16 z-10 text-primary text-sm">
              Descubre nuestros granos seleccionados y vive la experiencia del café auténtico.
            </div>
          </div>

          {/* Tarjetas de cafe */}
          <div className="flex bg-background justify-center items-center gap-4 w-full h-1/2 p-2">
            {products.map((p) => (
              <CoffeeCard
                key={p.id_producto}
                variant="vertical"
                name={p.nombre}
                description={p.descripcion}
                price={p.precio}
                imageSrc="/cafe-ejemplo.jpg"
                buttonHref="/shop/cart"
              />
            ))}

          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const products = await getProductos();

  return {
    props: { products }
  };
}
