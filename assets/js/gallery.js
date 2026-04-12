// GitGloss Gallery — Template Grid Renderer
// Uses global TEMPLATES array from templates.js

/* ══════════════════════════════
   Render Gallery Grid
══════════════════════════════ */
function renderGallery(filter = 'all') {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  
  const allTemplates = TemplateSystem.getAllTemplates();
  
  // Filter templates
  const filteredTemplates = filter === 'all' 
    ? allTemplates 
    : allTemplates.filter(t => t.type === filter);
  
  // Render cards
  grid.innerHTML = filteredTemplates.map(template => renderTemplateCard(template)).join('');
  
  // Update stats
  updateGalleryStats(filteredTemplates.length, filter);
}

/* ══════════════════════════════
   Render Single Template Card
══════════════════════════════ */
function renderTemplateCard(template) {
  const categoryClass = `category-${template.type}`;
  const badgeHTML = template.badge ? `<span class="template-badge">${template.badge}</span>` : '';
  const gradient = getCardGradient(template);
  
  return `
    <div class="template-card" data-category="${template.type}" 
         onclick="navigateToBuilder('${template.id}')">
      <div class="template-preview" style="background:${gradient}">
        ${renderPreviewContent(template)}
      </div>
      <div class="template-header">
        <div>
          <h3 class="template-title">${template.title}</h3>
          <div class="template-meta">
            <span class="template-category ${categoryClass}">${template.type}</span>
            ${badgeHTML}
          </div>
        </div>
      </div>
      <div class="template-theme">${template.theme}</div>
      <div class="template-action">
        <span>이 위젯 사용하기</span>
        <span>→</span>
      </div>
    </div>
  `;
}

/* ══════════════════════════════
   Render Preview Content
══════════════════════════════ */
function renderPreviewContent(template) {
  const config = template.config;
  
  if (template.type === 'stats' && config.stats) {
    const colors = [
      config.accentColor || '#ED93B1',
      '#9B8FE8',
      '#7EC8E3'
    ];
    
    return `
      <div class="preview-stats">
        ${config.stats.map((stat, i) => `
          <div class="preview-bar" style="width:${80 + (i * 5)}%;background:${colors[i]};opacity:0.6"></div>
        `).join('')}
      </div>
    `;
  } else if (template.type === 'tech' && config.tags) {
    return `
      <div class="preview-badges">
        ${config.tags.slice(0, 4).map(tag => `
          <span class="preview-badge">${tag}</span>
        `).join('')}
      </div>
    `;
  } else if (template.type === 'profile') {
    return `
      <div class="preview-profile">
        <div class="preview-avatar"></div>
        <div class="preview-info">
          <div class="preview-name"></div>
          <div class="preview-handle"></div>
        </div>
      </div>
    `;
  }
  
  return '';
}

/* ══════════════════════════════
   Get Card Gradient
══════════════════════════════ */
function getCardGradient(template) {
  if (template.theme === 'cotton-candy') {
    return 'linear-gradient(135deg, rgba(237,147,177,.15), rgba(155,143,232,.1))';
  } else if (template.theme === 'cotton-dark') {
    return 'linear-gradient(135deg, rgba(45,31,66,.9), rgba(155,143,232,.2))';
  } else if (template.theme === 'neumorphic-candy') {
    return 'linear-gradient(135deg, #F0E6F0, #E8DEE8)';
  }
  return 'linear-gradient(135deg, rgba(237,147,177,.1), rgba(155,143,232,.08))';
}

/* ══════════════════════════════
   Navigate to Builder
══════════════════════════════ */
function navigateToBuilder(templateId) {
  window.location.href = `builder.html?template=${templateId}`;
}

/* ══════════════════════════════
   Update Gallery Stats
══════════════════════════════ */
function updateGalleryStats(count, filter) {
  const stats = document.getElementById('gallery-stats');
  if (stats) {
    stats.innerHTML = `${count}개의 템플릿 표시 중`;
  }
}

/* ══════════════════════════════
   Filter Functionality
══════════════════════════════ */
function initFilters() {
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active state
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Render filtered gallery
      const filter = tab.dataset.filter;
      renderGallery(filter);
    });
  });
}

/* ══════════════════════════════
   Initialize on DOM Ready
══════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  renderGallery('all');
  initFilters();
});
