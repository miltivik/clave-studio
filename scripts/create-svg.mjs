import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const numLines = 14;
const R_inner = 20;
const R_outer = 120;
const strokeWidth = 2.5;
const center = { x: 0, y: 0 };

// The cutout angle is about 25 degrees each side from bottom center (Math.PI / 2)
const gapAngle = 25 * (Math.PI / 180); 

let paths = '';

for (let i = 0; i < numLines; i++) {
  const r = R_inner + (i * ((R_outer - R_inner) / (numLines - 1)));
  
  const numSteps = 100;
  
  const startTheta = (Math.PI / 2) + gapAngle; // Bottom left
  const endTheta = (2 * Math.PI) + (Math.PI / 2) - gapAngle; // Bottom right
  
  const halfStroke = strokeWidth / 2;
  
  let d = '';
  
  // Forward pass: Outer radius
  for (let j = 0; j <= numSteps; j++) {
    const t = j / numSteps;
    const theta = startTheta + t * (endTheta - startTheta);
    
    let wave = 0;
    if (Math.sin(theta) > 0) { 
      const intensity = Math.sin(theta); 
      wave = Math.sin(theta * 10 + i) * 1.5 * intensity * (r / 50); 
    }
    
    const currentR = r + wave + halfStroke;
    const x = center.x + currentR * Math.cos(theta);
    const y = center.y + currentR * Math.sin(theta);
    
    if (j === 0) d += `M ${x.toFixed(2)} ${y.toFixed(2)}`;
    else d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  
  // Backward pass: Inner radius
  for (let j = numSteps; j >= 0; j--) {
    const t = j / numSteps;
    const theta = startTheta + t * (endTheta - startTheta);
    
    let wave = 0;
    if (Math.sin(theta) > 0) { 
      const intensity = Math.sin(theta); 
      wave = Math.sin(theta * 10 + i) * 1.5 * intensity * (r / 50); 
    }
    
    const currentR = r + wave - halfStroke;
    const x = center.x + currentR * Math.cos(theta);
    const y = center.y + currentR * Math.sin(theta);
    
    d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  
  d += ' Z'; // Close the path
  
  paths += `  <path d="${d}" fill="#D4AF37" />\n`;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -150 300 300" width="300" height="300">\n${paths}</svg>\n`;

const outPath = path.join(__dirname, '..', 'public', 'logo-3d.svg');
fs.writeFileSync(outPath, svg);
console.log(`SVG generated successfully at ${outPath}`);
