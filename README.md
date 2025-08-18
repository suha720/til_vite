# 환경설정

## 1. ESLint 및 Prettier설정

- ESLint : 가장 안정적인 버전 8.x
- Prettier: 가장 안정적인 버전 3.x

```bash
npm i -D eslint@^8 \
  eslint-plugin-react@^7 \
  eslint-plugin-react-hooks@^4 \
  eslint-plugin-react-refresh@^0 \
  prettier@^3 \
  eslint-config-prettier@^9
```

- ESLint 9.x 버전에서 활용되는 패키지 삭제

```bash
npm rm @eslint/js globals
```

## `.eslintrc.json` 생성

- `eslint.config.js` 파일은 반드시 제거

```json
{
  "root": true,
  "env": { "browser": true, "es2022": true },
  "ignorePatterns": ["dist/", "node_modules/"],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": { "jsx": true }
  },
  "plugins": ["react", "react-hooks", "react-refresh"],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "settings": { "react": { "version": "detect" } },
  //   rules 는 필요한 경우 추가
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react-refresh/only-export-components": [
      "warn",
      { "allowConstantExport": true }
    ]
  }
}
```

## `.prettierrc` 파일 생성

```
{
  "singleQuote": false,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80,
  "arrowParens": "avoid",
  "endOfLine": "auto"
}
```

- `.prettierignore` (선택)

```
node_modules
dist
.eslintcache
```

## VS Code 설정

- VS Code > 설정 > setting.json 의 내용 수정

- 환경설정에서 다음 코드를 추가하면 `React Hook` 이 없다면 없다고 경고함

```json
  "eslint.useFlatConfig": false
```

- <img width="1178" height="748" alt="Image" src="https://github.com/user-attachments/assets/eb718625-03a0-4290-8f60-dfab75a00359" />

- `.vscode` 폴더생성
- `settings.json` 파일 생성

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

## 참고용 VS Code 설정

```json
{
  "workbench.iconTheme": "material-icon-theme",
  "workbench.colorTheme": "Night Owl",
  "editor.mouseWheelZoom": true,
  "files.autoSave": "afterDelay",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "terminal.integrated.defaultProfile.windows": "Git Bash",

  "postcssSorting.config": {
    "properties-order": [
      /* Layout */
      "display",
      "grid",
      "grid-column-gap",
      "grid-row-gap",
      "grid-auto-flow",
      "grid-auto-rows",
      "grid-auto-columns",
      "justify-items",
      "align-content",
      "place-items",
      "gap",
      "align-items",
      "justify-content",
      "flex-wrap",
      "flex-basis",
      "flex-grow",
      "flex-shrink",
      "flex",
      "align-self",
      "flex-direction",

      /* Box */
      "margin",
      "margin-top",
      "margin-right",
      "margin-bottom",
      "margin-left",
      "padding",
      "padding-top",
      "padding-right",
      "padding-bottom",
      "padding-left",
      "border",
      "border-top",
      "border-bottom",
      "border-right",
      "border-left",
      "border-style",
      "border-color",
      "border-top-width",
      "border-right-width",
      "border-bottom-width",
      "border-left-width",
      "border-top-style",
      "border-right-style",
      "border-bottom-style",
      "border-left-style",
      "border-top-color",
      "border-right-color",
      "border-bottom-color",
      "border-left-color",
      "border-top-left-radius",
      "border-top-right-radius",
      "border-bottom-right-radius",
      "border-bottom-left-radius",
      "outline",
      "outline-width",
      "outline-style",
      "outline-color",
      "outline-offset",
      "box-shadow",
      "overflow",
      "overflow-x",
      "overflow-y",
      "clip",
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "z-index",
      "width",
      "min-width",
      "max-width",
      "height",
      "min-height",
      "max-height",
      "float",
      "clear",
      "visibility",
      "vertical-align",

      /* Background */
      "background",
      "background-color",
      "background-image",
      "background-repeat",
      "background-attachment",
      "background-position",
      "background-clip",
      "background-origin",
      "background-size",

      /* Font */
      "font-family",
      "font-size",
      "font-style",
      "font-weight",
      "line-height",
      "color",
      "text-align",
      "text-decoration",
      "text-transform",
      "letter-spacing",
      "text-shadow",
      "white-space",
      "word-spacing",
      "word-break",
      "word-wrap",
      "text-indent",
      "direction",
      "unicode-bidi",
      "hyphens",

      /* Animation and Transition */
      "animation",
      "animation-name",
      "animation-duration",
      "animation-timing-function",
      "animation-delay",
      "animation-iteration-count",
      "animation-direction",
      "animation-fill-mode",
      "animation-play-state",
      "transition",
      "transition-property",
      "transition-duration",
      "transition-timing-function",
      "transition-delay",

      /* Other */
      "content",
      "counter-reset",
      "counter-increment",
      "quotes",
      "list-style",
      "list-style-position",
      "list-style-type",
      "caption-side",
      "empty-cells",
      "table-layout",
      "pointer-events",
      "cursor",
      "resize",
      "overflow-wrap",
      "scroll-snap-type",
      "scroll-padding",
      "scroll-padding-top",
      "scroll-padding-right",
      "scroll-padding-bottom",
      "scroll-padding-left",
      "scroll-behavior",
      "scroll-snap-align",
      "scroll-snap-margin",
      "scroll-snap-stop",
      "scrollbar-width",
      "scrollbar-color"
    ]
  },
  "liveSassCompile.settings.formats": [
    {
      "format": "expanded",
      "extensionName": ".css",
      "savePath": null,
      "savePathReplacementPairs": null
    }
  ],
  "redhat.telemetry.enabled": true,
  "eslint.useFlatConfig": false
}
```
