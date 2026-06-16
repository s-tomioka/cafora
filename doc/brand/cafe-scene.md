# カフェシーンカット — 画像生成定義

> 参考画像: `references/cafe-scene/`
>
> **目的:** カフェや日常空間で CAFORA 器を使っている「客の視点」のライフスタイル写真。
> **添付:** `on-detail-{color}-1.png` または `kaku-detail-{color}-1.png`
> **比率:** 4:5（CS-8 のみ 9:16 可）

---

## 1. カット定義

| 項目 | 定義 |
|------|------|
| 被写体 | CAFORA 器 + カフェ／自宅のテーブル環境 |
| 背景 | カフェ内装、窓、壁、カーテン — ボカし可 |
| 光 | **自然光が主**。窓からの直射光・木漏れ日・格子影が特徴 |
| 構図 | 3/4 角度、テーブルセッティング、余白と影の演出 |
| 小物 | 1〜3点（コースター、花、本、パン、スイーツ） |
| 人物 | 原則なし。手のみ可（CS-7）。顔は出さない |
| ムード | スローモーニング、静かな午後、 aesthetic cafe |

### 参考画像に共通する「おしゃれさ」

```
- 自然光の演出（格子影、木漏れ日、斜めの硬い影）
- ニュートラルパレット（白、クリーム、ベージュ、ウッド）
- ミニマルな小物配置（3点以内）
- 浅い被写界深度
- 高キー or 温かい直射光 — どちらも可
- スナップ感ではなくエディトリアルな意図的配置
```

---

## 2. 参考画像インデックス

| # | ファイル | シーン | 光 | 推奨形状 | 推奨カラー |
|---|----------|--------|-----|---------|-----------|
| CS-1 | `00b80bb8...jpg` | ラテアート × 大理石コースター × ドライフラワー | 窓光、花影 | KAKU | グレー |
| CS-2 | `3f306a6a...jpg` | 木漏れ日 × ミニマル白背景 | 葉影（komorebi） | ON | グレー |
| CS-3 | `4ff4a53b...jpg` | 格子窓影 × パン × ミルク | 強い直射光 | ON | モカ |
| CS-4 | `615f24e4...jpg` | ウッドトレイ × コーヒー × クッキー | 格子窓影 | KAKU | グレー |
| CS-5 | `76cb704f...jpg` | ハートラテアート × 白壁 | 葉影 | KAKU | グレー |
| CS-6 | `9f8dc4a7...jpg` | 丸テーブル × ケーキ × 斜め影 | 硬い斜光 | KAKU | モカ |
| CS-7 | `b974b3eb...jpg` | 窓際カウンター × ラテアート | 拡散自然光 | ON | グレー |
| CS-8 | `ce6dbeec...jpg` | 壁付けテーブル × 読書 × 人物手元 | 柔らかい自然光 | KAKU | モスグリーン |
| CS-9 | `da53da9f...jpg` | レーステーブルクロス × カーテン | 高キー拡散光 | ON | グレー |

> 参考画像の器は CAFORA 以外 — **形状・色は添付 PNG に置換**する。

---

## 3. ON / KAKU の使い分け

| シーン | 推奨 | 理由 |
|--------|------|------|
| ラテアート俯瞰・広口強調 | **KAKU** | ワイドリムがアートを見せる |
| 両手で包む・窓際で温もり | **ON** | 取っ手なし、高台 |
| テーブルセッティング（コーヒー＋スイーツ） | どちらも可 | 構図次第 |
| 読書・人物手元 | **KAKU** | ハンドルで片手操作 |

---

## 4. プロンプト

### 共通：参照ブロック

```
[REFERENCE IMAGE ATTACHED: CAFORA Latte Bowl {ON|KAKU} — {ColorName} {LOWER_HEX}]
Use attached PNG as exact product reference for shape and color.
Place this exact bowl into the cafe scene described below.
Do NOT alter the product design. Replace generic cups in style reference with this bowl.
```

---

### CS-1 ラテアート × 花影（参考 00b80bb8）

**添付:** KAKU × グレー | **背景:** ベージュ壁 + 木テーブル

```
[REFERENCE IMAGE ATTACHED: CAFORA Latte Bowl KAKU — Gray #A89A8F]
(same KAKU reference block)

Cafe lifestyle editorial. KAKU Gray bowl with latte rosetta art on marble coaster.
White ribbed vase with dried baby's breath to the right.
Warm natural window light from left, delicate flower shadow on beige wall.
Light wood table, cream and beige neutral palette. Shallow depth of field.
Calm aesthetic cafe mood, NOT a casual snapshot.
4:5 aspect ratio. No text, no logo. Photorealistic.
```

---

### CS-2 木漏れ日ミニマル（参考 3f306a6a）

**添付:** ON × グレー | **背景:** 白 / `#F4EFE8`

```
[REFERENCE IMAGE ATTACHED: CAFORA Latte Bowl ON — Gray #A89A8F]
(same ON reference block)

Minimalist cafe scene. ON Gray bowl with espresso crema on clean white surface.
Dappled leaf shadows (komorebi) cast across bowl and surface — high contrast natural light.
Top-down high angle, generous negative space. Bright airy mood.
Only whites, creams, coffee brown, gray #A89A8F ceramic.
4:5 aspect ratio. No text, no logo. Photorealistic.
```

---

### CS-3 格子窓影 × モーニング（参考 4ff4a53b）

**添付:** ON × モカ | **背景:** オフホワイト壁 + 丸木テーブル

```
[REFERENCE IMAGE ATTACHED: CAFORA Latte Bowl ON — Mocha #6B4E3D]
(same ON reference block)

Sun-drenched cafe morning. ON Mocha bowl with latte on round light wood table.
Geometric window-pane shadows on wall and table — strong warm direct sunlight from upper left.
Rustic bread slice on small wooden board, white linen napkin. High contrast but warm neutral palette.
Slow morning, peaceful cafe atmosphere.
4:5 aspect ratio. No text, no logo. Photorealistic.
```

---

### CS-4 トレイ × クッキー（参考 615f24e4）

**添付:** KAKU × グレー | **背景:** 白テーブル + クリーム壁

```
[REFERENCE IMAGE ATTACHED: CAFORA Latte Bowl KAKU — Gray #A89A8F]
(same KAKU reference block)

Cafe tabletop scene. KAKU Gray bowl with black coffee on light wood tray,
decorative round cookie, scattered almonds. White matte table.
Sharp geometric window-grid shadows from left. Slightly elevated 3/4 angle.
Upper half negative space. Kinfolk minimalist aesthetic.
4:5 aspect ratio. No text, no logo. Photorealistic.
```

---

### CS-5 ハートラテ × 白壁（参考 76cb704f）

**添付:** KAKU × グレー | **背景:** 白壁コーナー

```
[REFERENCE IMAGE ATTACHED: CAFORA Latte Bowl KAKU — Gray #A89A8F]
(same KAKU reference block)

Minimalist cafe corner. KAKU Gray bowl with heart-shaped latte art on matching saucer.
Two white walls meeting, white surface. Foliage leaf shadows on wall — warm natural sunlight.
Generous negative space in upper frame. Serene high-key mood.
Monochromatic whites, creams, gray #A89A8F, coffee brown.
4:5 aspect ratio. No text, no logo. Photorealistic.
```

---

### CS-6 斜光 × アフタヌーン（参考 9f8dc4a7）

**添付:** KAKU × モカ | **背景:** ベージュ壁

```
[REFERENCE IMAGE ATTACHED: CAFORA Latte Bowl KAKU — Mocha #6B4E3D]
(same KAKU reference block)

Sophisticated cafe afternoon. White round pedestal table against beige wall.
KAKU Mocha bowl with latte, rectangular cake slice on white plate, wooden tray, silver fork.
Bold diagonal hard shadow from upper right — cinematic natural sunlight.
Warm tonal palette: whites, creams, light wood, mocha #6B4E3D bowl.
Eye-level slightly side angle. Quiet premium cafe mood.
4:5 aspect ratio. No text, no logo. Photorealistic.
```

---

### CS-7 窓際カウンター（参考 b974b3eb）

**添付:** ON × グレー | **背景:** カフェ窓際ウッドカウンター

```
[REFERENCE IMAGE ATTACHED: CAFORA Latte Bowl ON — Gray #A89A8F]
(same ON reference block)

Urban cafe window scene. ON Gray bowl with rosetta latte art on light wood counter.
Large window to left, softly blurred street and tree bokeh outside.
3/4 high angle close-up. Bright diffused natural side light, soft shadows on wood grain.
Fresh morning cafe atmosphere. Handleless bowl cradled naturally on counter.
4:5 aspect ratio. No text, no logo. Photorealistic.
```

---

### CS-8 読書 × 壁付けテーブル（参考 ce6dbeec）

**添付:** KAKU × モスグリーン | **背景:** 白壁カフェ内装

```
[REFERENCE IMAGE ATTACHED: CAFORA Latte Bowl KAKU — MossGreen #8C8660]
(same KAKU reference block)

Cafe lifestyle with human element. Person's hands holding open book in lower-left (no face).
Wall-mounted round wood table: KAKU MossGreen bowl with latte, small pastry in white ramekin on wood saucer.
Built-in bench with cream cushion, white walls, soft warm natural light.
Shallow depth of field — table sharp, person softly blurred. Slow living, peaceful mood.
Only CAFORA colors + muted clothing tones. 4:5 aspect ratio. No text, no logo. Photorealistic.
```

---

### CS-9 レース × カーテン（参考 da53da9f）

**添付:** ON × グレー | **背景:** レースクロス + シアーカーテン

```
[REFERENCE IMAGE ATTACHED: CAFORA Latte Bowl ON — Gray #A89A8F]
(same ON reference block)

Dreamy high-key cafe scene. ON Gray bowl with coffee on white lace tablecloth.
Golden flaky pastry on white plate, wooden fork, book on table.
Sheer white curtains diffusing bright window light — almost no harsh shadows.
Woven cane chair edge visible. Japandi cozy morning, soft and airy.
Cream, white, warm wood, gray #A89A8F palette.
4:5 aspect ratio. No text, no logo. Photorealistic.
```

---

## 5. カフェシーン NG

- エスプレッソマシン・バリスタの手（→ `barista-scene.md`）
- シームレス単色背景のみ（→ `product-photography.md`）
- 顔が映る
- 参考画像の非 CAFORA 色器をそのまま再現
- 派手なピンクドリンク等（CS-8 参考の色は CAFORA カラーに置換）

---

*参照: `brand-tone.md`*
