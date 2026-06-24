const fs = require('fs');
const path = require('path');

const directories = ['app', 'components'];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.css') || fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace CSS
      content = content.replace(/font-style:\s*italic;/g, 'font-style: normal;');
      
      // Replace React inline styles
      content = content.replace(/fontStyle:\s*['"]italic['"]/g, 'fontStyle: "normal"');
      
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

for (const dir of directories) {
  processDirectory(path.join(__dirname, dir));
}

console.log("Italics removed!");
