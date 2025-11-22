### 핵심 레이아웃 요소

성공적인 블로그들은 명확한 계층구조와 타이포그래피, 심플한 카드 레이아웃, 그리고 쉬운 네비게이션을 공유합니다. Windsurf, Tailscale, Outlign 같은 개발자 중심 블로그들은 컨텐츠 우선의 미니멀 디자인과 깔끔한 타이포그래피를 특징으로 합니다.[2][1]

### 필수 기능 구성

모든 성공적인 블로그는 홈페이지와 블로그 랜딩 페이지로 연결되는 일관된 네비게이션 바를 제공합니다. 카테고리와 태그는 블로그 랜딩 페이지에서 정렬 가능하며, 포스트들은 최신순으로 정렬됩니다. 또한 검색 기능, 소셜 공유, 작성자 프로필, RSS 피드, 뉴스레터 가입, 댓글 시스템, 그리고 분석 도구를 포함합니다.[3]

### 모바일 최적화

모든 현대적인 블로그는 모바일 우선 디자인을 채택하며, 반응형 디자인이 필수입니다. 검색 엔진도 모바일 우선 크롤링 방식을 사용하므로 이는 SEO에도 중요합니다.[4][1][2]

***

## Next.js 블로그 PRD (Product Requirements Document)

### 프로젝트 개요

**프로젝트명**: Next.js 마크다운 블로그  
**기술 스택**: Next.js 15 App Router, TypeScript, Tailwind CSS, MDX  
**목적**: SEO 최적화된 정적 블로그 구축

### 기술 아키텍처

#### 프론트엔드 구조
- **프레임워크**: Next.js 15 (App Router) with SSG[5]
- **스타일링**: Tailwind CSS + CSS Variables
- **마크다운**: MDX (react-markdown, remark, rehype)[6]
- **다크모드**: CSS Variables를 활용한 테마 시스템[7]

#### 파일 구조
```
/app
  /blog
    /[slug]
      page.tsx
  /content
    /posts
      /post-1
        post-1.mdx
      /post-2
        post-2.mdx
/components
  BlogCard.tsx
  Navigation.tsx
  TableOfContents.tsx
/styles
  globals.css
/lib
  mdx.ts
  posts.ts
tailwind.config.js
```

### 핵심 기능 명세

#### 1. 포스트 관리 시스템
- **프론트매터**: title, description, published, category, slug, coverImage 메타데이터 파싱[6]
- **파일 구조**: `posts/[post-name]/[post-name].mdx` 형식으로 관리[6]
- **정렬**: 최신순 자동 정렬 (timestamp 기반)[6]
- **필터링**: 카테고리별 필터링 기능[6]

#### 2. UI 컴포넌트

**블로그 홈 페이지**
- 포스트 카드 그리드 레이아웃
- 각 카드: 커버 이미지, 제목, 요약, 발행일, 카테고리 태그
- 카테고리 필터 네비게이션
- 검색 바

**블로그 상세 페이지**
- 반응형 타이포그래피
- 목차 (Table of Contents) 자동 생성[6]
- 코드 하이라이팅 (라인 넘버, 라인 하이라이트, 복사 버튼)[6]
- 소셜 공유 버튼
- 작성자 프로필
- 이전/다음 포스트 네비게게이션
- 댓글 시스템 (Utterances/Giscus)

**글로벌 네비게이션**
- 로고
- 홈, 블로그, About, Contact 링크
- 다크모드 토글
- 모바일 햄버거 메뉴

#### 3. CSS Variables + Tailwind 설정

**globals.css**
```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #8b5cf6;
  --bg-primary: 255, 255, 255;
  --bg-secondary: 245, 245, 245;
  --text-primary: 17, 24, 39;
  --text-secondary: 107, 114, 128;
  --border-color: 229, 231, 235;
}


@media (prefers-color-scheme: dark) {
  :root {
    --primary-color: #60a5fa;
  --secondary-color: #a78bfa;
  --bg-primary: 17, 24, 39;
  --bg-secondary: 31, 41, 55;
  --text-primary: 243, 244, 246;
  --text-secondary: 156, 163, 175;
  --border-color: 55, 65, 81;
  }
}
```

#### 4. MDX 설정

**필수 패키지**
- `next-mdx-remote` 또는 `@next/mdx`[6]
- `remark-gfm` (GitHub Flavored Markdown)[6]
- `rehype-highlight` (코드 하이라이팅)
- `rehype-slug` (제목 ID 자동 생성)
- `rehype-autolink-headings` (제목 링크)
- `gray-matter` (프론트매터 파싱)[8][3]

**주요 기능**
- 코드 블록 하이라이팅
- 스마트 타이포그래피 (따옴표, 줄임표)[6]
- 목차 자동 생성
- 이미지 최적화 (Next.js Image)[3]

### SEO 최적화

#### 메타 태그
- Open Graph 태그
- Twitter Card 메타데이터
- 동적 sitemap.xml 생성
- robots.txt 설정

#### 성능 최적화
- 정적 사이트 생성 (SSG)[5]
- 이미지 최적화 (next/image)
- 코드 스플리팅
- 폰트 최적화 (next/font)

### 추가 기능 (선택적)

#### Phase 2
- RSS 피드 생성
- 뉴스레터 구독 (Mailchimp/ConvertKit 연동)
- 조회수 카운터
- 읽기 시간 표시
- 관련 포스트 추천

#### Phase 3
- 전체 텍스트 검색 (Algolia/Fuse.js)
- 다국어 지원 (i18n)
- 포스트 시리즈/시리즈 네비게이션
- 북마크 기능
- Google Analytics 통합

### API 구조

#### 포스트 데이터 처리
```typescript
// lib/posts.ts
export async function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), 'content/posts')
  const postFolders = fs.readdirSync(postsDirectory)
  
  const posts = await Promise.all(
    postFolders.map(async (folder) => {
      const filePath = path.join(postsDirectory, folder, `${folder}.mdx`)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContent)
      
      return {
        slug: folder,
        frontmatter: data,
        content
      }
    })
  )
  
  return posts.sort((a, b) => 
    new Date(b.frontmatter.published).getTime() - 
    new Date(a.frontmatter.published).getTime()
  )
}
```

### 개발 우선순위

**Phase 1 (MVP)**
1. 기본 레이아웃 및 네비게이션
2. MDX 포스트 렌더링
3. 블로그 홈 + 상세 페이지
4. CSS Variables + Tailwind 테마
5. 다크모드
6. 반응형 디자인

**Phase 2**
1. 검색 기능
2. 카테고리 필터
3. 코드 하이라이팅
4. 목차 생성
5. SEO 메타태그
6. 소셜 공유

**Phase 3**
1. 댓글 시스템
2. 뉴스레터
3. 분석 도구
4. RSS 피드
5. 성능 최적화

### 성공 지표

- Lighthouse 점수: Performance 90+, SEO 100, Accessibility 95+
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- 모바일 반응성: 100% 호환
- 빌드 시간: < 30초 (50개 포스트 기준)

[1](https://book.hajoeun.dev/friendly-next-js/part-3-next.js/undefined-2/vercel)
[2](https://a-fresh.website/blog/10-best-blog-website-examples-2025)
[3](https://velog.io/@minsang9735/NextJS%EB%A1%9C-%EB%B8%94%EB%A1%9C%EA%B7%B8%EB%A5%BC-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%9E%90)
[4](https://webflow.com/blog/best-architecture-websites)
[5](https://www.jungminji.com/posts/etc/%EB%B8%94%EB%A1%9C%EA%B7%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0)
[6](https://joyofcode.xyz/create-a-markdown-blog)
[7](https://stackoverflow.com/questions/64872861/how-to-use-css-variables-with-tailwind-css)
[8](https://velog.io/@yooji0415/Next.js-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EA%B0%9C%EB%B0%9C%EA%B8%B0)
[9](https://tooltory.com/entry/Nextjs%EB%A1%9C-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0)
[10](https://seobe22.tistory.com/42)
[11](https://bepyan.github.io/blog/nextjs-blog)
[12](https://draft.dev/learn/technical-blogs)
[13](https://dev.to/antozanini/tech-blog-on-your-site-or-on-medium-devto-pm1)
[14](https://feather.so/blog/blog-features)
[15](https://dev.to/timhub/comparing-devto-and-medium-interest-of-audience-5l3)