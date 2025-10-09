import { Footer } from "@/components/main/Footer";
import { Header } from "@/components/main/Header";
import { Card } from "@/components/products/Card";
import { getProductsData } from "../requests/getProductsData";

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

async function Products() {
     const products = await getProductsData()


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
