interface IProps {
  size?: string;
  color?: string;
}

export function Loading({ color = 'text-amber-600', size = 'size-6' }: IProps) {
  return (
    <div
      className={`inline-block ${size} animate-spin rounded-full border-[3px] border-current border-t-transparent ${color}`}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
