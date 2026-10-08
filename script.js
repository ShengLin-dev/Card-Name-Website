// ==========================================================================
// 1. AUDIO SYNTHESIZER (Tactile Sound FX via Web Audio API)
// ==========================================================================
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSwooshSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(420, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.35);
  gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.35);
}

function playChimeSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const notes = [523.25, 659.25, 783.99, 1046.50];
  notes.forEach((freq, idx) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.08);
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime + idx * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.08 + 0.4);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + idx * 0.08);
    osc.stop(audioCtx.currentTime + idx * 0.08 + 0.45);
  });
}

function playClickSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.05);
  gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);
}

// ==========================================================================
// 2. THEME MAP & PRESETS
// ==========================================================================
const themeMap = {
  cosmic: {
    name: '宇宙藍',
    primary: '#0096e6',
    secondary: '#0284c7',
    glow: 'rgba(0, 150, 230, 0.55)',
    icon: '🌌',
    bg: 'linear-gradient(135deg, #0e1e38 0%, #060b17 100%)',
    frame: '#1e3a8a'
  },
  tech: {
    name: '科技金',
    primary: '#f59e0b',
    secondary: '#d97706',
    glow: 'rgba(245, 158, 11, 0.6)',
    icon: '⚙️',
    bg: 'linear-gradient(135deg, #451a03 0%, #0f172a 100%)',
    frame: '#78350f'
  },
  spirit: {
    name: '精神紫',
    primary: '#a855f7',
    secondary: '#9333ea',
    glow: 'rgba(168, 85, 247, 0.55)',
    icon: '🔮',
    bg: 'linear-gradient(135deg, #3b0764 0%, #0f172a 100%)',
    frame: '#581c87'
  },
  speed: {
    name: '疾速青',
    primary: '#06b6d4',
    secondary: '#0891b2',
    glow: 'rgba(6, 182, 212, 0.55)',
    icon: '⚡',
    bg: 'linear-gradient(135deg, #164e63 0%, #0f172a 100%)',
    frame: '#155e75'
  },
  flame: {
    name: '創發紅',
    primary: '#f43f5e',
    secondary: '#e11d48',
    glow: 'rgba(244, 63, 94, 0.55)',
    icon: '🔥',
    bg: 'linear-gradient(135deg, #4c0519 0%, #0f172a 100%)',
    frame: '#881337'
  },
  shadow: {
    name: '暗影綠',
    primary: '#10b981',
    secondary: '#059669',
    glow: 'rgba(16, 185, 129, 0.55)',
    icon: '🌿',
    bg: 'linear-gradient(135deg, #064e3b 0%, #0f172a 100%)',
    frame: '#065f46'
  }
};

// ==========================================================================
// 3. MAIN CONTROLLER
// ==========================================================================
(function () {
  // DOM Elements
  const stage = document.getElementById('stage');
  const cardScene = document.getElementById('cardScene');
  const cardWrapper = document.getElementById('cardWrapper');
  const cardFront = document.getElementById('cardFront');
  const cardBack = document.getElementById('cardBack');
  const cardOuterRim = document.getElementById('cardOuterRim');
  const cardAttrIcon = document.getElementById('cardAttrIcon');
  const bgGlowOrb = document.getElementById('bgGlowOrb');
  const toast = document.getElementById('toast');

  // Quick Action Buttons
  const flipBtn = document.getElementById('flipBtn');
  const orbitBtn = document.getElementById('orbitBtn');
  const gyroBtn = document.getElementById('gyroBtn');
  const resetTiltBtn = document.getElementById('resetTiltBtn');
  const exportBtn = document.getElementById('exportBtn');

  // Portrait Elements
  const imageInput = document.getElementById('imageInput');
  const cardArtImg = document.getElementById('cardArtImg');
  const resetArtBtn = document.getElementById('resetArtBtn');
  const artWindow = document.getElementById('artWindow');
  const defaultArtPath = 'reference/1.png';

  // State Variables
  let maxTilt = 25;
  let isFlipped = false;
  let isAutoOrbit = false;
  let isGyroActive = false;
  let targetRx = 0;
  let targetRy = 0;
  let currentRx = 0;
  let currentRy = 0;
  let mouseX = 50;
  let mouseY = 50;
  let animFrameId = null;

  // Toast Helper
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2600);
  }

  // ==========================================================================
  // 4. TAB NAVIGATION
  // ==========================================================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.add('active');

      playClickSound();
    });
  });

  // ==========================================================================
  // 5. THEME & FOIL & FRAME SWITCHERS
  // ==========================================================================
  // Foil Switcher
  const foilCards = document.querySelectorAll('#tab-style [data-foil]');
  foilCards.forEach(card => {
    card.addEventListener('click', () => {
      foilCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const foilMode = card.getAttribute('data-foil');
      cardScene.setAttribute('data-foil', foilMode);
      playChimeSound();
      showToast(`箔膜切換至 ${card.querySelector('.option-title').innerText.replace('\n', ' ')}`);
    });
  });

  // Theme Switcher
  const themeCards = document.querySelectorAll('#tab-style [data-theme]');
  themeCards.forEach(card => {
    card.addEventListener('click', () => {
      themeCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const themeKey = card.getAttribute('data-theme');
      applyTheme(themeKey);
      playChimeSound();
    });
  });

  function applyTheme(key) {
    const theme = themeMap[key];
    if (!theme) return;

    const root = document.documentElement;
    root.style.setProperty('--card-theme-primary', theme.primary);
    root.style.setProperty('--card-theme-secondary', theme.secondary);
    root.style.setProperty('--card-theme-glow', theme.glow);
    root.style.setProperty('--card-bg-gradient', theme.bg);
    root.style.setProperty('--card-frame-color', theme.frame);

    cardAttrIcon.innerHTML = theme.icon;
    bgGlowOrb.style.background = `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`;

    showToast(`主題切換至 ${theme.name}`);
  }

  // Frame Style Switcher
  const frameCards = document.querySelectorAll('#tab-style [data-frame]');
  frameCards.forEach(card => {
    card.addEventListener('click', () => {
      frameCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const frameMode = card.getAttribute('data-frame');

      cardWrapper.classList.remove('frame-gold', 'frame-cyber', 'frame-dark');
      if (frameMode !== 'gold') {
        cardWrapper.classList.add(`frame-${frameMode}`);
      }
      playClickSound();
      showToast(`外框樣式已更新`);
    });
  });

  // ==========================================================================
  // 6. 3D PARALLAX & PHYSICS ENGINE
  // ==========================================================================
  function updatePhysics() {
    if (!isFlipped && !isAutoOrbit) {
      currentRx += (targetRx - currentRx) * 0.12;
      currentRy += (targetRy - currentRy) * 0.12;
      cardWrapper.style.transform = `rotateX(${currentRx}deg) rotateY(${currentRy}deg)`;
    }

    const root = document.documentElement;
    root.style.setProperty('--rx', `${currentRx}deg`);
    root.style.setProperty('--ry', `${currentRy}deg`);
    root.style.setProperty('--mx', `${mouseX}%`);
    root.style.setProperty('--my', `${mouseY}%`);

    const angle = Math.atan2(mouseY - 50, mouseX - 50) * (180 / Math.PI) + 90;
    root.style.setProperty('--holo-angle', `${angle}deg`);

    animFrameId = requestAnimationFrame(updatePhysics);
  }
  animFrameId = requestAnimationFrame(updatePhysics);

  function handlePointerMove(clientX, clientY) {
    if (isFlipped || isAutoOrbit) return;

    const rect = cardScene.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const clampedX = Math.max(0, Math.min(rect.width, x));
    const clampedY = Math.max(0, Math.min(rect.height, y));

    mouseX = (clampedX / rect.width) * 100;
    mouseY = (clampedY / rect.height) * 100;

    const normX = (clampedX / rect.width - 0.5) * 2;
    const normY = (clampedY / rect.height - 0.5) * 2;

    targetRy = normX * maxTilt;
    targetRx = -normY * maxTilt;
  }

  stage.addEventListener('mousemove', (e) => {
    handlePointerMove(e.clientX, e.clientY);
  });

  stage.addEventListener('mouseleave', () => {
    targetRx = 0;
    targetRy = 0;
    mouseX = 50;
    mouseY = 50;
  });

  stage.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      handlePointerMove(touch.clientX, touch.clientY);
    }
  }, { passive: true });

  stage.addEventListener('touchend', () => {
    targetRx = 0;
    targetRy = 0;
    mouseX = 50;
    mouseY = 50;
  });

  // Flip Toggle
  function toggleFlip() {
    isFlipped = !isFlipped;
    if (isFlipped) {
      cardWrapper.classList.add('is-flipped');
      flipBtn.classList.add('active');
    } else {
      cardWrapper.classList.remove('is-flipped');
      flipBtn.classList.remove('active');
      targetRx = 0;
      targetRy = 0;
    }
    playSwooshSound();
  }
  flipBtn.addEventListener('click', toggleFlip);

  // Auto Orbit Toggle
  orbitBtn.addEventListener('click', () => {
    isAutoOrbit = !isAutoOrbit;
    if (isAutoOrbit) {
      if (isFlipped) toggleFlip();
      cardWrapper.classList.add('is-idle-orbit');
      orbitBtn.classList.add('active');
      showToast('🪐 自動環繞展示已啟動');
    } else {
      cardWrapper.classList.remove('is-idle-orbit');
      orbitBtn.classList.remove('active');
      targetRx = 0;
      targetRy = 0;
      showToast('已恢復手動互動視差');
    }
  });

  // Reset Center View
  resetTiltBtn.addEventListener('click', () => {
    if (isFlipped) toggleFlip();
    if (isAutoOrbit) {
      isAutoOrbit = false;
      cardWrapper.classList.remove('is-idle-orbit');
      orbitBtn.classList.remove('active');
    }
    targetRx = 0;
    targetRy = 0;
    mouseX = 50;
    mouseY = 50;
    showToast('🎯 視角已重置置中');
  });

  // Mobile Gyroscope Sensor
  gyroBtn.addEventListener('click', async () => {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') {
          enableGyro();
        } else {
          showToast('陀螺儀權限已被拒絕');
        }
      } catch (err) {
        console.error(err);
        showToast('無法啟用設備方向感應');
      }
    } else if (window.DeviceOrientationEvent) {
      enableGyro();
    } else {
      showToast('此瀏覽器未檢測到陀螺儀傳感器');
    }
  });

  function enableGyro() {
    if (isGyroActive) {
      window.removeEventListener('deviceorientation', handleOrientation);
      isGyroActive = false;
      gyroBtn.classList.remove('active');
      showToast('已關閉陀螺儀');
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
      isGyroActive = true;
      gyroBtn.classList.add('active');
      showToast('📱 陀螺儀已啟用：旋轉手機即可傾斜！');
    }
  }

  function handleOrientation(e) {
    if (isFlipped || isAutoOrbit) return;
    const gamma = Math.max(-45, Math.min(45, e.gamma || 0));
    const beta = Math.max(-45, Math.min(45, (e.beta || 0) - 30));

    targetRy = (gamma / 45) * maxTilt;
    targetRx = (-beta / 45) * maxTilt;

    mouseX = 50 + (gamma / 45) * 40;
    mouseY = 50 + (beta / 45) * 40;
  }

  // ==========================================================================
  // 7. TAB 2: PARAMETRIC FINE-TUNING SLIDERS
  // ==========================================================================
  const sliders = {
    paramTiltAngle: {
      disp: 'valTiltAngle',
      suffix: '°',
      handler: val => { maxTilt = parseFloat(val); }
    },
    paramZDepth: {
      disp: 'valZDepth',
      suffix: 'x',
      handler: val => { document.documentElement.style.setProperty('--z-depth-scale', val); }
    },
    paramFoilOpacity: {
      disp: 'valFoilOpacity',
      suffix: '%',
      handler: val => {
        document.documentElement.style.setProperty('--foil-opacity', (val / 100).toFixed(2));
        document.documentElement.style.setProperty('--glare-opacity', ((val / 100) * 0.85).toFixed(2));
      }
    },
    paramGlareSize: {
      disp: 'valGlareSize',
      suffix: '%',
      handler: val => { document.documentElement.style.setProperty('--glare-spot-size', `${val}%`); }
    },
    paramCardGlow: {
      disp: 'valCardGlow',
      suffix: 'px',
      handler: val => { document.documentElement.style.setProperty('--card-glow-radius', `${val}px`); }
    },
    paramArtScale: {
      disp: 'valArtScale',
      suffix: 'x',
      handler: val => { document.documentElement.style.setProperty('--art-scale', val); }
    },
    paramArtOffsetX: {
      disp: 'valArtOffsetX',
      suffix: 'px',
      handler: val => { document.documentElement.style.setProperty('--art-offset-x', `${val}px`); }
    },
    paramArtOffsetY: {
      disp: 'valArtOffsetY',
      suffix: 'px',
      handler: val => { document.documentElement.style.setProperty('--art-offset-y', `${val}px`); }
    },
    paramArtBrightness: {
      disp: 'valArtBrightness',
      suffix: '%',
      handler: val => { document.documentElement.style.setProperty('--art-brightness', `${val}%`); }
    },
    paramArtContrast: {
      disp: 'valArtContrast',
      suffix: '%',
      handler: val => { document.documentElement.style.setProperty('--art-contrast', `${val}%`); }
    }
  };

  Object.entries(sliders).forEach(([id, cfg]) => {
    const input = document.getElementById(id);
    const disp = document.getElementById(cfg.disp);
    if (input && disp) {
      input.addEventListener('input', (e) => {
        disp.textContent = `${e.target.value}${cfg.suffix}`;
        cfg.handler(e.target.value);
      });
    }
  });

  // Reset Params
  const resetParamsBtn = document.getElementById('resetParamsBtn');
  resetParamsBtn.addEventListener('click', () => {
    const defaults = {
      paramTiltAngle: 25,
      paramZDepth: 1.0,
      paramFoilOpacity: 85,
      paramGlareSize: 60,
      paramCardGlow: 35,
      paramArtScale: 1.0,
      paramArtOffsetX: 0,
      paramArtOffsetY: 0,
      paramArtBrightness: 100,
      paramArtContrast: 100
    };

    Object.entries(defaults).forEach(([id, val]) => {
      const input = document.getElementById(id);
      if (input) {
        input.value = val;
        const cfg = sliders[id];
        if (cfg) {
          document.getElementById(cfg.disp).textContent = `${val}${cfg.suffix}`;
          cfg.handler(val);
        }
      }
    });

    playClickSound();
    showToast('所有微調參數已重置');
  });

  // ==========================================================================
  // 8. TAB 3: DUAL-WAY LIVE CONTENT SYNCHRONIZATION
  // ==========================================================================
  const syncPairs = [
    { input: 'inputCardName', card: 'cardName' },
    { input: 'inputCardHp', card: 'cardHp' },
    { input: 'inputCardSubtitle', card: 'cardSubtitle' },
    { input: 'inputCardRank', card: 'cardRank' },
    { input: 'inputCardStage', card: 'cardStage' },
    { input: 'inputPassiveName', card: 'cardPassiveName' },
    { input: 'inputPassiveDesc', card: 'cardPassiveDesc' },
    { input: 'inputSkill1Name', card: 'skill1Name' },
    { input: 'inputSkill1Dmg', card: 'skill1Dmg' },
    { input: 'inputSkill1Desc', card: 'skill1Desc' },
    { input: 'inputSkill2Name', card: 'skill2Name' },
    { input: 'inputSkill2Dmg', card: 'skill2Dmg' },
    { input: 'inputSkill2Desc', card: 'skill2Desc' },
    { input: 'inputWeakness', card: 'cardWeakness' },
    { input: 'inputResistance', card: 'cardResistance' },
    { input: 'inputRetreat', card: 'cardRetreat' },
    { input: 'inputArtist', card: 'cardArtist' },
    { input: 'inputNumber', card: 'cardNumber' },
    { input: 'inputCopyright', card: 'cardCopyright' }
  ];

  syncPairs.forEach(pair => {
    const inputEl = document.getElementById(pair.input);
    const cardEl = document.getElementById(pair.card);

    if (inputEl && cardEl) {
      // 1. Typing in panel form updates card face
      inputEl.addEventListener('input', (e) => {
        cardEl.innerText = e.target.value;
      });

      // 2. Typing directly on card face (contenteditable) updates panel form
      cardEl.addEventListener('input', () => {
        inputEl.value = cardEl.innerText;
      });
    }
  });

  // ==========================================================================
  // 9. ARTWORK UPLOAD & RESET
  // ==========================================================================
  imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showToast('請上傳有效的圖片檔案');
        return;
      }
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        cardArtImg.src = loadEvt.target.result;
        showToast('肖像立繪已更新！');
        playChimeSound();
      };
      reader.readAsDataURL(file);
    }
  });

  resetArtBtn.addEventListener('click', () => {
    cardArtImg.src = defaultArtPath;
    showToast('肖像已重設為哆啦A夢預設立繪');
    playClickSound();
  });

  // Drag & drop onto artwork window
  artWindow.addEventListener('dragover', (e) => {
    e.preventDefault();
    artWindow.style.borderColor = '#38bdf8';
  });
  artWindow.addEventListener('dragleave', () => {
    artWindow.style.borderColor = 'rgba(255, 215, 0, 0.65)';
  });
  artWindow.addEventListener('drop', (e) => {
    e.preventDefault();
    artWindow.style.borderColor = 'rgba(255, 215, 0, 0.65)';
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        cardArtImg.src = loadEvt.target.result;
        showToast('圖片已透過拖放更新！');
        playChimeSound();
      };
      reader.readAsDataURL(file);
    }
  });

  // ==========================================================================
  // 10. EXPORT HIGH-RES PNG (html2canvas CDN)
  // ==========================================================================
  exportBtn.addEventListener('click', async () => {
    if (typeof html2canvas === 'undefined') {
      showToast('html2canvas 模組載入中，請稍後重試。');
      return;
    }

    exportBtn.disabled = true;
    exportBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 正在渲染高解析度 PNG...';
    showToast('正在生成 3x 超高清卡牌影像...');

    const targetFace = isFlipped ? cardBack : cardFront;

    // Temporarily flatten 3D transform for perfectly crisp 2D rasterization
    const prevTransform = cardWrapper.style.transform;
    const prevTransition = cardWrapper.style.transition;
    cardWrapper.style.transform = 'none';
    cardWrapper.style.transition = 'none';

    const holoLayer = targetFace.querySelector('.holo-layer');
    if (holoLayer) holoLayer.style.opacity = '0.35';

    try {
      const canvas = await html2canvas(targetFace, {
        scale: 3, // 3x ultra-crisp retina resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false
      });

      const link = document.createElement('a');
      const cardTitle = document.getElementById('cardName').innerText.trim() || 'trading-card';
      link.download = `${cardTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}-legend-card.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      playChimeSound();
      showToast('🎉 卡牌已成功匯出至下載資料夾！');
    } catch (err) {
      console.error('Export error:', err);
      showToast('匯出失敗，請查看瀏覽器主控台紀錄。');
    } finally {
      cardWrapper.style.transform = prevTransform;
      cardWrapper.style.transition = prevTransition;
      if (holoLayer) holoLayer.style.opacity = '';
      exportBtn.disabled = false;
      exportBtn.innerHTML = '<i class="fa-solid fa-download"></i> 匯出高解析度 PNG 卡牌 (3x Retina)';
    }
  });

})();
