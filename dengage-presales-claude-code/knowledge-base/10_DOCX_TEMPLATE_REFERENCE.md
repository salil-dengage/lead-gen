# DÂ·engage Word Document Template â€” Technical Reference

This document describes the official DÂ·engage DOCX template for creating Word documents (RFP responses, proposals, technical documents, etc.). The template DOCX file must be provided in the conversation as an attachment when creating documents.

## Template Structure

### Page Layout
- **Page size:** US Letter (12240 x 15840 DXA / 8.5 x 11 inches)
- **Orientation:** Portrait
- **Margins:** Left=1440, Right=1440, Top=1170, Bottom=709 DXA (1 inch sides, ~0.8in top, ~0.5in bottom)
- **Header height:** 288 DXA
- **First page:** Different header (title page with centered logo)

### Page 1 (Title/Cover Page)
- **DÂ·engage logo** centered at top (image1.png, 2426970 x 425450 EMU â‰ˆ 2.65 x 0.47 inches)
- **No header/footer** on first page (titlePg enabled)
- Below logo: blank space for document title, subtitle, client name, date, version

### Subsequent Pages
- **Header:** DÂ·engage logo (smaller, top-left positioned at -15238 EMU offset)
- **Footer:** Page number (right-aligned, Arial font)
- **Body font:** Arial, 11pt (22 half-points), black (#000000)

### Fonts
- **Body text:** Arial 11pt
- **All content:** Arial family (ascii, cs, eastAsia, hAnsi)

### Colors
- **Body text:** Black (#000000)
- **Logo/Brand:** DÂ·engage Blue (#125CFA) â€” embedded in logo image

## Document Creation Workflow

When asked to create a Word document, Claude should:

1. **Use the editing workflow** â€” take the uploaded template DOCX, unpack it, add content to the XML, repack
2. **Preserve the template structure** â€” keep the logo, headers, footers, page numbering intact
3. **Add content after the logo paragraph** in document.xml (replace the empty paragraphs)

### Content Guidelines
- Use Arial font throughout (already set as default in template)
- Heading 1: Arial Bold, 16pt for major sections
- Heading 2: Arial Bold, 14pt for subsections
- Body: Arial Regular, 11pt
- Tables: Light gray borders (#CCCCCC), header row with blue shading (#125CFA) and white text
- No page break before the first content â€” logo is on the same page as the opening content

## Standard Document Structures

### RFP Response Document
1. **Cover page:** Logo + Document Title + Client Name + Date + Version + "CONFIDENTIAL"
2. **Table of Contents**
3. **Executive Summary** (1 page)
4. **Company Overview** (about DÂ·engage)
5. **Solution Overview** (mapped to requirements)
6. **Technical Architecture**
7. **Security & Compliance**
8. **Implementation Approach & Timeline**
9. **Support & SLA**
10. **Case Studies / References**
11. **Appendices**

### Technical Proposal
1. **Cover page**
2. **Executive Summary**
3. **Solution Architecture**
4. **Module Mapping** (M1-M26 to requirements)
5. **Integration Approach**
6. **Infrastructure Requirements**
7. **Implementation Plan**
8. **Team & Support Model**

### Security Questionnaire Response
1. **Cover page**
2. **Document Control** (version, date, author)
3. **Response Table** (Question # | Question | DÂ·engage Response)
4. **Supporting Documentation References**

## Important Notes for Claude
- When asked to create a Word document, request the DOCX template file as attachment if not already provided
- Use the editing workflow: unpack â†’ modify document.xml â†’ repack (preserves logo, headers, footers)
- All content uses Arial font family
- First page has centered logo (cover), subsequent pages have small top-left logo (header2.xml)
- Footer has page numbers starting from page 2
- Tables should use DÂ·engage Blue (#125CFA) for header rows
