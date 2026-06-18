const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

// ---------- 前端页面：展示 + 跳转金数据 ----------
const HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>咸宁实验外国语学校 · 飞羽球馆体验课</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font:16px/1.6 -apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;background:#f5f7fa;color:#333;min-height:100vh}
.header{background:linear-gradient(135deg,#1a5fb4,#3584e4);color:#fff;padding:28px 20px 24px;text-align:center}
.header h1{font-size:20px;margin-bottom:6px;line-height:1.4}
.header p{font-size:14px;opacity:.9;margin-top:4px}
.card{background:#fff;border-radius:12px;padding:20px;margin:14px 14px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
.card h3{font-size:16px;margin-bottom:12px;color:#1a5fb4}
.tag-list{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.tag{background:#e8f0fe;color:#1a5fb4;padding:6px 14px;border-radius:20px;font-size:14px}
.project-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:12px}
.project-card{border:2px solid #e8e8e8;border-radius:12px;padding:18px 12px;text-align:center;background:#fff}
.project-card .icon{font-size:36px;display:block;margin-bottom:8px}
.project-card .name{font-size:16px;font-weight:700;margin-bottom:4px}
.project-card .desc{font-size:13px;color:#888;line-height:1.5}
.info-row{display:flex;align-items:flex-start;gap:10px;margin-bottom:10px;font-size:15px}
.info-row .icon{font-size:20px;flex-shrink:0;margin-top:2px}
.btn{display:block;width:100%;padding:16px;border:none;border-radius:12px;font-size:18px;font-weight:700;cursor:pointer;text-align:center;transition:all .2s;margin-top:8px;text-decoration:none}
.btn-primary{background:linear-gradient(135deg,#1a5fb4,#3584e4);color:#fff;box-shadow:0 4px 12px rgba(26,95,180,.3)}
.btn-primary:active{opacity:.85;transform:scale(.98)}
.footer{text-align:center;padding:20px;font-size:13px;color:#aaa}
.contact{background:#fff;border-radius:12px;padding:16px;margin:14px;box-shadow:0 1px 3px rgba(0,0,0,.06);text-align:center}
.contact .phone{font-size:22px;font-weight:700;color:#1a5fb4;margin:8px 0}
.contact .hint{font-size:13px;color:#888}
</style>
</head>
<body>

<div class="header">
  <h1>🏸🏊 咸宁实验外国语学校携手飞羽球馆</h1>
  青少儿羽毛球 · 游泳体验课
</div>

<!-- 项目介绍 -->
<div class="card">
  <h3>📌 体验项目</h3>
  <div class="project-grid">
    <div class="project-card">
      <span class="icon">🏸</span>
      <div class="name">羽毛球</div>
      <div class="desc">专业教练指导掌握基础击球技巧提升身体协调性</div>
    </div>
    <div class="project-card">
      <span class="icon">🏊</span>
      <div class="name">游泳</div>
      <div class="desc">安全水域教学克服恐水心理掌握基础泳姿</div>
    </div>
  </div>
</div>

<!-- 活动信息 -->
<div class="card">
  <h3>📅 活动信息</h3>
  <div class="info-row">
    <span class="icon">📆</span>
    <span><strong>时间：</strong>2026年6月20日（周六）— 6月21日（周日）</span>
  </div>
  <div class="info-row">
    <span class="icon">📍</span>
    <span><strong>地点：</strong>咸宁市实验外国语学校内 · 飞羽球馆</span>
  </div>
  <div class="info-row">
    <span class="icon">👦</span>
    <span><strong>对象：</strong>咸宁实验外国语学校在校学生</span>
  </div>
  <div class="info-row">
    <span class="icon">💰</span>
    <span><strong>费用：</strong>完全免费</span>
  </div>
</div>

<!-- 适合人群 -->
<div class="card">
  <h3>🎯 适合人群</h3>
  <div class="tag-list">
    <span class="tag">想提升身体素质</span>
    <span class="tag">对羽毛球/游泳感兴趣</span>
    <span class="tag">想加入校队/社团</span>
    <span class="tag">想培养运动习惯</span>
    <span class="tag">想结交志同道合的朋友</span>
  </div>
</div>

<!-- 报名按钮 -->
<div class="card" style="text-align:center;padding:24px 20px">
  <a href="https://kpc9xr8o.jsjform.com/f/rsGJbO" target="_blank" class="btn btn-primary">
    📝 点击立即报名
  </a>
  <div style="font-size:12px;color:#aaa;margin-top:10px">报名表单将在新窗口打开</div>
</div>

<!-- 联系电话 -->
<div class="contact">
  <div style="font-size:14px;color:#666">报名咨询电话</div>
  <div class="phone">134 5108 7498</div>
  <div class="hint">微信同号，添加时备注"体验课"</div>
</div>

<div class="footer">飞羽球馆 · 专业青少儿体育培训</div>

</body>
</html>`;

// ---------- 路由 ----------
app.get('/', (req, res) => res.send(HTML));

const PORT = process.env.PORT || 3456;
app.listen(PORT, '0.0.0.0', () => {
  console.log('体验课展示页已启动: http://localhost:' + PORT);
});
