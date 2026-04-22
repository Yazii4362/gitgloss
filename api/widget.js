/* ═══════════════════════════════════════════════════════
   GitGloss — api/widget.js
   Vercel Serverless Function
   GET /api/widget?style=dark&accent=4285F4&name=야지&...
   → SVG 이미지 반환
   ═══════════════════════════════════════════════════════ */

export default function handler(req, res) {
  // CORS — GitHub 등 어디서나 이미지로 로드 가능하게
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
  // 캐시: 1시간 (GitHub CDN이 캐싱함)
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');

  const p = req.query;

  // ── 파라미터 파싱 ──────────────────────────────────
  const style    = p.style   || 'glass';   // glass|dark|neu|border|gradient|minimal
  const accent   = '#' + (p.accent || '4285F4').replace('#', '');
  const name     = decode(p.name   || '');
  const role     = decode(p.role   || '');
  const handle   = decode(p.handle || '');
  const bio      = decode(p.bio    || '');
  const emoji    = decode(p.emoji  || '👨‍💻');
  const username = decode(p.username || '');

  // stats: "Stars:2.8k,Repos:142,Active:98%"
  const statsRaw = p.stats ? decode(p.stats) : '';
  const stats    = statsRaw
    ? statsRaw.split(',').map(s => {
        const [label, val] = s.split(':');
        return { label: label || '', val: val || '' };
      })
    : [];

  // badges: "React,TypeScript,Node.js"
  const badgesRaw = p.badges ? decode(p.badges) : '';
  const badges    = badgesRaw ? badgesRaw.split(',').filter(Boolean) : [];

  // streak: "42:87:1247" (current:longest:total)
  const streakRaw = p.streak ? decode(p.streak) : '';
  const [streakCur, streakLong, streakTotal] = streakRaw.split(':');

  // links: "github:https://...,blog:https://..."
  const linksRaw = p.links ? decode(p.links) : '';
  const links    = linksRaw
    ? linksRaw.split(',').map(l => {
        const idx  = l.indexOf(':');
        const type = l.slice(0, idx);
        const url  = l.slice(idx + 1);
        return { type, url };
      }).filter(l => l.type && l.url)
    : [];

  // gradient preset
  const gradPreset = p.grad || 'candy';

  // ── SVG 생성 ───────────────────────────────────────
  const svg = buildSVG({
    style, accent, name, role, handle, bio, emoji, username,
    stats, badges, streakCur, streakLong, streakTotal, links, gradPreset,
  });

  res.status(200).send(svg);
}

function decode(str) {
  try { return decodeURIComponent(str); } catch { return str; }
}

/* ══════════════════════════════════════════════════════
   SVG 빌더
══════════════════════════════════════════════════════ */
function buildSVG(o) {
  const W = 480;

  // 블록별 높이 계산
  let contentHeight = 28; // 상하 패딩
  if (o.emoji || o.name || o.role || o.handle) contentHeight += 64;
  if (o.bio)    contentHeight += 40;
  if (o.stats && o.stats.length > 0) contentHeight += 80;
  if (o.badges && o.badges.length > 0) contentHeight += Math.ceil(o.badges.length / 4) * 32 + 8;
  if (o.streakCur) contentHeight += 100;
  if (o.links && o.links.length > 0) contentHeight += Math.ceil(o.links.length / 3) * 36 + 8;

  const H = Math.max(contentHeight, 120);

  const theme = getTheme(o.style, o.accent, o.gradPreset);

  // 블록 SVG 조각들
  const blocks = [];
  let y = 28;

  // ── 아바타 + 이름 블록 ──
  if (o.emoji || o.name) {
    blocks.push(renderNameBlock(o, y, W, theme));
    y += 64;
  }

  // ── 소개글 ──
  if (o.bio) {
    blocks.push(renderBioBlock(o.bio, y, W, theme));
    y += 40;
  }

  // ── Stats ──
  if (o.stats && o.stats.length > 0) {
    blocks.push(renderStatsBlock(o.stats, y, W, o.accent, theme));
    y += 80;
  }

  // ── 스트릭 ──
  if (o.streakCur) {
    blocks.push(renderStreakBlock(o, y, W, o.accent, theme));
    y += 100;
  }

  // ── 배지 ──
  if (o.badges && o.badges.length > 0) {
    const badgeH = Math.ceil(o.badges.length / 4) * 32 + 8;
    blocks.push(renderBadgesBlock(o.badges, y, W, o.accent, theme));
    y += badgeH;
  }

  // ── 링크 ──
  if (o.links && o.links.length > 0) {
    blocks.push(renderLinksBlock(o.links, y, W, theme));
    y += Math.ceil(o.links.length / 3) * 36 + 8;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img"
    aria-label="${escXml(o.name || 'GitGloss Widget')}">
  <title>${escXml(o.name || 'GitGloss Widget')}</title>
  <defs>
    ${theme.defs || ''}
    <style>
      text { font-family: 'Segoe UI', 'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif; }
    </style>
    <clipPath id="card-clip">
      <rect width="${W}" height="${H}" rx="20" ry="20"/>
    </clipPath>
  </defs>

  <!-- 카드 배경 -->
  <g clip-path="url(#card-clip)">
    <rect width="${W}" height="${H}" rx="20" ry="20" fill="${theme.bg}" ${theme.bgExtra || ''}/>
    ${theme.overlay || ''}
  </g>

  <!-- 테두리 -->
  <rect width="${W}" height="${H}" rx="20" ry="20"
    fill="none" stroke="${theme.border}" stroke-width="${theme.borderWidth || 1}"/>

  <!-- 콘텐츠 -->
  ${blocks.join('\n')}
</svg>`;
}

/* ── 테마 정의 ───────────────────────────────────────── */
function getTheme(style, accent, gradPreset) {
  const GRAD_PRESETS = {
    sunset:   { from: '#FF6B6B', mid: '#FF8E53', to: '#FFE66D' },
    ocean:    { from: '#2193b0', mid: '#4ab8d4', to: '#6dd5ed' },
    forest:   { from: '#134E5E', mid: '#2d7a5a', to: '#71B280' },
    candy:    { from: '#ED93B1', mid: '#c490cc', to: '#9B8FE8' },
    midnight: { from: '#0f0c29', mid: '#24243e', to: '#302b63' },
    aurora:   { from: '#00C9FF', mid: '#4de8b0', to: '#92FE9D' },
  };

  switch (style) {
    case 'dark':
      return {
        bg: '#0D0714',
        border: 'rgba(255,255,255,0.1)',
        text: '#f0e6ff',
        subText: 'rgba(240,230,255,0.55)',
        hintText: 'rgba(240,230,255,0.35)',
        statBg: 'rgba(255,255,255,0.06)',
        statBorder: 'rgba(255,255,255,0.1)',
        badgeBg: hexAlpha(accent, 0.15),
        badgeBorder: hexAlpha(accent, 0.3),
        overlay: `<rect width="480" height="1" y="0" fill="url(#dark-line)"/>`,
        defs: `<linearGradient id="dark-line" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stop-color="transparent"/>
          <stop offset="50%" stop-color="${accent}" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="transparent"/>
        </linearGradient>`,
      };

    case 'neu':
      return {
        bg: '#F0EAF5',
        border: 'transparent',
        borderWidth: 0,
        text: '#3a2050',
        subText: 'rgba(58,32,80,0.6)',
        hintText: 'rgba(58,32,80,0.4)',
        statBg: '#F0EAF5',
        statBorder: 'transparent',
        badgeBg: hexAlpha(accent, 0.12),
        badgeBorder: hexAlpha(accent, 0.25),
        bgExtra: `filter="url(#neu-shadow)"`,
        defs: `<filter id="neu-shadow">
          <feDropShadow dx="4" dy="4" stdDeviation="6" flood-color="rgba(160,100,180,0.18)"/>
          <feDropShadow dx="-4" dy="-4" stdDeviation="6" flood-color="rgba(255,255,255,0.9)"/>
        </filter>`,
      };

    case 'border':
      return {
        bg: '#ffffff',
        border: accent,
        borderWidth: 2.5,
        text: '#08080F',
        subText: 'rgba(8,8,15,0.65)',
        hintText: 'rgba(8,8,15,0.4)',
        statBg: hexAlpha(accent, 0.06),
        statBorder: hexAlpha(accent, 0.2),
        badgeBg: hexAlpha(accent, 0.1),
        badgeBorder: hexAlpha(accent, 0.25),
      };

    case 'gradient': {
      const g = GRAD_PRESETS[gradPreset] || GRAD_PRESETS.candy;
      return {
        bg: `url(#grad-bg)`,
        border: 'rgba(255,255,255,0.2)',
        text: '#ffffff',
        subText: 'rgba(255,255,255,0.8)',
        hintText: 'rgba(255,255,255,0.6)',
        statBg: 'rgba(255,255,255,0.2)',
        statBorder: 'rgba(255,255,255,0.3)',
        badgeBg: 'rgba(255,255,255,0.2)',
        badgeBorder: 'rgba(255,255,255,0.35)',
        defs: `<linearGradient id="grad-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stop-color="${g.from}"/>
          <stop offset="50%"  stop-color="${g.mid}"/>
          <stop offset="100%" stop-color="${g.to}"/>
        </linearGradient>`,
      };
    }

    case 'minimal':
      return {
        bg: '#ffffff',
        border: 'transparent',
        borderWidth: 0,
        text: '#08080F',
        subText: 'rgba(8,8,15,0.65)',
        hintText: 'rgba(8,8,15,0.4)',
        statBg: 'rgba(0,0,0,0.03)',
        statBorder: 'rgba(0,0,0,0.08)',
        badgeBg: 'rgba(0,0,0,0.05)',
        badgeBorder: 'rgba(0,0,0,0.1)',
        overlay: `<rect x="0" y="0" width="480" height="4" rx="0" fill="${accent}"/>`,
      };

    default: // glass
      return {
        bg: 'rgba(255,255,255,0.85)',
        border: 'rgba(255,255,255,0.6)',
        text: '#08080F',
        subText: 'rgba(8,8,15,0.65)',
        hintText: 'rgba(8,8,15,0.4)',
        statBg: 'rgba(255,255,255,0.9)',
        statBorder: 'rgba(0,0,0,0.06)',
        badgeBg: hexAlpha(accent, 0.12),
        badgeBorder: hexAlpha(accent, 0.3),
      };
  }
}

/* ── 블록 렌더러들 ───────────────────────────────────── */

function renderNameBlock(o, y, W, theme) {
  const cx = 28 + 24; // 아바타 중심 x
  const cy = y + 24;  // 아바타 중심 y
  const r  = 24;

  return `
  <!-- 아바타 + 이름 -->
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${theme.statBg}" stroke="${theme.statBorder}" stroke-width="1"/>
  <text x="${cx}" y="${cy + 9}" text-anchor="middle" font-size="24">${escXml(o.emoji || '👨‍💻')}</text>
  ${o.name ? `<text x="${cx + r + 14}" y="${y + 18}" font-size="17" font-weight="700" fill="${theme.text}">${escXml(o.name)}</text>` : ''}
  ${o.role ? `<text x="${cx + r + 14}" y="${y + 36}" font-size="12" fill="${theme.subText}">${escXml(o.role)}</text>` : ''}
  ${o.handle ? `<text x="${cx + r + 14}" y="${y + 52}" font-size="11" fill="${theme.hintText}">${escXml(o.handle)}</text>` : ''}`;
}

function renderBioBlock(bio, y, W, theme) {
  return `
  <!-- 소개글 -->
  <text x="28" y="${y + 16}" font-size="12" fill="${theme.subText}" font-style="italic">${escXml(bio.slice(0, 60))}${bio.length > 60 ? '...' : ''}</text>`;
}

function renderStatsBlock(stats, y, W, accent, theme) {
  const count  = Math.min(stats.length, 4);
  const colW   = (W - 56) / count;
  const items  = stats.slice(0, count);

  return `
  <!-- Stats -->
  ${items.map((s, i) => {
    const x = 28 + i * colW;
    return `
    <rect x="${x}" y="${y}" width="${colW - 8}" height="64" rx="12"
      fill="${theme.statBg}" stroke="${theme.statBorder}" stroke-width="1"/>
    <text x="${x + (colW - 8) / 2}" y="${y + 28}" text-anchor="middle"
      font-size="20" font-weight="700" fill="${accent}">${escXml(s.val)}</text>
    <text x="${x + (colW - 8) / 2}" y="${y + 48}" text-anchor="middle"
      font-size="10" font-weight="600" fill="${theme.hintText}"
      letter-spacing="0.5">${escXml(s.label.toUpperCase())}</text>`;
  }).join('')}`;
}

function renderStreakBlock(o, y, W, accent, theme) {
  return `
  <!-- 스트릭 -->
  <text x="${W / 2}" y="${y + 44}" text-anchor="middle"
    font-size="48" font-weight="800" fill="${accent}">${escXml(o.streakCur || '0')}</text>
  <text x="${W / 2}" y="${y + 64}" text-anchor="middle"
    font-size="11" font-weight="600" fill="${theme.hintText}" letter-spacing="1">DAY STREAK 🔥</text>
  <rect x="28"       y="${y + 76}" width="${(W - 56) / 2 - 4}" height="40" rx="10"
    fill="${theme.statBg}" stroke="${theme.statBorder}" stroke-width="1"/>
  <text x="${28 + (W - 56) / 4}" y="${y + 92}" text-anchor="middle"
    font-size="16" font-weight="700" fill="${theme.text}">${escXml(o.streakLong || '0')}</text>
  <text x="${28 + (W - 56) / 4}" y="${y + 108}" text-anchor="middle"
    font-size="9" fill="${theme.hintText}">LONGEST</text>
  <rect x="${W / 2 + 4}" y="${y + 76}" width="${(W - 56) / 2 - 4}" height="40" rx="10"
    fill="${theme.statBg}" stroke="${theme.statBorder}" stroke-width="1"/>
  <text x="${W / 2 + 4 + (W - 56) / 4}" y="${y + 92}" text-anchor="middle"
    font-size="16" font-weight="700" fill="${theme.text}">${escXml(o.streakTotal || '0')}</text>
  <text x="${W / 2 + 4 + (W - 56) / 4}" y="${y + 108}" text-anchor="middle"
    font-size="9" fill="${theme.hintText}">TOTAL</text>`;
}

function renderBadgesBlock(badges, y, W, accent, theme) {
  const perRow = 4;
  const badgeW = 100;
  const badgeH = 26;
  const gap    = 8;

  return `
  <!-- 배지 -->
  ${badges.map((tag, i) => {
    const col = i % perRow;
    const row = Math.floor(i / perRow);
    const x   = 28 + col * (badgeW + gap);
    const by  = y + row * (badgeH + gap);
    return `
    <rect x="${x}" y="${by}" width="${badgeW}" height="${badgeH}" rx="13"
      fill="${theme.badgeBg}" stroke="${theme.badgeBorder}" stroke-width="1"/>
    <text x="${x + badgeW / 2}" y="${by + 17}" text-anchor="middle"
      font-size="11" font-weight="600" fill="${accent}">${escXml(tag)}</text>`;
  }).join('')}`;
}

function renderLinksBlock(links, y, W, theme) {
  const LINK_COLORS = {
    github: '#181717', blog: '#20c997', email: '#EA4335',
    linkedin: '#0A66C2', twitter: '#000000', instagram: '#E1306C',
    youtube: '#FF0000', discord: '#5865F2', notion: '#000000', portfolio: '#4285F4',
  };
  const LINK_LABELS = {
    github: 'GitHub', blog: '블로그', email: 'Email',
    linkedin: 'LinkedIn', twitter: 'X/Twitter', instagram: 'Instagram',
    youtube: 'YouTube', discord: 'Discord', notion: 'Notion', portfolio: 'Portfolio',
  };

  const perRow = 3;
  const btnW   = (W - 56 - (perRow - 1) * 8) / perRow;
  const btnH   = 30;

  return `
  <!-- 링크 -->
  ${links.map((link, i) => {
    const col   = i % perRow;
    const row   = Math.floor(i / perRow);
    const x     = 28 + col * (btnW + 8);
    const ly    = y + row * (btnH + 8);
    const color = LINK_COLORS[link.type] || '#555555';
    const label = LINK_LABELS[link.type] || link.type;
    return `
    <rect x="${x}" y="${ly}" width="${btnW}" height="${btnH}" rx="15"
      fill="${hexAlpha(color, 0.1)}" stroke="${hexAlpha(color, 0.25)}" stroke-width="1"/>
    <text x="${x + btnW / 2}" y="${ly + 20}" text-anchor="middle"
      font-size="11" font-weight="700" fill="${color}">${escXml(label)}</text>`;
  }).join('')}`;
}

/* ── 유틸 ────────────────────────────────────────────── */
function hexAlpha(hex, alpha) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  if (isNaN(r)) return `rgba(66,133,244,${alpha})`;
  return `rgba(${r},${g},${b},${alpha})`;
}

function escXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
