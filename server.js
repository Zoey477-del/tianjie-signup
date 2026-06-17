const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DATA_FILE = path.join(__dirname, 'signup_data.json');
const SLOTS = [
  { id: 'sat-am1', date: '6月21日(周六)', time: '08:30-09:00', period: '上午', label: '第1批' },
  { id: 'sat-am2', date: '6月21日(周六)', time: '09:10-09:40', period: '上午', label: '第2批' },
  { id: 'sat-am3', date: '6月21日(周六)', time: '09:50-10:20', period: '上午', label: '第3批' },
  { id: 'sat-am4', date: '6月21日(周六)', time: '10:30-11:00', period: '上午', label: '第4批' },
  { id: 'sat-pm1', date: '6月21日(周六)', time: '14:00-14:30', period: '下午', label: '第5批' },
  { id: 'sat-pm2', date: '6月21日(周六)', time: '14:40-15:10', period: '下午', label: '第6批' },
  { id: 'sat-pm3', date: '6月21日(周六)', time: '15:20-15:50', period: '下午', label: '第7批' },
  { id: 'sat-pm4', date: '6月21日(周六)', time: '16:00-16:30', period: '下午', label: '第8批' },
  { id: 'sun-am1', date: '6月22日(周日)', time: '08:30-09:00', period: '上午', label: '第1批' },
  { id: 'sun-am2', date: '6月22日(周日)', time: '09:10-09:40', period: '上午', label: '第2批' },
  { id: 'sun-am3', date: '6月22日(周日)', time: '09:50-10:20', period: '上午', label: '第3批' },
  { id: 'sun-am4', date: '6月22日(周日)', time: '10:30-11:00', period: '上午', label: '第4批' },
  { id: 'sun-pm1', date: '6月22日(周日)', time: '14:00-14:30', period: '下午', label: '第5批' },
  { id: 'sun-pm2', date: '6月22日(周日)', time: '14:40-15:10', period: '下午', label: '第6批' },
  { id: 'sun-pm3', date: '6月22日(周日)', time: '15:20-15:50', period: '下午', label: '第7批' },
  { id: 'sun-pm4', date: '6月22日(周日)', time: '16:00-16:30', period: '下午', label: '第8批' },
];
const CAPACITY = { badminton: 64, swimming: 40 };

function load() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
  catch { return { registrations: {}, counters: {} }; }
}
function save(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// ---------- 前端页面 ----------
const HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>咸宁实验外国语学校 · 体验课报名</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font:16px/1.6 -apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;background:#f5f7fa;color:#333;min-height:100vh}
.header{background:linear-gradient(135deg,#1a5fb4,#3584e4);color:#fff;padding:24px 20px 20px;text-align:center}
.header h1{font-size:20px;margin-bottom:4px}
.header p{font-size:13px;opacity:.85;margin-top:4px}
.step{display:none;padding:16px}
.step.active{display:block}
.card{background:#fff;border-radius:12px;padding:20px;margin-bottom:14px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
.card h3{font-size:16px;margin-bottom:14px;color:#1a5fb4;display:flex;align-items:center;gap:6px}
.project-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.project-btn{border:2px solid #e0e0e0;border-radius:12px;padding:18px 12px;text-align:center;background:#fff;cursor:pointer;transition:all .2s}
.project-btn:hover,.project-btn.selected{border-color:#1a5fb4;background:#e8f0fe}
.project-btn .emoji{font-size:32px;display:block;margin-bottom:8px}
.project-btn .name{font-size:15px;font-weight:600;margin-bottom:2px}
.project-btn .hint{font-size:12px;color:#999}
.slot-list{max-height:400px;overflow-y:auto}
.slot-item{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border:1px solid #e8e8e8;border-radius:10px;margin-bottom:8px;cursor:pointer;transition:all .15s}
.slot-item:hover{background:#f8f9fb}
.slot-item.selected{border-color:#1a5fb4;background:#e8f0fe}
.slot-item.full{opacity:.5;pointer-events:none;background:#f0f0f0}
.slot-item .left{display:flex;flex-direction:column;gap:2px}
.slot-item .date{font-size:14px;font-weight:600}
.slot-item .label{font-size:12px;color:#888}
.slot-item .right{text-align:right}
.slot-item .avail{font-size:14px;color:#2e7d32;font-weight:600}
.slot-item .avail.full-text{color:#c62828}
.form-group{margin-bottom:14px}
.form-group label{display:block;font-size:14px;font-weight:600;margin-bottom:6px;color:#555}
.form-group input,.form-group select{width:100%;padding:12px 14px;border:1px solid #ddd;border-radius:8px;font-size:16px;outline:none;transition:border .2s}
.form-group input:focus,.form-group select:focus{border-color:#1a5fb4}
.btn{display:block;width:100%;padding:14px;border:none;border-radius:10px;font-size:17px;font-weight:600;cursor:pointer;text-align:center;transition:all .2s}
.btn-primary{background:linear-gradient(135deg,#1a5fb4,#3584e4);color:#fff}
.btn-primary:active{opacity:.85}
.btn-primary:disabled{opacity:.5;pointer-events:none}
.btn-secondary{background:#f0f0f0;color:#666;margin-top:10px}
.result{text-align:center;padding:40px 20px}
.result .icon{font-size:64px;margin-bottom:16px}
.result h2{font-size:22px;margin-bottom:8px;color:#2e7d32}
.result .info{font-size:15px;color:#666;line-height:2}
.result .warn{font-size:13px;color:#e67e22;margin-top:16px;background:#fff3e0;border-radius:8px;padding:12px}
</style>
</head>
<body>
<div class="header">
  <h1>🏸🏊 咸宁实验外国语学校 · 体验课报名</h1>
  <p>羽毛球 | 游泳 · 完全免费</p>
</div>

<!-- Step 1: 选项目 -->
<div class="step active" id="step1">
  <div class="card">
    <h3>📌 第一步：选择项目</h3>
    <div class="project-grid">
      <div class="project-btn" onclick="selectProject('badminton')" id="proj-badminton">
        <span class="emoji">🏸</span>
        <div class="name">羽毛球</div>
        <div class="hint">每批 64 人</div>
      </div>
      <div class="project-btn" onclick="selectProject('swimming')" id="proj-swimming">
        <span class="emoji">🏊</span>
        <div class="name">游泳</div>
        <div class="hint">每批 40 人</div>
      </div>
    </div>
  </div>
</div>

<!-- Step 2: 选时间 -->
<div class="step" id="step2">
  <div class="card">
    <h3>📅 第二步：选择时间段</h3>
    <div id="slotContainer" class="slot-list"></div>
    <button class="btn btn-secondary" onclick="goStep(1)">← 返回重选项目</button>
  </div>
</div>

<!-- Step 3: 填信息 -->
<div class="step" id="step3">
  <div class="card">
    <h3>✏️ 第三步：填写信息</h3>
    <div class="form-group">
      <label>学生姓名</label>
      <input type="text" id="fieldName" placeholder="请输入学生姓名" maxlength="20">
    </div>
    <div class="form-group">
      <label>班级</label>
      <input type="text" id="fieldClass" placeholder="如：2年级3班" maxlength="30">
    </div>
    <div class="form-group">
      <label>家长手机号</label>
      <input type="tel" id="fieldPhone" placeholder="请输入手机号" maxlength="11">
    </div>
    <button class="btn btn-primary" id="submitBtn" onclick="submitForm()">确认报名</button>
    <button class="btn btn-secondary" onclick="goStep(2)">← 返回重选时间</button>
  </div>
</div>

<!-- Step 4: 成功 -->
<div class="step" id="step4">
  <div class="result">
    <div class="icon">✅</div>
    <h2>报名成功！</h2>
    <div class="info" id="resultInfo"></div>
    <div class="warn">⚠️ 请截图保存此页面，作为入场凭证</div>
  </div>
</div>

<script>
let selectedProject = null;
let selectedSlot = null;
let slotData = {};

async function loadSlots() {
  const r = await fetch('/api/slots');
  slotData = await r.json();
}

function selectProject(p) {
  selectedProject = p;
  document.querySelectorAll('.project-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('proj-'+p).classList.add('selected');
  goStep(2);
  renderSlots();
}

function renderSlots() {
  const cap = selectedProject === 'badminton' ? 64 : 40;
  const container = document.getElementById('slotContainer');
  container.innerHTML = '';
  const slots = slotData.slots || [];
  let currentDate = '';
  slots.forEach(s => {
    if (s.date !== currentDate) {
      currentDate = s.date;
      const h = document.createElement('div');
      h.style.cssText = 'font-size:14px;font-weight:700;color:#1a5fb4;margin:8px 0 6px;padding:4px 0';
      h.textContent = '📅 ' + s.date;
      container.appendChild(h);
    }
    const count = (slotData.counts && slotData.counts[s.id] && slotData.counts[s.id][selectedProject]) || 0;
    const remaining = cap - count;
    const isFull = remaining <= 0;

    const div = document.createElement('div');
    div.className = 'slot-item' + (isFull ? ' full' : '') + (selectedSlot === s.id ? ' selected' : '');
    div.onclick = () => { if(!isFull) { selectedSlot = s.id; renderSlots(); goStep(3); } };
    div.innerHTML = '<div class="left"><span class="date">'+s.label+' ' + s.time+'</span><span class="label">'+s.date+'</span></div>'+
      '<div class="right"><span class="avail'+(isFull?' full-text':'')+'">'+(isFull?'已满':'剩余 '+remaining+' 人')+'</span></div>';
    container.appendChild(div);
  });
}

function goStep(n) {
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  document.getElementById('step'+n).classList.add('active');
  window.scrollTo(0, 0);
  if (n === 2) { selectedSlot = null; renderSlots(); }
}

async function submitForm() {
  const name = document.getElementById('fieldName').value.trim();
  const cls = document.getElementById('fieldClass').value.trim();
  const phone = document.getElementById('fieldPhone').value.trim();
  if (!name) return alert('请输入学生姓名');
  if (!cls) return alert('请输入班级');
  if (!/^1\d{10}$/.test(phone)) return alert('请输入正确的11位手机号');

  const btn = document.getElementById('submitBtn');
  btn.disabled = true; btn.textContent = '提交中...';

  const r = await fetch('/api/signup', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ project: selectedProject, slot: selectedSlot, name, class: cls, phone })
  });
  const resp = await r.json();
  if (resp.error) { alert(resp.error); btn.disabled = false; btn.textContent = '确认报名'; return; }

  const slotInfo = slotData.slots.find(s => s.id === selectedSlot);
  document.getElementById('resultInfo').innerHTML =
    '🏷️ 项目：'+(selectedProject==='badminton'?'羽毛球':'游泳')+'<br>'+
    '📅 时间：'+slotInfo.date+' '+slotInfo.label+'<br>'+
    '⏰ 时段：'+slotInfo.time+'<br>'+
    '👤 姓名：'+name+'<br>'+
    '📚 班级：'+cls+'<br>'+
    '📱 电话：'+phone;
  goStep(4);
}

loadSlots();
</script>
</body>
</html>`;

// ---------- 管理员页面 ----------
const ADMIN_HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>报名管理后台</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font:15px/1.6 -apple-system,sans-serif;padding:16px;background:#f5f7fa}
h1{font-size:20px;margin-bottom:4px}
.stats{display:flex;gap:10px;margin:16px 0;flex-wrap:wrap}
.stat{padding:12px 16px;background:#fff;border-radius:10px;flex:1;min-width:120px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.06)}
.stat .num{font-size:28px;font-weight:700;color:#1a5fb4}
.stat .label{font-size:12px;color:#888;margin-top:2px}
table{width:100%;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.06);border-collapse:collapse}
th,td{padding:10px 12px;text-align:left;border-bottom:1px solid #f0f0f0;font-size:14px}
th{background:#1a5fb4;color:#fff;font-weight:600}
tr:hover{background:#f8f9fb}
.empty{text-align:center;padding:40px;color:#999}
.btn{display:inline-block;padding:8px 16px;background:#1a5fb4;color:#fff;border:none;border-radius:6px;font-size:14px;cursor:pointer;text-decoration:none;margin:8px 4px}
.btn-danger{background:#c62828}
@media print{body{background:#fff}.btn{display:none}}
</style>
</head>
<body>
<h1>📋 咸宁实验外国语学校 · 体验课报名管理</h1>
<div id="stats" class="stats"></div>
<button class="btn" onclick="location.reload()">🔄 刷新</button>
<button class="btn" onclick="window.print()">🖨️ 打印</button>
<button class="btn btn-danger" onclick="if(confirm('确定清空全部报名数据？此操作不可恢复。'))fetch('/api/clear',{method:'POST'}).then(()=>location.reload())">🗑️ 清空数据</button>
<div id="table"></div>
<script>
async function load() {
  const r = await fetch('/api/admin');
  const d = await r.json();
  let b=0,s=0,t=0;
  for(const k in d.counts) for(const p in d.counts[k]) { t+=d.counts[k][p]; if(p==='badminton')b+=d.counts[k][p];else s+=d.counts[k][p]; }
  document.getElementById('stats').innerHTML=
    '<div class="stat"><div class="num">'+t+'</div><div class="label">总报名</div></div>'+
    '<div class="stat"><div class="num">'+b+'</div><div class="label">🏸 羽毛球</div></div>'+
    '<div class="stat"><div class="num">'+s+'</div><div class="label">🏊 游泳</div></div>';
  const regs = d.registrations || {};
  const keys = Object.keys(regs).sort((a,b)=>d.regs[a].time - d.regs[b].time);
  if(!keys.length) { document.getElementById('table').innerHTML='<div class="empty">暂无报名数据</div>'; return; }
  const rows = keys.map(k => {
    const r = regs[k]; const sl = d.slotMap[r.slot] || r.slot;
    return '<tr><td>'+(r.project==='badminton'?'🏸':'🏊')+'</td><td>'+sl+'</td><td>'+r.name+'</td><td>'+r.class+'</td><td>'+r.phone+'</td><td>'+new Date(r.time).toLocaleString('zh-CN')+'</td></tr>';
  }).join('');
  document.getElementById('table').innerHTML='<table><thead><tr><th>项目</th><th>时段</th><th>姓名</th><th>班级</th><th>电话</th><th>报名时间</th></tr></thead><tbody>'+rows+'</tbody></table>';
}
load();
</script>
</body>
</html>`;

// ---------- 路由 ----------
app.get('/', (req, res) => res.send(HTML));
app.get('/admin', (req, res) => res.send(ADMIN_HTML));

app.get('/api/slots', (req, res) => {
  const data = load();
  res.json({ slots: SLOTS, counts: data.counters });
});

app.post('/api/signup', (req, res) => {
  const { project, slot, name, class: cls, phone } = req.body;
  if (!['badminton','swimming'].includes(project)) return res.status(400).json({ error: '请选择有效项目' });
  const sl = SLOTS.find(s => s.id === slot);
  if (!sl) return res.status(400).json({ error: '请选择有效时间段' });
  if (!name || !cls || !phone) return res.status(400).json({ error: '请填写完整信息' });

  const data = load();
  if (!data.counters[slot]) data.counters[slot] = {};
  const cur = data.counters[slot][project] || 0;
  if (cur >= CAPACITY[project]) return res.status(400).json({ error: '该时段已满，请选择其他时段' });

  // 检查重复手机号
  for (const k in data.registrations) {
    if (data.registrations[k].phone === phone && data.registrations[k].slot === slot && data.registrations[k].project === project) {
      return res.status(400).json({ error: '该手机号已在此时间段报名，请勿重复提交' });
    }
  }

  const id = Date.now() + '_' + Math.random().toString(36).slice(2, 6);
  data.registrations[id] = { project, slot, name, class: cls, phone, time: Date.now() };
  data.counters[slot][project] = cur + 1;
  save(data);
  res.json({ success: true, id });
});

// 管理员 API
app.get('/api/admin', (req, res) => {
  const data = load();
  const slotMap = {};
  SLOTS.forEach(s => { slotMap[s.id] = s.date + ' ' + s.label + ' ' + s.time; });
  res.json({ registrations: data.registrations, counts: data.counters, slotMap, slots: SLOTS });
});

app.post('/api/clear', (req, res) => {
  save({ registrations: {}, counters: {} });
  res.json({ success: true });
});

const PORT = process.env.PORT || 3456;
app.listen(PORT, '0.0.0.0', () => {
  console.log('报名系统已启动: http://localhost:' + PORT);
  console.log('管理后台: http://localhost:' + PORT + '/admin');
});
