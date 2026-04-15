import fs from 'fs';

let svg = fs.readFileSync('public/logo-3d.svg', 'utf8');
// Change fill="#D4AF37" to fill="currentColor"
svg = svg.replace(/fill="#D4AF37"/g, 'fill="currentColor"');

// Extract the inner contents (the paths)
const pathsMatch = svg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
const innerPaths = pathsMatch ? pathsMatch[1].trim() : '';

const reactComponent = `export function Logo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-150 -150 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Clave Studio Digital"
    >
      ${innerPaths}
    </svg>
  )
}
`;

fs.writeFileSync('components/Logo.tsx', reactComponent);
console.log('Logo.tsx updated successfully.');
