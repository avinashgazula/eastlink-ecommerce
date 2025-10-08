import { Header } from "@/components/main/Header";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="text-center space-y-6 max-w-md">
          <AlertCircle className="h-20 w-20 text-muted-foreground mx-auto" aria-hidden="true" />

          <div className="space-y-2">
            <h1 className="text-4xl font-serif font-medium tracking-tight">
              404
            </h1>
            <h2 className="text-xl font-medium text-muted-foreground">
              Page Not Found
            </h2>
          </div>

          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link href="/" className="btn btn-primary">
              Back to Home
            </Link>
            <Link href="/products" className="btn btn-ghost">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
