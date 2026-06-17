const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

const HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>飞羽球馆 · 咸宁实验外国语学校体验课</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; background: #f5f5f5; color: #333; }
    .banner { width: 100%; height: 280px; background: linear-gradient(135deg, #1a6dff 0%, #00b4d8 100%); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
    .banner::before { content: ''; position: absolute; width: 300px; height: 300px; background: rgba(255,255,255,0.1); border-radius: 50%; top: -100px; right: -50px; }
    .banner::after { content: ''; position: absolute; width: 200px; height: 200px; background: rgba(255,255,255,0.08); border-radius: 50%; bottom: -80px; left: 10%; }
    .banner-content { text-align: center; color: white; z-index: 1; }
    .banner-content h1 { font-size: 2.2em; margin-bottom: 10px; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }
    .banner-content p { font-size: 1.1em; opacity: 0.9; }
    .container { max-width: 800px; margin: 0 auto; padding: 30px 20px; }
    .intro-card { background: white; border-radius: 12px; padding: 30px; margin-bottom: 30px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
    .intro-card h2 { color: #1a6dff; margin-bottom: 15px; font-size: 1.5em; }
    .intro-card p { line-height: 1.8; color: #555; margin-bottom: 10px; }
    .highlight { background: #fff3cd; padding: 2px 6px; border-radius: 3px; font-weight: 600; }
    .projects { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
    .project-card { background: white; border-radius: 12px; padding: 25px; text-align: center; box-shadow: 0 2px 12px rgba(0,0,0,0.08); border: 2px solid transparent; transition: all 0.3s; cursor: pointer; }
    .project-card:hover { border-color: #1a6dff; transform: translateY(-2px); }
    .project-card .icon { font-size: 3em; margin-bottom: 10px; }
    .project-card h3 { color: #333; margin-bottom: 8px; }
    .project-card p { color: #777; font-size: 0.9em; }
    .signup-btn { display: block; width: 100%; max-width: 400px; margin: 30px auto; padding: 16px; background: linear-gradient(135deg, #1a6dff 0%, #00b4d8 100%); color: white; border: none; border-radius: 50px; font-size: 1.2em; font-weight: 600; cursor: pointer; text-align: center; text-decoration: none; box-shadow: 0 4px 15px rgba(26,109,255,0.3); transition: all 0.3s; }
    .signup-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(26,109,255,0.4); }
    .form-section { background: white; border-radius: 12px; padding: 30px; margin-top: 30px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
    .form-section h2 { color: #1a6dff; margin-bottom: 20px; text-align: center; }
    .footer { background: #333; color: white; padding: 30px 20px; text-align: center; margin-top: 50px; }
    .footer p { margin: 5px 0; opacity: 0.8; }
    @media (max-width: 600px) {
      .banner { height: 200px; }
      .banner-content h1 { font-size: 1.5em; }
      .projects { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="banner">
    <div class="banner-content">
      <h1>🏫 咸宁实验外国语学校 · 飞羽球馆体验课</h1>
      专业教练团队 · 量身定制课程 · 让孩子爱上运动
    </div>
  </div>
  <div class="container">
    <div class="intro-card">
      <h2>📢 活动介绍</h2>
      亲爱的家长朋友们：
      <span class="highlight">咸宁实验外国语学校</span>携手<span class="highlight">飞羽球馆</span>，为孩子们带来专业的羽毛球与游泳体验课！
      我们拥有专业的教练团队、完善的教学设施，让孩子在运动中<span class="highlight">增强体质、培养兴趣、提升自信</span>。
      ⏰ 体验课时间：<span class="highlight">2026年6月21-22日</span>
      📍 地点：<span class="highlight">咸宁市实验外国语学校内飞羽球馆</span>
    </div>
    <div class="intro-card">
      <h2>🎯 选择体验项目</h2>
      <div class="projects">
        <div class="project-card">
          <div class="icon">🏸</div>
          <h3>羽毛球体验课</h3>
          专业教练指导基础动作 + 趣味游戏适合零基础
        </div>
        <div class="project-card">
          <div class="icon">🏊</div>
          <h3>游泳体验课</h3>
          安全教学环境水性测试 + 基础泳姿小班教学
        </div>
      </div>
    </div>
    <a href="#form" class="signup-btn">📝 立即报名</a>
    <div class="form-section" id="form">
      <h2>填写报名信息</h2>
      <div id="jinshuju-form">
        <script src="https://kpc9xr8o.jshjuform.com/f/rsGJb0/embedded.js?background=white&banner=show&inner_redirect=false&height=1317"></script>
      </div>
    </div>
  </div>
  <div class="footer">
    📞 咨询电话：134-5108-7498（微信同号）
    📍 地址：咸宁市实验外国语学校内飞羽球馆
    <p style="margin-top: 15px; font-size: 0.9em;">© 2026 飞羽球馆 · 保留所有权利
  </div>
</body>
</html>`;

app.get('/', (req, res) => res.send(HTML));

const PORT = process.env.PORT || 3456;
app.listen(PORT, '0.0.0.0', () => {
  console.log('报名系统已启动: http://localhost:' + PORT);
});
