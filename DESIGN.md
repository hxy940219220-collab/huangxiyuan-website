---
name: HXY AI Product Portfolio
description: 把模型与 Agent 的前沿能力转化为可验证产品的个人作品集
colors:
  void-ink: "#050509"
  deep-orbit: "#080812"
  panel-night: "#0b0b14"
  signal-cyan: "#00c8ff"
  systems-violet: "#d84cff"
  frontier-gold: "#ffd84a"
  delivery-orange: "#ff6a1a"
  cloud-white: "#f5f7ff"
  secondary-text: "#c9ccda"
  muted-text: "#8b8e9f"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.12em"
rounded:
  control: "12px"
  panel: "20px"
  feature: "24px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  section-mobile: "64px"
  section-desktop: "96px"
components:
  button-primary:
    backgroundColor: "{colors.signal-cyan}"
    textColor: "{colors.void-ink}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  button-secondary:
    backgroundColor: "{colors.panel-night}"
    textColor: "{colors.cloud-white}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  project-panel:
    backgroundColor: "{colors.panel-night}"
    textColor: "{colors.cloud-white}"
    rounded: "{rounded.panel}"
    padding: "24px"
---

# Design System: HXY AI Product Portfolio

## 1. Overview

**Creative North Star: "The Frontier Systems Observatory"**

这是一个面向招聘方、技术负责人和 AI 产品同行的前沿系统观测站。访问者像在昏暗工作室里查看一组已经运行的实验：深色背景降低视觉噪音，项目截图提供证据，青色信号标记可行动入口，紫、金、橙分别承担系统机制、前沿变化与产品交付的语义角色。

整体气质是前沿、克制、工程可信。现有暗色宇宙基因被保留，但装饰不得盖过内容。页面必须同时支持三分钟快速判断和专业读者的深度阅读，拒绝通用 AI SaaS 落地页、浅层技术词堆砌、装饰性霓虹与玻璃拟态、资讯搬运站和复杂动效表演。

**Key Characteristics:**

- 深色观测环境，真实项目和研究产物是主要图像。
- 一屏一个判断，清晰区分项目、研究、工具和能力证据。
- 青色用于交互信号，其他颜色只在语义明确时出现。
- 动效短促、可跳过，并尊重减少动态效果偏好。
- 桌面端有空间感，移动端保持线性阅读与足够触控面积。

## 2. Colors

采用全角色配色策略：暗色中性背景承载内容，四个高识别色各自拥有固定语义，不互相竞争。

### Primary

- **Signal Cyan** (`#00c8ff`): 主导航激活、链接、焦点和关键行动。它代表正在工作的信号。

### Secondary

- **Systems Violet** (`#d84cff`): Agent 机制、runtime、memory 和系统层内容。
- **Frontier Gold** (`#ffd84a`): 时间节点、模型发布和前沿资讯。
- **Delivery Orange** (`#ff6a1a`): 产品交付、人工确认和行动完成。

### Neutral

- **Void Ink** (`#050509`): 全站最深背景。
- **Deep Orbit** (`#080812`): 固定导航和次级背景。
- **Panel Night** (`#0b0b14`): 项目与研究面板。
- **Cloud White** (`#f5f7ff`): 新增界面的主要文字，避免纯白眩光。
- **Secondary Text** (`#c9ccda`): 正文与说明。
- **Muted Text** (`#8b8e9f`): 元信息与辅助标签，仍需满足实际字号下的对比度要求。

**The Signal Rarity Rule.** Signal Cyan 只用于可点击、当前或需要注意的元素。不可把所有标题都染成青色。

## 3. Typography

**Display Font:** Instrument Serif（Georgia 后备）
**Body Font:** Inter（系统无衬线后备）

**Character:** 展示字体提供个人作品集的作者感，正文保持技术文档般的清晰。Instrument Serif 是现有品牌资产，本次延续而不是重新选择；新页面不再用渐变文字制造层级。

### Hierarchy

- **Display**（400，`clamp(2.5rem, 6vw, 5rem)`，1.05）: 主标题和少量章节判断。
- **Headline**（400，`clamp(2rem, 4.5vw, 3.5rem)`，1.12）: 内容页章节标题。
- **Title**（500，20 至 28px，1.25）: 项目、工具和时间线事件名称。
- **Body**（400，14 至 16px，1.7）: 解释性内容，单行长度限制在 68ch 左右。
- **Label**（500，10 至 12px，0.08 至 0.16em）: 编号、日期和短标签，禁止用于正文段落。

**The Evidence First Rule.** 标题提出判断，紧随其后的文字必须给出机制、边界或可验证产物。

## 4. Elevation

系统采用分层而非漂浮。静止面板主要依靠背景明度与细边框区分；阴影只在悬停、焦点和重要浮层出现。玻璃模糊仅用于固定导航，不能成为每张卡片的默认装饰。

### Shadow Vocabulary

- **Ambient Panel** (`0 12px 48px rgba(0,0,0,0.45)`): 深色面板与背景的低对比度分离。
- **Signal Hover** (`0 0 40px rgba(0,200,255,0.15)`): 可交互研究项的悬停反馈。
- **Navigation Lift** (`0 8px 48px rgba(0,0,0,0.35)`): 页面滚动后的固定导航。

**The Flat At Rest Rule.** 静止状态不依赖强阴影。只有状态变化可以增加光晕和位移。

## 5. Components

组件像精密仪器面板，边界清楚，反馈直接，不能像通用模板卡片。

### Buttons

- **Shape:** 完整胶囊形（`9999px`），最小高度 40px，移动端触控目标不小于 44px。
- **Primary:** Signal Cyan 背景、Void Ink 文字、10px 20px 内边距。
- **Hover / Focus:** 只使用轻微上移与信号光晕；键盘焦点必须有 2px 可见轮廓和 3px 间距。
- **Secondary:** 深色背景、细边框和 Cloud White 文字，禁止装饰性模糊。

### Chips

- **Style:** 细边框、低明度背景、10 至 12px 标签文字。
- **State:** 只有筛选、选中或语义角色明确时使用强调色。

### Cards / Containers

- **Corner Style:** 项目面板 20px，特写面板 24px。
- **Background:** Panel Night 或透明层级，不使用多层嵌套卡片。
- **Shadow Strategy:** 默认 Ambient Panel，交互时才增加 Signal Hover。
- **Border:** 1px 低对比度完整边框，不使用彩色侧边条。
- **Internal Padding:** 移动端 20 至 24px，桌面端 24 至 32px。

### Navigation

- 桌面端使用顶部水平导航和内容下拉，移动端使用可关闭的线性菜单。
- 子项必须是真实链接，支持键盘焦点、Enter 激活和清晰的当前状态。
- 固定导航可使用背景模糊，但文字对比度和触控区域优先。

### Research Timeline

- 时间是第一列，发布主体与事件是第二列，产品影响是第三列，来源是第四列。
- 桌面端使用可扫描表格，移动端转换为按日期排序的语义块，不横向挤压正文。
- 最新事件可用 Frontier Gold 标记，不能用闪烁动画制造紧迫感。

## 6. Do's and Don'ts

### Do:

- **Do** 用项目截图、源码、研究页面和时间线来源支撑能力表达。
- **Do** 把 Agent loop、runtime、记忆、状态和工具调用写成机制与产品影响。
- **Do** 给导航子项真实锚点，并为键盘焦点提供可见状态。
- **Do** 在 390px、768px 和 1440px 宽度保持线性阅读与完整交互。
- **Do** 使用 `prefers-reduced-motion` 关闭非必要动画。

### Don't:

- **Don't** 复制“通用 AI SaaS 落地页”的大口号、相同卡片网格和空泛宣称。
- **Don't** 使用“浅层技术词堆砌”，术语必须说明机制、边界和取舍。
- **Don't** 使用“装饰性霓虹与玻璃拟态”，如果视觉效果降低文字对比度就必须删除。
- **Don't** 把时间线做成“资讯搬运站”，每个事件都要写明产品影响并链接一手来源。
- **Don't** 使用“复杂动效表演”，关键内容不能依赖动画才能出现。
- **Don't** 使用渐变文字、彩色粗侧边条、重复的大圆角图标或嵌套卡片。
