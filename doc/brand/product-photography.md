# 物撮りカット — 画像生成定義

> 参考画像: `references/product-photography/`
>
> **目的:** 器そのものを美しく見せる。背景はシームレスまたは単色。小物は最小限。
> **添付:** `on-detail-{color}-1.png` または `kaku-detail-{color}-1.png`

---

## 1. カット定義

| 項目 | 定義 |
|------|------|
| 被写体 | CAFORA ラテボウル（ON / KAKU）が画面の主役 |
| 背景 | シームレス単色、CAFORA カラー派生トーン |
| 光 | スタジオソフトボックス or 窓光模倣。左上からが基本 |
| 構図 | 中央配置、フラットレイ、余白多め |
| 小物 | 0〜2点（ソーサー、コースター、ドリンクのみ） |
| 人物 | なし（手が入る場合は `cafe-scene` / `barista-scene` へ） |
| 比率 | 4:5 |

### 物撮り vs 他カット

```
物撮り     → 器単体。背景・光・構図が整った「商品写真」
カフェ     → 店内・窓光・テーブルセッティング。客の視点
バリスタ   → エスプレッソマシン・注ぎ・バリスタの手。プロの視点
```

---

## 2. 添付画像（CAFORA 公式物撮り）

生成時は **形状・色の正確な参照** として以下を添付する。

| ファイル | 形状 | カラー |
|----------|------|--------|
| `on-detail-gray-1.png` | ON | グレー |
| `on-detail-charcoal-1.png` | ON | チャコール |
| `on-detail-mocha-1.png` | ON | モカ |
| `on-detail-mossgreen-1.png` | ON | モスグリーン |
| `on-detail-bluegray-1.png` | ON | ブルーグレー |
| `on-detail-terracotta-1.png` | ON | テラコッタ |
| `kaku-detail-gray-1.png` | KAKU | グレー |
| `kaku-detail-charcoal-1.png` | KAKU | チャコール |
| `kaku-detail-mocha-1.png` | KAKU | モカ |
| `kaku-detail-mossgreen-1.png` | KAKU | モスグリーン |
| `kaku-detail-bluegray-1.png` | KAKU | ブルーグレー |
| `kaku-detail-terracotta-1.png` | KAKU | テラコッタ |

---

## 3. スタイル参考画像（構図・光の参考）

以下13枚は **構図・光・スタイリングの参考**。器の形状は添付 PNG に従い、色は CAFORA 6色に置換する。

| # | ファイル | スタイル | 推奨 ON/KAKU | 推奨カラー |
|---|----------|----------|-------------|-----------|
| P01 | `0f3a9a85...jpg` | ハードシャドウ、手が伸びる | ON | テラコッタ |
| P02 | `102e311f...jpg` | シームレス × オリーブウッド × 豆 | ON | モカ |
| P03 | `40956138...jpg` | ミルクポア（※シーン寄り） | KAKU | モスグリーン |
| P04 | `70a4fdf7...jpg` | 中央ヒーロー、ホイップ | KAKU | グレー |
| P05 | `72f7a14e...jpg` | ウッドボード × コレクション | ON | グレー |
| P06 | `9119de55...jpg` | ボケ × チョコ＆クルミ | ON | グレー |
| P07 | `9a2bacdc...jpg` | レイヤーフラットレイ | KAKU | グレー |
| P08 | `a6696f7e...jpg` | 上部余白エディトリアル | KAKU | モスグリーン |
| P09 | `a935ecc7...jpg` | ボケ × ウッド＆レザー | KAKU | モスグリーン |
| P10 | `bd3cecbd...jpg` | スタジオ2点並列 | KAKU | ブルーグレー |
| P11 | `da12a638...jpg` | フラットレイ（最もCAFORA的） | ON | グレー |
| P12 | `e8408140...jpg` | 45度 × 複数器 | KAKU | テラコッタ |
| P13 | `fdfe72d6...jpg` | モノトーン × カフェオレ | KAKU | モカ |

---

## 4. シーンパターンとプロンプト

### 共通：参照ブロック

**ON 添付時**
```
[REFERENCE IMAGE ATTACHED: CAFORA Latte Bowl ON — {ColorName} {LOWER_HEX}]
Use attached PNG as exact product reference. Handleless rounded bulbous form,
pedestal foot (高台), two-tone matte (lower {LOWER_HEX}, upper #F4EFE8).
Do NOT add handle. Do NOT recolor. Do NOT alter shape.
```

**KAKU 添付時**
```
[REFERENCE IMAGE ATTACHED: CAFORA Latte Bowl KAKU — {ColorName} {LOWER_HEX}]
Use attached PNG as exact product reference. Wide-mouth low-profile form,
rounded loop handle ({LOWER_HEX}), two-tone matte (lower {LOWER_HEX}, upper #F4EFE8).
Do NOT remove handle. Do NOT recolor. Do NOT alter shape.
```

---

### PP-1 フラットレイ（参考 P11）

**添付:** ON × グレー | **背景:** `#F4EFE8`

```
[REFERENCE IMAGE ATTACHED: CAFORA Latte Bowl ON — Gray #A89A8F]
(same ON reference block)

Editorial product photography. Top-down flat lay with slight angle.
The ON Gray bowl from reference on matching flat plate, seamless background #F4EFE8.
Generous negative space. Soft diffused light from upper left.
No props except plate. Campaign product shot, NOT a casual snapshot.
4:5 aspect ratio. No text, no logo. Photorealistic.
```

---

### PP-2 中央ヒーロー（参考 P04 / P10）

**添付:** KAKU × ブルーグレー | **背景:** `#E4E6E9`

```
[REFERENCE IMAGE ATTACHED: CAFORA Latte Bowl KAKU — BlueGray #6B7683]
(same KAKU reference block)

Premium product hero shot. KAKU BlueGray bowl centered on seamless #E4E6E9,
generous negative space all sides. Slightly elevated straight-on studio angle.
Soft diffused light from upper left, gentle shadow to the right.
No props, no clutter. Matte ceramic, no gloss.
4:5 aspect ratio. No text, no logo. Photorealistic.
```

---

### PP-3 オリーブウッド × コーヒー豆（参考 P02）

**添付:** ON × モカ | **背景:** `#F4EFE8`

```
[REFERENCE IMAGE ATTACHED: CAFORA Latte Bowl ON — Mocha #6B4E3D]
(same ON reference block)

Editorial still life. Seamless off-white background #F4EFE8.
ON Mocha bowl on polished olive wood board, scattered roasted coffee beans.
Soft diffused light from upper left, gentle shadows to the right.
Diagonal staggered composition. Quiet luxury campaign mood.
4:5 aspect ratio. No text, no logo. Photorealistic.
```

---

### PP-4 ボケ × おやつ（参考 P06）

**添付:** ON × グレー | **背景:** `#E8E2DA`

```
[REFERENCE IMAGE ATTACHED: CAFORA Latte Bowl ON — Gray #A89A8F]
(same ON reference block)

Afternoon editorial still life. ON Gray bowl sharp in foreground.
Second bowl softly blurred in background. Dark chocolate pieces, walnuts in shells,
dried botanical on far left. Background #E8E2DA.
Shallow depth of field, breathing room. Soft diffused light from upper left.
4:5 aspect ratio. No text, no logo. Photorealistic.
```

---

### PP-5 上部余白エディトリアル（参考 P08）

**添付:** KAKU × モスグリーン | **背景:** `#EAE8DC` | **比率:** 9:16

```
[REFERENCE IMAGE ATTACHED: CAFORA Latte Bowl KAKU — MossGreen #8C8660]
(same KAKU reference block)

Vertical editorial (9:16). Upper 60% clean negative space #EAE8DC for copy.
Lower 40%: KAKU MossGreen bowl on tray, dried thistle, crumpled linen napkin in gray tint.
Soft studio light from upper left. Campaign art direction.
9:16 aspect ratio. No text, no logo. Photorealistic.
```

---

### PP-6 モノトーン × カフェオレ（参考 P13）

**添付:** KAKU × モカ | **背景:** `#EDE6DC`

```
[REFERENCE IMAGE ATTACHED: CAFORA Latte Bowl KAKU — Mocha #6B4E3D]
(same KAKU reference block)

Monochromatic campaign photo. KAKU Mocha bowl filled with cafe au lait,
square cream plate with mocha edge, two nut cookies. Background #EDE6DC.
Soft directional light from upper left. Diagonal flow, generous negative space.
Only CAFORA mocha #6B4E3D, cream #F4EFE8, beige #EDE6DC.
4:5 aspect ratio. No text, no logo. Photorealistic.
```

---

## 5. 物撮り NG

- カフェ内装・人物・エスプレッソマシンが入る（→ 他カットへ）
- 複数カラーの器を並べる（カラーバリエーション訴求時のみ可）
- 参考 JPG の非 CAFORA 色をそのまま再現
- ゴールド小物（P01 参考のカプセル等）

---

*参照: `brand-tone.md`*
