const CONFIG = {
  // Change these values to personalize the page.
  nameOne: "Harsha",
  nameTwo: "Tejeswini",
  message: "Some people make ordinary moments feel extraordinary.",
  letter: "You are one of those beautiful reasons that makes a normal day feel special. Keep smiling, keep shining, and remember that you are deeply appreciated.",
  signature: "Always"
};

document.getElementById("nameOne").textContent = CONFIG.nameOne;
document.getElementById("nameTwo").textContent = CONFIG.nameTwo;
document.getElementById("message").textContent = CONFIG.message;
document.getElementById("letterText").textContent = CONFIG.letter;
document.getElementById("signature").textContent = CONFIG.signature;

const revealBtn = document.getElementById("revealBtn");
const letter = document.getElementById("letter");

revealBtn.addEventListener("click", () => {
  letter.classList.add("show");
  letter.setAttribute("aria-hidden", "false");
  setTimeout(() => letter.scrollIntoView({behavior:"smooth", block:"center"}), 80);
  burst(28);
});

function burst(count = 20){
  for(let i=0;i<count;i++){
    const p = document.createElement("span");
    p.className = "particle";
    p.textContent = Math.random() > .25 ? "♥" : "✦";
    p.style.left = `${50 + (Math.random() - .5) * 35}vw`;
    p.style.top = `${42 + (Math.random() - .5) * 18}vh`;
    p.style.setProperty("--x", `${(Math.random()-.5)*260}px`);
    p.style.setProperty("--y", `${-80-Math.random()*260}px`);
    p.style.fontSize = `${10 + Math.random()*14}px`;
    p.style.animationDelay = `${Math.random()*.35}s`;
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),2200);
  }
}

document.querySelector(".heart-wrap").addEventListener("click", () => burst(14));

// Lightweight ambient tone using Web Audio. No external audio asset is required.
let audioCtx = null;
let playing = false;
const musicBtn = document.getElementById("musicBtn");

function toggleMusic(){
  if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if(playing){
    audioCtx.suspend();
    playing = false;
    musicBtn.textContent = "♪";
    return;
  }
  audioCtx.resume();
  const notes = [261.63,329.63,392.00,329.63];
  let i=0;
  const playNote = () => {
    if(!playing) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = notes[i++ % notes.length];
    gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.025, audioCtx.currentTime + .04);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 1.25);
    setTimeout(playNote, 1200);
  };
  playing = true;
  musicBtn.textContent = "Ⅱ";
  playNote();
}
musicBtn.addEventListener("click", toggleMusic);

// PWA install prompt
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installBtn.hidden = false;
});

installBtn.addEventListener("click", async () => {
  if(!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installBtn.hidden = true;
});

window.addEventListener("appinstalled", () => {
  installBtn.hidden = true;
});

// Service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(console.error));
}
