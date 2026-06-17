# 咸宁实验外国语学校 · 体验课报名系统

羽毛球 🏸 & 游泳 🏊 免费体验课报名

## 部署方式

### Render.com（推荐，免费）

1. Fork 或 push 本仓库到你的 GitHub
2. 登录 https://render.com
3. New → Web Service → 连接你的 GitHub 仓库
4. 设置：
   - Build Command: `npm install`
   - Start Command: `npm start`
   - 选择 Free 套餐
5. 部署完成后会得到一个 `https://xxx.onrender.com` 的链接
6. 微信里直接打开，无拦截页

### 本地运行

```bash
npm install
npm start
# 访问 http://localhost:3456
```

## 页面

- 报名页：`/`
- 管理后台：`/admin`

## 功能

- 家长端：选项目 → 选时间 → 填信息 → 报名成功
- 自动限额：每批满额自动关闭
- 防重复：同一手机号同一时段不可重复报名
- 管理后台：实时统计 + 报名明细 + 导出/打印
