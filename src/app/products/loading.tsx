export default function ProductsLoading() {
  return (
    <main className="min-h-screen pt-24 bg-background">
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

      <div className="px-4 md:px-6 lg:px-8">
        <div className="max-w-9xl mx-auto">
          <div className="mb-12 mx-2">
            <div className="skeleton h-5 w-32 mb-2 rounded-lg" />
            <div className="skeleton h-4 w-96 rounded-lg" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl bg-card">
                <div className="skeleton aspect-[3/4] rounded-none" />
                <div className="p-6 md:p-7 space-y-3">
                  <div className="skeleton h-6 w-3/4 rounded-lg" />
                  <div className="skeleton h-4 w-24 rounded-sm" />
                  <div className="skeleton h-5 w-20 rounded-lg" />
                  <div className="skeleton h-10 w-full rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
