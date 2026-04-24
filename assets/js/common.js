/* =============================================
   ReadMe.kit — common.js v2
   모든 페이지 공통 유틸리티

   exports (전역):
     initNav()           — 모바일 nav 초기화 (자동 실행)
     toast(msg, duration) — 토스트 알림
     copyText(text, label) — 클립보드 복사 + 토스트
   ============================================= */

/* ── Mobile Navigation ──────────────────────── */

function initNav() {
  const toggle  = document.getElementById('nav-mobile-toggle');
  const menu    = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  // 오버레이 생성
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.id = 'nav-overlay';
  document.body.appendChild(overlay);

  function open() {
    toggle.classList.add('active');
    menu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    toggle.setAttribute('aria-expanded', 'true');
  }

  function close() {
    toggle.classList.remove('active');
    menu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    menu.classList.contains('active') ? close() : open();
  });

  overlay.addEventListener('click', close);

  // 링크 클릭 시 닫기
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

  // ESC 키
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });
}

/* ── Toast ──────────────────────────────────── */

let _toastEl = null;

function toast(msg, duration = 2000) {
  if (!_toastEl) {
    _toastEl = document.createElement('div');
    _toastEl.id = 'rk-toast';
    Object.assign(_toastEl.style, {
      position:       'fixed',
      bottom:         '32px',
      left:           '50%',
      transform:      'translateX(-50%) translateY(12px)',
      background:     '#09090E',
      color:          '#F4F4F8',
      padding:        '10px 20px',
      borderRadius:   '100px',
      fontSize:       '13px',
      fontWeight:     '600',
      letterSpacing:  '-0.01em',
      boxShadow:      '0 8px 24px rgba(0,0,0,0.18)',
      zIndex:         '9999',
      opacity:        '0',
      transition:     'opacity 0.2s, transform 0.2s',
      pointerEvents:  'none',
      whiteSpace:     'nowrap',
    });
    document.body.appendChild(_toastEl);
  }

  _toastEl.textContent = msg;

  // 등장
  requestAnimationFrame(() => {
    _toastEl.style.opacity   = '1';
    _toastEl.style.transform = 'translateX(-50%) translateY(0)';
  });

  // 퇴장
  clearTimeout(_toastEl._timer);
  _toastEl._timer = setTimeout(() => {
    _toastEl.style.opacity   = '0';
    _toastEl.style.transform = 'translateX(-50%) translateY(12px)';
  }, duration);
}

/* ── Clipboard ──────────────────────────────── */

async function copyText(text, label = '복사됨') {
  try {
    await navigator.clipboard.writeText(text);
    toast(`✓ ${label}`);
  } catch {
    // fallback: execCommand
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    toast(`✓ ${label}`);
  }
}

/* ── Init ───────────────────────────────────── */

document.addEventListener('DOMContentLoaded', initNav);

