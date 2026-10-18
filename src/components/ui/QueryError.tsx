type QueryErrorProps = {
  message: string;
  onRetry: () => void;
};

export function QueryError({ message, onRetry }: QueryErrorProps) {
  return (
    <div role="alert" className="rounded-2xl bg-base-100 p-10 text-center">
      <p className="font-semibold">โหลดข้อมูลไม่สำเร็จ</p>
      <p className="mt-1 text-sm text-base-content/60">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="btn btn-primary mt-4 rounded-xl"
      >
        ลองอีกครั้ง
      </button>
    </div>
  );
}
