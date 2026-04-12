// GitGloss Builder — 2-column UI Controller
// Depends on: common.js, widget-engine.js

/* ══════════════════════════════
   State
══════════════════════════════ */
const state = {
  type:    'stats',
  theme:   'cotton-candy',
  accent:  '#ED93B1',
  ptab:    'gl',
  tab:     'md',
  tagCount: 3,
  emoji:   '👨‍💻', // Default emoji
};

const TAG_COLORS = ['tag-pk', 'tag-pu', 'tag-sk'];
const BADGE_COLORS = ['w-badge-pk', 'w-badge-pu', 'w-badge-sk'];

const CODE = {
  md:   () => `![GitGloss](https://gitgloss.io/api/${state.type}?user=${username()}&theme=${state.theme}&accent=${state.accent.replace('#','')})`,
  html: () => `<img src="https://gitgloss.io/api/${state.type}?user=${username()}&theme=${state.theme}" alt="GitGloss widget" />`,
  svg:  () => `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="200">\n  <!-- theme:${state.theme} user:${username()} -->\n</svg>`,
};

/* ══════════════════════════════
   Init
══════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Check if template was already applied by template-loader.js
  const params = new URLSearchParams(location.search);
  const hasTemplate = params.has('template') || params.has('preset');
  
  // Only render default template grid if no template was applied
  if (!hasTemplate) {
    renderTemplateGrid('stats');
  } else {
    // Template was applied, just render the grid for the current type
    const appliedType = state.type || 'stats';
    renderTemplateGrid(appliedType);
  }
  
  initInputListeners();
  
  // Only update preview if no template was applied (template-loader already did it)
  if (!hasTemplate) {
    updatePreviewFromInputs();
  }
  
  // Always read URL params for backward compatibility
  if (!hasTemplate) {
    readURLParams();
  }
  
  updateCode();
});

/* ══════════════════════════════
   Initialize Input Listeners
══════════════════════════════ */
function initInputListeners() {
  // Username
  const usernameInput = document.getElementById('inp-username');
  if (usernameInput) {
    usernameInput.addEventListener('input', () => {
      updatePreviewFromInputs();
      updateCode();
    });
  }
  
  // Profile name
  const pnameInput = document.getElementById('inp-pname');
  if (pnameInput) {
    pnameInput.addEventListener('input', () => {
      updatePreviewFromInputs();
    });
  }
  
  // Handle
  const handleInput = document.getElementById('inp-handle');
  if (handleInput) {
    handleInput.addEventListener('input', () => {
      updatePreviewFromInputs();
    });
  }
  
  // Role
  const roleInput = document.getElementById('inp-role');
  if (roleInput) {
    roleInput.addEventListener('input', () => {
      updatePreviewFromInputs();
    });
  }
  
  // Bio
  const bioInput = document.getElementById('inp-bio');
  if (bioInput) {
    bioInput.addEventListener('input', () => {
      updatePreviewFromInputs();
    });
  }
  
  // Title
  const titleInput = document.getElementById('inp-title');
  if (titleInput) {
    titleInput.addEventListener('input', () => {
      updatePreviewFromInputs();
    });
  }
  
  // Stats inputs
  ['s1', 's2', 's3'].forEach(k => {
    const labelInput = document.getElementById(`${k}-label`);
    const valInput = document.getElementById(`${k}-val`);
    
    if (labelInput) {
      labelInput.addEventListener('input', () => {
        updatePreviewFromInputs();
      });
    }
    
    if (valInput) {
      valInput.addEventListener('input', () => {
        updatePreviewFromInputs();
      });
    }
  });
  
  // Streak inputs
  const streakInput = document.getElementById('inp-streak');
  if (streakInput) {
    streakInput.addEventListener('input', () => {
      updatePreviewFromInputs();
    });
  }
  
  const longestInput = document.getElementById('inp-longest-streak');
  if (longestInput) {
    longestInput.addEventListener('input', () => {
      updatePreviewFromInputs();
    });
  }
  
  const totalInput = document.getElementById('inp-total-contributions');
  if (totalInput) {
    totalInput.addEventListener('input', () => {
      updatePreviewFromInputs();
    });
  }
}

/* ── URL parameter 연동 (gallery → builder) ── */
function readURLParams() {
  const p = new URLSearchParams(location.search);

  // ?type=stats|tech|profile|streak
  if (p.has('type')) {
    const t = p.get('type');
    const chips = document.querySelectorAll('.type-chip');
    const types = ['stats','tech','profile','streak'];
    chips.forEach((c, i) => {
      c.classList.toggle('on', types[i] === t);
    });
    switchFields(t);
    state.type = t;
  }

  // ?theme=cotton-candy|cotton-dark|neumorphic-candy
  if (p.has('theme')) {
    const themeMap = {
      'cotton-candy':    'gl',
      'cotton-dark':     'gd',
      'neumorphic-candy':'nm',
    };
    state.theme = p.get('theme');
    const ptabKey = themeMap[state.theme] || 'gl';
    selPtabByKey(ptabKey);
  }

  // ?preset=preset-01 등
  if (p.has('preset')) {
    state.preset = p.get('preset');
  }

  // ?user=octocat
  if (p.has('user')) {
    const inp = document.getElementById('inp-username');
    if (inp) { inp.value = p.get('user'); updateName(p.get('user')); }
  }

  updateCode();
}

/* ══════════════════════════════
   Widget type
══════════════════════════════ */
function selectType(el, type) {
  document.querySelectorAll('.type-chip').forEach(c => c.classList.remove('on'));
  el.classList.add('on');
  state.type = type;
  switchFields(type);
  renderTemplateGrid(type); // 템플릿 그리드 업데이트
  
  // Don't update preview if we're just switching types
  // The user will select a template next
  
  updateCode();
}

function switchFields(type) {
  ['stats','tech','profile','streak'].forEach(t => {
    const el = document.getElementById('fields-' + t);
    if (el) el.style.display = (t === type) ? '' : 'none';
  });
}

/* ══════════════════════════════
   Preset tabs
══════════════════════════════ */
function selPtab(el, cls) {
  document.querySelectorAll('.ptab').forEach(b => b.classList.remove('on'));
  el.classList.add('on');
  state.ptab = cls;
  buildPresets(cls);
}

function selPtabByKey(key) {
  const btns = document.querySelectorAll('.ptab');
  const keys = ['gl','gd','nm','vv'];
  btns.forEach((b, i) => b.classList.toggle('on', keys[i] === key));
  buildPresets(key);
}

function buildPresets(cls) {
  const g = document.getElementById('preset-scroll');
  if (!g) return;
  g.innerHTML = '';
  for (let i = 0; i < 8; i++) {
    const d = document.createElement('div');
    d.className = 'p-thumb ' + cls + (i === 0 ? ' on' : '');
    d.title = `Preset ${i + 1}`;
    d.onclick = function () {
      document.querySelectorAll('.p-thumb').forEach(x => x.classList.remove('on'));
      this.classList.add('on');
      // theme 연동
      const themeMap = { gl:'cotton-candy', gd:'cotton-dark', nm:'neumorphic-candy', vv:'cotton-candy' };
      state.theme = themeMap[cls] || 'cotton-candy';
      updateCode();
    };
    g.appendChild(d);
  }
}

/* ══════════════════════════════
   Accent color
══════════════════════════════ */
function selColor(el, hex) {
  document.querySelectorAll('.sw').forEach(s => s.classList.remove('on'));
  el.classList.add('on');
  state.accent = hex;
  
  // 프리뷰 업데이트
  updatePreviewFromInputs();
  updateCode();
}

/* ══════════════════════════════
   Emoji Selection
══════════════════════════════ */
function selectEmoji(el, emoji) {
  document.querySelectorAll('.emoji-btn').forEach(btn => btn.classList.remove('active'));
  el.classList.add('active');
  state.emoji = emoji;
  
  // 프리뷰 업데이트
  updatePreviewFromInputs();
}

/* ══════════════════════════════
   Username
══════════════════════════════ */
function username() {
  return document.getElementById('inp-username')?.value.trim() || 'octocat';
}

function updateName(v) {
  updatePreviewFromInputs();
  updateCode();
}

/* ══════════════════════════════
   Tags
══════════════════════════════ */
function removeTag(btn) {
  btn.closest('.tag').remove();
  updatePreviewFromInputs(); // 태그 삭제 시 프리뷰 업데이트
}

function addTag(e, inp) {
  if (e.key !== 'Enter' || !inp.value.trim()) return;
  addTagTo(e, inp, 'tag-wrap');
}

function addTagTo(e, inp, wrapId) {
  if (e.key !== 'Enter' || !inp.value.trim()) return;
  const wrap = document.getElementById(wrapId);
  if (!wrap) return;
  const tag = document.createElement('span');
  tag.className = 'tag ' + TAG_COLORS[state.tagCount % 3];
  tag.innerHTML = inp.value.trim() + ' <button class="tag-x" onclick="removeTag(this)">×</button>';
  wrap.appendChild(tag);
  inp.value = '';
  state.tagCount++;
  syncTags();
}

function syncTags() {
  updatePreviewFromInputs(); // 태그 동기화 시 프리뷰 업데이트
}

/* ══════════════════════════════
   Code tabs
══════════════════════════════ */
function selCtab(el, key) {
  document.querySelectorAll('.ctab').forEach(b => b.classList.remove('on'));
  el.classList.add('on');
  state.tab = key;
  updateCode();
}

function updateCode() {
  const el = document.getElementById('code-pre');
  if (el) el.textContent = CODE[state.tab]?.() ?? '';
}

/* ══════════════════════════════
   Copy + AD-B2 슬라이드인
══════════════════════════════ */
let copyTimer;

function doCopy() {
  const code = document.getElementById('code-pre')?.textContent;
  if (!code) return;

  navigator.clipboard.writeText(code).catch(() => {
    // fallback
    const ta = document.createElement('textarea');
    ta.value = code;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  });

  const btn = document.getElementById('copy-btn');
  if (btn) {
    btn.textContent = '✓ Copied!';
    btn.classList.add('done');
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('done');
    }, 2000);
  }

  // AD-B2 슬라이드인
  const adB2 = document.getElementById('ad-b2');
  if (adB2) {
    adB2.classList.add('show');
    setTimeout(() => adB2.classList.remove('show'), 8000);
  }
}

/* ══════════════════════════════
   Export SVG
══════════════════════════════ */
function exportWidget() {
  const btn = document.querySelector('.btn-export');
  if (btn) { btn.textContent = 'Exporting...'; setTimeout(() => btn.textContent = 'Export SVG', 1200); }

  if (typeof generateStatsSVG === 'undefined') return;

  const svg = state.type === 'tech'
    ? generateBadgeSVG({ techs: getTechs(), themeName: state.theme })
    : state.type === 'profile'
      ? generateProfileSVG({ username: username(), themeName: state.theme })
      : generateStatsSVG({ username: username(), stars: 2847, commits: 1203, repos: 42, themeName: state.theme });

  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement('a'), { href: url, download: `gitgloss-${state.type}-${state.theme}.svg` });
  a.click();
  URL.revokeObjectURL(url);
}

function getTechs() {
  return Array.from(document.querySelectorAll('#tag-wrap .tag'))
    .map(t => t.textContent.replace('×','').trim());
}

/* ══════════════════════════════
   Template Grid Rendering
══════════════════════════════ */
function renderTemplateGrid(type) {
  const grid = document.getElementById('template-grid');
  if (!grid) return;
  
  // Get templates for selected type
  const templates = TemplateSystem.getTemplatesByType(type);
  
  grid.innerHTML = templates.map(template => {
    const badgeHTML = template.badge ? `<span class="template-thumb-badge">${template.badge}</span>` : '';
    const previewHTML = renderTemplateThumbPreview(template);
    
    return `
      <div class="template-thumb" onclick="applyTemplateFromThumb('${template.id}')" data-template-id="${template.id}">
        ${badgeHTML}
        <div class="template-thumb-preview" style="background:${getThumbGradient(template)}">
          ${previewHTML}
        </div>
        <div class="template-thumb-title">${template.title}</div>
      </div>
    `;
  }).join('');
}

function renderTemplateThumbPreview(template) {
  const config = template.config;
  const id = template.id;
  
  if (template.type === 'stats' && config.stats) {
    // 각 stats 템플릿마다 다른 레이아웃
    const layouts = {
      'stats-01': 'vertical-bars',
      'stats-02': 'horizontal-bars',
      'stats-06': 'grid-boxes',
      'stats-09': 'compact-circles',
      'stats-11': 'dark-vertical',
      'stats-15': 'dark-horizontal',
      'stats-17': 'dark-grid',
      'stats-21': 'neu-soft',
      'stats-25': 'neu-flat',
      'stats-31': 'gradient-burst'
    };
    
    const layout = layouts[id] || 'vertical-bars';
    const colors = [
      config.accentColor || '#ED93B1',
      '#9B8FE8',
      '#7EC8E3'
    ];
    
    if (layout === 'horizontal-bars') {
      return `
        <div class="thumb-preview-stats" style="flex-direction:row;gap:6px">
          ${config.stats.map((stat, i) => `
            <div style="flex:1;display:flex;flex-direction:column;gap:2px">
              <div class="thumb-preview-bar" style="height:${40 + (i * 10)}px;width:100%;background:${colors[i]};opacity:0.6"></div>
            </div>
          `).join('')}
        </div>
      `;
    } else if (layout === 'grid-boxes') {
      return `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;width:100%;padding:8px">
          ${config.stats.map((stat, i) => `
            <div style="aspect-ratio:1;border-radius:6px;background:${colors[i]};opacity:0.4"></div>
          `).join('')}
        </div>
      `;
    } else if (layout === 'compact-circles') {
      return `
        <div style="display:flex;gap:6px;align-items:center;justify-content:center">
          ${config.stats.map((stat, i) => `
            <div style="width:${24 + (i * 4)}px;height:${24 + (i * 4)}px;border-radius:50%;background:${colors[i]};opacity:0.5"></div>
          `).join('')}
        </div>
      `;
    } else if (layout.includes('dark')) {
      return `
        <div class="thumb-preview-stats" style="background:rgba(45,31,66,0.3);padding:8px;border-radius:6px">
          ${config.stats.map((stat, i) => `
            <div class="thumb-preview-bar" style="width:${70 + (i * 10)}%;background:${colors[i]};opacity:0.8"></div>
          `).join('')}
        </div>
      `;
    } else if (layout.includes('neu')) {
      return `
        <div class="thumb-preview-stats" style="background:linear-gradient(145deg, #f0e6f0, #e0d6e0);padding:8px;border-radius:8px">
          ${config.stats.map((stat, i) => `
            <div class="thumb-preview-bar" style="width:${70 + (i * 10)}%;background:${colors[i]};opacity:0.5;box-shadow:2px 2px 4px rgba(0,0,0,0.1)"></div>
          `).join('')}
        </div>
      `;
    } else if (layout === 'gradient-burst') {
      return `
        <div class="thumb-preview-stats">
          ${config.stats.map((stat, i) => `
            <div class="thumb-preview-bar" style="width:${70 + (i * 10)}%;background:linear-gradient(90deg, ${colors[i]}, ${colors[(i+1)%3]});opacity:0.7"></div>
          `).join('')}
        </div>
      `;
    }
    
    // Default vertical bars
    return `
      <div class="thumb-preview-stats">
        ${config.stats.map((stat, i) => `
          <div class="thumb-preview-bar" style="width:${70 + (i * 10)}%;background:${colors[i]};opacity:${0.3 + (i * 0.2)}"></div>
        `).join('')}
      </div>
    `;
  } else if (template.type === 'tech' && config.tags) {
    // 각 tech 템플릿마다 다른 배지 스타일
    const styles = {
      'badge-minimal': 'minimal',
      'badge-glass': 'glass-dark',
      'badge-soft': 'soft-neu',
      'badge-pastel': 'pastel',
      'badge-darkpro': 'dark-pro',
      'badge-stack-heavy': 'stacked',
      'badge-clean': 'clean',
      'badge-cloud': 'cloud',
      'badge-frontend': 'colorful',
      'badge-backend': 'dark-solid'
    };
    
    const style = styles[id] || 'minimal';
    const tagCount = Math.min(config.tags.length, 4);
    
    if (style === 'glass-dark') {
      return `
        <div class="thumb-preview-badges" style="background:rgba(45,31,66,0.4);padding:6px;border-radius:8px">
          ${config.tags.slice(0, tagCount).map(tag => `
            <span class="thumb-preview-badge" style="background:rgba(237,147,177,0.3);border:1px solid rgba(237,147,177,0.5)">${tag}</span>
          `).join('')}
        </div>
      `;
    } else if (style === 'soft-neu') {
      return `
        <div class="thumb-preview-badges">
          ${config.tags.slice(0, tagCount).map(tag => `
            <span class="thumb-preview-badge" style="background:linear-gradient(145deg, #f0e6f0, #e0d6e0);box-shadow:2px 2px 4px rgba(0,0,0,0.1)">${tag}</span>
          `).join('')}
        </div>
      `;
    } else if (style === 'colorful') {
      const colors = ['#ED93B1', '#9B8FE8', '#7EC8E3', '#F4C0D1'];
      return `
        <div class="thumb-preview-badges">
          ${config.tags.slice(0, tagCount).map((tag, i) => `
            <span class="thumb-preview-badge" style="background:${colors[i]};color:white;font-weight:600">${tag}</span>
          `).join('')}
        </div>
      `;
    } else if (style === 'stacked') {
      return `
        <div style="display:flex;flex-direction:column;gap:3px;width:100%;padding:8px">
          ${config.tags.slice(0, tagCount).map(tag => `
            <span class="thumb-preview-badge" style="width:100%;text-align:center">${tag}</span>
          `).join('')}
        </div>
      `;
    } else if (style.includes('dark')) {
      return `
        <div class="thumb-preview-badges" style="background:rgba(45,31,66,0.6);padding:6px;border-radius:8px">
          ${config.tags.slice(0, tagCount).map(tag => `
            <span class="thumb-preview-badge" style="background:rgba(155,143,232,0.3);color:white">${tag}</span>
          `).join('')}
        </div>
      `;
    }
    
    // Default
    return `
      <div class="thumb-preview-badges">
        ${config.tags.slice(0, tagCount).map(tag => `
          <span class="thumb-preview-badge">${tag}</span>
        `).join('')}
      </div>
    `;
  } else if (template.type === 'profile') {
    // 각 profile 템플릿마다 다른 레이아웃
    const layouts = {
      'hero-minimal': 'minimal',
      'hero-dark': 'dark',
      'hero-soft': 'soft',
      'hero-typography': 'typo',
      'hero-bunny': 'character',
      'hero-obsidian': 'obsidian',
      'hero-glass-grid': 'grid',
      'hero-interactive': 'interactive',
      'hero-portfolio': 'portfolio',
      'hero-simple-dark': 'simple-dark'
    };
    
    const layout = layouts[id] || 'minimal';
    
    if (layout === 'dark' || layout === 'obsidian' || layout === 'simple-dark') {
      return `
        <div class="thumb-preview-profile" style="background:rgba(45,31,66,0.4);padding:8px;border-radius:8px;width:100%">
          <div class="thumb-preview-avatar" style="background:linear-gradient(135deg, #9B8FE8, #ED93B1)"></div>
          <div class="thumb-preview-info">
            <div class="thumb-preview-name" style="background:rgba(255,255,255,0.3)"></div>
            <div class="thumb-preview-handle" style="background:rgba(255,255,255,0.2)"></div>
          </div>
        </div>
      `;
    } else if (layout === 'soft') {
      return `
        <div class="thumb-preview-profile" style="background:linear-gradient(145deg, #f0e6f0, #e0d6e0);padding:8px;border-radius:8px;width:100%">
          <div class="thumb-preview-avatar" style="box-shadow:2px 2px 4px rgba(0,0,0,0.1)"></div>
          <div class="thumb-preview-info">
            <div class="thumb-preview-name"></div>
            <div class="thumb-preview-handle"></div>
          </div>
        </div>
      `;
    } else if (layout === 'grid') {
      return `
        <div style="display:grid;grid-template-columns:auto 1fr;gap:8px;width:100%;padding:8px">
          <div class="thumb-preview-avatar" style="width:32px;height:32px"></div>
          <div style="display:flex;flex-direction:column;gap:4px">
            <div class="thumb-preview-name" style="width:100%"></div>
            <div class="thumb-preview-handle" style="width:80%"></div>
          </div>
        </div>
      `;
    } else if (layout === 'character') {
      return `
        <div class="thumb-preview-profile" style="width:100%">
          <div class="thumb-preview-avatar" style="width:32px;height:32px;background:linear-gradient(135deg, #F4C0D1, #ED93B1)"></div>
          <div class="thumb-preview-info">
            <div class="thumb-preview-name"></div>
            <div class="thumb-preview-handle"></div>
          </div>
        </div>
      `;
    }
    
    // Default
    return `
      <div class="thumb-preview-profile">
        <div class="thumb-preview-avatar"></div>
        <div class="thumb-preview-info">
          <div class="thumb-preview-name"></div>
          <div class="thumb-preview-handle"></div>
        </div>
      </div>
    `;
  }
  
  return '';
}

function getThumbGradient(template) {
  const id = template.id;
  const theme = template.theme;
  
  // Stats 템플릿별 그라데이션
  const statsGradients = {
    'stats-01': 'linear-gradient(135deg, rgba(237,147,177,.15), rgba(244,192,209,.1))',
    'stats-02': 'linear-gradient(135deg, rgba(155,143,232,.15), rgba(200,184,240,.1))',
    'stats-06': 'linear-gradient(135deg, rgba(255,255,255,.9), rgba(250,250,250,.8))',
    'stats-09': 'linear-gradient(135deg, rgba(126,200,227,.15), rgba(155,143,232,.1))',
    'stats-11': 'linear-gradient(135deg, rgba(45,31,66,.85), rgba(237,147,177,.2))',
    'stats-15': 'linear-gradient(135deg, rgba(212,83,126,.2), rgba(45,31,66,.8))',
    'stats-17': 'linear-gradient(135deg, rgba(155,143,232,.25), rgba(45,31,66,.8))',
    'stats-21': 'linear-gradient(145deg, #F0E6F0, #E8DEE8)',
    'stats-25': 'linear-gradient(145deg, #F5E5F0, #EDD5E8)',
    'stats-31': 'linear-gradient(135deg, rgba(237,147,177,.2), rgba(155,143,232,.15), rgba(126,200,227,.1))'
  };
  
  // Tech 템플릿별 그라데이션
  const techGradients = {
    'badge-minimal': 'linear-gradient(135deg, rgba(237,147,177,.08), rgba(255,255,255,.9))',
    'badge-glass': 'linear-gradient(135deg, rgba(45,31,66,.8), rgba(155,143,232,.15))',
    'badge-soft': 'linear-gradient(145deg, #F0E6F0, #E8DEE8)',
    'badge-pastel': 'linear-gradient(135deg, rgba(244,192,209,.12), rgba(237,147,177,.08))',
    'badge-darkpro': 'linear-gradient(135deg, rgba(45,31,66,.9), rgba(212,83,126,.2))',
    'badge-stack-heavy': 'linear-gradient(135deg, rgba(237,147,177,.12), rgba(126,200,227,.1))',
    'badge-clean': 'linear-gradient(145deg, #F5EBF5, #E5DBE5)',
    'badge-cloud': 'linear-gradient(135deg, rgba(126,200,227,.12), rgba(155,143,232,.08))',
    'badge-frontend': 'linear-gradient(135deg, rgba(237,147,177,.15), rgba(155,143,232,.12), rgba(126,200,227,.1))',
    'badge-backend': 'linear-gradient(135deg, rgba(45,31,66,.85), rgba(155,143,232,.2))'
  };
  
  // Profile 템플릿별 그라데이션
  const profileGradients = {
    'hero-minimal': 'linear-gradient(135deg, rgba(255,255,255,.95), rgba(250,250,250,.9))',
    'hero-dark': 'linear-gradient(135deg, rgba(45,31,66,.8), rgba(155,143,232,.15))',
    'hero-soft': 'linear-gradient(145deg, #F0E6F0, #E8DEE8)',
    'hero-typography': 'linear-gradient(135deg, rgba(237,147,177,.1), rgba(255,255,255,.9))',
    'hero-bunny': 'linear-gradient(135deg, rgba(244,192,209,.15), rgba(237,147,177,.1))',
    'hero-obsidian': 'linear-gradient(135deg, rgba(45,31,66,.9), rgba(200,184,240,.2))',
    'hero-glass-grid': 'linear-gradient(135deg, rgba(237,147,177,.12), rgba(155,143,232,.1))',
    'hero-interactive': 'linear-gradient(135deg, rgba(126,200,227,.12), rgba(237,147,177,.1))',
    'hero-portfolio': 'linear-gradient(135deg, rgba(237,147,177,.15), rgba(244,192,209,.1))',
    'hero-simple-dark': 'linear-gradient(135deg, rgba(45,31,66,.85), rgba(126,200,227,.15))'
  };
  
  // Mix 템플릿별 그라데이션
  const mixGradients = {
    'mix-dev-card': 'linear-gradient(135deg, rgba(237,147,177,.12), rgba(155,143,232,.08))',
    'mix-designer': 'linear-gradient(145deg, #F0E6F0, #E8DEE8)',
    'mix-engineer': 'linear-gradient(135deg, rgba(45,31,66,.8), rgba(155,143,232,.15))',
    'mix-creator': 'linear-gradient(135deg, rgba(244,192,209,.15), rgba(237,147,177,.1))',
    'mix-minimal-dev': 'linear-gradient(135deg, rgba(255,255,255,.95), rgba(250,250,250,.9))',
    'mix-tech-light': 'linear-gradient(135deg, rgba(237,147,177,.1), rgba(255,255,255,.9))',
    'mix-tech-dark': 'linear-gradient(135deg, rgba(45,31,66,.85), rgba(155,143,232,.2))',
    'mix-tech-soft': 'linear-gradient(145deg, #F5EBF5, #E5DBE5)',
    'mix-stats-lite': 'linear-gradient(135deg, rgba(237,147,177,.12), rgba(244,192,209,.08))',
    'mix-stats-dark-lite': 'linear-gradient(135deg, rgba(45,31,66,.8), rgba(155,143,232,.15))'
  };
  
  // 템플릿별 그라데이션 찾기
  if (statsGradients[id]) return statsGradients[id];
  if (techGradients[id]) return techGradients[id];
  if (profileGradients[id]) return profileGradients[id];
  if (mixGradients[id]) return mixGradients[id];
  
  // 기본 테마별 그라데이션
  if (theme === 'cotton-candy') {
    return 'linear-gradient(135deg, rgba(237,147,177,.12), rgba(155,143,232,.08))';
  } else if (theme === 'cotton-dark') {
    return 'linear-gradient(135deg, rgba(45,31,66,.8), rgba(155,143,232,.15))';
  } else if (theme === 'neumorphic-candy') {
    return 'linear-gradient(135deg, #F0E6F0, #E8DEE8)';
  }
  return 'linear-gradient(135deg, rgba(237,147,177,.1), rgba(155,143,232,.06))';
}

function applyTemplateFromThumb(templateId) {
  // Remove active state from all thumbs
  document.querySelectorAll('.template-thumb').forEach(thumb => {
    thumb.classList.remove('active');
  });
  
  // Add active state to clicked thumb
  const clickedThumb = document.querySelector(`[data-template-id="${templateId}"]`);
  if (clickedThumb) {
    clickedThumb.classList.add('active');
  }
  
  // Apply template using TemplateLoader
  if (typeof TemplateLoader !== 'undefined' && TemplateLoader.applyTemplate) {
    TemplateLoader.applyTemplate(templateId);
  } else if (typeof applyTemplate === 'function') {
    applyTemplate(templateId);
  }
  
  // Update code
  updateCode();
}

/* ══════════════════════════════
   Update Preview from Inputs
══════════════════════════════ */
function updatePreviewFromInputs() {
  // Render layout based on type
  if (state.type === 'stats') {
    renderStatsLayout();
  } else if (state.type === 'tech') {
    renderTechLayout();
  } else if (state.type === 'profile') {
    renderProfileLayout();
  } else if (state.type === 'streak') {
    renderStreakLayout();
  }
}

/* ══════════════════════════════
   Render Stats Layout
══════════════════════════════ */
function renderStatsLayout() {
  const username = document.getElementById('inp-username')?.value || 'octocat';
  const title = document.getElementById('inp-title')?.value || 'GitHub Stats';
  
  const stats = ['s1', 's2', 's3'].map(k => ({
    label: document.getElementById(`${k}-label`)?.value || document.getElementById(`${k}-label`)?.placeholder || '',
    value: document.getElementById(`${k}-val`)?.value || document.getElementById(`${k}-val`)?.placeholder || ''
  }));
  
  const widgetCard = document.getElementById('widget-card');
  if (!widgetCard) return;
  
  // Get current template to determine theme
  const currentTemplate = getCurrentTemplate();
  const themeClass = getThemeClass(currentTemplate);
  const layoutStyle = getStatsLayoutStyle(currentTemplate);
  
  widgetCard.className = `widget-card ${themeClass}`;
  widgetCard.innerHTML = `
    <div class="w-header">
      <div class="w-avatar w-avatar-emoji" id="w-avatar">${state.emoji}</div>
      <div>
        <div class="w-name" id="w-name">${username}</div>
        <div class="w-handle" id="w-handle">@${username} · GitHub</div>
      </div>
    </div>
    <div class="w-title" style="font-size:14px;font-weight:600;color:var(--text-main);margin:16px 0 12px">${title}</div>
    <div class="w-stats ${layoutStyle}" id="w-stats">
      ${stats.map((stat, i) => `
        <div class="w-stat">
          <div class="w-num" id="w-s${i+1}-val">${stat.value}</div>
          <div class="w-lbl" id="w-s${i+1}-lbl">${stat.label}</div>
        </div>
      `).join('')}
    </div>
  `;
  
  // Apply accent color
  const accentColor = state.accent || '#ED93B1';
  document.querySelectorAll('.w-num').forEach(n => n.style.color = accentColor);
  const avatar = document.getElementById('w-avatar');
  if (avatar && !avatar.classList.contains('w-avatar-emoji')) {
    avatar.style.background = `linear-gradient(135deg,${accentColor},#9B8FE8)`;
  }
}

/* ══════════════════════════════
   Render Tech Layout
══════════════════════════════ */
function renderTechLayout() {
  const username = document.getElementById('inp-username')?.value || 'octocat';
  const tagWrap = document.getElementById('tag-wrap');
  
  const tags = tagWrap ? Array.from(tagWrap.querySelectorAll('.tag')).map(tag => 
    tag.textContent.replace('×', '').trim()
  ) : ['React', 'TypeScript', 'Node.js'];
  
  const BADGE_COLORS = ['w-badge-pk', 'w-badge-pu', 'w-badge-sk'];
  
  const widgetCard = document.getElementById('widget-card');
  if (!widgetCard) return;
  
  // Get current template to determine theme
  const currentTemplate = getCurrentTemplate();
  const themeClass = getThemeClass(currentTemplate);
  const badgeStyle = getTechBadgeStyle(currentTemplate);
  
  widgetCard.className = `widget-card ${themeClass}`;
  widgetCard.innerHTML = `
    <div class="w-header">
      <div class="w-avatar w-avatar-emoji" id="w-avatar">${state.emoji}</div>
      <div>
        <div class="w-name" id="w-name">${username}</div>
        <div class="w-handle" id="w-handle">@${username} · GitHub</div>
      </div>
    </div>
    <div class="w-title" style="font-size:14px;font-weight:600;color:var(--text-main);margin:16px 0 12px">Tech Stack</div>
    <div class="w-tags ${badgeStyle}" id="w-tags">
      ${tags.map((tag, i) => `
        <span class="w-badge ${BADGE_COLORS[i % 3]}">${tag}</span>
      `).join('')}
    </div>
  `;
  
  // Apply accent color to badges
  const accentColor = state.accent || '#ED93B1';
  if (badgeStyle === 'badge-colorful') {
    document.querySelectorAll('.w-badge').forEach((badge, i) => {
      const colors = [accentColor, '#9B8FE8', '#7EC8E3'];
      badge.style.background = `linear-gradient(135deg, ${colors[i % 3]}, ${colors[(i + 1) % 3]})`;
    });
  }
}

/* ══════════════════════════════
   Render Profile Layout
══════════════════════════════ */
function renderProfileLayout() {
  const username = document.getElementById('inp-username')?.value || 'octocat';
  const name = document.getElementById('inp-pname')?.value || 'The Octocat';
  const handle = document.getElementById('inp-handle')?.value || '@octocat';
  const role = document.getElementById('inp-role')?.value || 'Full-stack Developer';
  const bio = document.getElementById('inp-bio')?.value || 'Building amazing things with code';
  
  const tagWrap = document.getElementById('tag-wrap-profile');
  const tags = tagWrap ? Array.from(tagWrap.querySelectorAll('.tag')).map(tag => 
    tag.textContent.replace('×', '').trim()
  ) : ['React', 'TypeScript'];
  
  const BADGE_COLORS = ['w-badge-pk', 'w-badge-pu', 'w-badge-sk'];
  
  const widgetCard = document.getElementById('widget-card');
  if (!widgetCard) return;
  
  // Get current template to determine theme
  const currentTemplate = getCurrentTemplate();
  const themeClass = getThemeClass(currentTemplate);
  const profileStyle = getProfileLayoutStyle(currentTemplate);
  
  widgetCard.className = `widget-card ${themeClass}`;
  widgetCard.innerHTML = `
    <div class="${profileStyle}">
      <div class="w-avatar w-avatar-emoji" id="w-avatar" style="width:80px;height:80px">${state.emoji}</div>
      <div>
        <div class="w-name" id="w-name" style="font-size:20px;font-weight:700;margin-bottom:4px">${name}</div>
        <div class="w-handle" id="w-handle" style="font-size:13px;color:var(--text-hint);margin-bottom:8px">${handle} · GitHub</div>
        <div style="font-size:14px;font-weight:600;color:var(--text-sub);margin-bottom:8px">${role}</div>
        <div style="font-size:13px;color:var(--text-hint);line-height:1.5;max-width:280px">${bio}</div>
      </div>
      <div class="w-tags" id="w-tags" style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">
        ${tags.map((tag, i) => `
          <span class="w-badge ${BADGE_COLORS[i % 3]}">${tag}</span>
        `).join('')}
      </div>
    </div>
  `;
  
  // Apply accent color to badges
  const accentColor = state.accent || '#ED93B1';
  document.querySelectorAll('.w-badge').forEach((badge, i) => {
    if (i === 0) {
      badge.style.background = accentColor;
      badge.style.color = 'white';
    }
  });
}

/* ══════════════════════════════
   Get Current Template
══════════════════════════════ */
function getCurrentTemplate() {
  const activeThumb = document.querySelector('.template-thumb.active');
  if (activeThumb) {
    const templateId = activeThumb.dataset.templateId;
    return TemplateSystem.getTemplate(templateId);
  }
  return null;
}

/* ══════════════════════════════
   Get Theme Class
══════════════════════════════ */
function getThemeClass(template) {
  if (!template) return 'theme-glass-light';
  
  const id = template.id;
  
  // Dark themes
  if (id.includes('dark') || template.theme === 'cotton-dark') {
    return 'theme-dark';
  }
  
  // Neumorphic themes
  if (id.includes('soft') || id.includes('neu') || template.theme === 'neumorphic-candy') {
    return 'theme-neumorphic';
  }
  
  // Neon/Gradient themes
  if (id.includes('burst') || id.includes('gradient') || id.includes('vivid')) {
    return 'theme-neon';
  }
  
  // Minimal themes
  if (id.includes('minimal') || id.includes('clean')) {
    return 'theme-minimal';
  }
  
  // Default glass
  return 'theme-glass-light';
}

/* ══════════════════════════════
   Get Stats Layout Style
══════════════════════════════ */
function getStatsLayoutStyle(template) {
  if (!template) return 'layout-vertical';
  
  const id = template.id;
  
  if (id === 'stats-02' || id === 'stats-15' || id === 'stats-25') {
    return 'layout-horizontal';
  } else if (id === 'stats-06' || id === 'stats-17') {
    return 'layout-grid';
  } else if (id === 'stats-09' || id === 'stats-31') {
    return 'layout-compact';
  }
  
  return 'layout-vertical';
}

/* ══════════════════════════════
   Get Tech Badge Style
══════════════════════════════ */
function getTechBadgeStyle(template) {
  if (!template) return 'badge-default';
  
  const id = template.id;
  
  if (id === 'badge-stack-heavy') {
    return 'badge-stacked';
  } else if (id === 'badge-minimal' || id === 'badge-clean') {
    return 'badge-minimal';
  } else if (id.includes('dark')) {
    return 'badge-dark';
  } else if (id === 'badge-frontend') {
    return 'badge-colorful';
  }
  
  return 'badge-default';
}

/* ══════════════════════════════
   Get Profile Layout Style
══════════════════════════════ */
function getProfileLayoutStyle(template) {
  if (!template) return 'profile-center';
  
  const id = template.id;
  
  if (id === 'hero-grid' || id === 'hero-glass-grid') {
    return 'profile-grid';
  } else if (id === 'hero-minimal' || id === 'hero-simple-dark') {
    return 'profile-minimal';
  }
  
  return 'profile-center';
}

/* ══════════════════════════════
   Render Streak Layout
══════════════════════════════ */
function renderStreakLayout() {
  const username = document.getElementById('inp-username')?.value || 'octocat';
  const currentStreak = document.getElementById('inp-streak')?.value || '42';
  const longestStreak = document.getElementById('inp-longest-streak')?.value || '87';
  const totalContributions = document.getElementById('inp-total-contributions')?.value || '1247';
  
  const widgetCard = document.getElementById('widget-card');
  if (!widgetCard) return;
  
  const currentTemplate = getCurrentTemplate();
  const themeClass = getThemeClass(currentTemplate);
  
  widgetCard.className = `widget-card ${themeClass}`;
  widgetCard.innerHTML = `
    <div class="w-header">
      <div class="w-avatar w-avatar-emoji" id="w-avatar">${state.emoji}</div>
      <div>
        <div class="w-name" id="w-name">${username}</div>
        <div class="w-handle" id="w-handle">@${username} · GitHub</div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:20px;margin-top:24px">
      <div style="text-align:center">
        <div style="font-size:48px;font-weight:800;line-height:1" id="streak-main">${currentStreak}</div>
        <div style="font-size:12px;color:var(--text-hint);margin-top:8px">Current Streak (days)</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;width:100%">
        <div style="text-align:center">
          <div style="font-size:24px;font-weight:700;color:var(--text-sub)">${longestStreak}</div>
          <div style="font-size:11px;color:var(--text-hint);margin-top:4px">Longest</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:24px;font-weight:700;color:var(--text-sub)">${totalContributions}</div>
          <div style="font-size:11px;color:var(--text-hint);margin-top:4px">Total</div>
        </div>
      </div>
    </div>
  `;
  
  // Apply accent color to main number
  const accentColor = state.accent || '#ED93B1';
  const mainNumber = document.getElementById('streak-main');
  if (mainNumber) {
    mainNumber.style.color = accentColor;
  }
}
