import type { ReactNode } from "react";

type ChipProps = {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
};

export function Chip({ selected, onClick, children }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`btn rounded-full ${selected ? "btn-primary" : "border-base-300 bg-base-100"}`}
    >
      {children}
    </button>
  );
}
