# 커밋 메시지 컨벤션

이 프로젝트는 **Gitmoji**와 **Conventional Commits**를 결합한 커밋 메시지 컨벤션을 사용합니다.

## 기본 형식

```
<gitmoji> <type>(<scope>): <subject> (#TICKET_ID)

[optional body]

[optional footer]
```

### 작성법

#### 제목

- commit 타입(이모지 포함)을 함께 작성. 첫글자 대문자로 시작 (ex. ✨ Feat)
- 과거 시제를 사용하지 않고 명령조로 작성 (ex. 회원가입 이메일 인증 기능 추가)
- 제목 끝에 마침표 X
- 티켓 번호가 있다면 작성

#### 본문

- 제목과 본문은 한 줄 띄워 분리
- 어떻게(How)보다 무엇을, 왜(What, Why)에 초점을 맞춰 작성

### 예시

```bash
✨ feat(auth): 회원가입 이메일 인증 기능 추가 (#TICKET-123)

회원가입 시 이메일 인증 절차를 추가하여 보안성을 강화하였습니다.
- 인증 메일 발송 기능
- 인증 코드 확인 로직
- 타임아웃 3분 설정
```

## Type (타입)

### Gitmoji 사용 🎯

| 타입            | 이모지                    | 설명                                                                  |
| --------------- | ------------------------- | --------------------------------------------------------------------- |
| **✨ Feat**     | `:sparkles:`              | 새로운 기능 추가                                                      |
| **⚡ Perf**     | `:zap:`                   | 성능 개선(속도/메모리/용량)                                           |
| **🐛 Fix**      | `:bug:`                   | 버그 수정                                                             |
| **🎨 UI/UX**    | `:art:`                   | 사용자 인터페이스 변경 (CSS 수정이 아닌 실제 UI/UX 개선)              |
| **🚨 Style**    | `:rotating_light:`        | 스타일 (코드 형식, 세미콜론 추가: 비즈니스 로직에 변경 없는 경우)     |
| **➕ Add**      | `:heavy_plus_sign:`       | 의존성 추가                                                           |
| **♻️ Refactor** | `:recycle:`               | 코드 리팩토링                                                         |
| **🔧 Chore**    | `:wrench:`                | 기타 변경사항 (빌드 스크립트 수정 등)                                 |
| **🏗️ Build**    | `:building_construction:` | 빌드 관련 파일 수정                                                   |
| **💚 CI**       | `:green_heart:`           | CI관련 설정 수정                                                      |
| **📝 Docs**     | `:memo:`                  | 문서 (문서 추가, 수정, 삭제)                                          |
| **🔥 Remove**   | `:fire:`                  | 코드/파일/기능 삭제                                                   |
| **🔍 SEO**      | `:mag:`                   | 검색 엔진 최적화 관련 변경                                            |
| **🚧 WIP**      | `:construction:`          | 작업 진행 중 (Work In Progress)                                       |
| **♿ A11y**     | `:wheelchair:`            | 접근성 개선                                                           |
| **🧪 Test**     | `:test_tube:`             | 테스트 (테스트 코드 추가, 수정, 삭제: 비즈니스 로직에 변경 없는 경우) |

### 추가 타입들

- **⏪ Revert**: 변경사항 되돌리기
- **🔀 Merge**: 브랜치 병합
- **🚑 Hotfix**: 긴급 수정
- **🔒 Security**: 보안 이슈 수정
- **⚙️ Config**: 설정 파일 수정
- **⬆️ Upgrade**: 의존성 업그레이드
- **⬇️ Downgrade**: 의존성 다운그레이드

## Scope (범위)

### 모노레포 구조 기반

- `root`: 루트 레벨 변경 (package.json, 설정 파일 등)
- `feta`: feta 앱 관련 변경
- `packages`: packages 폴더 내 모든 패키지 (shared-ui, shared-utils 등)
- `docs`: 문서 관련 변경 (README, 가이드 문서 등)
- `config`: 설정 파일 변경 (ESLint, Prettier, TypeScript 등)

### 사용 예시

```bash
✨ feat(feta): 새로운 채팅 기능 추가
🐛 fix(packages): shared-ui 컴포넌트 버그 수정
📝 docs(docs): 커밋 컨벤션 가이드 업데이트
🔧 chore(config): ESLint 규칙 추가
♻️ refactor(root): 모노레포 구조 개선
```

## 사용법

### 1. 가이드 커밋 (권장 - 초보자용)

```bash
npm run commit:guided
```

- 단계별 가이드로 커밋 메시지 생성
- 타입, 스코프, 제목을 순서대로 입력
- 티켓 번호와 본문도 추가 가능

### 2. 빠른 커밋 (숙련자용)

```bash
npm run commit
# 또는
npm run gitmoji
```

- gitmoji-cli를 사용한 대화형 커밋
- 이모지 선택 + 메시지 입력

### 3. 도움말

```bash
npm run commit:help
```

- 커밋 컨벤션 빠른 참조

### 4. Git 템플릿 사용

```bash
git commit
```

- `.gitmessage` 템플릿이 자동으로 로드됨
- 예시와 가이드가 포함된 템플릿

### 수동 작성

```bash
# ✅ 올바른 형식 (Gitmoji + 타입)
git commit -m "✨ feat(auth): 회원가입 이메일 인증 기능 추가"
git commit -m "🐛 fix(feta): 채팅 메시지 전송 버그 수정"
git commit -m "📝 docs(root): README 업데이트"
git commit -m "🔧 chore(deps): ESLint 설정 추가"

# ✅ 한글 패턴 (기존 유지)
git commit -m "✨ Feat(auth): 로그인 기능 추가"
git commit -m "🐛 Fix(feta): 버그 수정"

# ❌ 잘못된 형식
git commit -m "로그인 추가"           # 타입과 이모지 없음
git commit -m "feat: 기능 추가"       # 이모지 없음
git commit -m "added login feature"  # 형식 불일치
```

### VS Code에서 Gitmoji 사용

1. **Gitmoji** 확장프로그램 설치
2. `Ctrl/Cmd + Shift + P` → "Gitmoji: Commit"
3. 이모지 선택 후 커밋 메시지 작성

## 자동 검증

커밋 시 자동으로 메시지 형식이 검증됩니다:

```bash
git commit -m "✨ feat(auth): 로그인 기능 추가"  # ✅ 통과
git commit -m "added login"                    # ❌ 실패 - 타입/이모지 없음
git commit -m "feat(auth): login"              # ❌ 실패 - 이모지 없음
```

### 수동 검증

커밋하기 전에 메시지를 미리 검증할 수 있습니다:

```bash
echo "✨ feat(auth): 로그인 기능 추가" | npm run commit-msg
```

## 실제 예시들

### 기능 추가

```bash
✨ feat(auth): OAuth 구글 로그인 연동 (#AUTH-001)

사용자 편의성 향상을 위해 구글 소셜 로그인을 추가했습니다.
- Google OAuth 2.0 API 연동
- 기존 이메일 계정과 연결 로직
- 프로필 정보 자동 동기화
```

### 버그 수정

```bash
🐛 fix(chat): 메시지 전송 시 특수문자 깨짐 현상 수정 (#BUG-042)

특수문자가 포함된 메시지 전송 시 인코딩 오류를 수정했습니다.
- UTF-8 인코딩 처리 추가
- 이모지 및 특수문자 정상 처리 확인
```

### 성능 개선

```bash
⚡ perf(feta): 이미지 로딩 속도 50% 개선 (#PERF-015)

프로필 이미지 로딩 최적화를 통해 성능을 개선했습니다.
- WebP 포맷 지원 추가
- 이미지 lazy loading 적용
- 캐시 정책 최적화 (5분 → 1시간)
```

### 리팩토링

```bash
♻️ refactor(shared): 공통 컴포넌트 FSD 구조로 재구성 (#REFACTOR-008)

Feature-Sliced Design 아키텍처에 맞게 코드를 재구성했습니다.
- shared/ui 레이어로 공통 컴포넌트 이동
- import 경로 정리 및 Public API 적용
- 순환 참조 제거
```

## 팁 💡

1. **이모지 키보드 단축키**
   - macOS: `Cmd + Ctrl + Space`
   - Windows: `Win + ;` 또는 `Win + .`

2. **자주 사용하는 이모지**

   ```
   ✨ :sparkles: (feat)
   🐛 :bug: (fix)
   📝 :memo: (docs)
   🔧 :wrench: (chore)
   ♻️ :recycle: (refactor)
   ```

3. **커밋 메시지 템플릿**
   ```bash
   # ~/.gitmessage 파일 생성
   git config commit.template ~/.gitmessage
   ```

## 예외 상황

다음 커밋들은 자동으로 무시됩니다:

- Merge 커밋
- Revert 커밋
- "Initial commit"
