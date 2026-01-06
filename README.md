# CV Landing Page - Simone Droghini

A professional, minimalist CV/resume landing page built with Next.js and Tailwind CSS, optimized for GitHub Pages deployment.

## Features

- Clean, minimalist, professional design
- Fully responsive (mobile-optimized)
- Smooth scroll navigation
- Single-page application
- Static export for GitHub Pages compatibility
- Easy content customization via data file
- Professional blue-gray color scheme
- Subtle micro-interactions and hover states

## Sections

1. **Hero** - Professional headline, tagline, and CTA buttons
2. **Professional Summary** - Executive summary with key statistics
3. **Experience Timeline** - Chronological work history with achievements
4. **Core Competencies** - Categorized skills with visual indicators
5. **Education & Certifications** - Academic and professional qualifications
6. **Contact** - Contact information and availability status

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Fonts**: Inter (body) & Poppins (headings) via Google Fonts
- **Deployment**: GitHub Pages via GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/cv-landing-page.git
cd cv-landing-page

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

This generates a static export in the `out/` directory.

## Customization

### Updating CV Content

All CV content is centralized in a single data file for easy editing:

**`/data/cv-data.ts`**

Edit this file to update:
- Personal information (name, title, contact)
- Professional summary
- Work experience
- Skills and competencies
- Education and certifications
- Languages

Look for `/* EDIT: ... */` comments throughout the code for additional customization points.

### Adding Your Profile Photo

1. Add your photo to `/public/profile.jpg`
2. Update the `profileImage` path in `/data/cv-data.ts`
3. Alternatively, modify `/components/Hero.tsx` to display the image

### Updating Your CV PDF

1. Place your PDF in `/public/Resume_Simone_Droghini.pdf`
2. Update `cvDownloadPath` in `/data/cv-data.ts` if using a different filename

### Changing Colors

Edit `/tailwind.config.js` to modify the color palette:

```js
colors: {
  primary: {
    // Your custom primary colors
  },
  // ...
}
```

### Updating Metadata (SEO)

Edit `/app/layout.tsx` to update:
- Page title
- Meta description
- Keywords
- Open Graph data

## Deployment to GitHub Pages

### Automatic Deployment (Recommended)

This project includes a GitHub Actions workflow for automatic deployment:

1. Push your code to the `main` branch
2. Go to your repository Settings > Pages
3. Under "Build and deployment", select "GitHub Actions"
4. The workflow will automatically build and deploy on each push to main

### Manual Deployment

If you prefer manual deployment:

```bash
# Build the static site
npm run build

# The output is in the /out directory
# Upload contents of /out to your hosting provider
```

### Custom Domain

To use a custom domain:

1. Add a `CNAME` file to `/public/` with your domain:
   ```
   yourdomain.com
   ```
2. Configure your domain's DNS to point to GitHub Pages
3. Enable HTTPS in repository Settings > Pages

### Subdirectory Deployment

If deploying to `username.github.io/repo-name/`:

1. Uncomment and set `basePath` in `next.config.js`:
   ```js
   basePath: '/repo-name',
   ```

## Project Structure

```
/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── Contact.tsx        # Contact section
│   ├── Education.tsx      # Education & certifications
│   ├── Experience.tsx     # Work experience timeline
│   ├── Footer.tsx         # Page footer
│   ├── Hero.tsx           # Hero section
│   ├── Navbar.tsx         # Navigation bar
│   ├── Skills.tsx         # Core competencies
│   └── Summary.tsx        # Professional summary
├── data/
│   └── cv-data.ts         # CV content data file
├── public/                # Static assets
│   └── Resume_*.pdf       # Downloadable CV
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions workflow
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## Generating a Matching PDF CV

To create a PDF that matches your landing page content:

1. **Use the same data source**: Export content from `/data/cv-data.ts`
2. **Recommended tools**:
   - [React-PDF](https://react-pdf.org/) - Generate PDFs programmatically
   - [Puppeteer](https://pptr.dev/) - Print the page to PDF
   - Traditional word processors using the same content

3. **Print-friendly version**: Add `?print=true` parameter to show print-optimized layout (to be implemented)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Design inspired by modern CV/portfolio best practices
- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)
