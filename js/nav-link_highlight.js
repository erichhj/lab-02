const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
const linksContainer = document.querySelector(".links");
const underline = document.querySelector(".nav-underline");

function updateUnderline() {
  if (!underline || !linksContainer || navLinks.length === 0) return;
  const active = Array.from(navLinks).find(l => l.classList.contains("active")) || navLinks[0];
  const rect = active.getBoundingClientRect();
  const containerRect = linksContainer.getBoundingClientRect();
  const pad = 6; // px on each side for balanced spacing
  underline.style.left = `${rect.left - containerRect.left - pad}px`;
  underline.style.width = `${rect.width + pad * 2}px`;
}

function updateActiveLink() {
  let current = "";
  let maxOffset = -Infinity;

  // Check sections
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const triggerPoint = sectionTop - sectionHeight / 3;
    
    if (pageYOffset >= triggerPoint && triggerPoint > maxOffset) {
      const id = section.getAttribute("id");
      if (id) {
        current = id;
        maxOffset = triggerPoint;
      }
    }
  });

  // Also check divs with IDs (for centered scroll anchors)
  document.querySelectorAll("div[id]").forEach(div => {
    const divTop = div.offsetTop;
    const triggerPoint = divTop - 200;
    
    if (pageYOffset >= triggerPoint && triggerPoint > maxOffset) {
      current = div.getAttribute("id");
      maxOffset = triggerPoint;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });

  // After active state is updated, reposition underline
  updateUnderline();
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("resize", updateUnderline);

// Add hover effect to nav links
navLinks.forEach(link => {
  link.addEventListener("mouseenter", () => {
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    updateUnderline();
  });

  link.addEventListener("mouseleave", () => {
    updateActiveLink();
  });
});

// Initial position
updateActiveLink();

