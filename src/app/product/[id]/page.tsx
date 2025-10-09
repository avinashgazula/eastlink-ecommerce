import { Product } from "@/app/products/page";
import { getProductsData } from "@/app/requests/getProductsData";
import { Header } from "@/components/main/Header";
import { ProductDetail } from "@/components/products/ProductDetail";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export default async function ProductPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;


  const products = await getProductsData()
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
