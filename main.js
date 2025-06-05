// Navigasi Beranda/Materi
function showPage(pageId, btn) {
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.container>.content').forEach(c=>c.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  // Reset tab ke default (Litik) jika ke Materi
  if(pageId==='materi') showTab('litik', document.querySelector('.tab'));
}

// Tab Daur Litik/Lisogenik
function showTab(tabId, btn) {
  document.querySelectorAll('#materi .tab').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  document.querySelectorAll('#materi>.content').forEach(c=>c.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}

// ANIMASI VIRUS DI BACKGROUND
const canvas = document.getElementById('virus-bg');
const ctx = canvas.getContext('2d');
let viruses = [];
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Buat virus (lingkaran dengan spike)
function drawVirus(x, y, r, color, angle) {
  // Body
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.shadowColor = "#6a1b9a";
  ctx.shadowBlur = 10;
  ctx.fill();
  // Spikes
  for(let i=0;i<12;i++){
    ctx.save();
    ctx.rotate((i/12)*2*Math.PI);
    ctx.beginPath();
    ctx.moveTo(r-2,0);
    ctx.lineTo(r+8,0);
    ctx.strokeStyle = "#8e24aa";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
}
// Inisialisasi virus
function initViruses() {
  viruses = [];
  const colors = ['#ba68c8','#8e24aa','#f06292','#4a148c'];
  for(let i=0;i<18;i++){
    viruses.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: 18+Math.random()*18,
      color: colors[Math.floor(Math.random()*colors.length)],
      dx: -1+Math.random()*2,
      dy: -1+Math.random()*2,
      angle: Math.random()*Math.PI*2,
      dAngle: (-0.01+Math.random()*0.02)
    });
  }
}
initViruses();
// Animasi
function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let v of viruses){
    drawVirus(v.x, v.y, v.r, v.color, v.angle);
    v.x += v.dx;
    v.y += v.dy;
    v.angle += v.dAngle;
    if(v.x< -40) v.x=canvas.width+40;
    if(v.x>canvas.width+40) v.x=-40;
    if(v.y< -40) v.y=canvas.height+40;
    if(v.y>canvas.height+40) v.y=-40;
  }
  requestAnimationFrame(animate);
}
animate();
window.addEventListener('resize', ()=>{resizeCanvas();initViruses();});