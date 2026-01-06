# CV Landing Page Generation Prompt

## Overview

Use this prompt with Claude or Claude Code to generate a professional, minimalist CV/resume landing page optimized for GitHub Pages deployment.

---

## The Prompt

You are a senior front-end developer and UX designer specializing in professional personal branding websites. Create a CV/resume landing page with the following specifications:

### Purpose & Audience

- **Target audience:** Potential employers and prospective clients seeking senior technical/project management expertise
- **Goal:** Establish professional visibility and credibility in the industrial engineering and project management domain

---

### Technical Requirements

| Requirement | Specification |
|-------------|---------------|
| Framework | Next.js with static export (compatible with GitHub Pages) |
| Styling | Tailwind CSS for maintainability and easy customization |
| Structure | Single-page application with smooth scroll navigation |
| Code quality | Modular, well-commented, easily editable for future updates |
| Documentation | Include deployment instructions for GitHub Pages |

---

### Design Specifications

- **Aesthetic:** Clean, minimalist, highly professional
- **Color palette:** Propose a sophisticated, corporate-appropriate scheme (blues, grays, or similar professional tones)
- **Typography:** Modern, readable sans-serif fonts (suggest specific Google Fonts pairings)
- **Responsive:** Fully mobile-optimized
- **Interactions:** Subtle micro-interactions for polish (hover states, smooth transitions)

---

### Required Sections

#### 1. Hero Section

- Professional headline/title
- Brief tagline summarizing expertise
- Professional photo placeholder
- Call-to-action buttons (Download CV, Contact)

#### 2. Professional Summary

- 3-4 sentence executive summary area

#### 3. Professional Experience Timeline

Display chronological work history from **earliest to most recent** position. For each role include:

| Element | Description |
|---------|-------------|
| Job title | Position held |
| Company | Organization name |
| Dates | MM/YYYY - MM/YYYY or "Present" |
| Location | Country with flag icon or visual indicator |
| Expertise | Key areas of expertise and responsibilities (tags or bullets) |
| Achievements | Notable accomplishments or project highlights |

Use a visual timeline or card-based layout for clear presentation.

#### 4. Core Competencies / Skills

- Categorized skill areas with visual indicators
- Include: Technical skills, management skills, industry expertise

#### 5. Education & Certifications

- Academic qualifications
- Professional certifications

#### 6. Contact Section

- Email (with mailto link)
- LinkedIn profile link
- Location (city/country)
- Optional: Phone number placeholder

#### 7. Downloadable CV

- Prominent button to download PDF version
- PDF stored in `/public` directory

---

### File Structure

Provide a clear, organized structure:

```
/components      → Reusable UI components
/pages or /app   → Next.js pages
/public          → PDF, images, favicon
/styles          → Global styles if needed
/data            → CV content in JSON/JS for easy editing
```

---

### Deliverables

1. **Complete code** — Production-ready implementation of all components
2. **Placeholder content** — Realistic sample content demonstrating the structure
3. **README.md** including:
   - Setup instructions (`npm install`, `npm run dev`)
   - How to customize content (which files to edit)
   - GitHub Pages deployment steps (using `gh-pages` package or GitHub Actions)
4. **PDF instructions** — Guidance for generating a matching PDF CV from the same content

---

### Content Placeholders

Use realistic placeholder content for a **senior technical project director in the industrial/engineering sector**.

Mark all editable content clearly with comments such as:

```jsx
{/* EDIT: Your name here */}
```

This allows the owner to easily locate and update personal information.

---

### Execution Instructions

Begin by:

1. Outlining the component architecture
2. Providing the complete implementation
3. Including all configuration files (`next.config.js`, `tailwind.config.js`, `package.json`)
4. Providing GitHub Actions workflow file for automated deployment

---

## Usage Notes

- Copy this entire prompt into Claude or Claude Code
- Review the generated code structure before implementation
- Update placeholder content in the `/data` directory or inline comments
- Follow the README instructions for local development and deployment

---

## Optional Enhancements

Consider requesting these additions if needed:

- [ ] Dark mode toggle
- [ ] Multilingual support
- [ ] Animated section transitions
- [ ] Testimonials section
- [ ] Project portfolio gallery
- [ ] Blog integration
- [ ] Analytics integration (Google Analytics, Plausible)
