const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');

const startIndex = lines.findIndex(line => line.includes('{/* SECCIÓN 6 — TODO LO QUE INCLUYE EL KIT */}'));
const endIndex = lines.findIndex((line, i) => i > startIndex && line === '      </section>');

const sectionLines = lines.splice(startIndex, endIndex - startIndex + 1);

const targetIndex = lines.findIndex(line => line.includes('{/* NUEVA SECCIÓN — CARRUSELES */}'));
const targetEndIndex = lines.findIndex((line, i) => i > targetIndex && line === '      </section>');

lines.splice(targetEndIndex + 1, 0, '', ...sectionLines);

fs.writeFileSync('src/App.tsx', lines.join('\n'));
