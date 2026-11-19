export function MenuSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 max-w-2xl mx-auto space-y-4 animate-pulse">
      {/* Header skeleton */}
      <div className="h-16 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
      {/* Cover skeleton */}
      <div className="h-48 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
      {/* Category nav skeleton */}
      <div className="flex gap-2 overflow-hidden py-2">
        <div className="h-9 w-24 rounded-xl bg-zinc-200 dark:bg-zinc-800 shrink-0" />
        <div className="h-9 w-28 rounded-xl bg-zinc-200 dark:bg-zinc-800 shrink-0" />
        <div className="h-9 w-24 rounded-xl bg-zinc-200 dark:bg-zinc-800 shrink-0" />
      </div>
      {/* Cards skeletons */}
      <div className="space-y-3">
        <div className="h-28 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-28 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-28 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
}
