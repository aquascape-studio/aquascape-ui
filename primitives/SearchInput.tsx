import { forwardRef, type InputHTMLAttributes } from 'react';
import clsx from 'clsx';

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Inline search magnifier SVG — no icon library dependency
function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      width="14"
      height="14"
      className="shrink-0 text-[#6F7A6E]"
    >
      <path
        fillRule="evenodd"
        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754zM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { value, onChange, placeholder = 'Search…', className, disabled, ...rest },
  ref,
) {
  return (
    <div
      className={clsx(
        'inline-flex items-center gap-2 w-full',
        'h-10 px-3 rounded-lg',
        'bg-[#0F2A20] border border-[#6F7A6E]/40',
        'transition-colors duration-[160ms] ease-out',
        'focus-within:border-[#6FAE8E] focus-within:ring-1 focus-within:ring-[#6FAE8E]',
        disabled && 'opacity-40 pointer-events-none',
        className,
      )}
    >
      <SearchIcon />
      <input
        ref={ref}
        type="search"
        role="searchbox"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          'flex-1 min-w-0 bg-transparent outline-none',
          'font-sans text-[15px] text-[#EDE7D9]',
          'placeholder:text-[#6F7A6E]',
          '[&::-webkit-search-cancel-button]:hidden',
          '[&::-webkit-search-decoration]:hidden',
        )}
        {...rest}
      />
    </div>
  );
});

SearchInput.displayName = 'SearchInput';
