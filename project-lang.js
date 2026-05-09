(() => {
    const KO = {
      /* Header page tabs */
      "Intro":   "Intro",
      "Tech":    "Tech",
      "AI":      "AI",
      "Growth":  "Growth",
      "Contact": "Contact",
  
      /* Back link */
      "Back to portfolio": "포트폴리오로 돌아가기",
  
      /* Hero */
      "Technical deep-dive":   "기술 상세 분석",
      "End-to-end architecture of a production Flutter × Supabase AI exam prep platform. Every function explained — from the Flutter session gate to billing nonces, Gemini scoring retries, and the automated content pipeline.":
        "프로덕션 환경의 Flutter × Supabase AI 플랫폼 아키텍처를 상세히 설명합니다. 세션 관리부터 결제 안정성 확보, AI 채점 로직 및 콘텐츠 자동화 파이프라인까지 모든 핵심 기능을 담았습니다.",
  
      "Flutter feature modules": "Flutter 기능 모듈",
      "Supabase edge functions": "Supabase 에지 함수",
      "TOEFL task types":        "토플 문제 유형",
      "Shared packages":         "공유 패키지 구조",
  
      /* Repo map */
      "Repository structure":      "저장소 구조",
      "Monorepo designed for scale":
        "확장성을 고려한 모노레포 설계",
      "One repository hosts four exam apps, three shared packages, nine backend functions, and a Python content pipeline. Shared packages keep a single source of truth for billing logic, networking, and the design system across all apps.":
        "하나의 저장소에서 4개의 앱과 3개의 공유 패키지, 9개의 백엔드 함수를 관리합니다. 결제 로직, 네트워킹, 디자인 시스템을 공유 패키지로 묶어 모든 앱에서 일관된 기준으로 사용합니다.",
      "Monorepo architecture": "모노레포 아키텍처",
      "Shared package design": "공유 패키지 설계",
      "Multi-product thinking": "멀티 제품 확장성",
  
      /* Flutter app section */
      "14 feature modules, 1 coherent product":
        "14개의 독립 모듈, 하나의 완결된 제품",
      "Each module has its own data layer, business logic, and UI — but shares auth, theme, routing, and billing through cross-cutting services and shared packages.":
        "각 모듈은 독립적인 데이터 및 UI 계층을 가지며, 공통 서비스와 패키지를 통해 인증, 테마, 결제 시스템을 공유합니다.",
  
      /* Module cards */
      "Authentication": "인증 시스템",
      "Social auth & session gate": "소셜 로그인 및 세션 가드",
      "Onboarding":     "온보딩",
      "First-run flow & mobile web install": "초기 실행 흐름 및 설치 안내",
      "Reading practice": "Reading 연습",
      "Three reading task types": "3가지 Reading 유형 지원",
      "Listening practice": "Listening 연습",
      "Four listening task types with remote audio": "오디오 스트리밍 기반 4가지 유형",
      "Speaking practice": "Speaking 연습",
      "Speech recognition via Deepgram": "Deepgram 기반 실시간 음성 인식",
      "Writing practice": "Writing 연습",
      "Three writing task types with AI scoring": "AI 채점이 포함된 3가지 유형",
      "AI scoring engine": "AI 채점 엔진",
      "GeminiPracticeAssessmentClient": "Gemini 채점 클라이언트",
      "Progress analytics": "학습 통계 분석",
      "Expected score estimation": "예상 점수 추정 시스템",
      "Adaptive difficulty": "적응형 난이도",
      "Adaptive study level engine": "개인화된 학습 수준 엔진",
      "Monetization": "수익화 시스템",
      "Store page & billing clients": "스토어 결제 클라이언트 구축",
      "Version control": "버전 관리",
      "Force-update guard": "강제 업데이트 가드 구현",
      "History & scoring": "학습 이력 및 채점",
      "Practice history & bookmarks": "연습 기록 및 즐겨찾기",
      "Mock exam": "모의 고사",
      "Full timed mock exam": "실전 시간 제한 모의고사",
      "AI tutor": "AI 튜터",
      "AI tutor chat": "AI 튜터 채팅 및 피드백",
  
      /* Shared packages */
      "Three packages, four apps": "3개의 공유 패키지, 4개의 앱 적용",
      "Shared packages enforce a single source of truth across TOEFL, SAT, IELTS, and GRE. Any billing rule change, design token, or Supabase config fix propagates to all apps from one place.":
        "TOEFL, SAT 등 여러 시험 앱에 공유 패키지를 적용하여 결제 규칙이나 디자인 토큰의 변경 사항이 모든 앱에 일괄 적용되도록 설계했습니다.",
      "Design system": "디자인 시스템 (UI)",
      "Supabase networking": "공통 네트워크 모듈",
      "Billing primitives": "결제 시스템 코어",
  
      /* Backend */
      "9 Deno TypeScript functions": "9개의 Deno TypeScript 에지 함수",
      "All deployed as Supabase Edge Functions. Each has its own":
        "모든 로직은 Supabase 에지 함수로 배포되었으며, 각각 다음 역할을 수행합니다.",
      "Billing": "결제 처리",
      "API":     "핵심 API",
  
      /* Billing */
      "Billing system": "결제 및 수익화 구조",
      "Three providers, one user profile": "3가지 제공자 통합, 단일 유저 프로필",
      "Whether a user pays on iOS, Android, or web, the subscription state lands in the same":
        "iOS, Android, 웹 중 어떤 경로로 결제하더라도 유저의 구독 상태는 하나로 통합 관리됩니다.",
      "Subscription tiers & store packs": "구독 등급 및 스토어 상품",
      "One-time credit packs": "일회성 크레딧 상품",
      "Replay-safe nonce system": "재사용 방지 Nonce 시스템",
      "Client requests nonce from server": "클라이언트의 Nonce 요청",
      "User pays in store": "사용자 결제 진행",
      "Token + nonce sent to Edge Function": "토큰과 Nonce를 서버로 전송",
      "Nonce validated & deleted": "Nonce 검증 및 즉시 폐기",
      "Store API verification": "스토어 API를 통한 유효성 검증",
      "user_profiles updated": "유저 프로필 상태 업데이트",
  
      /* AI */
      "AI integration": "AI 기술 통합 상세",
      "AI scoring, speech recognition, and tutor": "AI 채점, 음성 인식 및 튜터 시스템",
      "Gemini AI scoring": "Gemini AI 자동 채점",
      "Deepgram speech recognition": "Deepgram 음성 전사(STT)",
      "Content generation": "콘텐츠 자동 생성",
      "Prompt engineering": "프롬프트 엔지니어링",
      "Token budget management": "토큰 예산 및 비용 관리",
      "Retry with backoff": "지수 백오프 기반 재시도",
      "Cost tracking": "사용 비용 실시간 트래킹",
      "Multi-path secret resolution": "다중 경로 보안키 관리",
      "WAV audio handling": "WAV 오디오 데이터 처리",
      "Usage logging": "상세 사용 로그 수집",
      "Structured output prompting": "구조화된 출력 프롬프팅",
      "Schema-driven generation": "스키마 기반 콘텐츠 생성",
  
      /* Pipeline */
      "Content pipeline": "콘텐츠 자동화 파이프라인",
      "Practice content as structured data": "구조화된 데이터 기반 학습 콘텐츠",
      "Content is never written by hand into SQL. It flows through a validated pipeline from generation to database to audio storage — repeatable, diff-friendly, and safe to re-run.":
        "모든 콘텐츠는 수동 입력 대신 검증된 파이프라인을 통해 생성 및 적재됩니다. 이를 통해 데이터의 일관성과 반복 가능성을 확보했습니다.",
      "Generate":       "데이터 생성",
      "Validate":       "데이터 검증",
      "Upsert":         "DB 적재",
      "Generate audio": "오디오 생성 (TTS)",
      "Upload":         "스토리지 업로드",
      "Serve":          "클라이언트 서빙",
      "12 task types supported": "12가지 문제 유형 지원",
      "Reading": "Reading",
      "Listening": "Listening",
      "Speaking": "Speaking",
      "Writing": "Writing",
  
      /* Flows */
      "End-to-end flows": "엔드-투-엔드 프로세스",
      "From tap to database — traced in full": "UI 액션부터 DB 반영까지의 전체 흐름",
      "Auth flow (Google, iOS native example)": "인증 흐름 (구글/iOS 네이티브)",
      "AI scoring flow (Writing email)": "AI 채점 프로세스",
      "Subscription billing flow (Google Play)": "구독 결제 프로세스",
  
      /* What it proves */
      "What this proves": "역량 증명",
      "End-to-end ownership across every layer": "전 계층에 걸친 엔드-투-엔드 리드 역량",
      "Production mobile engineering": "프로덕션 수준의 모바일 엔지니어링",
      "Backend and serverless design": "백엔드 및 서버리스 설계 역량",
      "Practical AI integration": "실무 중심의 AI 기술 통합",
      "Production billing systems": "신뢰할 수 있는 결제 시스템 구축",
      "Automated content operations": "자동화된 콘텐츠 운영 및 관리",
      "Scalable architecture decisions": "확장 가능한 아키텍처 설계 역량",
  
      /* CTA */
      "Interested in working together?": "협업에 관심이 있으신가요?",
      "This is the level of engineering I bring to a team.": "제가 팀에 기여할 수 있는 기술적 수준입니다.",
      "Full-stack mobile, AI integration, backend serverless, and product ownership. Korea-based or remote.":
        "풀스택 모바일, AI 통합, 서버리스 백엔드 및 제품 총괄 역량을 갖추고 있습니다. (국내/원격 모두 가능)",
      "Get in touch": "연락하기",
      "Back to portfolio": "포트폴리오로 돌아가기",
  
      /* AI page essentials */
      "AI-native products": "AI 기반 제품 설계",
      "Gemini scores user writing and speaking. Deepgram transcribes speech in real time. Inworld TTS voices every listening exercise. A credit wallet controls cost at every layer. This is what AI looks like when it's the product, not a feature.":
        "AI를 단순한 기능이 아닌 제품의 핵심으로 활용합니다. Gemini의 채점, Deepgram의 음성 인식, TTS 음원 생성 및 비용 제어를 위한 크레딧 시스템까지 통합적으로 관리합니다.",
      "AI providers integrated": "통합된 AI 제공업체",
      "AI-powered task types": "AI 기반 학습 유형",
      "Retry logic on scoring": "채점 실패 재시도 로직",
      "Gemini model tiers": "Gemini 모델 티어 관리",
      "Credit pack types": "크레딧 팩 구성",
      "Writing and speaking, graded by Gemini": "Gemini 기반 Writing/Speaking 자동 채점",
      "Not just \"call the API and show the result.\" The scoring system has token budgets, per-tier model routing, retry loops, pre-call credit deduction, and async cost logging.":
        "단순 API 호출을 넘어 토큰 예산 관리, 모델 라우팅, 재시도 루프, 크레딧 차감 및 비용 로깅을 아우르는 정교한 채점 시스템을 구축했습니다.",
      "Gemini content generation": "Gemini 기반 콘텐츠 생성",
      "All 12 task types generated by AI": "12가지 유형의 문제 자동 생성",
      "Practice content isn't written by hand. A Python pipeline prompts Gemini to output structured JSONL, validates each line with Pydantic, then loads it into Postgres.":
        "Python 파이프라인을 통해 Gemini가 생성한 JSONL 데이터를 Pydantic으로 검증하고 DB에 적재하는 자동화 프로세스를 운영합니다.",
      "Real-user speech → scored transcript": "사용자 음성 데이터 → 채점 가능한 전사 데이터",
      "Speaking practice records the user's voice and transcribes it before scoring. The integration is hardened against key misconfiguration and encoding edge cases.":
        "음성 녹음부터 전사, 채점까지의 과정을 예외 처리와 인코딩 최적화를 통해 안정적으로 구현했습니다.",
      "Every listening exercise voiced by AI": "AI 음성으로 생성된 모든 청취 연습",
      "All 4 listening task types require audio. Rather than paying for human voice recording, an automated TTS pipeline converts Gemini-generated transcripts into MP3s.":
        "고비용의 성우 녹음 대신, 자동화된 TTS 파이프라인을 구축하여 고품질의 학습용 MP3 음원을 생성 및 관리합니다.",
      "Credit & quota system": "크레딧 및 사용량 제한 시스템",
      "AI usage without cost surprises": "예측 가능한 AI 운영 비용 관리",
      "Three independent credit types, each deducted before its AI call. Users can buy more via App Store, Google Play, or Lemon Squeezy. Quotas are enforced in the Flutter client before any network request is made.":
        "세 가지 크레딧 타입을 독립적으로 운영하며, 클라이언트 단에서 네트워크 요청 전 쿼터를 우선 확인하여 비용 낭비를 방지합니다.",
      "AI is the product. I know how to make it work in production.":
        "AI가 곧 제품입니다. 프로덕션 환경에서 AI를 성공적으로 작동시키는 방법을 압니다.",
      "Token budgets. Retry logic. Multi-tier model routing. Credit wallets. Cost logging. This is what responsible AI integration looks like when real users and real money are involved.":
        "토큰 예산, 재시도 로직, 모델 라우팅, 결제 지갑 연동 등 실제 유저와 비용이 발생하는 환경에서 책임감 있는 AI 통합의 표준을 제시합니다.",
      "See full tech deep-dive": "기술 상세 분석 전체 보기",
  
      /* Growth page essentials */
      "Growth & marketing": "성장 및 마케팅 전략",
      "I own distribution.": "배포와 성장까지 직접 리드합니다.",
      "Building the product is only half the job. I plan and run paid acquisition myself — targeting the right Reddit communities, measuring CAC, and iterating on creative. A solo founder who understands the full funnel is rare. This page shows the numbers.":
        "개발은 시작일 뿐입니다. Reddit 커뮤니티 타겟팅, CAC 측정 및 광고 크리에이티브 개선 등 전체 퍼널을 이해하는 1인 창업자로서 지표 기반 성장을 이끌어냈습니다.",
      "Amount spent": "집행 광고비",
      "Impressions": "노출수",
      "Clicks": "클릭수",
      "Campaign analysis": "캠페인 성과 분석",
      "Reading the data: what the numbers mean": "데이터 해석: 지표의 의미",
      "First paid campaign, first week. The spend curve is exponential because the campaign budget pacing started conservative and ramped as the algorithm optimised.":
        "첫 유료 캠페인 수치입니다. 알고리즘 최적화에 따라 예산 집행 효율이 점진적으로 상승하는 곡선을 확인할 수 있습니다.",
      "Targeting strategy": "타겟팅 전략",
      "Why Reddit — and which communities": "Reddit을 선택한 이유와 타겟 커뮤니티",
      "Reddit's interest-based targeting lets an indie app reach a global community of TOEFL test-takers without the $50K+ budgets needed for YouTube or Google UAC.":
        "Reddit의 관심사 기반 타겟팅을 통해 대규모 예산 없이도 전 세계 토플 수험생들에게 효과적으로 도달했습니다.",
      "Growth funnel": "성장 퍼널 설계",
      "Reddit click → paying subscriber": "광고 클릭에서 유료 구독까지",
      "Each step in the funnel is designed to reduce drop-off and guide the user toward experiencing the product's core value before asking for payment.":
        "각 단계의 이탈률을 최소화하고, 유저가 결제 전 제품의 핵심 가치를 충분히 경험할 수 있도록 UX를 설계했습니다.",
      "Organic distribution": "오가닉 확산 전략",
      "Beyond paid ads": "유료 광고를 넘어서",
      "Paid acquisition is one input. Organic channels compound over time with zero marginal cost.":
        "유료 광고는 성장의 한 축일 뿐입니다. 추가 비용 없이 시간이 지날수록 누적되는 오가닉 채널의 가치를 극대화하고 있습니다.",
      "The strategy behind the product": "제품 배후의 성장 전략",
      "Building for leverage, not pressure": "압박이 아닌 레버리지를 위한 구축",
      "Looking for someone who ships and grows?": "제품 개발부터 성장까지 함께할 동료를 찾으시나요?",
      "Full-stack engineering + product thinking + growth execution.":
        "풀스택 엔지니어링, 제품적 사고, 그리고 성장을 위한 실행력까지.",
      "All in one person. Korea-based or remote.": "이 모든 역량을 갖춘 엔지니어와 함께하세요. (국내/원격 가능)",
  
      /* Footer */
      "Built for GitHub Pages": "GitHub Pages 기반 정적 사이트",
  };

  const META = {
    project: {
      en: {
        title:       "Missroot TOEFL – Technical Deep Dive · Hyunsoo Lee",
        description: "Technical deep-dive: Missroot TOEFL architecture, feature modules, Supabase edge functions, AI scoring, billing, and content pipeline.",
      },
      ko: {
        title:       "Missroot TOEFL – 기술 상세 분석 · 이현수",
        description: "Missroot TOEFL 아키텍처, 기능 모듈, Supabase 에지 함수, AI 채점, 결제, 콘텐츠 파이프라인 기술 상세 분석.",
      },
    },
    ai: {
      en: {
        title:       "AI Integration · Hyunsoo Lee",
        description: "How Hyunsoo Lee uses Gemini, Deepgram, and Inworld TTS in a production AI app — scoring, generation, speech recognition, cost control.",
      },
      ko: {
        title:       "AI 통합 · 이현수",
        description: "Gemini, Deepgram, Inworld TTS를 프로덕션 AI 앱에서 활용하는 방식: 채점, 생성, 음성 인식, 비용 제어.",
      },
    },
    growth: {
      en: {
        title:       "Growth & Marketing · Hyunsoo Lee",
        description: "How Hyunsoo Lee promotes Missroot TOEFL — Reddit ads campaign data, targeting strategy, growth funnel, and distribution thinking.",
      },
      ko: {
        title:       "성장 및 마케팅 · 이현수",
        description: "Missroot TOEFL의 Reddit 광고 데이터, 타겟팅 전략, 성장 퍼널, 배포 전략.",
      },
    },
  };

  const normalize = (s) => s.replace(/\s+/g, " ").trim();
  const nodes = [];

  function collectNodes() {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const p = node.parentElement;
          if (!p || ["SCRIPT", "STYLE", "META", "LINK", "CODE", "PRE", "SVG"].includes(p.tagName)) {
            return NodeFilter.FILTER_REJECT;
          }
          return KO[normalize(node.nodeValue || "")]
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
        }
      }
    );

    let n = walker.nextNode();
    while (n) {
      nodes.push({
        node:     n,
        english:  normalize(n.nodeValue || ""),
        leading:  (n.nodeValue || "").match(/^\s*/)?.[0] || "",
        trailing: (n.nodeValue || "").match(/\s*$/)?.[0] || ""
      });
      n = walker.nextNode();
    }
  }

  function preferredLang() {
    const saved = localStorage.getItem("portfolio-lang") || localStorage.getItem("hl_lang");
    if (saved === "en" || saved === "ko") return saved;
    const langs = navigator.languages?.length ? navigator.languages : [navigator.language || ""];
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    return langs.some((l) => l.toLowerCase().startsWith("ko")) || tz === "Asia/Seoul"
      ? "ko" : "en";
  }

  function updateMeta(lang) {
    const page = location.pathname.split("/").pop()?.replace(".html", "") || "project";
    const m = (META[page] || META.project)[lang];
    document.documentElement.lang = lang;
    document.title = m.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", m.description);
  }

  function apply(lang, persist = true) {
    const l = lang === "ko" ? "ko" : "en";
    nodes.forEach(({ node, english, leading, trailing }) => {
      node.nodeValue = `${leading}${l === "ko" ? (KO[english] || english) : english}${trailing}`;
    });
    document.querySelectorAll("[data-lang-button]").forEach((btn) => {
      const active = btn.dataset.langButton === l;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
    updateMeta(l);
    if (persist) {
      localStorage.setItem("portfolio-lang", l);
      localStorage.setItem("hl_lang", l);
    }
  }

  collectNodes();
  document.querySelectorAll("[data-lang-button]").forEach((btn) => {
    btn.addEventListener("click", () => apply(btn.dataset.langButton || "en"));
  });
  apply(preferredLang(), false);
  })();