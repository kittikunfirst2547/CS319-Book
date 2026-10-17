type EmptyStateProps = {
  title: string;
  description?: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-2xl bg-base-100 p-10 text-center">
      <p className="font-semibold">{title}</p>
      {description && (
        <p className="mt-1 text-sm text-base-content/60">{description}</p>
      )}
    </div>
  );
}
