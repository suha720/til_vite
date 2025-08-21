# Tailwind

## 1. 환경 구성

- 안정화 버전으로 진행

```bash
npm i -D tailwindcss@3.4.10 postcss@8.4.38 autoprefixer@10.4.20
```

- 만약 prettier 가 셋팅되었다면 추가 설치 필요

```bash
npm i -D prettier@3.3.3 prettier-plugin-tailwindcss@0.6.8
```

## 2. 기본 환경 파일 자동 생성

```bash
npx tailwindcss init -p
```

## 3. 생성된 파일 살펴보기

- tailwind.config.js : Tailwind 옵션, 기능 등 설정

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#4f46e5",
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
      },
      boxShadow: {
        card: "0 2px 10px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
  },
  plugins: [],
};
```

- postcss.config.js : 웹 브라우저에서의 호환성 셋팅

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## 4. index.css 설정

- Tailwind 사용하도록 설정
- /src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 프로젝트 공통 유틸(선택) */
:root {
  --app-max-w: 720px;
}

html,
body,
#root {
  height: 100%;
}

.container-app {
  @apply mx-auto max-w-[var(--app-max-w)] px-4;
}
```

## 5. index.css 사용 확인

- main.jsx

```jsx
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Tailwind 사용시 반드시 설정확인

createRoot(document.getElementById("root")).render(<App />);
```

## 6. 팁

- 만약 적용되지 않는 경우 VSCode 재실행
- 입력태그 포커스 활성 및 커서위치 조절

```jsx
const inputRef = useRef(null);
useEffect(() => {
  if (isEdit && inputRef.current) {
    inputRef.current.focus();
    // 커서를 글자에 마지막으로 보내기
    const element = inputRef.current;
    const len = element.value.length;
    try {
      element.setSelectionRange(len, len);
    } catch {
      console.log("에러에요");
    }
  }
}, [isEdit]);
```

## 7. 적용 예
