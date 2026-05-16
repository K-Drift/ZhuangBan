<script setup lang="ts"></script>

<template>
  <div class="wrap">
    <header class="hero">
      <div class="badge">✨ 黑客松 Demo 原型 · 妆伴</div>
      <h1>到这一步，再选适合你的画法</h1>
      <p>
        导入抖音视频链接 → AI 生成 N 张动作卡 → 到关键步骤时选择人群切片 → 切换对应真人视频指引 → 评论区课代表清单 → 动作复盘。
      </p>
    </header>
    <div class="layout">
      <aside class="panel">
        <h3>核心价值</h3>
        <ul>
          <li>内容可理解：AI 根据视频生成 N 张动作卡。</li>
          <li>内容可适配：到具体步骤时再给出人群切片选择。</li>
          <li>内容可使用：真人切片 + AI 跟练卡 + 上一步/下一步。</li>
          <li>内容可补全：评论区课代表产品信息挂到步骤下。</li>
        </ul>
      </aside>
      <slot />
      <aside class="panel">
        <h3>当前页面</h3>
        <p>妆伴根据每条美妆视频生成 N 张动作卡；当讲到某个需要因人而异的步骤时，才给出人群选择，并切换到对应视频切片和 AI 指引。</p>
        <h3>展示建议</h3>
        <p>海报截取首页 / 有声跟练页 / 复盘页；路演时沿底部导航走完六屏闭环即可。</p>
      </aside>
    </div>
    <slot name="nav" />
  </div>
</template>
