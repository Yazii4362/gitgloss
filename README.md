# GitGloss

**GitHub README 위젯 빌더** — Glassmorphism·Neumorphism 스타일의 프리미엄 위젯 생성기

## 🎨 프로젝트 개요

GitGloss는 GitHub README와 Notion 페이지를 위한 **Glassmorphism·Neumorphism 위젯 생성기**입니다. 
드래그 없이 Config 패널에서 설정하면 실시간 SVG 프리뷰가 바뀌고 Markdown / HTML / SVG 코드를 원클릭으로 복사할 수 있습니다.

### ✨ 주요 기능

- **40개 프리미엄 템플릿**: Stats, Tech Stack, Profile 위젯
- **실시간 프리뷰**: 변경사항 즉시 확인
- **원클릭 적용**: 갤러리에서 템플릿 선택 → 빌더에서 자동 적용
- **코드 내보내기**: Markdown, HTML, SVG 지원
- **Studio White 디자인**: 미니멀하고 프리미엄한 UI/UX
- **이모지 아바타**: 16개 이모지 선택 가능
- **다양한 테마**: Glass Light, Dark, Neumorphic, Neon, Minimal

## 📁 파일 구조

```
GitGloss/
├── 📄 index.html              # 랜딩 페이지
├── 📄 gallery.html            # SEO 최적화 갤러리 (40개 템플릿)
├── 📄 builder.html            # 2패널 빌더 (Config 좌 + Preview·Code 우)
├── 📄 mockup.html             # GitHub README 목업
├── 📄 README.md               # 프로젝트 문서
├── 📄 .gitignore              # Git 설정
│
├── 📁 assets/
│   ├── 📁 css/
│   │   ├── style.css          # 공통 CSS 변수, Studio White 시스템
│   │   └── builder.css        # 빌더 전용 스타일 (테마 변형 포함)
│   │
│   ├── 📁 js/
│   │   ├── common.js          # 공통 유틸리티
│   │   ├── builder.js         # Config 패널 → Preview 실시간 연동
│   │   ├── gallery.js         # 갤러리 렌더링
│   │   ├── template-loader.js # URL params 파싱, 갤러리→빌더 프리로드
│   │   └── widget-engine.js   # SVG 생성 엔진
│   │
│   └── 📁 data/
│       └── templates.js       # 40개 템플릿 정의
│
└── 📁 docs/                   # 문서 및 목업
    ├── mvp_mockup/            # MVP 목업 파일
    └── pitchdeck/             # 피치덱
```

## 🎯 디자인 시스템: Studio White

### Color Palette
```css
--bg-main: #FFFFFF;
--text-main: #08080F;

/* Cotton Candy Colors */
--pink: #ED93B1;
--purple: #9B8FE8;
--sky: #7EC8E3;
--soft: #F4C0D1;
--dark: #2D1F42;
```

### Visual Style
- **Background**: 순백색 (#FFFFFF) + 그리드 패턴
- **Glassmorphism**: 30px+ blur, 투명도
- **2.5D Depth**: 다층 그림자
- **Typography**: Inter 폰트

### 위젯 테마
- `glass-light` - 밝은 글래스모피즘
- `glass-dark` - 다크 모드
- `neumorphic` - 뉴모피즘 (소프트 그림자)
- `neon` - 네온 그라데이션
- `minimal` - 미니멀 디자인

## 🔧 위젯 타입

| 타입 | 함수 | 설명 |
|------|------|------|
| **stats** | `generateStatsCard(options)` | 숫자 3개 레이아웃 카드 (Stars, Repos, Commits) |
| **tech** | `generateTechBadge(options)` | 기술명 pill 배지 모음 (React, TypeScript 등) |
| **profile** | `generateProfileCard(options)` | 이름·직함·태그 프로필 카드 |
| **streak** | `generateStreakCard(options)` | GitHub 기여 스트릭 카드 |

### 레이아웃 변형

**Stats 레이아웃**:
- `layout-vertical` - 세로 배치
- `layout-horizontal` - 가로 3열
- `layout-grid` - 2x2 그리드
- `layout-compact` - 컴팩트 중앙 정렬

**Tech 배지 스타일**:
- `badge-default` - 기본 플렉스
- `badge-stacked` - 세로 스택
- `badge-minimal` - 투명 배경
- `badge-dark` - 다크 배경
- `badge-colorful` - 그라데이션 배지

**Profile 레이아웃**:
- `profile-center` - 중앙 정렬
- `profile-grid` - 그리드 레이아웃
- `profile-minimal` - 컴팩트

## 🚀 Quick Start

### 1. 갤러리에서 템플릿 선택
```
gallery.html 열기 → 원하는 템플릿 클릭
```

### 2. 빌더에서 커스터마이징
```
자동으로 builder.html로 이동
→ 폼 필드 자동 채워짐
→ 실시간 프리뷰 확인
→ 이모지, 색상, 텍스트 수정
```

### 3. 코드 복사 & 사용
```
Markdown/HTML/SVG 선택
→ Copy 버튼 클릭
→ GitHub README에 붙여넣기
```

## 🔗 URL 파라미터 (갤러리 → 빌더 프리로드)

```
builder.html?template=stats-01
builder.html?template=badge-minimal
builder.html?template=hero-dark
```

### 파라미터 우선순위
1. `?template={id}` - 직접 템플릿 ID
2. `?preset={preset-id}` - 프리셋 ID
3. `?type={type}&theme={theme}` - 타입 + 테마 조합

## 📊 Template Categories

### Stats (10개)
- Cotton Candy, Lavender Sky, Cream Glass
- Aqua Veil, Dark Candy, Plum Night
- Dusk Purple, Neu Candy, Neu Rose
- Candy Burst

### Tech Stack (10개)
- Minimal, Glass, Soft, Pastel
- Dark Pro, Stack Heavy, Clean
- Cloud, Frontend Pack, Backend Pack

### Profile (10개)
- Minimal Hero, Dark Hero, Soft Hero
- Typography, Character, Obsidian
- Glass Grid, Interactive, Portfolio
- Simple Dark

### Mix (10개)
- Dev Card, Designer, Engineer
- Creator, Minimal Dev
- Tech Light/Dark/Soft
- Stats Lite/Dark Lite

## 🎯 SEO 구조

```
/gallery                        (허브)
/gallery?type=github-badge      (롱테일)
/gallery?type=tech-stack
/gallery?type=glassmorphism
/gallery?type=notion-widget
```

## 💰 광고 수익화

### 광고 슬롯
- **AD-1**: Hero 하단 (728×90)
- **AD-2, AD-3**: 갤러리 Native
- **AD-B1**: 빌더 사이드바 (160×52)
- **AD-B2**: 복사 후 슬라이드인

### AdSense 신청 전 필수 페이지
- `privacy.html` - 개인정보처리방침
- `terms.html` - 이용약관
- `about.html` - 소개
- `contact.html` - 문의
- `docs/quickstart.html` - 빠른 시작 가이드
- `docs/themes.html` - 테마 가이드

## 🛠 개발 규칙

### 기술 스택
- **순수 HTML/CSS/JavaScript** (빌드툴 없음)
- **jQuery 3.7 CDN** 사용 가능
- **외부 API 없음** (MVP 기준)

### 코드 규칙
- 모든 파일은 순수 HTML/CSS/JS
- 광고 슬롯은 `class="ad-slot" data-size="728x90"` 으로 마크업
- CSS 변수 사용 (`var(--color-name)`)
- 함수명: camelCase
- 클래스명: kebab-case

### 파일 명명 규칙
- HTML: `kebab-case.html`
- CSS: `kebab-case.css`
- JS: `kebab-case.js`

## 📝 Template System

### 템플릿 구조
```javascript
{
  id: "stats-01",
  type: "stats",           // stats | tech | profile | streak
  theme: "cotton-candy",   // cotton-candy | cotton-dark | neumorphic-candy
  preset: "preset-01",
  title: "Cotton Candy Stats",
  description: "Classic pink glassmorphism stats",
  tags: ["stats", "glass", "pink"],
  badge: "NEW",            // optional
  config: {
    username: "octocat",
    stats: [...],
    accentColor: "#ED93B1"
  }
}
```

### 템플릿 추가 방법
1. `assets/data/templates.js`에 템플릿 객체 추가
2. `assets/js/builder.js`에서 테마 클래스 매핑 (필요시)
3. `assets/css/builder.css`에 테마 스타일 추가 (필요시)

## 🎨 이모지 아바타

16개 이모지 선택 가능:
```
👨‍💻 👩‍💻 🚀 ⚡
🎨 🔥 💎 🌟
🎯 🦄 🐙 🤖
👾 🎮 ☕ 🌈
```

## 📱 반응형 디자인

```css
/* Desktop: 3열 그리드 */
@media (min-width: 1024px) {
  .gallery-grid { grid-template-columns: repeat(3, 1fr); }
}

/* Tablet: 2열 그리드 */
@media (max-width: 1024px) {
  .gallery-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Mobile: 1열 그리드 */
@media (max-width: 640px) {
  .gallery-grid { grid-template-columns: 1fr; }
}
```

## 🔍 브라우저 지원

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 License

© 2025 GitGloss. All rights reserved.

## 🔗 Links

- [랜딩 페이지](index.html)
- [갤러리](gallery.html)
- [빌더](builder.html)


