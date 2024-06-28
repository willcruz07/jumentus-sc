interface IProps {
  isVisible: boolean;
}

export function ModalLoading({ isVisible }: IProps) {
  if (!isVisible) return null;

  return (
    <>
      <div className="absolute start-0 top-0 size-full rounded-lg bg-white/50 dark:bg-neutral-800/40"></div>

      <div className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <div
          className="inline-block size-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-amber-600 dark:text-amber-500"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  );
}
