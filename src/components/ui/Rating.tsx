type RatingProps = {
  value: number;
  count?: number;
};

export function Rating({ value, count }: RatingProps) {
  return (
    <span
      className="text-sm text-amber-700"
      aria-label={`คะแนน ${value} จาก 5`}
    >
      <span aria-hidden="true">★</span> {value}
      {count !== undefined && ` · ${count} รีวิว`}
    </span>
  );
}
