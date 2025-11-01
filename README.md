# 彈跳球遊戲 (JS Breakout Game)

這是一個使用 HTML Canvas 和純 JavaScript 打造的經典「打磚塊」(Breakout) 遊戲。

## 🚀 即時網站預覽 (Live Demo)

您可以透過以下連結瀏覽這個網站的即時成果：

[**https://github.com/Hsiu0308/js-breakout-game/**](https://github.com/Hsiu0308/js-breakout-game/)

---

## 專案結構

```
project/
├── index.html # 網站主頁
├── app.js # 遊戲核心 JavaScript 檔案
└── style.css # 樣式檔案

```

## 💡 功能特色

- **經典 Breakout 玩法：** 玩家需控制一個橘色平台 (`ground`) 來反彈黃色小球 (`circle`)，並消除畫面上所有的藍色磚塊 (`brick`)。
- **Canvas 動態繪圖：** 整個遊戲畫面，包含球、平台和磚塊，都是使用 `Canvas API` 動態繪製的。
- **獨特的平台控制：**
  - 平台的 **X 軸** (左右) 會自動跟隨滑鼠的 X 座標移動。
  - 平台的 **Y 軸** (上下) 則需要玩家按住滑鼠左鍵 (`isDragging`) 才能拖曳移動。
- **碰撞物理機制：**
  - 小球會從牆壁、平台和磚塊反彈。
  - 碰撞到磚塊時，磚塊會消失 (`visible = false`) 且分數 (`count`) 會增加。
- **遊戲流程控制：**
  - **隨機磚塊佈局：** 每次開始新遊戲時，10 個磚塊都會在隨機位置生成。
  - **勝利條件：** 當消除所有 10 個磚塊時 (`count == 10`)，遊戲會跳出勝利訊息並結束。
  - **開始/重設遊戲：** 透過「開始遊戲」按鈕來啟動或重置遊戲。

## 🛠️ 使用技術

- **HTML5:**
  - `<canvas>` 元素
- **CSS3:**
  - Flexbox 佈局
  - 按鈕樣式與 `:hover`, `:active` 偽類
- **JavaScript (ES6+):**
  - **Canvas API** (`getContext("2d")`, `fillRect`, `arc`)
  - **Object-Oriented (OOP):** 使用 `class Brick` 來建立磚塊物件
  - **遊戲迴圈:** `setInterval(gameLoop, 25)`
  - **滑鼠事件監聽:** `mousemove`, `mousedown`, `mouseup`
  - **碰撞偵測** (AABB 簡化邏輯)
  - `Math.random` (用於磚塊隨機生成)

## 👨‍💻 作者

Hensel Huang

## 授權

MIT License
