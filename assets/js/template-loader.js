// GitGloss Template Loader & Applicator
// Handles URL params and auto-applies template configs

const TemplateLoader = {
  
  // Parse URL parameters
  getURLParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      type: params.get('type'),
      theme: params.get('theme'),
      preset: params.get('preset'),
      templateId: params.get('template')
    };
  },

  // Apply template configuration to builder
  applyTemplate(templateId) {
    const template = TemplateSystem.getTemplate(templateId);
    
    if (!template) {
      console.warn(`Template not found: ${templateId}`);
      return false;
    }

    console.log('Applying template:', template.title, template);

    // Apply type first
    if (template.type) {
      this.selectType(template.type);
    }

    // Apply theme
    if (template.theme) {
      this.selectTheme(template.theme);
    }

    // Wait a bit for DOM to be ready, then apply config
    setTimeout(() => {
      const config = template.config;
      
      switch (template.type) {
        case 'stats':
          this.applyStatsConfig(config);
          break;
        case 'tech':
          this.applyTechConfig(config);
          break;
        case 'profile':
          this.applyProfileConfig(config);
          break;
        case 'streak':
          this.applyStreakConfig(config);
          break;
      }

      // Update code output
      if (typeof updateCode === 'function') {
        updateCode();
      }
    }, 50);

    return true;
  },

  // Apply template by preset
  applyTemplateByPreset(preset) {
    const template = TemplateSystem.getTemplateByPreset(preset);
    if (template) {
      return this.applyTemplate(template.id);
    }
    return false;
  },

  // Apply template from URL params
  applyTemplateFromURL() {
    const params = this.getURLParams();
    
    // Priority 1: Direct template ID
    if (params.templateId) {
      return this.applyTemplate(params.templateId);
    }
    
    // Priority 2: Preset
    if (params.preset) {
      return this.applyTemplateByPreset(params.preset);
    }
    
    // Priority 3: Type + Theme combination
    if (params.type && params.theme) {
      const templates = TemplateSystem.getTemplatesByType(params.type);
      const match = templates.find(t => t.theme === params.theme);
      if (match) {
        return this.applyTemplate(match.id);
      }
    }
    
    return false;
  },

  // Select widget type
  selectType(type) {
    // Hide all type-specific fields
    const fieldGroups = ['fields-stats', 'fields-tech', 'fields-profile', 'fields-streak'];
    fieldGroups.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });

    // Show selected type fields
    const targetFields = document.getElementById(`fields-${type}`);
    if (targetFields) {
      targetFields.style.display = 'block';
    }

    // Update type chips
    document.querySelectorAll('.type-chip').forEach(chip => {
      chip.classList.remove('on');
    });
    
    const typeChip = document.querySelector(`[onclick*="'${type}'"]`);
    if (typeChip) {
      typeChip.classList.add('on');
    }

    // Update state in builder.js if available
    if (typeof state !== 'undefined') {
      state.type = type;
    }

    // Render template grid for this type
    if (typeof renderTemplateGrid === 'function') {
      renderTemplateGrid(type);
    }

    // Store current type
    this.currentType = type;
  },

  // Select theme
  selectTheme(theme) {
    // Update theme selector if exists
    const themeButtons = document.querySelectorAll('[data-theme]');
    themeButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.theme === theme) {
        btn.classList.add('active');
      }
    });

    // Store current theme
    this.currentTheme = theme;
  },

  // Apply Stats Config
  applyStatsConfig(config) {
    // Username
    const usernameInput = document.getElementById('inp-username');
    
    if (usernameInput && config.username) {
      usernameInput.value = config.username;
    }

    // Title
    const titleInput = document.getElementById('inp-title');
    if (titleInput && config.title) {
      titleInput.value = config.title;
    }

    // Stats
    if (config.stats && Array.isArray(config.stats)) {
      config.stats.forEach((stat, index) => {
        const labelInput = document.getElementById(`s${index + 1}-label`);
        const valueInput = document.getElementById(`s${index + 1}-val`);
        
        if (labelInput) {
          labelInput.value = stat.label || '';
        }
        if (valueInput) {
          valueInput.value = stat.value || '';
        }
      });
    }

    // Accent color
    if (config.accentColor) {
      this.selectColor(config.accentColor);
      // Update state in builder.js if available
      if (typeof state !== 'undefined') {
        state.accent = config.accentColor;
      }
    }

    // Trigger preview update from builder.js
    if (typeof updatePreviewFromInputs === 'function') {
      updatePreviewFromInputs();
    }
  },

  // Apply Tech Config
  applyTechConfig(config) {
    // Username
    const usernameInput = document.getElementById('inp-username');
    
    if (usernameInput && config.username) {
      usernameInput.value = config.username;
    }

    // Tags
    if (config.tags && Array.isArray(config.tags)) {
      const tagWrap = document.getElementById('tag-wrap');
      const TAG_COLORS = ['tag-pk', 'tag-pu', 'tag-sk'];
      
      if (tagWrap) {
        // Clear existing tags
        tagWrap.innerHTML = '';
        
        // Add new tags
        config.tags.forEach((tag, i) => {
          const tagEl = document.createElement('span');
          tagEl.className = 'tag ' + TAG_COLORS[i % 3];
          tagEl.innerHTML = `${tag} <button class="tag-x" onclick="removeTag(this)">×</button>`;
          tagWrap.appendChild(tagEl);
        });
      }
    }

    // Accent color
    if (config.accentColor) {
      this.selectColor(config.accentColor);
      // Update state in builder.js if available
      if (typeof state !== 'undefined') {
        state.accent = config.accentColor;
      }
    }

    // Trigger preview update from builder.js
    if (typeof updatePreviewFromInputs === 'function') {
      updatePreviewFromInputs();
    }
  },

  // Apply Profile Config
  applyProfileConfig(config) {
    // Username
    const usernameInput = document.getElementById('inp-username');
    if (usernameInput && config.username) {
      usernameInput.value = config.username;
    }

    // Name
    const nameInput = document.getElementById('inp-pname');
    if (nameInput && config.name) {
      nameInput.value = config.name;
    }

    // Handle
    const handleInput = document.getElementById('inp-handle');
    if (handleInput && config.handle) {
      handleInput.value = config.handle;
    }

    // Role
    const roleInput = document.getElementById('inp-role');
    if (roleInput && config.role) {
      roleInput.value = config.role;
    }

    // Bio
    const bioInput = document.getElementById('inp-bio');
    if (bioInput && config.bio) {
      bioInput.value = config.bio;
    }

    // Tags
    if (config.tags && Array.isArray(config.tags)) {
      const tagWrap = document.getElementById('tag-wrap-profile');
      const TAG_COLORS = ['tag-pk', 'tag-pu', 'tag-sk'];
      
      if (tagWrap) {
        // Clear existing tags
        tagWrap.innerHTML = '';
        
        // Add new tags
        config.tags.forEach((tag, i) => {
          const tagEl = document.createElement('span');
          tagEl.className = 'tag ' + TAG_COLORS[i % 3];
          tagEl.innerHTML = `${tag} <button class="tag-x" onclick="removeTag(this)">×</button>`;
          tagWrap.appendChild(tagEl);
        });
      }
    }

    // Accent color
    if (config.accentColor) {
      this.selectColor(config.accentColor);
      // Update state in builder.js if available
      if (typeof state !== 'undefined') {
        state.accent = config.accentColor;
      }
    }

    // Trigger preview update from builder.js
    if (typeof updatePreviewFromInputs === 'function') {
      updatePreviewFromInputs();
    }
  },

  // Apply Streak Config
  applyStreakConfig(config) {
    // Username
    const usernameInput = document.getElementById('inp-username');
    if (usernameInput && config.username) {
      usernameInput.value = config.username;
    }

    // Current streak
    const streakInput = document.getElementById('inp-streak');
    if (streakInput && config.currentStreak) {
      streakInput.value = config.currentStreak;
    }

    // Longest streak
    const longestInput = document.getElementById('inp-longest-streak');
    if (longestInput && config.longestStreak) {
      longestInput.value = config.longestStreak;
    }

    // Total contributions
    const totalInput = document.getElementById('inp-total-contributions');
    if (totalInput && config.totalContributions) {
      totalInput.value = config.totalContributions;
    }

    // Accent color
    if (config.accentColor) {
      this.selectColor(config.accentColor);
      // Update state in builder.js if available
      if (typeof state !== 'undefined') {
        state.accent = config.accentColor;
      }
    }

    // Trigger preview update from builder.js
    if (typeof updatePreviewFromInputs === 'function') {
      updatePreviewFromInputs();
    }
  },

  // Select color
  selectColor(color) {
    // Update color swatches
    document.querySelectorAll('.sw').forEach(sw => {
      sw.classList.remove('on');
      if (sw.title === color || sw.dataset.color === color) {
        sw.classList.add('on');
      }
    });
  },

  // Get current template info
  getCurrentTemplateInfo() {
    return {
      type: this.currentType,
      theme: this.currentTheme,
      params: this.getURLParams()
    };
  },

  // Initialize on page load
  init() {
    console.log('Template Loader initialized');
    
    // Auto-apply template from URL
    const applied = this.applyTemplateFromURL();
    
    if (applied) {
      console.log('Template auto-applied from URL');
    } else {
      console.log('No template to apply, using defaults');
    }

    // Add template info to UI
    this.displayTemplateInfo();
  },

  // Display template info in UI
  displayTemplateInfo() {
    const params = this.getURLParams();
    const template = params.templateId 
      ? TemplateSystem.getTemplate(params.templateId)
      : params.preset 
        ? TemplateSystem.getTemplateByPreset(params.preset)
        : null;

    if (template) {
      // Update page title
      document.title = `${template.title} — GitGloss Builder`;
      
      // Add template badge to UI
      const topbar = document.querySelector('.topbar-title');
      if (topbar) {
        topbar.innerHTML = `
          Widget Builder
          <span style="font-size:11px;color:var(--google-blue);margin-left:12px;font-weight:500">
            · ${template.title}
          </span>
        `;
      }
      
      // Mark template as active in grid (with delay to ensure grid is rendered)
      const markActive = () => {
        const thumb = document.querySelector(`[data-template-id="${template.id}"]`);
        if (thumb) {
          thumb.classList.add('active');
          // Scroll into view
          thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          // Retry if grid not rendered yet
          setTimeout(markActive, 100);
        }
      };
      setTimeout(markActive, 200);
    }
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    TemplateLoader.init();
  });
} else {
  TemplateLoader.init();
}

// Export for global use
window.TemplateLoader = TemplateLoader;
window.applyTemplate = (templateId) => TemplateLoader.applyTemplate(templateId);
