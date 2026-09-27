#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const targetDir = path.join(process.cwd(), 'skills', 'html-to-pdf-textbook');
fs.mkdirSync(targetDir, { recursive: true });
const srcFile = path.join(__dirname, '..', 'skill', 'SKILL.md');
const destFile = path.join(targetDir, 'SKILL.md');

if (fs.existsSync(srcFile)) {
  fs.copyFileSync(srcFile, destFile);
  console.log('✅ html-to-pdf-textbook SKILL.md successfully installed to:\n   ' + destFile);
} else {
  console.error('❌ Source SKILL.md not found at ' + srcFile);
  process.exit(1);
}
