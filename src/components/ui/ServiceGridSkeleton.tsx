export function ServiceGridSkeleton() {
  return (
    <div
      aria-label="กำลังโหลดบริการ"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index} className="card rounded-2xl bg-base-100 shadow-sm">
          <div className="card-body gap-3">
            <div className="skeleton h-40 w-full" />
            <div className="skeleton h-4 w-24" />
            <div className="skeleton h-6 w-3/4" />
            <div className="skeleton h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
