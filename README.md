# favicon 생성하기

- 추천사이트 (https://realfavicongenerator.net/)
- `512px * 512px` / png 추천
- 생성된 파일을 `public 폴더`에 압축을 풀어준다.
- html 은 다음과 같은.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <!-- Favicon 설정하기 -->
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- SEO 기본 -->
    <title>사이트 이름 | 주요 키워드</title>
    <meta
      name="description"
      content="사이트에 대한 간단한 설명 (검색결과에 표시됨)"
    />
    <meta name="keywords" content="키워드1, 키워드2, 키워드3" />

    <!-- Open Graph (SNS 공유용) -->
    <meta property="og:title" content="사이트 이름 | 주요 키워드" />
    <meta property="og:description" content="SNS에 공유될 때 보이는 설명문" />
    <meta property="og:image" content="https://example.com/og-image.jpg" />
    <meta property="og:url" content="https://example.com" />
    <meta property="og:type" content="website" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="사이트 이름 | 주요 키워드" />
    <meta name="twitter:description" content="트위터 공유용 설명문" />
    <meta
      name="twitter:image"
      content="https://example.com/twitter-image.jpg"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

# SEP

- 가장 간단하게 적용함.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <!-- Favicon 설정하기 -->
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- SEO 기본 -->
    <title>사이트 이름 | 주요 키워드</title>
    <meta
      name="description"
      content="사이트에 대한 간단한 설명 (검색결과에 표시됨)"
    />
    <meta name="keywords" content="키워드1, 키워드2, 키워드3" />

    <!-- Open Graph (SNS 공유용) -->
    <meta property="og:title" content="사이트 이름 | 주요 키워드" />
    <meta property="og:description" content="SNS에 공유될 때 보이는 설명문" />
    <meta property="og:image" content="https://example.com/og-image.jpg" />
    <meta property="og:url" content="https://example.com" />
    <meta property="og:type" content="website" />

    <!-- Twitter Card : X 겸용 -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="사이트 이름 | 주요 키워드" />
    <meta name="twitter:description" content="트위터 공유용 설명문" />
    <meta
      name="twitter:image"
      content="https://example.com/twitter-image.jpg"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- 적절하게 컨셉에 맞게 수정하기

```html
<!-- Open Graph (SNS 공유용) -->
<meta property="og:title" content="사이트 이름 | 주요 키워드" />
<meta property="og:description" content="SNS에 공유될 때 보이는 설명문" />
<meta property="og:image" content="https://example.com/og-image.jpg" />
<meta property="og:url" content="https://example.com" />
<meta property="og:type" content="website" />

<!-- Twitter Card : X 겸용 -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="사이트 이름 | 주요 키워드" />
<meta name="twitter:description" content="트위터 공유용 설명문" />
<meta name="twitter:image" content="https://example.com/twitter-image.jpg" />
```
