export function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="aspect-[4/3] animate-pulse rounded-[28px] border border-hairline bg-surface-solid"
        />
      ))}
    </div>
  );
}
