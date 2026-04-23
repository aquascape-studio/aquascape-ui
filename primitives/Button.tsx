import { forwardRef, type ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

// Ink-green design tokens (no ad-hoc hex values beyond danger which has no token)
const colors = {
  moss500: '#2F6E55', // primary fill
  moss300: '#6FAE8E', // focus ring
  ink800: '#0F2A20', // card background
  ink700: '#163B2D', // hover state
  bone100: '#EDE7D9', // foreground text
  stone500: '#6F7A6E', // border (secondary)
  danger: '#B8644A', // danger fill
} as const;

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const base =
  'inline-flex items-center justify-center font-medium rounded-[4px] ' +
  'transition-colors duration-[160ms] ease-out ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'disabled:opacity-40 disabled:pointer-events-none select-none';

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'text-[#EDE7D9]',
    'bg-[#2F6E55]',
    'hover:bg-[#163B2D]',
    'focus-visible:ring-[#6FAE8E]',
  ].join(' '),
  secondary: [
    'bg-transparent',
    'text-[#EDE7D9]',
    'border border-[#6F7A6E]',
    'hover:bg-[#163B2D]',
    'focus-visible:ring-[#6FAE8E]',
  ].join(' '),
  ghost: [
    'bg-transparent',
    'text-[#EDE7D9]',
    'hover:bg-[#163B2D]',
    'focus-visible:ring-[#6FAE8E]',
  ].join(' '),
  danger: [
    'text-[#EDE7D9]',
    'bg-[#B8644A]',
    'hover:bg-[#163B2D]',
    'focus-visible:ring-[#6FAE8E]',
  ].join(' '),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-[13px]',
  md: 'h-10 px-4 text-[15px]',
  lg: 'h-12 px-5 text-[15px]',
};

// Export tokens for consumers who need them (e.g. tests)
export { colors as buttonTokens };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className,
    type = 'button',
    disabled,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      className={clsx(
        base,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    />
  );
});

Button.displayName = 'Button';
