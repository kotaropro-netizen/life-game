const cvs = document.getElementById("life");
const pen = cvs.getContext("2d");
const s = 10; // マスのサイズ
const w = cvs.width / s, h = cvs.height / s;
let g = randomGrid();
let timer;

//ランダム作成
function randomGrid() {
  return Array.from({ length: h }, () =>
    Array.from({ length: w }, () => Math.random() < 0.2)
  );
}

// 盤面作成
function clearGrid() {
  g = Array.from({ length: h }, () => Array(w).fill(false));
  draw();
}

// draw機能
function draw() {
  pen.clearRect(0, 0, cvs.width, cvs.height);
  g.forEach((r, y) =>
    r.forEach((c, x) => {
      pen.fillStyle = c ? "black" : "white";
      pen.fillRect(x * s, y * s, s - 1, s - 1); // 枠を少し空ける
    })
  );
}

// 次へ
function next() {
  g = g.map((r, y) =>
    r.map((c, x) => {
      let n = 0;
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++)
          if (dx || dy) n += g[y + dy]?.[x + dx] ? 1 : 0;
      return n === 3 || (c && n === 2);
    })
  );
  draw();
}

// クリックで塗る・消す
cvs.addEventListener("click", (e) => {
  const rect = cvs.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / s);
  const y = Math.floor((e.clientY - rect.top) / s);
  g[y][x] = !g[y][x];
  draw();
});

// ボタン類
document.getElementById("next").onclick = next;
document.getElementById("auto").onclick = () => timer ||= setInterval(next, 200);
document.getElementById("stop").onclick = () => (clearInterval(timer), timer = null);
document.getElementById("clear").onclick = () => {
  clearInterval(timer);
  timer = null;
  clearGrid();
};
document.getElementById("ran").onclick = () => {
  g = randomGrid();
  draw();
};

draw();
