const sample = "#6366f1";

const inputEl = document.getElementById('input');
const outputEl = document.getElementById('output');
const statsEl = document.getElementById('output-stats') || document.getElementById('stats');

function process() {
  const hex = inputEl.value.trim() || '#3b82f6';
  try {
    const res = LCHPicker.convert(hex);
    outputEl.value = JSON.stringify(res, null, 2);
    if (statsEl) statsEl.textContent = `Converted to modern CSS ${res.oklch}`;
  } catch (e) {
    outputEl.value = 'Error: ' + e.message;
  }
}

document.getElementById('btn-run').addEventListener('click', process);
inputEl.addEventListener('input', process);
document.getElementById('btn-sample').addEventListener('click', () => { inputEl.value = sample; process(); });
document.getElementById('btn-copy').addEventListener('click', () => { navigator.clipboard.writeText(outputEl.value); alert('Copied color formats!'); });
if (document.getElementById('btn-clear')) document.getElementById('btn-clear').addEventListener('click', () => { inputEl.value = ''; outputEl.value = ''; });
process();
