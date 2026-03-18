# Portfolio Architecture

**Project:** 웹 에이전시 포트폴리오 + 30개 업종별 데모 사이트
**Stack:** Next.js 15 App Router + Turborepo + pnpm
**Deployment:** Cloudflare Workers (@opennextjs/cloudflare)

---

## 1. 모노레포 구조

```
portfolio/
├── apps/
│   ├── main/                    # 메인 포트폴리오 사이트 (www.도메인.kr)
│   │   └── app/
│   │       ├── layout.tsx
│   │       ├── page.tsx         # 랜딩 페이지
│   │       ├── portfolio/       # 포트폴리오 갤러리
│   │       ├── pricing/         # 가격 안내
│   │       ├── contact/         # 문의 (D1 연동)
│   │       ├── faq/
│   │       ├── not-found.tsx
│   │       ├── error.tsx
│   │       └── loading.tsx
│   │
│   └── demos/                   # 데모 사이트 앱 (demo.도메인.kr)
│       └── app/
│           ├── layout.tsx
│           └── [category]/
│               └── [slug]/      # 개별 데모 사이트
│                   ├── page.tsx
│                   ├── reservation/
│                   ├── menu/
│                   ├── gallery/
│                   ├── contact/
│                   ├── not-found.tsx
│                   ├── error.tsx
│                   └── loading.tsx
│
├── packages/
│   ├── ui/                      # 공통 UI 컴포넌트 라이브러리
│   │   └── src/
│   │       ├── primitives/      # Button, Input, Card, Modal 등
│   │       ├── composites/      # Hero, Gallery, Pricing, FAQ 등
│   │       ├── animations/      # 애니메이션 컴포넌트/훅
│   │       ├── layouts/         # 아키타입별 레이아웃 템플릿
│   │       ├── archetypes/      # 아키타입 설정 + 렌더러
│   │       └── error/           # 404, 에러 바운더리, 로딩 컴포넌트
│   │
│   ├── theme/                   # 테마 시스템
│   │   ├── tokens/              # 디자인 토큰 (색상, 타이포, 간격)
│   │   ├── presets/             # 업종별 테마 프리셋
│   │   └── engine/              # 테마 적용 엔진
│   │
│   ├── data/                    # 데모 데이터 + 콘텐츠 스키마
│   │   ├── schemas/             # Zod 스키마
│   │   ├── seeds/               # 업종별 시드 데이터
│   │   └── content/             # 업종별 콘텐츠 (JSON)
│   │
│   ├── db/                      # D1 클라이언트 (메인 사이트 전용)
│   │   ├── client.ts
│   │   ├── types.ts
│   │   └── migrations/          # SQLite 마이그레이션
│   │
│   ├── industry/                # 업종별 기능 모듈
│   │   ├── reservation/
│   │   ├── menu-board/
│   │   ├── gallery/
│   │   ├── schedule/
│   │   ├── property-search/
│   │   ├── seat-status/
│   │   ├── order/
│   │   └── estimate/
│   │
│   ├── mock-backend/            # MockBackendProvider
│   │   ├── provider.tsx         # React Context Provider
│   │   ├── storage.ts           # localStorage 래퍼
│   │   ├── delay.ts             # 시뮬레이션 딜레이
│   │   ├── seeds/               # 초기 데모 데이터
│   │   └── hooks.ts             # useMockReservation, useMockInquiry 등
│   │
│   └── config/                  # 공유 설정
│       ├── eslint/
│       ├── tsconfig/
│       └── tailwind/
│
├── turbo.json
├── package.json
└── pnpm-workspace.yaml
```

---

## 2. 패키지 의존성 그래프

```
apps/main  ──→  ui
           ──→  theme
           ──→  data
           ──→  db          (D1 연동 — 메인 사이트 전용)
           ──→  config

apps/demos ──→  ui
           ──→  theme
           ──→  data
           ──→  industry
           ──→  mock-backend (D1 없음, localStorage 전용)
           ──→  config
```

**규칙:** 순환 의존 없음. `db` 패키지는 `apps/main`에서만 참조. `mock-backend` 패키지는 `apps/demos`에서만 참조.

---

## 3. 10개 디자인 아키타입 시스템

각 아키타입은 근본적으로 다른 레이아웃, 네비게이션, 콘텐츠 플로우, 애니메이션 스타일을 갖는다.

### AT-01: Editorial Magazine (에디토리얼 매거진)

| 항목 | 내용 |
|------|------|
| 레이아웃 구조 | 비대칭 그리드, 타이포그래피 중심, 대형 여백 |
| 네비게이션 패턴 | 상단 미니멀 바 + 풀스크린 오버레이 메뉴 |
| 콘텐츠 밀도 | 여백 중심, 대형 이미지 + 에디토리얼 텍스트 |
| 대표 애니메이션 | 텍스트 마스크 리빌 (GSAP SplitText), 이미지 클립패스 전환 |
| 적합 업종 | 인테리어, 웨딩, 뷰티, 꽃집 |

### AT-02: Immersive Showcase (몰입형 쇼케이스)

| 항목 | 내용 |
|------|------|
| 레이아웃 구조 | 풀블리드 섹션, 풀스크린 이미지/영상 배경, 수직 스냅 스크롤 |
| 네비게이션 패턴 | 투명 오버레이 헤더 + 도트 네비게이션 (우측) |
| 콘텐츠 밀도 | 이미지 중심, 텍스트 최소화, 비주얼 임팩트 극대화 |
| 대표 애니메이션 | 패럴랙스 레이어, 섹션 간 크로스페이드, 스크롤 핀 (GSAP) |
| 적합 업종 | 펜션/숙박, 웨딩 |

### AT-03: Professional Trust (전문 신뢰형)

| 항목 | 내용 |
|------|------|
| 레이아웃 구조 | 정돈된 12컬럼 그리드, 세리프 타이포, 명확한 섹션 구분 |
| 네비게이션 패턴 | 상단 고정 드롭다운 메뉴 + 브레드크럼 |
| 콘텐츠 밀도 | 텍스트 중심, 구조화된 정보 계층, 아이콘 활용 |
| 대표 애니메이션 | 섹션 스크롤 리빌 (Framer Motion), 카드 stagger 진입 |
| 적합 업종 | 의료, 법률, 부동산, 학원 |

### AT-04: Dynamic Energy (다이나믹 에너지)

| 항목 | 내용 |
|------|------|
| 레이아웃 구조 | 대각선/사선 섹션 구분, 대비 강한 색상, 굵은 산세리프 |
| 네비게이션 패턴 | 상단 고정 + 스크롤 시 축소, CTA 버튼 항상 노출 |
| 콘텐츠 밀도 | 혼합, 비디오/이미지 + 강렬한 카피 + 성과 수치 |
| 대표 애니메이션 | 숫자 카운트업 (Framer Motion), 가로 스크롤 핀 (GSAP), 호버 스케일 |
| 적합 업종 | 헬스장/피트니스, 학원/교육, 스터디카페 |

### AT-05: Soft & Organic (소프트 오가닉)

| 항목 | 내용 |
|------|------|
| 레이아웃 구조 | 둥근 모서리, 유기적 형태 마스크, 파스텔/뉴트럴 톤 |
| 네비게이션 패턴 | 상단 센터 로고 + 양쪽 분할 메뉴 |
| 콘텐츠 밀도 | 여백 중심, 이미지와 텍스트 균형, 부드러운 톤 |
| 대표 애니메이션 | 소프트 fade-up (Framer Motion), 부드러운 패럴랙스, 원형 마스크 리빌 |
| 적합 업종 | 웰니스(요가/필라테스), 꽃집/플라워, 펜션, 카페 |

### AT-06: Playful Interactive (플레이풀 인터랙티브)

| 항목 | 내용 |
|------|------|
| 레이아웃 구조 | 자유로운 카드 배치, 일러스트/아이콘 장식, 밝은 액센트 |
| 네비게이션 패턴 | 상단 컬러 바 + 모바일: 하단 탭 네비게이션 |
| 콘텐츠 밀도 | 이미지+일러스트 중심, 짧은 텍스트, 카드 기반 |
| 대표 애니메이션 | 바운스/스프링 (Framer Motion spring), 호버 틸트 3D, 스태거 카드 |
| 적합 업종 | 펫/키즈 (애견카페+키즈카페) |

### AT-07: Minimal Gallery (미니멀 갤러리)

| 항목 | 내용 |
|------|------|
| 레이아웃 구조 | 화이트스페이스 극대화, Masonry/벤토 그리드, 이미지 우선 |
| 네비게이션 패턴 | 사이드바 네비게이션 (데스크톱) / 햄버거 (모바일) |
| 콘텐츠 밀도 | 이미지 중심, 텍스트 극소화, 갤러리 브라우징 경험 |
| 대표 애니메이션 | 이미지 호버 줌 (Framer Motion), 라이트박스 전환, 필터 레이아웃 애니메이션 |
| 적합 업종 | 뷰티(네일샵+미용실), 인테리어, 웰니스 |

### AT-08: Warm Storytelling (따뜻한 스토리텔링)

| 항목 | 내용 |
|------|------|
| 레이아웃 구조 | 싱글 컬럼 중심, 스크롤 내러티브, 따뜻한 톤 |
| 네비게이션 패턴 | 상단 고정 심플 바 + 스크롤 프로그레스 인디케이터 |
| 콘텐츠 밀도 | 텍스트+이미지 교차 배치, 스토리 형식, 후기 강조 |
| 대표 애니메이션 | 스크롤 프로그레스 기반 리빌, 텍스트 줄 단위 등장 (GSAP SplitText) |
| 적합 업종 | 카페/베이커리, 의료, 펫/키즈, 식당 |

### AT-09: Data-Driven Dashboard (데이터 중심 대시보드)

| 항목 | 내용 |
|------|------|
| 레이아웃 구조 | 카드 기반 대시보드 스타일, 필터/정렬 UI, 정보 밀도 높음 |
| 네비게이션 패턴 | 상단 검색 바 + 카테고리 탭 + 사이드 필터 |
| 콘텐츠 밀도 | 데이터/정보 중심, 리스트+카드 뷰 전환, 지도 통합 |
| 대표 애니메이션 | 필터 레이아웃 전환 (Framer Motion layout), 카드 진입 stagger |
| 적합 업종 | 부동산, 스터디카페 |

### AT-10: Bold Contrast (볼드 콘트라스트)

| 항목 | 내용 |
|------|------|
| 레이아웃 구조 | 다크/라이트 섹션 교차, 대형 타이포, 풀블리드 이미지 |
| 네비게이션 패턴 | 상단 투명 → 스크롤 시 다크 배경, 햄버거 메뉴 |
| 콘텐츠 밀도 | 혼합, 섹션마다 밀도 변화, 대비로 리듬감 |
| 대표 애니메이션 | 섹션 배경색 전환, 이미지 마스크 리빌 (GSAP clipPath), 텍스트 블러 인 |
| 적합 업종 | 식당/맛집, 법률, 헬스장 |

### 3.1 차별화 매트릭스 (15개 카테고리 × 2개 사이트)

**규칙:** 같은 카테고리 내 2개 사이트는 반드시 다른 아키타입을 사용한다.

| # | 카테고리 | 사이트 A (아키타입) | 사이트 A 히어로 | 사이트 B (아키타입) | 사이트 B 히어로 |
|---|---------|-------------------|----------------|-------------------|----------------|
| 1 | 의료 | AT-03 Professional Trust | 의료진 소개 슬라이더 | AT-08 Warm Storytelling | 환자 후기 내러티브 |
| 2 | 법률 | AT-03 Professional Trust | 분야별 카드 그리드 | AT-10 Bold Contrast | 풀블리드 오피스 이미지 |
| 3 | 펜션/숙박 | AT-02 Immersive Showcase | 풀스크린 자연 풍경 영상 | AT-05 Soft & Organic | 계절별 이미지 페이드 |
| 4 | 웰니스 | AT-05 Soft & Organic | 요가 포즈 패럴랙스 | AT-07 Minimal Gallery | 스튜디오 공간 갤러리 |
| 5 | 헬스장/피트니스 | AT-04 Dynamic Energy | 운동 영상 루프 배경 | AT-10 Bold Contrast | 전후 비교 스플릿 |
| 6 | 펫/키즈 | AT-06 Playful Interactive | 일러스트 동물 애니메이션 | AT-08 Warm Storytelling | 반려동물 사진 스토리 |
| 7 | 뷰티 | AT-07 Minimal Gallery | 네일아트 Masonry 갤러리 | AT-01 Editorial Magazine | 트렌드 에디토리얼 레이아웃 |
| 8 | 카페/베이커리 | AT-08 Warm Storytelling | 빵 만드는 과정 스크롤 | AT-05 Soft & Organic | 시그니처 메뉴 소프트 슬라이더 |
| 9 | 부동산 | AT-09 Data-Driven Dashboard | 매물 검색 히어로 | AT-03 Professional Trust | 대표 인사 + 실적 카운팅 |
| 10 | 웨딩 | AT-02 Immersive Showcase | 웨딩홀 풀스크린 영상 | AT-01 Editorial Magazine | 웨딩 화보 에디토리얼 |
| 11 | 스터디카페 | AT-09 Data-Driven Dashboard | 좌석 현황 대시보드 | AT-04 Dynamic Energy | 집중 환경 소개 카운팅 |
| 12 | 인테리어 | AT-01 Editorial Magazine | 시공 사례 비대칭 레이아웃 | AT-07 Minimal Gallery | 포트폴리오 벤토 그리드 |
| 13 | 꽃집/플라워 | AT-05 Soft & Organic | 꽃 이미지 원형 마스크 리빌 | AT-01 Editorial Magazine | 꽃 에디토리얼 타이포 |
| 14 | 학원/교육 | AT-04 Dynamic Energy | 성적 향상 카운팅 히어로 | AT-03 Professional Trust | 강사진 소개 카드 그리드 |
| 15 | 식당/맛집 | AT-10 Bold Contrast | 대표 메뉴 다크/라이트 교차 | AT-08 Warm Storytelling | 셰프 스토리 내러티브 |

---

## 4. 애니메이션 라이브러리 경계

### 4.1 Framer Motion — 기본 (대부분의 애니메이션)

| 용도 | 구현 |
|------|------|
| 컴포넌트 마운트/언마운트 | `AnimatePresence` + `motion.div` |
| 스크롤 리빌 (단일 요소) | `whileInView` + `viewport` |
| 호버/탭/드래그 인터랙션 | `whileHover`, `whileTap`, `drag` |
| 레이아웃 애니메이션 | `layout` prop (필터 전환 등) |
| 페이지 전환 | `AnimatePresence` + route change |
| 카운팅 애니메이션 | `useMotionValue` + `useTransform` |
| 스크롤 프로그레스 바 | `useScroll` + `useTransform` |
| 카드 stagger 진입 | `variants` + `staggerChildren` |
| 스프링/바운스 | `spring` transition |
| 이미지 호버 줌 | `whileHover` scale |

### 4.2 GSAP — 특수 효과 3가지만

| 용도 | 구현 | 사용 아키타입 |
|------|------|-------------|
| 핀 섹션 (스크롤 고정) | `ScrollTrigger.pin()` | AT-02 Immersive, AT-04 Dynamic |
| 멀티엘리먼트 타임라인 | `gsap.timeline()` + ScrollTrigger | AT-01 Editorial, AT-10 Bold |
| SplitText 텍스트 분할 | `SplitText` + stagger | AT-01 Editorial, AT-08 Warm, AT-10 Bold |

### 4.3 Lenis — 스무스 스크롤

| 용도 | 구현 |
|------|------|
| 스무스 스크롤 | 전역 Lenis 인스턴스 |
| 앵커 스크롤 | `lenis.scrollTo('#section')` |

### 4.4 애니메이션 훅

```typescript
// Framer Motion 기반 훅 (기본)
useScrollReveal(preset)         // whileInView 기반 스크롤 진입 애니메이션
useCountUp(target, options)     // useMotionValue 기반 카운팅
useStaggerReveal(options)       // staggerChildren 기반 자식 시차 등장
useMouseFollow(ref)             // useMotionValue 기반 마우스 팔로우

// GSAP 기반 훅 (특수)
usePinSection(ref, options)     // ScrollTrigger pin 전용
useTimeline(ref, animations)    // 멀티엘리먼트 타임라인 전용
useTextSplit(ref, options)      // SplitText 전용

// Lenis 기반
useSmoothScroll()               // Lenis 인스턴스 접근
```

---

## 5. Cloudflare Workers 배포 구조

```
Cloudflare Workers Projects:
├── portfolio-main   → apps/main   → www.도메인.kr
│   ├── @opennextjs/cloudflare 어댑터
│   ├── D1 바인딩: portfolio-db (문의/후기)
│   └── R2 바인딩: portfolio-assets (선택, OG 이미지)
│
└── portfolio-demos  → apps/demos  → demo.도메인.kr
    ├── @opennextjs/cloudflare 어댑터
    ├── D1/R2 불필요 (MockBackendProvider)
    └── 30개 동적 라우팅 ([category]/[slug])
```

### wrangler.toml (apps/main)

```toml
name = "portfolio-main"
compatibility_date = "2026-03-01"
compatibility_flags = ["nodejs_compat"]

[[d1_databases]]
binding = "DB"
database_name = "portfolio-db"
database_id = "<database-id>"

[[r2_buckets]]
binding = "R2_BUCKET"
bucket_name = "portfolio-assets"
```

### D1 스키마 (메인 사이트 전용)

```sql
CREATE TABLE IF NOT EXISTS main_inquiries (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  customer_name TEXT NOT NULL,
  company_name TEXT,
  customer_phone TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  industry TEXT,
  budget TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  client_name TEXT NOT NULL,
  company_name TEXT,
  industry TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  avatar_url TEXT,
  is_featured INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);
```

---

## 6. 핵심 타입 시스템

```typescript
// packages/data/schemas/site-config.ts

// 15개 병합 카테고리
type CategoryType =
  | "medical"       // 의료 (병원+치과+한의원)
  | "legal"         // 법률
  | "pension"       // 펜션/숙박
  | "wellness"      // 웰니스 (요가+필라테스)
  | "fitness"       // 헬스장/피트니스
  | "pet-kids"      // 펫/키즈
  | "beauty"        // 뷰티 (네일샵+미용실)
  | "cafe"          // 카페/베이커리
  | "realty"        // 부동산
  | "wedding"       // 웨딩
  | "study-cafe"    // 스터디카페
  | "interior"      // 인테리어
  | "flower"        // 꽃집/플라워
  | "education"     // 학원/교육
  | "restaurant";   // 식당/맛집

type ArchetypeType =
  | "AT-01" | "AT-02" | "AT-03" | "AT-04" | "AT-05"
  | "AT-06" | "AT-07" | "AT-08" | "AT-09" | "AT-10";

interface SiteConfig {
  slug: string;                    // "gangnam-dental-1"
  category: CategoryType;          // "medical"
  name: string;                    // "강남 밝은미소 치과"
  archetype: ArchetypeType;        // "AT-03"
  theme: ThemePreset;              // "medical-clean"
  sections: SectionConfig[];       // 페이지에 표시할 섹션 순서
  features: FeatureConfig[];       // 활성화할 기능 모듈
  content: ContentConfig;          // 텍스트, 이미지, 데이터
  seo: SEOConfig;
  contact: ContactConfig;
  mockBackend: MockBackendConfig;  // 목업 백엔드 설정
}

interface SectionConfig {
  type: SectionType;
  variant: string;                 // 아키타입에 따라 다른 변형
  data: Record<string, unknown>;
  animation: AnimationPreset;
}

interface MockBackendConfig {
  enabledFeatures: ('reservation' | 'inquiry' | 'order')[];
  seedDataFile: string;            // 시드 데이터 JSON 경로
  simulateErrors: boolean;         // 에러 시뮬레이션 on/off
}
```

모든 스키마는 Zod로 정의하고 TypeScript 타입을 추론한다 (`z.infer<typeof SiteConfigSchema>`).

---

## 7. MockBackendProvider 아키텍처

데모 사이트는 외부 DB 없이 클라이언트 사이드에서 모든 데이터를 처리한다. 실제 D1은 메인 사이트 문의 폼에만 사용한다.

### Context API

```typescript
// packages/mock-backend/provider.tsx
interface MockBackendContextValue {
  // 예약
  createReservation: (data: ReservationInput) => Promise<MockResponse<Reservation>>;
  getReservations: () => Promise<MockResponse<Reservation[]>>;
  cancelReservation: (id: string) => Promise<MockResponse<void>>;

  // 문의
  submitInquiry: (data: InquiryInput) => Promise<MockResponse<Inquiry>>;

  // 주문
  createOrder: (data: OrderInput) => Promise<MockResponse<Order>>;

  // 데이터 리셋
  resetAllData: () => void;
  resetByCategory: (category: string) => void;

  // 상태
  isLoading: boolean;
  lastAction: { type: string; success: boolean; timestamp: number } | null;
}
```

### localStorage 키 구조

```typescript
// packages/mock-backend/storage.ts
const STORAGE_PREFIX = 'demo_';

// 키 패턴: demo_{siteSlug}_{collection}
// 예: demo_gangnam-dental-1_reservations
// 예: demo_gangnam-dental-1_inquiries

interface StorageManager {
  get<T>(siteSlug: string, collection: string): T[];
  set<T>(siteSlug: string, collection: string, data: T[]): void;
  append<T>(siteSlug: string, collection: string, item: T): T;
  remove(siteSlug: string, collection: string, id: string): void;
  clear(siteSlug?: string): void;
}
```

### 시뮬레이션 딜레이

```typescript
// packages/mock-backend/delay.ts
interface MockResponse<T> {
  data: T | null;
  error: string | null;
  status: 'success' | 'error';
  timestamp: number;
}

const DELAY_CONFIG = {
  create: { min: 500, max: 1500 },  // 생성: 0.5-1.5초
  read:   { min: 200, max: 500 },   // 조회: 0.2-0.5초
  delete: { min: 300, max: 800 },   // 삭제: 0.3-0.8초
};

// 5% 확률로 의도적 에러 발생 (에러 처리 데모용, 설정으로 on/off 가능)
```

### 데모 UX 흐름

```
예약 제출 → 로딩 스피너 (0.5-1.5초) → 성공 토스트 + 확인 모달
                                      → "이 데모에서 예약 데이터는 브라우저에만 저장됩니다" 안내

문의 제출 → 로딩 스피너 → 성공 토스트 + "답변 예정" 메시지 (목업)

데모 리셋 → 각 데모 사이트 하단 "데모 데이터 초기화" 버튼 → 해당 사이트 localStorage 리셋
```

---

## 8. 반응형 브레이크포인트

```typescript
// packages/config/tailwind/breakpoints.ts
const breakpoints = {
  mobile:  375,   // iPhone SE / 소형 모바일  →  sm:
  tablet:  768,   // iPad Mini / 태블릿       →  md:
  laptop:  1024,  // iPad Pro / 소형 노트북   →  lg:
  desktop: 1440,  // 표준 데스크톱            →  xl:
};
```

| 브레이크포인트 | 네비게이션 | 그리드 | 히어로 | 폰트 스케일 |
|--------------|-----------|--------|-------|-----------|
| 375px (mobile) | 햄버거 메뉴 | 1컬럼 | 세로 스택 | 0.875x |
| 768px (tablet) | 축소 메뉴 or 햄버거 | 2컬럼 | 가로 분할 가능 | 1x |
| 1024px (laptop) | 풀 네비게이션 | 3컬럼 | 아키타입별 | 1x |
| 1440px (desktop) | 풀 네비게이션 + 여백 | 4컬럼 | 아키타입별 풀 | 1.125x |
