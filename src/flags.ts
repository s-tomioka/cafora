// ===========================================
// CAFORA 公開フラグ（一元管理）
// ===========================================
// 公開（販売開始）に向けた表示制御をここに集約する。
// 依存ゼロの定数のみを置くこと（next.config.ts からも import するため）。
//
// 公開時の手順:
//   1. IS_PRE_OPEN = false（必要なら IS_LOGO_UPLOAD_ENABLED = true）
//   2. ジャーナル / Instagram は microCMS 連携・コンテンツ投入後に各フラグを true
//   3. 再デプロイ（next.config の redirect はビルド/起動時に評価されるため）

/** プレオープン期間中は true。正式販売開始時に false に切り替える。 */
export const IS_PRE_OPEN = true;

/** プレオープン中にヘッダー上部へ表示する販売開始予定ラベル。 */
export const PRE_OPEN_SALE_LABEL = "2026年7月 販売開始予定";

/**
 * ロゴのファイルアップロード機能の有効/無効。
 * 初回ローンチ時は false（商品詳細では「ロゴをつける（+¥1,000 / 個）」を
 * 静的テキストのみ表示）。アップロード機能の準備が整ったら true に切り替える。
 */
export const IS_LOGO_UPLOAD_ENABLED = false;

/**
 * ジャーナルの公開フラグ。microCMS 連携・コンテンツ投入後に true。
 * false の間: ヘッダー/フッターのナビ非表示、TOPの BlogSection 非表示、
 * /journal は next.config で / へ redirect。
 */
export const IS_JOURNAL_ENABLED = false;

/**
 * Instagram セクションの公開フラグ。microCMS 連携・コンテンツ投入後に true。
 * false の間: TOPの InstagramSection 非表示。
 */
export const IS_INSTAGRAM_ENABLED = false;
