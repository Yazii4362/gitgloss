# GitGloss — Studio White

> **Premium Developer Identity Studio**  
> 실리콘밸리 하이테크 스튜디오가 만든 프리미엄 개발자 브랜딩 플랫폼

## 🎨 Design Philosophy

**Studio White** 컨셉은 파스텔톤을 배제하고, 압도적인 시각적 권위와 신뢰를 주는 미니멀 디자인 시스템입니다.

### Core Visual Elements

- **Background**: 순백색 (#FFFFFF) 기반 + 미세한 그리드 패턴
- **Glassmorphism**: iOS 스타일 강력한 블러(30px+) + 반투명 효과
- **2.5D Depth**: 등축 투영(Isometric) + Multi-layered Shadows
- **Color Palette**: Google 원색 팔레트 (Blue, Red, Yellow, Green)

### Design Tokens

```css
:root {
  /* Base */
  --bg-main: #FFFFFF;
  --text-main: #08080F;
  
  /* Google Primary Colors */
  --google-blue: #4285F4;    /* Heroes, Main Actions */
  --google-red: #EA4335;     /* Badges, Emphasis */
  --google-yellow: #FBBC05;  /* Highlights */
  --google-green: #34A853;   /* Success, Complete */
  
  /* Glassmorphism */
  --glass-white: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(0, 0, 0, 0.08);
  --blur-effect: blur(30px) saturate(180%);
  
  /* 2.5D Depth */
  --shadow-depth: 0 10px 20px rgba(0,0,0,0.05),
                  0 6px 6px rgba(0,0,0,0.1);
}
```

## 🚀 Features

- ✨ **Premium Glassmorphism** — iOS 스타일 강력한 블러 효과
- 🎯 **2.5D Isometric Cards** — 화면 밖으로 튀어나올 듯한 깊이감
- 🎨 **Google Color System** — 기능별 원색 매칭
- 📐 **Grid Pattern Background** — 엔지니어링 감성
- 🔤 **Modern Typography** — Inter/Syne 기하학적 폰트

## 📦 Project Structure

```
gitgloss/
├── index.html              # Landing page (Studio White)
├── builder.html            # Widget builder
├── gallery.html            # Widget gallery
├── assets/
│   ├── css/
│   │   ├── style.css       # Studio White design system
│   │   ├── builder.css     # Builder UI styles
│   │   └── presets.css     # Widget presets
│   ├── js/
│   │   ├── common.js       # Shared utilities
│   │   ├── builder.js      # Builder logic
│   │   └── widget-engine.js # Widget rendering
│   └── data/
│       └── presets.json    # Widget templates
└── docs/                   # Documentation & mockups
```

## 🎯 Goal

> "단순한 템플릿 사이트가 아니라, 실리콘밸리의 하이테크 스튜디오가 만든 것 같은 **'Premium Developer Identity Studio'**의 분위기를 자아낼 것."

---

© 2025 GitGloss — Premium Developer Identity Studio
