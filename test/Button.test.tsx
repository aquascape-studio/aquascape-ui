import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../primitives/Button.js';

describe('Button primitive', () => {
  // ── Render each variant ──────────────────────────────────────────────────

  it('renders primary variant without crashing', () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button', { name: 'Primary' })).toBeInTheDocument();
  });

  it('renders secondary variant without crashing', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button', { name: 'Secondary' })).toBeInTheDocument();
  });

  it('renders ghost variant without crashing', () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button', { name: 'Ghost' })).toBeInTheDocument();
  });

  it('renders danger variant without crashing', () => {
    render(<Button variant="danger">Danger</Button>);
    expect(screen.getByRole('button', { name: 'Danger' })).toBeInTheDocument();
  });

  // ── Render each size ─────────────────────────────────────────────────────

  it('renders sm size without crashing', () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button', { name: 'Small' })).toBeInTheDocument();
  });

  it('renders md size without crashing', () => {
    render(<Button size="md">Medium</Button>);
    expect(screen.getByRole('button', { name: 'Medium' })).toBeInTheDocument();
  });

  it('renders lg size without crashing', () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button', { name: 'Large' })).toBeInTheDocument();
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  it('has accessible role="button"', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('sets aria-disabled when disabled', () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole('button', { name: 'Disabled' });
    expect(btn).toHaveAttribute('aria-disabled', 'true');
    expect(btn).toBeDisabled();
  });

  it('does not set aria-disabled when not disabled', () => {
    render(<Button>Active</Button>);
    const btn = screen.getByRole('button', { name: 'Active' });
    // aria-disabled is set to undefined / not present when not disabled
    expect(btn).not.toHaveAttribute('aria-disabled', 'true');
  });

  // ── Click behaviour ───────────────────────────────────────────────────────

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole('button', { name: 'Click me' }));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('does NOT call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    );
    await user.click(screen.getByRole('button', { name: 'Disabled' }));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // ── Visual tokens (class names) ──────────────────────────────────────────

  it('primary variant has moss-500 fill class', () => {
    render(<Button variant="primary">P</Button>);
    expect(screen.getByRole('button', { name: 'P' })).toHaveClass('bg-[#2F6E55]');
  });

  it('secondary variant has stone-500 border class', () => {
    render(<Button variant="secondary">S</Button>);
    expect(screen.getByRole('button', { name: 'S' })).toHaveClass('border-[#6F7A6E]');
  });

  it('ghost variant has no background fill class', () => {
    render(<Button variant="ghost">G</Button>);
    const btn = screen.getByRole('button', { name: 'G' });
    expect(btn).toHaveClass('bg-transparent');
    expect(btn).not.toHaveClass('bg-[#2F6E55]');
  });

  it('danger variant has danger fill class', () => {
    render(<Button variant="danger">D</Button>);
    expect(screen.getByRole('button', { name: 'D' })).toHaveClass('bg-[#B8644A]');
  });

  it('sm size has correct height and padding classes', () => {
    render(<Button size="sm">S</Button>);
    const btn = screen.getByRole('button', { name: 'S' });
    expect(btn).toHaveClass('h-8', 'px-3', 'text-[13px]');
  });

  it('md size has correct height and padding classes', () => {
    render(<Button size="md">M</Button>);
    const btn = screen.getByRole('button', { name: 'M' });
    expect(btn).toHaveClass('h-10', 'px-4', 'text-[15px]');
  });

  it('lg size has correct height and padding classes', () => {
    render(<Button size="lg">L</Button>);
    const btn = screen.getByRole('button', { name: 'L' });
    expect(btn).toHaveClass('h-12', 'px-5', 'text-[15px]');
  });

  it('has 4px radius class', () => {
    render(<Button>R</Button>);
    expect(screen.getByRole('button', { name: 'R' })).toHaveClass('rounded-[4px]');
  });

  it('disabled button has opacity-40 class', () => {
    render(<Button disabled>Off</Button>);
    expect(screen.getByRole('button', { name: 'Off' })).toHaveClass('disabled:opacity-40');
  });
});
