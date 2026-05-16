function BlogCardSkeleton() {
  return (
    <article className="animate-pulse overflow-hidden rounded-2xl border border-violet-500/20 bg-[#140c24]">
      <div className="h-56 w-full bg-violet-950/60" />
      <div className="space-y-3 px-5 pb-6 pt-4">
        <div className="h-5 w-32 rounded bg-violet-500/25" />
        <div className="h-6 w-full rounded bg-violet-500/20" />
        <div className="h-6 w-4/5 rounded bg-violet-500/15" />
      </div>
    </article>
  );
}

export default BlogCardSkeleton;
