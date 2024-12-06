import { twMerge } from "tailwind-merge";
import SearchIcon from "~/assets/search-icon.svg";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  isLoading?: boolean;
}

export default function TextInput({
  value = "",
  onChange,
  placeholder,
  className,
  error,
  isLoading,
  disabled,
  ...restProps
}: TextInputProps) {
  return (
    <div className="space-y-1 font-yalenewroman">
      <div
        className={twMerge(
          "relative flex h-9 w-full items-center",
          disabled && "opacity-50",
          error && "accent-accent-warm-red",
          className,
        )}
      >
        <input
          className={twMerge(
            "bg-background-secondary h-9 w-full border border-gray-300 bg-surface-secondary pl-2 pr-7 text-base leading-9 text-primary placeholder:text-primary-subtle",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          )}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          type="text"
          {...restProps}
        />
        <div className="pointer-events-none absolute right-2 flex transform">
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
          ) : (
            <SearchIcon
              alt=""
              width="21"
              height="21"
              viewBox="0 0 15.793 15.793"
            />
          )}
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
