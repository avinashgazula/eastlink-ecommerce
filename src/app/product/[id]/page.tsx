import { Product } from "@/app/products/page";
import { Header } from "@/components/main/Header";
import { ProductDetail } from "@/components/products/ProductDetail";
import { notFound } from "next/navigation";

const BASE_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_SITE_URL

export async function generateStaticParams() {

  const res = await fetch(`${BASE_URL}/api/products`, {
    cache: "force-cache",
  });
  const products = await res.json();
  return products.map((product: Product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({
  params
}: Readonly<{
  params: Promise<{ id: string }>
}>) {
  const { id } = await params;

  const res = await fetch(`${BASE_URL}/api/products`, {
    cache: "force-cache",
  });
  const products = await res.json();
  const product = products.find((p: Product) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-muted min-h-screen">
      <Header />
      <ProductDetail product={product} />
    </main>
  );
}
