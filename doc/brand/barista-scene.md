# バリスタシーンカット — 画像生成定義

> 参考画像: `references/barista/`
>
> **目的:** バリスタが CAFORA 器を使ってコーヒーを淹れる「プロの視点」。技術と体験設計を視覚化。
> **添付:** `on-detail-{color}-1.png` または `kaku-detail-{color}-1.png`
> **比率:** 4:5

---

## 1. カット定義

| 項目 | 定義 |
|------|------|
| 被写体 | バリスタの手 × CAFORA 器 × コーヒー機材 |
| 背景 | エスプレッソマシン、ウッドカウンター、カフェバックヤード |
| 光 | 柔らかい自然光 + ステンレスの反射。高キー、クリーン |
| 構図 | クローズアップ〜ミディアム。浅い被写界深度 |
| 人物 | **手・腕のみ**。顔は出さない |
| 服装 | 白シャツ、エプロン、デニム — ニュートラル |
| ムード | 職人的、精密、バリスタの理想を形にする |

### CAFORA ブランドとの接続

```
CAFORA = バリスタが届けたい体験を器で実現するブランド
→ バリスタシーンは「プロが CAFORA 器を選んで使う」瞬間を見せる
→ ミルクポア、エスプレッソ抽出、ラテアート — 技術と器の関係
```

---

## 2. 参考画像インデックス

| # | ファイル | シーン | 焦点 | 推奨形状 | 推奨カラー |
|---|----------|--------|------|---------|-----------|
| BS-1 | `DSCF1514.jpg` | ミルクポア（ピッチャー → カップ） | 両手、注ぎ | KAKU | グレー |
| BS-2 | `DSCF1740.jpg` | エスプレッソ抽出（デュアルストリーム） | マシン × カップ × スケール | KAKU | チャコール |
| BS-3 | `DSCF1747.jpg` | カップをグループヘッド下にセット | 手 × マシン | KAKU | ブルーグレー |
| BS-4 | `DSCF1764.jpg` | ラテアート仕上げ（ハート） | ピッチャー × カップ | KAKU | グレー |

> 参考画像の白カップ → **添付 PNG の CAFORA 器に置換**する。

---

## 3. ON / KAKU の使い分け

| シーン | 推奨 | 理由 |
|--------|------|------|
| ミルクポア・ラテアート | **KAKU** | ワイドリムで art が見える、ハンドルで安定 |
| エスプレッソ抽出 | **KAKU** | スケール上で安定、プロの提供サイズ |
| カップをマシンにセット | **KAKU** | ハンドルで正確な配置 |
| 両手で包みながら提供 | **ON** | バリスタが ON を客に渡す瞬間（BS-1 変形） |

---

## 4. プロンプト

### 共通：参照ブロック

```
[REFERENCE IMAGE ATTACHED: CAFORA Latte Bowl {ON|KAKU} — {ColorName} {LOWER_HEX}]
Use attached PNG as exact product reference. Replace generic white cups in scene with this bowl.
Preserve exact shape, two-tone color, matte finish. Do NOT alter product design.
Barista hands only — no face visible.
```

### 共通：末尾

```
Professional specialty coffee photography. Soft diffused natural light, shallow depth of field.
Clean modern cafe, stainless steel equipment, light wood counter.
Calm artisanal mood — CAFORA brand: designing the barista's ideal experience.
4:5 aspect ratio. No text, no logo. Photorealistic.
```

---

### BS-1 ミルクポア（参考 DSCF1514）

**添付:** KAKU × グレー

```
[REFERENCE IMAGE ATTACHED: CAFORA Latte Bowl KAKU — Gray #A89A8F]
(same KAKU reference block)

Barista scene. Medium close-up. Barista's hands: right hand tilting stainless steel milk pitcher,
pouring thin steady stream of steamed milk into KAKU Gray bowl held in left hand.
Bowl contains espresso with golden crema, latte art forming. White shirt, blue denim, gold ring optional.
Light wood counter, black coffee scale softly blurred. Soft diffused natural light, shallow DOF.
Professional craft moment, NOT a casual snapshot.
4:5 aspect ratio. No text, no logo. Photorealistic.
```

**ON バリエーション:** 左手で ON（取っ手なし）を持ち、両手で安定させる。

---

### BS-2 エスプレッソ抽出（参考 DSCF1740）

**添付:** KAKU × チャコール

```
[REFERENCE IMAGE ATTACHED: CAFORA Latte Bowl KAKU — Charcoal #3A3A3A]
(same KAKU reference block)

Barista scene. Close-up slightly high angle. Professional stainless steel espresso machine.
Two thin streams of dark espresso pouring from portafilter into KAKU Charcoal bowl
 on black digital scale on drip tray. Shallow depth of field — portafilter and cup sharp, machine blurred.
Soft diffused light on polished steel. Precision specialty coffee extraction.
4:5 aspect ratio. No text, no logo. Photorealistic.
```

---

### BS-3 カップセット（参考 DSCF1747）

**添付:** KAKU × ブルーグレー

```
[REFERENCE IMAGE ATTACHED: CAFORA Latte Bowl KAKU — BlueGray #6B7683]
(same KAKU reference block)

Barista scene. Close-up side angle. Barista's hand carefully placing KAKU BlueGray bowl
 onto espresso machine drip tray under portafilter. Light shirt, black cord bracelet.
Polished stainless steel multi-group machine, pressure gauge, steam wand visible.
Light wood counter, milk pitchers and tools softly blurred in background.
Soft natural light, warm film-like tone. Shallow DOF focused on cup and group head.
4:5 aspect ratio. No text, no logo. Photorealistic.
```

---

### BS-4 ラテアート仕上げ（参考 DSCF1764）

**添付:** KAKU × グレー

```
[REFERENCE IMAGE ATTACHED: CAFORA Latte Bowl KAKU — Gray #A89A8F]
(same KAKU reference block)

Barista scene. Close-up high angle. KAKU Gray bowl in sharp foreground focus.
Stainless steel pitcher in upper-right pouring milk — heart/rosetta latte art forming on surface.
Barista hand partially visible on pitcher. Neutral light gray bokeh background.
Soft diffused natural light, gentle highlights on rim and liquid.
Premium minimalist latte art craftsmanship. Wide rim of KAKU visible.
4:5 aspect ratio. No text, no logo. Photorealistic.
```

---

## 5. スタイリング要素

| 要素 | 指定 |
|------|------|
| エスプレッソマシン | プロ仕様、ステンレス、清潔 |
| ピッチャー | ステンレス、ポリッシュ |
| スケール | ブラックデジタル（BS-2） |
| カウンター | ライトウッド |
| 背景 | ボケ、カフェバックヤード |
| バリスタ | 手・腕のみ。白シャツ + エプロン or デニム |

---

## 6. バリスタシーン NG

- 顔・全身が映る
- 家庭用コーヒーメーカー
- 汚れたカウンター、雑然としたバックヤード
- 参考画像の白い汎用カップをそのまま使用（必ず CAFORA 器に置換）
- ON に取っ手を追加
- 暗いローキー照明、ネオン

---

*参照: `brand-tone.md`*
