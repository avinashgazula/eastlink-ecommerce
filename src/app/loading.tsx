export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
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

      <div className="w-full h-[70vh] md:h-[80vh] lg:h-[90vh] bg-muted animate-pulse relative">
        <div className="absolute inset-0 flex items-center justify-start px-12 md:px-16 lg:px-20">
          <div className="max-w-2xl space-y-6 md:space-y-8">
            <div className="skeleton h-6 w-32 rounded-lg" />
            <div className="skeleton h-16 w-full max-w-xl rounded-lg" />
            <div className="skeleton h-12 w-96 rounded-lg" />
            <div className="flex gap-4">
              <div className="skeleton h-12 w-32 rounded-2xl" />
              <div className="skeleton h-12 w-32 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-6 lg:px-8 py-16 max-w-9xl mx-auto">
        <div className="skeleton h-6 w-48 mx-auto mb-8 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:max-h-[600px]">
          <div className="skeleton md:col-span-2 md:row-span-4 h-[400px] rounded-3xl" />
          <div className="skeleton md:col-span-2 md:row-span-3 h-[240px] rounded-3xl" />
          <div className="skeleton md:col-span-1 md:row-span-3 h-[300px] rounded-3xl" />
          <div className="skeleton md:col-span-1 md:row-span-3 h-[300px] rounded-3xl" />
          <div className="skeleton md:col-span-2 md:row-span-2 h-[200px] rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
