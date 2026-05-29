# KOREA CONTENTS LAB Regulation PD

KOREA CONTENTS LAB 규제 해소 콘텐츠 PD 웹앱입니다. GitHub Pages에 배포하면 외부 Wi-Fi와 휴대전화 데이터 환경에서도 사용할 수 있습니다.

## GitHub Pages 배포

1. GitHub에서 새 저장소를 만듭니다.
   - 권장 이름: `klc-regulation-pd`
   - 외부 접속을 쉽게 하려면 `Public` 저장소를 권장합니다.
2. 아래 파일을 저장소 루트에 업로드합니다.
   - `index.html`
   - `styles.css`
   - `app.js`
   - `manifest.json`
   - `sw.js`
   - `klc-logo.jpg`
   - `.nojekyll`
3. 저장소의 `Settings > Pages`로 이동합니다.
4. `Build and deployment`를 다음처럼 설정합니다.
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. 저장 후 잠시 기다리면 아래 형식의 공개 주소가 생성됩니다.
   - `https://사용자명.github.io/klc-regulation-pd/`

## 휴대전화 사용

- 생성된 GitHub Pages 주소를 휴대전화 Chrome, Safari, Samsung Internet에서 엽니다.
- 브라우저 메뉴에서 `홈 화면에 추가`를 누르면 앱처럼 실행할 수 있습니다.
- 입력한 이슈, 저장한 큐시트, 대본은 각 기기의 브라우저 저장소에 보관됩니다.
- `manifest.json`과 `sw.js`가 포함되어 재방문 시 더 빠르게 열립니다.

## 포함 기능

- 주간 규제 개선 TOP 3 분석
- KOREA CONTENTS LAB 바이라인 적용
- 이메일용 영상 기획안 생성
- 20초 쇼츠, 10분 방송, 60분 유튜브 생방송 큐시트 생성
- 대본 저장, 복사, 이메일 공유
