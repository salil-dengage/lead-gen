# DÂ·engage Presentation Template â€” Technical Reference

This document describes the official DÂ·engage Standard Generic Deck Template (PPTX) for use when creating presentations. The template PPTX file must be provided in the conversation as an attachment when creating decks.

## Slide Dimensions
- **Size:** 720 x 405 pt (10.0 x 5.6 inches) â€” Widescreen 16:9
- **Format:** Google Slides origin, exported as PPTX

## Brand Colors
| Color | Hex | Usage |
|-------|-----|-------|
| DÂ·engage Blue (Primary) | `#125CFA` | Header bars, accent shapes, card backgrounds |
| Black | `#000000` | Body text, dark card backgrounds |
| White | `#FFFFFF` | Text on colored backgrounds, slide background |
| Gray | `#595959` | Secondary text |
| Light Gray | `#EEEEEE` | Subtle backgrounds |

## Logo
- DÂ·engage logo appears on Slide 1 (cover) and Slide 9 (closing)
- Logo is embedded as picture element, positioned top-left on cover

## Slide Layouts (9 slides)

### Slide 1: COVER
- **Purpose:** Title slide / opening
- **Background:** White
- **Elements:**
  - DÂ·engage logo (top-left, picture)
  - Title box: pos=(41,151) size=(606x106)pt, fill=#125CFA, white bold text
  - Subtitle box: pos=(41,265) size=(606x29)pt, fill=#000000, white text
- **Usage:** Presentation title, client name, date
- **Layout reference:** slideLayout15

### Slide 2: NUMBERED LIST
- **Purpose:** Agenda, key points, numbered items
- **Background:** White
- **Elements:**
  - Header bar: pos=(24,23) size=(670x106)pt, fill=#125CFA, white bold title text
  - Content area: pos=(24,146) size=(610x175)pt, no fill, black numbered list text
- **Usage:** Agenda, table of contents, ordered points, key takeaways
- **Layout reference:** slideLayout16

### Slide 3: BOLD TEXT BLOCKS (Highlight)
- **Purpose:** Key messages with emphasis, feature highlights
- **Background:** White
- **Elements:**
  - Header bar: pos=(24,23) size=(670x106)pt, fill=#125CFA, white bold title
  - Content block: pos=(24,141) size=(621x162)pt, fill=#125CFA, white text with bold highlights (colored inline)
- **Usage:** Value propositions, differentiators, important callouts with mixed bold/regular text
- **Layout reference:** slideLayout16

### Slide 4: TWO COLUMN TEXT
- **Purpose:** Comparison, before/after, dual topics
- **Background:** White
- **Elements:**
  - Header bar: pos=(24,23) size=(670x106)pt, fill=#125CFA, white bold title
  - Left column: pos=(24,148) size=(285x212)pt, fill=#000000, white text
  - Right column: pos=(362,148) size=(285x174)pt, fill=#000000, white text
- **Usage:** Comparison slides, problem vs solution, two related topics side by side
- **Layout reference:** slideLayout16

### Slide 5: THREE CARDS WITH ICONS
- **Purpose:** Three key features/benefits/pillars
- **Background:** White
- **Elements:**
  - Header bar: pos=(24,23) size=(670x60)pt, fill=#125CFA, white bold title (shorter height)
  - Card 1: pos=(20,106) size=(217x92)pt, fill=#125CFA, white text + icon image above
  - Card 2: pos=(238,106) size=(217x92)pt, fill=#125CFA, white text + icon image above
  - Card 3: pos=(481,106) size=(217x92)pt, fill=#125CFA, white text + icon image above
  - 3 icon pictures positioned above each card
- **Usage:** Three pillars, three features, three benefits, three modules
- **Layout reference:** slideLayout16

### Slide 6: IMAGE LEFT + TEXT RIGHT
- **Purpose:** Visual + detailed explanation
- **Background:** White
- **Elements:**
  - Header bar: pos=(24,23) size=(670x60)pt, fill=#125CFA, white bold title (shorter height)
  - Left content block: pos=(24,100) size=(345x252)pt, fill=#125CFA, contains subtitle + bullet list in white text
  - Right side: screenshot/image picture element
- **Usage:** Product screenshots, architecture diagrams, feature deep-dives
- **Layout reference:** slideLayout16

### Slide 7: TWO CARDS WITH ICONS (Compact)
- **Purpose:** Two features/options with visual icons
- **Background:** White
- **Elements:**
  - Header bar: pos=(24,23) size=(670x60)pt, fill=#125CFA, white bold title
  - Left card: pos=(60,129) size=(272x78)pt, fill=#125CFA, white text
  - Right card: pos=(376,129) size=(272x78)pt, fill=#125CFA, white text
  - 2 icon pictures below cards
- **Usage:** Two deployment options, two approaches, A vs B comparison
- **Layout reference:** slideLayout16

### Slide 8: ARCHITECTURE / FLOW DIAGRAM
- **Purpose:** Technical architecture, process flow, system diagram
- **Background:** White
- **Elements:**
  - Header bar: pos=(24,23) size=(670x60)pt, fill=#125CFA, white bold title
  - Large picture element: architecture/flow diagram image
- **Usage:** System architecture, data flow, integration topology, implementation phases
- **Layout reference:** slideLayout16

### Slide 9: THANK YOU / CLOSING
- **Purpose:** Closing slide
- **Background:** White
- **Elements:**
  - "Thank You" text: pos=(24,138) size=(670x60)pt, centered, no fill
  - "dengage.com" link: pos=(118,207) size=(483x19)pt, fill=#125CFA
  - DÂ·engage logo picture
- **Usage:** Always the last slide. Can add contact info.
- **Layout reference:** slideLayout15

## Presentation Structure Guidelines

### Standard Pre-Sales Deck (8-12 slides)
1. **Cover** (Slide 1 layout) â€” Client name, presentation title, date
2. **Agenda** (Slide 2 layout) â€” 4-6 numbered items
3. **Challenge/Pain Points** (Slide 3 or 4 layout) â€” Prospect's specific challenges
4. **DÂ·engage Solution Overview** (Slide 5 layout) â€” 3 key pillars (CDP + MA + AI)
5. **Product Deep-Dive** (Slide 6 layout) â€” Screenshot + feature details
6. **Use Cases** (Slide 3 or 4 layout) â€” Industry-specific use cases
7. **Case Study / ROI** (Slide 5 layout) â€” 3 metric callouts from relevant case study
8. **Technical Architecture** (Slide 8 layout) â€” Architecture diagram
9. **Implementation Timeline** (Slide 2 layout) â€” Phased approach
10. **Why DÂ·engage** (Slide 3 layout) â€” Key differentiators
11. **Thank You** (Slide 9 layout) â€” Contact info

### Quick Pitch Deck (5-6 slides)
1. Cover â†’ 2. Pain Points â†’ 3. Solution (3 pillars) â†’ 4. Case Study Metrics â†’ 5. Next Steps â†’ 6. Thank You

## Font Guidelines (from template)
- **Title text:** Bold, white on blue background
- **Body text:** Regular weight, appropriate contrast
- **Metric callouts:** Large bold numbers

## Important Notes for Claude
- When asked to create a presentation, request the PPTX template file as attachment if not already provided in conversation
- Use the editing workflow (unpack â†’ modify slides â†’ repack) to maintain template styling
- Match all colors to `#125CFA` (DÂ·engage Blue) for consistency
- Keep text concise â€” the template favors impactful short text, not paragraphs
- Every content slide uses slideLayout16, only cover and closing use slideLayout15
