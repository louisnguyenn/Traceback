import React from 'react';
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import LogoLoop from '../animations/LogoLoop';

const techLogos = [
  { node: <SiReact />, title: 'React', href: 'https://react.dev' },
  { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
  {
    node: <SiTypescript />,
    title: 'TypeScript',
    href: 'https://www.typescriptlang.org',
  },
  {
    node: <SiTailwindcss />,
    title: 'Tailwind CSS',
    href: 'https://tailwindcss.com',
  },
];

const TrustedByDevelopers = () => {
  return (
    <div
      style={{ height: '200px', position: 'relative', overflow: 'hidden' }}
      className="max-w-4xl items-center justify-center"
    >
      <LogoLoop
        logos={techLogos}
        speed={40}
        direction="left"
        logoHeight={48}
        gap={90}
        hoverSpeed={0}
        scaleOnHover
        ariaLabel="Technology partners"
      />
    </div>
  );
};

export default TrustedByDevelopers;
