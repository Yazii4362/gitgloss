# GitGloss 광고 수익화 전략

## 광고 플랫폼 동시 사용 가능 여부

✅ **4개 플랫폼 모두 동시 사용 가능**

- Google AdSense: 타 광고 네트워크 허용 (정책 위반만 안 하면 됨)
- 카카오 애드핏: 타 광고 동시 게재 허용
- 쿠팡 파트너스: 제휴 링크 방식이라 광고 네트워크와 충돌 없음
- 네이버 광고: 타 광고 허용

---

## 최적 광고 배치 전략

### 1. index.html (랜딩 페이지)
```
[Hero 섹션]
↓
[AD-1] Google AdSense 728×90 (Hero 하단)
↓
[갤러리 프리뷰 섹션]
↓
[AD-2] 카카오 애드핏 Native (갤러리 카드 사이)
↓
[How to 섹션]
↓
[AD-3] 쿠팡 파트너스 배너 (개발 도서/장비 추천)
↓
[Footer]
```

### 2. gallery.html (갤러리)
```
[Header + 필터]
↓
[템플릿 카드 그리드]
  - 6번째 카드 위치에 Native Ad (카카오 애드핏)
  - 12번째 카드 위치에 Native Ad (Google AdSense)
↓
[Footer]
```

### 3. builder.html (빌더)
```
[Left Panel]
  - 하단 고정: 카카오 애드핏 300×250

[Right Panel - Code Strip]
  - Copy 버튼 클릭 후 슬라이드인: Google AdSense 728×90
```

---

## 광고 단위 ID 구조

### Google AdSense
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="1234567890"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

### 카카오 애드핏
```html
<ins class="kakao_ad_area" style="display:none;"
     data-ad-unit="DAN-XXXXXXXXXXXX"
     data-ad-width="300"
     data-ad-height="250"></ins>
<script src="//t1.daumcdn.net/kas/static/ba.min.js" async></script>
```

### 쿠팡 파트너스
```html
<a href="https://link.coupang.com/a/XXXXXX" target="_blank" referrerpolicy="unsafe-url">
  <img src="https://ads-partners.coupang.com/banners/XXXXXX" alt="쿠팡 파트너스">
</a>
```

---

## AdSense 승인 체크리스트

### 필수 페이지 (✅ 완료)
- [x] privacy.html — 개인정보처리방침
- [x] terms.html — 이용약관
- [x] about.html — 서비스 소개
- [ ] contact.html — 문의 페이지 (선택)

### 콘텐츠 요구사항
- [x] 최소 10개 이상의 페이지 (index, gallery, builder, privacy, terms, about = 6개)
- [ ] 추가 콘텐츠 페이지 필요 (가이드, 튜토리얼 등 4개 이상)
- [x] 고유하고 유용한 콘텐츠
- [x] 모바일 반응형 디자인

### 기술 요구사항
- [x] HTTPS (배포 시 Vercel/Netlify 자동 제공)
- [x] 빠른 로딩 속도
- [x] 명확한 네비게이션
- [x] 광고 배치 공간 확보

---

## 추가로 만들어야 할 콘텐츠 페이지 (AdSense 승인용)

1. **guide.html** — 사용 가이드 (스크린샷 포함)
2. **showcase.html** — 실제 사용 사례 모음
3. **faq.html** — 자주 묻는 질문
4. **blog/** — 개발 블로그 (위젯 디자인 팁, GitHub 프로필 꾸미기 등)

---

## 광고 수익 예상

### 트래픽 시나리오
- 일 방문자 1,000명 기준
- 페이지뷰 3,000 (1인당 3페이지)
- CTR 1% (클릭률)
- CPC $0.30 (클릭당 단가)

**월 예상 수익**: $27 ~ $90 (플랫폼 조합 시)

---

## 다음 단계

1. ✅ privacy.html, terms.html, about.html 생성 완료
2. ⏳ guide.html, faq.html 생성 (콘텐츠 추가)
3. ⏳ 광고 슬롯 HTML에 실제 광고 코드 삽입
4. ⏳ Google AdSense 신청 (승인까지 1~2주)
5. ⏳ 카카오 애드핏, 쿠팡 파트너스 가입 및 코드 삽입
