# TheJoyDigi - IT Solutions for Business

This is the official website for TheJoyDigi, providing innovative IT solutions to help businesses thrive in the digital age.

## Features

- Modern, responsive landing page with animations using Framer Motion
- SEO-optimized with proper metadata and structured data
- Blog section with industry insights and digital transformation guides
- Contact form for business inquiries
- Mobile-friendly design
- Hidden admin page for managing interest topics stored in S3

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Gray Matter](https://github.com/jonschlinkert/gray-matter) - Parsing markdown front-matter
- [MDX](https://mdxjs.com/) - Enhanced markdown with JSX

## Environment Variables

The application uses the following environment variables:

```
# Email Configuration
EMAIL_HOST=smtp_host
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email_username
EMAIL_PASS=your_email_password
EMAIL_FROM=sending_email_address
CONTACT_RECIPIENT_EMAIL=recipient_email_address
```

### ⚠️ IMPORTANT EMAIL CONFIGURATION NOTE ⚠️

Make sure `EMAIL_SECURE` is set to `false` in production. If set to `true`, the contact form email functionality will not work properly. This is because many SMTP providers (including Brevo) require that secure connection is set to false when using port 587 with STARTTLS.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/src/components` - React components
- `/src/pages` - Next.js pages
- `/src/styles` - Global CSS styles
- `/src/lib` - Utility functions
- `/posts` - Markdown blog posts
- `/public` - Static assets

## Blog System

Blog posts are written in Markdown format and stored in the `/posts` directory. Each post has front matter with metadata:

```markdown
---
title: "Post Title"
excerpt: "Brief excerpt about the post"
date: "2024-03-20"
category: "Category Name"
coverImage: "/images/blog/image.jpg"
---

Post content goes here...
```

## License

All rights reserved © TheJoyDigi
