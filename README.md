# ReadMe.kit — GitHub Profile Widget Studio

> GitHub README와 개발자 프로필을 코딩 없이 꾸밀 수 있는 무료 위젯 빌더

---

## 기획 배경

### 문제 정의

GitHub 프로필은 개발자의 첫인상이다. 채용 담당자, 협업 파트너, 오픈소스 기여자 모두 GitHub 프로필을 통해 개발자를 평가한다. 그러나 대부분의 개발자는 다음 문제에 직면한다.

- **진입 장벽**: Markdown 문법, SVG 생성, API 연동 등 기술적 지식이 필요
- **시간 비용**: 직접 꾸미려면 수 시간의 시행착오가 필요
- **디자인 역량**: 개발자는 코드는 잘 써도 시각 디자인에 익숙하지 않음
- **유지 관리**: 한 번 만들어도 데이터가 자동 업데이트되지 않으면 금방 낡아 보임

기존 도구(shields.io, github-readme-stats)는 기능적이지만 **조합과 커스터마이징이 어렵고**, 결과물이 획일적이다.

### 문제 해결

ReadMe.kit는 세 가지 방식으로 이 문제를 해결한다.

1. **노코드 빌더**: 입력 → 실시간 프리뷰 → 원클릭 복사. 코드를 몰라도 된다.
2. **실제 동작하는 코드 생성**: github-readme-stats, capsule-render, shields.io 등 검증된 외부 API를 활용해 실제로 GitHub에서 렌더링되는 코드를 생성한다.
3. **디자인 시스템 기반 템플릿**: 67가지 이상의 큐레이션된 템플릿으로 즉시 사용 가능한 결과물을 제공한다.

---

## UI/UX 디자인

### 디자인 원칙

**Premium Dark Studio** — Violet × Lime 브랜드 컬러 기반 프리미엄 다크 아이덴티티

- **단순함 우선**: 복잡한 설정 없이 3단계(선택 → 입력 → 복사)로 완성
- **실시간 피드백**: 모든 입력이 즉시 프리뷰에 반영
- **신뢰감**: 일관된 컴포넌트, 명확한 타이포그래피, 다크모드 완전 지원

### 컬러 시스템

Material Design 3 기반 시맨틱 컬러 + Fluent Design 깊이감

```
Primary (Violet): #A78BFA
Action  (Lime):   #D4F53C
Dark:             #09090E

Surface (Light):  #FFFFFF
Surface (Dark):   #111118

Error:            #F87171
Success:          #4ADE80
```

### 타이포그래피

Pretendard (본문) + LaundryGothic (헤딩) 기반 타입 스케일

```
Display LG:  800 57px/64px — 히어로 헤드라인   (LaundryGothic)
Headline LG: 700 32px/40px — 섹션 제목         (LaundryGothic)
Title LG:    600 22px/28px — 카드 제목         (LaundryGothic)
Body LG:     400 16px/24px — 본문              (Pretendard)
Label LG:    500 14px/20px — UI 레이블         (Pretendard)
```

### 레이아웃 구조

```
index.html   — 랜딩 (Hero + Gallery Preview + How-to + CTA)
gallery.html — 템플릿 갤러리 (필터 + 카드 그리드)
builder.html — 2패널 빌더 (좌: 블록 조합 패널 / 우: 실시간 프리뷰 + 코드)
about.html   — 서비스 소개
```

### 빌더 UX 플로우

```
갤러리에서 템플릿 클릭
    ↓
builder.html?template={id} 로 이동
    ↓
URL 파라미터 파싱 → applyPreset() 자동 실행
    ↓
블록 조합 패널에서 내용 수정
    ↓
실시간 프리뷰 확인
    ↓
Markdown / HTML 탭에서 코드 복사
    ↓
GitHub README.md에 붙여넣기
```

---

## 위젯 타입

| 타입 | 설명 | 외부 API |
|------|------|----------|
| **Stats** | GitHub 통계 카드 (스타, 커밋, 레포) | github-readme-stats |
| **Tech** | 기술 스택 배지 | shields.io |
| **Profile** | 프로필 카드 (이름, 직무, 소개) | github-readme-stats |
| **Links** | SNS/포트폴리오 링크 버튼 | shields.io |
| **Banner** | 헤더 배너, 타이핑 SVG | capsule-render, readme-typing-svg |
| **Creative** | Trophy, Snake Game, Hits 카운터 | github-profile-trophy, seeyoufarm |
| **Vibe** | 감성/분위기 표현 배지 | 자체 생성 |
| **Identity** | MBTI, 역할, 현재 상태 배지 | 자체 생성 |

---

## 파일 구조

```
ReadMe.kit/
├── index.html              # 랜딩 페이지
├── gallery.html            # 템플릿 갤러리
├── builder.html            # 위젯 빌더
├── about.html              # 서비스 소개
│
├── assets/
│   ├── css/
│   │   ├── tokens.css      # 디자인 토큰 (CSS 변수, 폰트, 다크모드)
│   │   ├── style.css       # 공통 컴포넌트 (nav, footer, card, button 등)
│   │   └── builder.css     # 빌더 전용 스타일 + 위젯 테마
│   │
│   ├── js/
│   │   ├── common.js       # 공통 유틸 (initNav, toast, copyText)
│   │   ├── widget-engine.js # 블록 렌더러 + 코드 생성 엔진
│   │   └── gallery.js      # 갤러리 렌더링
│   │
│   ├── data/
│   │   ├── templates.js              # 67+ 템플릿 정의 (Single Source of Truth)
│   │   └── templates-identity-patch.js # Identity 배지 시리즈 패치
│   │
│   └── images/
│       ├── coffeeicon.webp
│       └── og-image.png
│
├── docs/
│   └── showcase/
│       ├── reviews.html
│       └── notion-portfolio.html
│
├── privacy.html            # 개인정보처리방침
└── terms.html              # 이용약관
```

### CSS 로드 순서

```html
<link rel="stylesheet" href="assets/css/tokens.css">  <!-- 1. 변수 -->
<link rel="stylesheet" href="assets/css/style.css">   <!-- 2. 공통 컴포넌트 -->
<!-- 빌더 페이지만 추가 -->
<link rel="stylesheet" href="assets/css/builder.css"> <!-- 3. 빌더 전용 -->
```

---

## 기술 스택

- **Frontend**: Vanilla HTML/CSS/JavaScript (프레임워크 없음)
- **디자인 시스템**: Material Design 3 + Fluent Design
- **아이콘**: Material Symbols, Font Awesome
- **폰트**: Pretendard, LaundryGothic (Google Fonts CDN)
- **외부 API**: github-readme-stats, capsule-render, shields.io, seeyoufarm

---

## 로컬 실행

별도 빌드 없이 HTML 파일을 브라우저에서 직접 열면 됩니다.

```bash
# VS Code Live Server 또는
open index.html
```

---

## 라이선스

© 2026 ReadMe.kit. All rights reserved.