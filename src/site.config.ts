// Edit this file once to personalise the site. Posts never need code changes.
export const SITE = {
  name: 'Sai Sudheer Dontha',
  brand: 'SAI DONTHA', // text next to the logo in the header
  title: 'Sai Sudheer Dontha',
  description: 'Notes on AI agents, Go, cloud and what I learn building software.',
  postsPerPage: 20,

  // About page sidebar. Put your photo in public/images/ and set the path, or leave '' for initials.
  profile: {
    photo: '/images/profile.jpg',
    details: [
      { icon: '📍', text: 'Atlanta, 🇺🇸 USA' },
      { icon: '👨‍💻', text: 'Forward Deployed Engineer' },
      { icon: '🤖', text: 'AI Agents and MCP' },
      { icon: '🩺', text: 'DaVita Kidney Care' },
    ],
  },

  socials: {
    email: 'sudhirdontha@gmail.com', // leave empty to hide
    twitter: '', // e.g. 'https://x.com/yourhandle'
    linkedin: 'https://www.linkedin.com/in/sudhirdontha/',
    github: 'https://github.com/saisudhir14',
  },
};

export const NAV = [
  { label: 'Blog', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Newsletter', href: '/newsletter' },
  { label: 'About Me', href: '/about' },
];
