import type { ReactNode } from "react";

type ChipProps = {
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
};

export function Chip({ selected, onClick, disabled = false, children }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      disabled={disabled}
      className={`btn rounded-full ${selected ? "btn-primary" : "border-base-300 bg-base-100"}`}
    >
      {children}
    </button>
  );
}
