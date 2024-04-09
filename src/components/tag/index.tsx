import { ReactNode } from "react";

type TagProps = {
  Icon: ReactNode;
  amount: number;
  label: string;
};

function Tag({ Icon, amount, label }: TagProps) {
  return (
    <div className="bg-stone-950 sm:px-2 px-1 py-1 rounded flex items-center sm:gap-2 gap-[2px]">
      {Icon}
      <p className="sm:text-sm text-xs text-white font-semibold">
        {amount} <span className="sm:inline hidden font-normal">{label}</span>
      </p>
    </div>
  );
}

export default Tag;
