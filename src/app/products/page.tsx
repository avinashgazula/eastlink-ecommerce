import { Footer } from "@/components/main/Footer";
import { Header } from "@/components/main/Header";
import { Card } from "@/components/products/Card";

export interface Product {
    "id": string,
    "name": string,
    "collection": string,
    "price": number,
    "image": string,
    "alt": string
    "isNew": boolean
    "description": string
}

export const dynamic = 'force-dynamic';

const BASE_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_SITE_URL

async function Products() {
    const res = await fetch(`${BASE_URL}/api/products`, {
        cache: "force-cache",
    });
     const products = await res.json();


    return (
        <main className="min-h-screen pt-24">
            <Header />
      <div className="px-4 md:px-6 lg:px-8">
        <div className="max-w-9xl mx-auto">
          <div className="mb-12 mx-2">
            <h2 className="text-sm font-medium tracking-wider text-muted-foreground mb-2">ALL PRODUCTS</h2>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Explore the complete collection of premium eastlink clothing, designed and made in Nova Scotia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <Card key={product.id} {...product} />
            ))}
          </div>
        </div>
            </div>
            <Footer />
        </main>
    )
}

export default Products;
