# CAFORA 開発ガイド

## 開発フロー（必須）

1. **TDD**: 実装前にテストを書く（RED → GREEN → REFACTOR）
   - ユニットテストは `src/**/__tests__/` に配置
   - `npm test` で実行
2. **E2E**: 主要フローは Playwright で検証
   - `tests/e2e/` に配置
   - `npm run test:e2e` で実行
3. **コンソールチェック**: 実装後に `chrome-devtools` MCP でブラウザコンソールのエラー・警告を確認
   - `list_console_messages --types error --types warning` で確認
   - ネットワークリクエストの成否も `list_network_requests` で確認
4. **スキル・サブエージェント活用**
   - コードベース探索: `Explore` エージェントを使う
   - コードレビュー: `/code-review` スキルを使う
   - Supabase操作: `supabase` スキルを使う
