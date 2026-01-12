/**
 * QUSD Pitch Deck System
 *
 * Components and tokens for creating presentation materials,
 * pitch decks, and PDF exports.
 */

// Tokens
export * from './tokens'
export { default as pitchDeckTokens } from './tokens'

// Components
export { Slide, type SlideProps, type SlideVariant } from './components/Slide'
export { SlideTitle, type SlideTitleProps, type TitleSize } from './components/SlideTitle'
export { ContentCard, type ContentCardProps, type CardVariant } from './components/ContentCard'
export { Badge, type BadgeProps, type BadgeVariant } from './components/Badge'
export { Timeline, type TimelineProps, type TimelineItem } from './components/Timeline'
export { Grid, type GridProps } from './components/Grid'
export { BulletList, type BulletListProps } from './components/BulletList'
