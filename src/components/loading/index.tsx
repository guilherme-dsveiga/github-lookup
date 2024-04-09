import { CircleNotch } from "@phosphor-icons/react";

type LoadingProps = {
  variant?: "dark" | "light";
};

function Loading({ variant = "light" }: LoadingProps) {
  return (
    <div className="flex items-center justify-center">
      <CircleNotch
        className={`animate-spin ${
          variant === "dark" ? "text-stone-800" : "text-stone-50"
        } `}
        size={32}
      />
    </div>
  );
}

export default Loading;
