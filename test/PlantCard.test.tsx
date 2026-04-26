import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PlantCard } from '../primitives/PlantCard.js';

const defaultProps = {
  name: 'Dwarf Hairgrass',
  scientificName: 'Eleocharis parvula',
  difficulty: 'easy' as 'easy' | 'medium' | 'hard',
  type: 'Carpeting',
  lightRequirement: 'high' as 'low' | 'medium' | 'high',
  co2Required: true,
};

describe('PlantCard primitive', () => {
  // ── Render / content ─────────────────────────────────────────────────────

  it('renders the plant common name', () => {
    render(<PlantCard {...defaultProps} />);
    expect(screen.getByText('Dwarf Hairgrass')).toBeInTheDocument();
  });

  it('renders the scientific name', () => {
    render(<PlantCard {...defaultProps} />);
    expect(screen.getByText('Eleocharis parvula')).toBeInTheDocument();
  });

  it('renders the plant type', () => {
    render(<PlantCard {...defaultProps} />);
    expect(screen.getByText('Carpeting')).toBeInTheDocument();
  });

  it('renders light requirement label', () => {
    render(<PlantCard {...defaultProps} lightRequirement="low" />);
    expect(screen.getByText('Low light')).toBeInTheDocument();
  });

  it('renders medium light requirement label', () => {
    render(<PlantCard {...defaultProps} lightRequirement="medium" />);
    expect(screen.getByText('Medium light')).toBeInTheDocument();
  });

  it('renders high light requirement label', () => {
    render(<PlantCard {...defaultProps} lightRequirement="high" />);
    expect(screen.getByText('High light')).toBeInTheDocument();
  });

  // ── Difficulty badge ─────────────────────────────────────────────────────

  it('renders "Easy" badge for easy difficulty', () => {
    render(<PlantCard {...defaultProps} difficulty="easy" />);
    expect(screen.getByText('Easy')).toBeInTheDocument();
  });

  it('renders "Medium" badge for medium difficulty', () => {
    render(<PlantCard {...defaultProps} difficulty="medium" />);
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });

  it('renders "Hard" badge for hard difficulty', () => {
    render(<PlantCard {...defaultProps} difficulty="hard" />);
    expect(screen.getByText('Hard')).toBeInTheDocument();
  });

  it('easy badge has green token text class', () => {
    render(<PlantCard {...defaultProps} difficulty="easy" />);
    const badge = screen.getByText('Easy');
    expect(badge).toHaveClass('text-[#6FAE8E]');
  });

  it('medium badge has amber token text class', () => {
    render(<PlantCard {...defaultProps} difficulty="medium" />);
    const badge = screen.getByText('Medium');
    expect(badge).toHaveClass('text-[#E6B44A]');
  });

  it('hard badge has danger token text class', () => {
    render(<PlantCard {...defaultProps} difficulty="hard" />);
    const badge = screen.getByText('Hard');
    expect(badge).toHaveClass('text-[#B8644A]');
  });

  it('badge has correct data-difficulty attribute', () => {
    render(<PlantCard {...defaultProps} difficulty="medium" />);
    const badge = screen.getByText('Medium');
    expect(badge).toHaveAttribute('data-difficulty', 'medium');
  });

  // ── CO2 ──────────────────────────────────────────────────────────────────

  it('shows "CO₂ required" when co2Required is true', () => {
    render(<PlantCard {...defaultProps} co2Required={true} />);
    expect(screen.getByText('CO₂ required')).toBeInTheDocument();
  });

  it('shows "No CO₂" when co2Required is false', () => {
    render(<PlantCard {...defaultProps} co2Required={false} />);
    expect(screen.getByText('No CO₂')).toBeInTheDocument();
  });

  // ── Styling / tokens ─────────────────────────────────────────────────────

  it('card root has ink-800 background class', () => {
    const { container } = render(<PlantCard {...defaultProps} />);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('bg-[#0F2A20]');
  });

  it('card root has rounded-lg class', () => {
    const { container } = render(<PlantCard {...defaultProps} />);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('rounded-lg');
  });

  // ── Custom className passthrough ─────────────────────────────────────────

  it('merges a custom className onto the card root', () => {
    const { container } = render(<PlantCard {...defaultProps} className="my-custom-class" />);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('my-custom-class');
  });
});
