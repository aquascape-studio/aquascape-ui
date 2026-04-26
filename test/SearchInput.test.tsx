import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from '../primitives/SearchInput.js';

describe('SearchInput primitive', () => {
  // ── Render ───────────────────────────────────────────────────────────────

  it('renders an input element', () => {
    render(<SearchInput value="" onChange={() => {}} />);
    // role="searchbox" is explicit on the input
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('renders the default placeholder text', () => {
    render(<SearchInput value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument();
  });

  it('renders a custom placeholder', () => {
    render(<SearchInput value="" onChange={() => {}} placeholder="Find plants…" />);
    expect(screen.getByPlaceholderText('Find plants…')).toBeInTheDocument();
  });

  it('displays the controlled value', () => {
    render(<SearchInput value="moss" onChange={() => {}} />);
    expect(screen.getByRole('searchbox')).toHaveValue('moss');
  });

  // ── Interaction ──────────────────────────────────────────────────────────

  it('calls onChange with the new string when user types', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SearchInput value="" onChange={handleChange} />);
    await user.type(screen.getByRole('searchbox'), 'a');
    expect(handleChange).toHaveBeenCalledWith('a');
  });

  it('calls onChange once per character typed', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SearchInput value="" onChange={handleChange} />);
    await user.type(screen.getByRole('searchbox'), 'hi');
    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SearchInput value="" onChange={handleChange} disabled />);
    await user.type(screen.getByRole('searchbox'), 'x');
    expect(handleChange).not.toHaveBeenCalled();
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  it('has an aria-label derived from the placeholder', () => {
    render(<SearchInput value="" onChange={() => {}} placeholder="Search plants" />);
    expect(screen.getByRole('searchbox')).toHaveAttribute('aria-label', 'Search plants');
  });

  it('uses default aria-label when no placeholder provided', () => {
    render(<SearchInput value="" onChange={() => {}} />);
    expect(screen.getByRole('searchbox')).toHaveAttribute('aria-label', 'Search…');
  });

  it('input is disabled when disabled prop is set', () => {
    render(<SearchInput value="" onChange={() => {}} disabled />);
    expect(screen.getByRole('searchbox')).toBeDisabled();
  });

  // ── Styling / tokens ─────────────────────────────────────────────────────

  it('wrapper has ink-800 background token class', () => {
    const { container } = render(<SearchInput value="" onChange={() => {}} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('bg-[#0F2A20]');
  });

  it('wrapper has rounded-lg class', () => {
    const { container } = render(<SearchInput value="" onChange={() => {}} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('rounded-lg');
  });

  it('wrapper has border token class', () => {
    const { container } = render(<SearchInput value="" onChange={() => {}} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('border');
  });

  it('merges a custom className onto the wrapper', () => {
    const { container } = render(
      <SearchInput value="" onChange={() => {}} className="my-search" />,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('my-search');
  });

  it('input has foreground text token class', () => {
    render(<SearchInput value="" onChange={() => {}} />);
    expect(screen.getByRole('searchbox')).toHaveClass('text-[#EDE7D9]');
  });
});
