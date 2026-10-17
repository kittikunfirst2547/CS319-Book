type ImagePlaceholderProps = {
  label?: string;
  className?: string;
};

export function ImagePlaceholder({
  label = "รูปบริการ",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center rounded-xl bg-base-300 text-xs text-primary ${className}`}
    >
      {label}
    </div>
  );
}
