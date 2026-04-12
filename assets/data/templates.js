// GitGloss Template System — 40 Templates
// Cotton Candy Design System

const TEMPLATES = [
  /* ───────── BADGES (10) ───────── */
  { 
    id: "badge-minimal", 
    type: "tech", 
    theme: "cotton-candy", 
    preset: "preset-01",
    title: "Minimal Badge",
    description: "Clean minimal tech badges",
    tags: ["tech", "minimal", "light"],
    config: {
      username: "octocat",
      tags: ["React", "TypeScript", "Node.js"]
    }
  },
  { 
    id: "badge-glass", 
    type: "tech", 
    theme: "cotton-dark", 
    preset: "preset-02",
    title: "Glass Badge",
    description: "Dark glassmorphism badges",
    tags: ["tech", "glass", "dark"],
    config: {
      username: "octocat",
      tags: ["Next.js", "GraphQL", "Prisma"]
    }
  },
  { 
    id: "badge-soft", 
    type: "tech", 
    theme: "neumorphic-candy", 
    preset: "preset-03",
    title: "Soft Badge",
    description: "Soft neumorphic badges",
    tags: ["tech", "neu", "soft"],
    config: {
      username: "octocat",
      tags: ["Vue", "Firebase", "Sass"]
    }
  },
  { 
    id: "badge-pastel", 
    type: "tech", 
    theme: "cotton-candy", 
    preset: "preset-04",
    title: "Pastel Badge",
    description: "Pastel colored badges",
    tags: ["tech", "pastel", "light"],
    config: {
      username: "octocat",
      tags: ["HTML", "CSS", "JavaScript"]
    }
  },
  { 
    id: "badge-darkpro", 
    type: "tech", 
    theme: "cotton-dark", 
    preset: "preset-05",
    title: "Dark Pro Badge",
    description: "Professional dark badges",
    tags: ["tech", "dark", "pro"],
    badge: "PRO",
    config: {
      username: "octocat",
      tags: ["Python", "Django", "PostgreSQL"]
    }
  },
  { 
    id: "badge-stack-heavy", 
    type: "tech", 
    theme: "cotton-candy", 
    preset: "preset-06",
    title: "Stack Heavy",
    description: "Full stack tech display",
    tags: ["tech", "stack", "full"],
    config: {
      username: "octocat",
      tags: ["React", "Node.js", "MongoDB", "AWS"]
    }
  },
  { 
    id: "badge-clean", 
    type: "tech", 
    theme: "neumorphic-candy", 
    preset: "preset-07",
    title: "Clean Badge",
    description: "Clean neumorphic badges",
    tags: ["tech", "clean", "neu"],
    config: {
      username: "octocat",
      tags: ["Swift", "iOS", "UIKit"]
    }
  },
  { 
    id: "badge-cloud", 
    type: "tech", 
    theme: "cotton-candy", 
    preset: "preset-08",
    title: "Cloud Stack",
    description: "Cloud infrastructure badges",
    tags: ["tech", "cloud", "devops"],
    config: {
      username: "octocat",
      tags: ["AWS", "Docker", "Kubernetes"]
    }
  },
  { 
    id: "badge-frontend", 
    type: "tech", 
    theme: "cotton-candy", 
    preset: "preset-09",
    title: "Frontend Pack",
    description: "Frontend tech stack",
    tags: ["tech", "frontend", "modern"],
    badge: "NEW",
    config: {
      username: "octocat",
      tags: ["React", "Next.js", "Tailwind"]
    }
  },
  { 
    id: "badge-backend", 
    type: "tech", 
    theme: "cotton-dark", 
    preset: "preset-10",
    title: "Backend Pack",
    description: "Backend tech stack",
    tags: ["tech", "backend", "server"],
    config: {
      username: "octocat",
      tags: ["Node.js", "Express", "MySQL"]
    }
  },

  /* ───────── HERO / PROFILE (10) ───────── */
  { 
    id: "hero-minimal", 
    type: "profile", 
    theme: "cotton-candy", 
    preset: "preset-11",
    title: "Minimal Hero",
    description: "Minimal profile hero",
    tags: ["profile", "minimal", "hero"],
    config: {
      username: "octocat",
      name: "Octocat",
      handle: "@octocat",
      role: "Frontend Developer",
      bio: "Frontend Dev",
      tags: ["React", "TypeScript"]
    }
  },
  { 
    id: "hero-dark", 
    type: "profile", 
    theme: "cotton-dark", 
    preset: "preset-12",
    title: "Dark Hero",
    description: "Dark mode hero profile",
    tags: ["profile", "dark", "hero"],
    config: {
      username: "octocat",
      name: "Dev Kim",
      handle: "@devkim",
      role: "Fullstack Engineer",
      bio: "Fullstack Engineer",
      tags: ["Full Stack", "Cloud"]
    }
  },
  { 
    id: "hero-soft", 
    type: "profile", 
    theme: "neumorphic-candy", 
    preset: "preset-13",
    title: "Soft Hero",
    description: "Soft neumorphic hero",
    tags: ["profile", "neu", "soft"],
    config: {
      username: "octocat",
      name: "Jane",
      handle: "@jane",
      role: "UI Designer",
      bio: "UI Designer",
      tags: ["Design", "Figma"]
    }
  },
  { 
    id: "hero-typography", 
    type: "profile", 
    theme: "cotton-candy", 
    preset: "preset-14",
    title: "Typography Hero",
    description: "Typography focused hero",
    tags: ["profile", "typography", "creative"],
    config: {
      username: "octocat",
      name: "Alex",
      handle: "@alex",
      role: "Creative Developer",
      bio: "Creative Dev",
      tags: ["Creative", "Web"]
    }
  },
  { 
    id: "hero-bunny", 
    type: "profile", 
    theme: "cotton-candy", 
    preset: "preset-15",
    title: "Character Hero",
    description: "Playful character hero",
    tags: ["profile", "playful", "fun"],
    badge: "NEW",
    config: {
      username: "octocat",
      name: "BunnyDev",
      handle: "@bunnydev",
      role: "Playful Coder",
      bio: "Playful Coder",
      tags: ["Fun", "Creative"]
    }
  },
  { 
    id: "hero-obsidian", 
    type: "profile", 
    theme: "cotton-dark", 
    preset: "preset-16",
    title: "Obsidian Hero",
    description: "Dark obsidian hero",
    tags: ["profile", "dark", "obsidian"],
    badge: "PRO",
    config: {
      username: "octocat",
      name: "Neo",
      handle: "@neo",
      role: "Dark Mode Enthusiast",
      bio: "Dark Mode Lover",
      tags: ["Dark UI", "Design"]
    }
  },
  { 
    id: "hero-glass-grid", 
    type: "profile", 
    theme: "cotton-candy", 
    preset: "preset-17",
    title: "Glass Grid Hero",
    description: "Glass grid layout hero",
    tags: ["profile", "glass", "grid"],
    config: {
      username: "octocat",
      name: "Mina",
      handle: "@mina",
      role: "Frontend Artist",
      bio: "Frontend Artist",
      tags: ["UI", "Animation"]
    }
  },
  { 
    id: "hero-interactive", 
    type: "profile", 
    theme: "cotton-candy", 
    preset: "preset-18",
    title: "Interactive Hero",
    description: "Interactive profile hero",
    tags: ["profile", "interactive", "dynamic"],
    config: {
      username: "octocat",
      name: "Leo",
      handle: "@leo",
      role: "JavaScript Wizard",
      bio: "JS Wizard",
      tags: ["JavaScript", "WebGL"]
    }
  },
  { 
    id: "hero-portfolio", 
    type: "profile", 
    theme: "cotton-candy", 
    preset: "preset-19",
    title: "Portfolio Hero",
    description: "Portfolio style hero",
    tags: ["profile", "portfolio", "showcase"],
    config: {
      username: "octocat",
      name: "Chris",
      handle: "@chris",
      role: "Builder & Maker",
      bio: "Builder & Maker",
      tags: ["Product", "Startup"]
    }
  },
  { 
    id: "hero-simple-dark", 
    type: "profile", 
    theme: "cotton-dark", 
    preset: "preset-20",
    title: "Simple Dark Hero",
    description: "Simple dark hero",
    tags: ["profile", "simple", "dark"],
    config: {
      username: "octocat",
      name: "Kai",
      handle: "@kai",
      role: "Backend Developer",
      bio: "Backend Dev",
      tags: ["API", "Database"]
    }
  },

  /* ───────── STATS (10) ───────── */
  {
    id: "stats-classic",
    type: "stats",
    theme: "cotton-candy",
    preset: "preset-21",
    title: "Classic Stats",
    description: "Classic stats card",
    tags: ["stats", "classic", "light"],
    config: {
      username: "octocat",
      title: "GitHub Stats",
      stats: [
        { label: "Stars", value: "2.8k" },
        { label: "Repos", value: "142" },
        { label: "Commits", value: "98%" }
      ],
      accentColor: "#ED93B1"
    }
  },
  {
    id: "stats-dark",
    type: "stats",
    theme: "cotton-dark",
    preset: "preset-22",
    title: "Dark Stats",
    description: "Dark mode stats",
    tags: ["stats", "dark", "pro"],
    config: {
      username: "octocat",
      title: "GitHub Stats",
      stats: [
        { label: "Stars", value: "5.1k" },
        { label: "Repos", value: "80" },
        { label: "Commits", value: "1.2k" }
      ],
      accentColor: "#9B8FE8"
    }
  },
  {
    id: "stats-soft",
    type: "stats",
    theme: "neumorphic-candy",
    preset: "preset-23",
    title: "Soft Stats",
    description: "Soft neumorphic stats",
    tags: ["stats", "neu", "soft"],
    config: {
      username: "octocat",
      title: "My Stats",
      stats: [
        { label: "Stars", value: "900" },
        { label: "Repos", value: "30" },
        { label: "Commits", value: "600" }
      ],
      accentColor: "#9B8FE8"
    }
  },
  {
    id: "stats-pro",
    type: "stats",
    theme: "cotton-dark",
    preset: "preset-24",
    title: "Pro Stats",
    description: "Professional stats card",
    tags: ["stats", "pro", "dark"],
    badge: "PRO",
    config: {
      username: "octocat",
      title: "GitHub Stats",
      stats: [
        { label: "Stars", value: "10k" },
        { label: "Repos", value: "200" },
        { label: "Commits", value: "5k" }
      ],
      accentColor: "#ED93B1"
    }
  },
  {
    id: "stats-mini",
    type: "stats",
    theme: "cotton-candy",
    preset: "preset-25",
    title: "Mini Stats",
    description: "Compact mini stats",
    tags: ["stats", "mini", "compact"],
    config: {
      username: "octocat",
      title: "Stats",
      stats: [
        { label: "Stars", value: "320" },
        { label: "Repos", value: "12" },
        { label: "Commits", value: "80" }
      ],
      accentColor: "#7EC8E3"
    }
  },
  {
    id: "stats-heavy",
    type: "stats",
    theme: "cotton-candy",
    preset: "preset-26",
    title: "Heavy Stats",
    description: "Heavy contributor stats",
    tags: ["stats", "heavy", "active"],
    badge: "NEW",
    config: {
      username: "octocat",
      title: "GitHub Stats",
      stats: [
        { label: "Stars", value: "20k" },
        { label: "Repos", value: "340" },
        { label: "Commits", value: "12k" }
      ],
      accentColor: "#ED93B1"
    }
  },
  {
    id: "stats-startup",
    type: "stats",
    theme: "cotton-candy",
    preset: "preset-27",
    title: "Startup Stats",
    description: "Startup developer stats",
    tags: ["stats", "startup", "growth"],
    config: {
      username: "octocat",
      title: "My Stats",
      stats: [
        { label: "Stars", value: "1.2k" },
        { label: "Repos", value: "25" },
        { label: "Commits", value: "2.3k" }
      ],
      accentColor: "#9B8FE8"
    }
  },
  {
    id: "stats-dev",
    type: "stats",
    theme: "cotton-dark",
    preset: "preset-28",
    title: "Dev Stats",
    description: "Developer stats card",
    tags: ["stats", "dev", "dark"],
    config: {
      username: "octocat",
      title: "GitHub Stats",
      stats: [
        { label: "Stars", value: "4k" },
        { label: "Repos", value: "75" },
        { label: "Commits", value: "900" }
      ],
      accentColor: "#7EC8E3"
    }
  },
  {
    id: "stats-clean",
    type: "stats",
    theme: "neumorphic-candy",
    preset: "preset-29",
    title: "Clean Stats",
    description: "Clean neumorphic stats",
    tags: ["stats", "clean", "neu"],
    config: {
      username: "octocat",
      title: "Stats",
      stats: [
        { label: "Stars", value: "700" },
        { label: "Repos", value: "18" },
        { label: "Commits", value: "300" }
      ],
      accentColor: "#C8B8F0"
    }
  },
  {
    id: "stats-alt",
    type: "stats",
    theme: "cotton-candy",
    preset: "preset-30",
    title: "Alt Stats",
    description: "Alternative stats layout",
    tags: ["stats", "alt", "modern"],
    config: {
      username: "octocat",
      title: "GitHub Stats",
      stats: [
        { label: "Stars", value: "2k" },
        { label: "Repos", value: "60" },
        { label: "Commits", value: "1k" }
      ],
      accentColor: "#F4C0D1"
    }
  },

  /* ───────── MIX / EXTRA (10) ───────── */
  { 
    id: "mix-dev-card", 
    type: "profile", 
    theme: "cotton-candy", 
    preset: "preset-31",
    title: "Dev Card",
    description: "Developer card profile",
    tags: ["profile", "dev", "card"],
    config: {
      username: "octocat",
      name: "Dev A",
      handle: "@deva",
      role: "Developer",
      bio: "Build & Ship",
      tags: ["Code", "Ship"]
    }
  },
  { 
    id: "mix-designer", 
    type: "profile", 
    theme: "neumorphic-candy", 
    preset: "preset-32",
    title: "Designer Card",
    description: "Designer profile card",
    tags: ["profile", "designer", "neu"],
    config: {
      username: "octocat",
      name: "UI Kim",
      handle: "@uikim",
      role: "UI Designer",
      bio: "Design Systems",
      tags: ["Design", "Systems"]
    }
  },
  { 
    id: "mix-engineer", 
    type: "profile", 
    theme: "cotton-dark", 
    preset: "preset-33",
    title: "Engineer Card",
    description: "Engineer profile card",
    tags: ["profile", "engineer", "dark"],
    config: {
      username: "octocat",
      name: "Backend Lee",
      handle: "@backendlee",
      role: "Backend Engineer",
      bio: "API Builder",
      tags: ["API", "Backend"]
    }
  },
  { 
    id: "mix-creator", 
    type: "profile", 
    theme: "cotton-candy", 
    preset: "preset-34",
    title: "Creator Card",
    description: "Content creator card",
    tags: ["profile", "creator", "content"],
    config: {
      username: "octocat",
      name: "Creator J",
      handle: "@creatorj",
      role: "Creator",
      bio: "Content & Code",
      tags: ["Content", "Code"]
    }
  },
  { 
    id: "mix-minimal-dev", 
    type: "profile", 
    theme: "cotton-candy", 
    preset: "preset-35",
    title: "Minimal Dev",
    description: "Minimal developer card",
    tags: ["profile", "minimal", "simple"],
    config: {
      username: "octocat",
      name: "Min Dev",
      handle: "@mindev",
      role: "Developer",
      bio: "Simple & Clean",
      tags: ["Minimal", "Clean"]
    }
  },
  { 
    id: "mix-tech-light", 
    type: "tech", 
    theme: "cotton-candy", 
    preset: "preset-36",
    title: "Light Tech",
    description: "Light tech badges",
    tags: ["tech", "light", "basic"],
    config: {
      username: "octocat",
      tags: ["HTML", "CSS", "JavaScript"]
    }
  },
  { 
    id: "mix-tech-dark", 
    type: "tech", 
    theme: "cotton-dark", 
    preset: "preset-37",
    title: "Dark Tech",
    description: "Dark tech badges",
    tags: ["tech", "dark", "backend"],
    config: {
      username: "octocat",
      tags: ["Node.js", "Database", "API"]
    }
  },
  { 
    id: "mix-tech-soft", 
    type: "tech", 
    theme: "neumorphic-candy", 
    preset: "preset-38",
    title: "Soft Tech",
    description: "Soft tech badges",
    tags: ["tech", "soft", "mobile"],
    config: {
      username: "octocat",
      tags: ["Flutter", "Dart"]
    }
  },
  {
    id: "mix-stats-lite",
    type: "stats",
    theme: "cotton-candy",
    preset: "preset-39",
    title: "Lite Stats",
    description: "Lightweight stats",
    tags: ["stats", "lite", "beginner"],
    config: {
      username: "octocat",
      title: "Stats",
      stats: [
        { label: "Stars", value: "150" },
        { label: "Repos", value: "10" },
        { label: "Commits", value: "50" }
      ],
      accentColor: "#ED93B1"
    }
  },
  {
    id: "mix-stats-dark-lite",
    type: "stats",
    theme: "cotton-dark",
    preset: "preset-40",
    title: "Dark Lite Stats",
    description: "Dark lightweight stats",
    tags: ["stats", "dark", "lite"],
    config: {
      username: "octocat",
      title: "Stats",
      stats: [
        { label: "Stars", value: "800" },
        { label: "Repos", value: "40" },
        { label: "Commits", value: "300" }
      ],
      accentColor: "#9B8FE8"
    }
  }
];

// Template Utility Functions
const TemplateSystem = {
  
  // Get template by ID
  getTemplate(templateId) {
    return TEMPLATES.find(t => t.id === templateId);
  },

  // Get template by preset
  getTemplateByPreset(preset) {
    return TEMPLATES.find(t => t.preset === preset);
  },

  // Get templates by type
  getTemplatesByType(type) {
    return TEMPLATES.filter(t => t.type === type);
  },

  // Get templates by theme
  getTemplatesByTheme(theme) {
    return TEMPLATES.filter(t => t.theme === theme);
  },

  // Get templates by tag
  getTemplatesByTag(tag) {
    return TEMPLATES.filter(t => t.tags.includes(tag));
  },

  // Search templates
  searchTemplates(query) {
    const lowerQuery = query.toLowerCase();
    return TEMPLATES.filter(t => 
      t.title.toLowerCase().includes(lowerQuery) ||
      t.description.toLowerCase().includes(lowerQuery) ||
      t.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  },

  // Get all templates
  getAllTemplates() {
    return TEMPLATES;
  },

  // Get template count
  getTemplateCount() {
    return TEMPLATES.length;
  },

  // Get templates grouped by type
  getTemplatesGroupedByType() {
    return TEMPLATES.reduce((acc, template) => {
      if (!acc[template.type]) {
        acc[template.type] = [];
      }
      acc[template.type].push(template);
      return acc;
    }, {});
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TEMPLATES, TemplateSystem };
}
