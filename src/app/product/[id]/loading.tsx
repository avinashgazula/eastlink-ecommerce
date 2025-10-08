export default function ProductDetailLoading() {
  return (
    <main className="bg-muted min-h-screen">
      <div className="fixed top-4 left-1 right-1 z-50 mx-4 md:mx-6 lg:mx-8">
        <div className="max-w-9xl mx-auto flex h-12 items-center justify-between px-6 md:px-8 lg:px-10 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2">
            <div className="skeleton h-8 w-20 rounded-lg" />
            <div className="skeleton h-8 w-20 rounded-lg" />
          </div>
          <div className="skeleton h-8 w-24 rounded-lg" />
          <div className="flex items-center gap-2">
            <div className="skeleton h-8 w-8 rounded-lg" />
            <div className="skeleton h-8 w-16 rounded-lg" />
          </div>
        </div>
      </div>

      <div className="container bg-muted px-6 py-8 mt-24 md:px-8 lg:px-12 md:py-12 max-w-9xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-16">
            <div className="skeleton h-[300px] w-[300px] lg:w-[600px] lg:h-[600px] rounded-2xl" />

            <section>
              <div className="skeleton h-8 w-32 mb-8 rounded-lg" />
              <div className="space-y-6">
                <div className="skeleton h-16 w-full rounded-lg" />
                <div className="skeleton h-16 w-full rounded-lg" />
                <div className="skeleton h-16 w-full rounded-lg" />
              </div>
            </section>
            <section>
              <div className="skeleton h-8 w-32 mb-8 rounded-lg" />
              <div className="skeleton h-32 w-full rounded-2xl" />
            </section>
          </div>

          <div className="lg:sticky lg:top-8 lg:h-fit space-y-6">
            <div className="bg-background border border-border rounded-2xl px-6 md:px-8 py-4">
              <div className="flex gap-6 md:gap-8">
                <div className="skeleton h-6 w-20 rounded-lg" />
                <div className="skeleton h-6 w-16 rounded-lg" />
                <div className="skeleton h-6 w-20 rounded-lg" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="skeleton h-6 w-24 rounded-full" />
              <div className="skeleton h-10 w-3/4 rounded-lg" />
              <div className="skeleton h-4 w-48 rounded-lg" />
              <div className="space-y-2">
                <div className="skeleton h-4 w-full rounded-lg" />
                <div className="skeleton h-4 w-full rounded-lg" />
                <div className="skeleton h-4 w-2/3 rounded-lg" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <div className="skeleton h-12 w-32 rounded-xl" />
                <div className="skeleton h-12 flex-1 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
