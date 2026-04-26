import { forwardRef, type HTMLAttributes } from 'react';
import clsx from 'clsx';

export type CardDifficulty = 'easy' | 'medium' | 'hard';
export type LightRequirement = 'low' | 'medium' | 'high';

export interface PlantCardProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  scientificName: string;
  difficulty: CardDifficulty;
  type: string;
  lightRequirement: LightRequirement;
  co2Required: boolean;
}

// Ink-green design tokens
const colors = {
  ink900: '#0A1F18',
  ink800: '#0F2A20',
  ink700: '#163B2D',
  moss500: '#2F6E55',
  moss300: '#6FAE8E',
  bone100: '#EDE7D9',
  bone300: '#CFC7B4',
  stone500: '#6F7A6E',
  // Badge semantic colors — difficulty
  easyFg: '#6FAE8E',   // moss300
  mediumFg: '#E6B44A', // amber
  hardFg: '#B8644A',   // danger/red-ish
} as const;

const difficultyBadge: Record<CardDifficulty, { bg: string; text: string; label: string }> = {
  easy: {
    bg: 'bg-[#0F2A20] border border-[#6FAE8E]/40',
    text: 'text-[#6FAE8E]',
    label: 'Easy',
  },
  medium: {
    bg: 'bg-[#0F2A20] border border-[#E6B44A]/40',
    text: 'text-[#E6B44A]',
    label: 'Medium',
  },
  hard: {
    bg: 'bg-[#0F2A20] border border-[#B8644A]/40',
    text: 'text-[#B8644A]',
    label: 'Hard',
  },
};

const lightLabel: Record<LightRequirement, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

// Leaf SVG icon (inline, no library dependency)
function LeafIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      width="12"
      height="12"
    >
      <path d="M8 1C4.134 1 1 4.134 1 8c0 1.914.758 3.65 1.99 4.94C4.002 10.505 5.873 9 8 9c2.127 0 3.998 1.505 5.01 3.94A6.967 6.967 0 0 0 15 8c0-3.866-3.134-7-7-7z" />
    </svg>
  );
}

// Sun SVG icon
function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      width="12"
      height="12"
    >
      <circle cx="8" cy="8" r="3" />
      <path
        fillRule="evenodd"
        d="M8 1a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1A.75.75 0 0 1 8 1zm0 11.5a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1A.75.75 0 0 1 8 12.5zM1 8a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1A.75.75 0 0 1 1 8zm11.5 0a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75zM3.22 3.22a.75.75 0 0 1 1.06 0l.707.707a.75.75 0 0 1-1.06 1.06L3.22 4.28a.75.75 0 0 1 0-1.06zm8.486 8.486a.75.75 0 0 1 1.06 0l.707.707a.75.75 0 1 1-1.06 1.06l-.707-.707a.75.75 0 0 1 0-1.06zm-8.486 0a.75.75 0 0 1 0 1.06l-.707.707a.75.75 0 0 1-1.06-1.06l.707-.707a.75.75 0 0 1 1.06 0zm8.486-8.486a.75.75 0 0 1 0-1.06l.707-.707a.75.75 0 1 1 1.06 1.06l-.707.707a.75.75 0 0 1-1.06 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// CO2 bubble icon
function CO2Icon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      width="12"
      height="12"
    >
      <path
        fillRule="evenodd"
        d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zm0-9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-2 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-2 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export const PlantCard = forwardRef<HTMLDivElement, PlantCardProps>(function PlantCard(
  { name, scientificName, difficulty, type, lightRequirement, co2Required, className, ...rest },
  ref,
) {
  const badge = difficultyBadge[difficulty];

  return (
    <div
      ref={ref}
      className={clsx(
        'flex flex-col gap-3 p-5 rounded-lg',
        'bg-[#0F2A20] border border-[#6F7A6E]/40',
        'transition-colors duration-[160ms] ease-out',
        className,
      )}
      {...rest}
    >
      {/* Header row: name + difficulty badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="font-sans font-semibold text-[15px] text-[#EDE7D9] leading-snug truncate">
            {name}
          </span>
          <span className="font-sans text-[13px] text-[#CFC7B4] italic leading-snug truncate">
            {scientificName}
          </span>
        </div>

        {/* Difficulty badge */}
        <span
          className={clsx(
            'inline-flex items-center shrink-0 px-2 h-6 rounded-full text-[11px] font-medium',
            badge.bg,
            badge.text,
          )}
          data-difficulty={difficulty}
        >
          {badge.label}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#6F7A6E]/25" />

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {/* Plant type */}
        <span className="inline-flex items-center gap-1.5 text-[12px] text-[#CFC7B4]">
          <LeafIcon className="text-[#2F6E55]" />
          {type}
        </span>

        {/* Light requirement */}
        <span className="inline-flex items-center gap-1.5 text-[12px] text-[#CFC7B4]">
          <SunIcon className="text-[#6FAE8E]" />
          {lightLabel[lightRequirement]} light
        </span>

        {/* CO2 */}
        <span
          className={clsx(
            'inline-flex items-center gap-1.5 text-[12px]',
            co2Required ? 'text-[#6FAE8E]' : 'text-[#6F7A6E]',
          )}
        >
          <CO2Icon className={co2Required ? 'text-[#6FAE8E]' : 'text-[#6F7A6E]'} />
          {co2Required ? 'CO₂ required' : 'No CO₂'}
        </span>
      </div>
    </div>
  );
});

PlantCard.displayName = 'PlantCard';
