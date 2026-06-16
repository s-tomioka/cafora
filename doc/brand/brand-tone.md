# CAFORA Instagram 画像生成ガイド

> Instagram 向け画像は **3種類のカット** で生成する。
> 各カットの詳細定義は個別ドキュメントを参照。

---

## カット種別

| カット | 定義ドキュメント | 参考画像 |
|--------|----------------|----------|
| **物撮り** | [product-photography.md](./product-photography.md) | `references/product-photography/` |
| **カフェシーン** | [cafe-scene.md](./cafe-scene.md) | `references/cafe-scene/` |
| **バリスタシーン** | [barista-scene.md](./barista-scene.md) | `references/barista/` |

---

## 生成の基本フロー

```
1. カット種別を決める（物撮り / カフェ / バリスタ）
2. 該当ドキュメントからシーン・構図を選ぶ
3. ON または KAKU × カラーの物撮り PNG を添付
4. ドキュメントのプロンプトテンプレートで生成
```

---

## CAFORA 器カラー（全カット共通）

すべて **ツートーン** — 上部 `#F4EFE8` + 下部カラー。

| 名称 | nameEn | 下部 HEX | 背景（推奨） |
|------|--------|----------|-------------|
| グレー | Gray | `#A89A8F` | `#F4EFE8` |
| チャコール | Charcoal | `#3A3A3A` | `#E8E2DA` |
| モカ | Mocha | `#6B4E3D` | `#EDE6DC` |
| モスグリーン | MossGreen | `#8C8660` | `#EAE8DC` |
| ブルーグレー | BlueGray | `#6B7683` | `#E4E6E9` |
| テラコッタ | Terracotta | `#C75B39` | `#F0E4DE` |

### 物撮り添付ファイル

```
references/product-photography/on-detail-{color}-1.png   … 温（ON）
references/product-photography/kaku-detail-{color}-1.png … 拡（KAKU）
```

`{color}` = gray / charcoal / mocha / mossgreen / bluegray / terracotta

---

## ON / KAKU の形状定義

| | 温（ON） | 拡（KAKU） |
|---|---------|-----------|
| 取っ手 | **なし** | **あり**（ループハンドル） |
| フォルム | 丸みのあるボウル、高台（pedestal foot） | ワイドリム、低重心、口径が広い |
| 持ち方 | 両手で包む | ハンドルを指で持つ |
| 訴求 | 温もり、口当たり、保温 | ラテアート、口当たり、所作 |

---

## ブランドビジュアルの核心

| 軸 | 方向性 |
|----|--------|
| スタイル | Japandi / スカンディシック / エディトリアル |
| ムード | 静けさ、温かみ、クワイエットラグジュアリー |
| 世界観 | バリスタの理想を形にする、一杯の体験 |
| トーン | 脱飽和、CAFORA 6色のみ |

---

## 共通 NG

- CAFORA 6色以外の器カラー
- 上部リムに `#FFFFFF`（正: `#F4EFE8`）
- ON に取っ手を追加 / KAKU から取っ手を削除
- 高彩度、ネオン、原色アクセント
- 光沢セラミック、プラスチック
- ロゴ・文字のオーバーレイ
- スナップ写真感（`NOT a casual snapshot` をプロンプトに入れる）

---

## 関連リソース

- ブランドブック: `public/brand-book/index.html`
- カラー定義: `src/constants/index.ts` → `LATTE_BOWL_COLOR_OPTIONS`

---

*最終更新: 2026-06-15*
