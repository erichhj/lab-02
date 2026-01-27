// Detect if running locally (Live Server usually uses localhost or 127.0.0.1) 
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") { 
    // Remove any <base> tag so relative paths work locally 
document.querySelector("base")?.remove(); } 
else { 
// Add <base> tag for GitHub Pages deployment 
const base = document.createElement("base"); 
base.href = "/portfolio/"; 
document.head.appendChild(base); }