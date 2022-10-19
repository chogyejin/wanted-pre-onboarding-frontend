# 원티드 프리온보딩 프론트엔드 - 선발 과제

## [배포링크](https://wanted-pre-onboarding-frontend-eight.vercel.app/)

## 프로젝트의 실행 방법

- `npm i`, `npm start`
- 환경 변수 설정 필요(.env)

## 설명

- 구조도

```
src
├─ App.tsx              # router
├─ components
│  ├─ Layout.tsx
│  ├─ TodoForm.tsx
│  └─ TodoItem.tsx
├─ index.tsx            # entry
├─ lib
│  ├─ apis
│  │  └─ index.ts       # api functions
│  ├─ axios
│  │  └─ index.ts       # axios instance
│  └─ localStorage
│     └─ index.ts       # local storage methods
├─ hooks
│  ├─ usePath.tsx       # 경로 확인
│  ├─ useTodos.tsx      # todos 상태 관리
│  └─ useValidation.tsx # 회원가입 / 로그인 유효성 검증
└─ pages
   ├─ AuthPage.tsx      # 회원가입 / 로그인 페이지
   ├─ NotFoundPage.tsx  # 404 페이지
   └─ TodoListPage.tsx  # 투두 목록 페이지

```

- packages
  - typescript template 이용
  - react-router-dom: 6.4.2
  - axios: 1.1.3
  - @emotion/styled: 11.10.4
