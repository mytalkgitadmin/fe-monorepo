#!/usr/bin/env node
/* eslint-disable no-console */
import { execSync } from 'child_process';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 타입 정의
interface CommitType {
  emoji: string;
  type: string;
  desc: string;
}

interface CommitScope {
  scope: string;
  desc: string;
}

const types: Record<string, CommitType> = {
  '1': { emoji: '✨', type: 'feat', desc: '새로운 기능 추가' },
  '2': { emoji: '🐛', type: 'fix', desc: '버그 수정' },
  '3': { emoji: '⚡', type: 'perf', desc: '성능 개선' },
  '4': { emoji: '🎨', type: 'style', desc: '코드 스타일/UI 변경' },
  '5': { emoji: '♻️', type: 'refactor', desc: '코드 리팩토링' },
  '6': { emoji: '📝', type: 'docs', desc: '문서 변경' },
  '7': { emoji: '🔧', type: 'chore', desc: '빌드/설정 관련' },
  '8': { emoji: '🧪', type: 'test', desc: '테스트 추가/수정' },
  '9': { emoji: '🚧', type: 'wip', desc: '작업 진행 중' },
  '10': { emoji: '🔥', type: 'remove', desc: '코드/파일/기능 삭제' },
};

// 스코프 정의
const scopes: Record<string, CommitScope> = {
  '1': { scope: 'root', desc: '루트 레벨 변경' },
  '2': { scope: 'feta', desc: 'feta 앱 관련' },
  '3': { scope: 'packages', desc: 'packages 폴더 내 패키지' },
  '4': { scope: 'docs', desc: '문서 관련' },
  '5': { scope: 'config', desc: '설정 파일' },
};

function question(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main(): Promise<void> {
  console.log('\n🎯 Gitmoji 커밋 메시지 생성기\n');

  // 타입 선택
  console.log('📋 커밋 타입을 선택하세요:');
  Object.entries(types).forEach(([key, value]) => {
    console.log(`${key}. ${value.emoji} ${value.type} - ${value.desc}`);
  });

  const typeChoice = await question('\n타입 번호 입력: ');
  const selectedType = types[typeChoice];

  if (!selectedType) {
    console.log('❌ 잘못된 선택입니다.');
    rl.close();
    return;
  }

  // 스코프 선택
  console.log('\n📂 스코프를 선택하세요:');
  Object.entries(scopes).forEach(([key, value]) => {
    console.log(`${key}. ${value.scope} - ${value.desc}`);
  });

  const scopeChoice = await question('\n스코프 번호 입력: ');
  const selectedScope = scopes[scopeChoice];

  if (!selectedScope) {
    console.log('❌ 잘못된 선택입니다.');
    rl.close();
    return;
  }

  // 제목 입력
  const subject = await question('\n✏️ 커밋 메시지 제목: ');

  if (!subject.trim()) {
    console.log('❌ 제목을 입력해주세요.');
    rl.close();
    return;
  }

  // 티켓 번호 (선택)
  const ticket = await question('\n🎫 티켓 번호 (선택, 예: TICKET-123): ');

  // 본문 (선택)
  const body = await question('\n📄 본문 (선택, Enter로 건너뛰기): ');

  // 커밋 메시지 생성
  const ticketSuffix = ticket.trim() ? ` (#${ticket.trim()})` : '';
  const commitMessage = `${selectedType.emoji} ${selectedType.type}(${selectedScope.scope}): ${subject.trim()}${ticketSuffix}`;

  console.log('\n📋 생성된 커밋 메시지:');
  console.log(`"${commitMessage}"`);

  if (body.trim()) {
    console.log(`\n본문:\n${body.trim()}`);
  }

  const confirm = await question('\n✅ 이 메시지로 커밋하시겠습니까? (y/N): ');

  if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
    try {
      const fullMessage = body.trim()
        ? `${commitMessage}\n\n${body.trim()}`
        : commitMessage;
      execSync(`git commit -m "${fullMessage}"`, { stdio: 'inherit' });
      console.log('\n🎉 커밋이 완료되었습니다!');
    } catch (error) {
      console.log('\n❌ 커밋 중 오류가 발생했습니다:');
      console.log(error instanceof Error ? error.message : String(error));
    }
  } else {
    console.log('\n❌ 커밋이 취소되었습니다.');
  }

  rl.close();
}

main().catch(console.error);
