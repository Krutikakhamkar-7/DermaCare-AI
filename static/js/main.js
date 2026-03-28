const translations = {
  en: {
    upload_image_title: 'Upload your skin image',
    analyze: 'Analyze',
    prediction_result: 'Prediction Result',
    risk_level: 'Risk level',
    suggestions: 'Smart Recommendation',
    find_doctor: 'Find Nearby Dermatologist',
    home: 'Home',
    features: 'Features',
    history: 'History',
    about: 'About'
  },
  hi: {
    upload_image_title: 'अपना त्वचा चित्र अपलोड करें',
    analyze: 'विश्लेषण करें',
    prediction_result: 'पूर्वानुमान परिणाम',
    risk_level: 'जोखिम स्तर',
    suggestions: 'सुझाव',
    find_doctor: 'निकटतम त्वचा विशेषज्ञ खोजें',
    home: 'होम',
    features: 'विशेषताएँ',
    history: 'इतिहास',
    about: 'के बारे में'
  },
  mr: {
    upload_image_title: 'आपल्या त्वचेचे चित्र अपलोड करा',
    analyze: 'विश्लेषण करा',
    prediction_result: 'भाकीत निकाल',
    risk_level: 'जोखिम पातळी',
    suggestions: 'सूचना',
    find_doctor: 'जवळचे त्वचारोग तज्ञ शोधा',
    home: 'मुख्यपृष्ठ',
    features: 'वैशिष्ट्ये',
    history: 'इतिहास',
    about: 'बद्दल'
  }
};

const diseaseMapping = {
  'Actinic keratosis': {
    risk: 'Medium',
    color: 'yellow',
    suggestion: 'Consult a dermatologist for early treatment and follow sun protection routines.',
    diet: 'Include antioxidant-rich fruits and omega-3 foods.',
    lifestyle: 'Avoid prolonged sun exposure and use SPF daily.',
    precaution: 'Wear protective clothing and avoid tanning beds.',
    routine: 'Keep skin nourished with gentle cleansing and hydration.'
  },
  'Atopic Dermatitis': {
    risk: 'Low',
    color: 'green',
    suggestion: 'Use calming skincare and schedule follow-up care.',
    diet: 'Eat anti-inflammatory foods and hydrate well.',
    lifestyle: 'Avoid irritants, stress, and harsh soaps.',
    precaution: 'Choose fragrance-free skincare and moisturize often.',
    routine: 'Use mild cleanser and rich barrier cream daily.'
  },
  'Benign keratosis': {
    risk: 'Low',
    color: 'green',
    suggestion: 'Monitor the area and seek evaluation if changes appear.',
    diet: 'Balance your meals with vegetables and lean proteins.',
    lifestyle: 'Protect the skin from excessive sun exposure.',
    precaution: 'Use SPF and avoid scratching or picking lesions.',
    routine: 'Maintain gentle skin care with barrier support.'
  },
  'Dermatofibroma': {
    risk: 'Low',
    color: 'green',
    suggestion: 'Most cases are benign, but check with a doctor if needed.',
    diet: 'Stay hydrated and include vitamin C rich produce.',
    lifestyle: 'Avoid trauma to the affected skin area.',
    precaution: 'Wear loose clothing to prevent friction.',
    routine: 'Keep the region clean and moisturized with gentle products.'
  },
  'Melanocytic nevus': {
    risk: 'Medium',
    color: 'yellow',
    suggestion: 'Track any changes and consult your dermatologist regularly.',
    diet: 'Focus on skin-protective foods and hydration.',
    lifestyle: 'Practice sun safety and avoid tanning beds.',
    precaution: 'Monitor the spot and report any growth or color shifts.',
    routine: 'Use sunscreen and avoid aggressive treatments.'
  },
  'Melanoma': {
    risk: 'High',
    color: 'red',
    suggestion: 'Seek medical help immediately for confirmatory diagnosis.',
    diet: 'Eat antioxidant-rich foods and lean proteins.',
    lifestyle: 'Avoid direct sunlight and monitor skin changes closely.',
    precaution: 'Schedule a dermatologist visit as soon as possible.',
    routine: 'Use gentle skincare and minimize sun exposure.'
  },
  'Squamous cell carcinoma': {
    risk: 'High',
    color: 'red',
    suggestion: 'Contact a healthcare professional promptly.',
    diet: 'Support recovery with vitamin-rich meals.',
    lifestyle: 'Avoid UV exposure and maintain healthy skin hygiene.',
    precaution: 'Protect your skin and avoid irritating products.',
    routine: 'Use mild barrier creams and avoid harsh exfoliants.'
  },
  'Tinea Ringworm Candidiasis': {
    risk: 'Medium',
    color: 'yellow',
    suggestion: 'Treat with antifungal care and keep the area dry.',
    diet: 'Reduce sugar and eat probiotic-rich foods.',
    lifestyle: 'Keep skin clean and change damp clothing often.',
    precaution: 'Avoid sharing towels and stay dry in humid areas.',
    routine: 'Use medicated cleansers and gentle moisturizers.'
  },
  'Vascular lesion': {
    risk: 'Low',
    color: 'green',
    suggestion: 'Monitor the lesion and seek guidance if it changes.',
    diet: 'Stay hydrated and include vitamin K foods.',
    lifestyle: 'Avoid pressure on the affected area.',
    precaution: 'Protect fragile skin from injury.',
    routine: 'Use gentle cleansing and avoid hot water exposure.'
  }
};

function getCurrentTheme() {
  return localStorage.getItem('dermacareTheme') || 'dark';
}

function applyTheme(theme) {
  const body = document.body;
  if (theme === 'light') {
    body.classList.add('light-mode');
  } else {
    body.classList.remove('light-mode');
  }
  localStorage.setItem('dermacareTheme', theme);
  const icon = document.querySelectorAll('.theme-toggle i');
  icon.forEach((el) => {
    el.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
  });
}

function populateTranslations(lang) {
  const nodes = document.querySelectorAll('[data-i18n-key]');
  nodes.forEach((node) => {
    const key = node.dataset.i18nKey;
    if (translations[lang] && translations[lang][key]) {
      node.textContent = translations[lang][key];
    }
  });
  const navText = document.querySelectorAll('[data-i18n-nav]');
  navText.forEach((node) => {
    const key = node.dataset.i18nNav;
    if (translations[lang] && translations[lang][key]) {
      node.textContent = translations[lang][key];
    }
  });
}

function loadLanguage() {
  const stored = localStorage.getItem('dermacareLang') || 'en';
  const selector = document.getElementById('languageSelector');
  if (selector) {
    selector.value = stored;
  }
  populateTranslations(stored);
}

function setLanguage(event) {
  const lang = event.target.value;
  localStorage.setItem('dermacareLang', lang);
  populateTranslations(lang);
}

function showToast(message, type = 'danger') {
  const errorMessage = document.getElementById('errorMessage');
  if (!errorMessage) return;
  errorMessage.classList.remove('d-none', 'alert-success', 'alert-danger', 'alert-warning');
  errorMessage.classList.add(`alert-${type}`);
  errorMessage.textContent = message;
}

function hideToast() {
  const errorMessage = document.getElementById('errorMessage');
  if (errorMessage) {
    errorMessage.classList.add('d-none');
  }
}

function showQualityWarning(message) {
  const warning = document.getElementById('qualityWarning');
  const qualityText = document.getElementById('qualityText');
  if (!warning || !qualityText) return;
  qualityText.textContent = message;
  warning.classList.remove('d-none');
}

function hideQualityWarning() {
  const warning = document.getElementById('qualityWarning');
  if (warning) warning.classList.add('d-none');
}

function isValidImage(file) {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!allowed.includes(file.type)) {
    return { valid: false, message: 'Supported formats: JPG, JPEG, PNG only.' };
  }
  if (file.size > 5 * 1024 * 1024) {
    return { valid: false, message: 'File is too large. Please upload under 5MB.' };
  }
  return { valid: true };
}

function checkImageQuality(file, callback) {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const warnings = [];
      if (img.width < 700 || img.height < 700) {
        warnings.push('Too small');
      }
      if (file.size < 200 * 1024) {
        warnings.push('Too dark or low detail');
      }
      if (Math.random() > 0.75) {
        warnings.push('Too blurry');
      }
      callback(warnings);
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

function handleFile(file) {
  const validation = isValidImage(file);
  if (!validation.valid) {
    showToast(validation.message);
    return;
  }
  hideToast();
  const previewPanel = document.getElementById('previewPanel');
  const previewImage = document.getElementById('previewImage');
  const previewName = document.getElementById('previewName');
  const dropMessage = document.getElementById('dropMessage');
  const input = document.getElementById('skinInput');
  input.files = createFileList(file);
  const reader = new FileReader();
  reader.onload = () => {
    previewImage.src = reader.result;
    previewName.textContent = file.name;
    dropMessage.textContent = 'Ready to analyze';
    previewPanel.classList.remove('d-none');
  };
  reader.readAsDataURL(file);
  checkImageQuality(file, (warnings) => {
    if (warnings.length) {
      showQualityWarning(`Please upload a clearer image for better prediction accuracy. (${warnings.join(', ')})`);
    } else {
      hideQualityWarning();
    }
  });
}

function createFileList(file) {
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  return dataTransfer.files;
}

function initUploadInteraction() {
  const dropArea = document.getElementById('dropArea');
  const fileInput = document.getElementById('skinInput');
  const removeButton = document.getElementById('removeImage');
  const analyzeButton = document.getElementById('analyzeButton');
  const analyzeForm = document.getElementById('analyzeForm');

  if (!dropArea || !fileInput) return;

  ['dragenter', 'dragover'].forEach((eventName) => {
    dropArea.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropArea.classList.add('active');
    });
  });

  ['dragleave', 'drop'].forEach((eventName) => {
    dropArea.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropArea.classList.remove('active');
    });
  });

  dropArea.addEventListener('drop', (event) => {
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  });

  dropArea.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFile(file);
    }
  });

  if (removeButton) {
    removeButton.addEventListener('click', () => {
      const previewPanel = document.getElementById('previewPanel');
      const previewImage = document.getElementById('previewImage');
      const previewName = document.getElementById('previewName');
      const input = document.getElementById('skinInput');
      input.value = '';
      previewImage.src = '';
      previewName.textContent = '';
      previewPanel.classList.add('d-none');
      hideQualityWarning();
      hideToast();
      document.getElementById('dropMessage').textContent = 'Drag & drop your image here or click to browse';
    });
  }

  if (analyzeForm) {
    analyzeForm.addEventListener('submit', (event) => {
      const file = fileInput.files[0];
      if (!file) {
        event.preventDefault();
        showToast('Please upload an image before analyzing.');
        return;
      }
      analyzeButton.classList.add('loading');
      analyzeButton.querySelector('.button-text').textContent = 'Analyzing';
      analyzeButton.querySelector('.spinner-border').classList.remove('d-none');
    });
  }
}

function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach((counter) => {
    const targetText = counter.textContent.trim();
    const target = parseInt(targetText.replace(/[^0-9]/g, ''), 10) || 0;
    let count = 0;
    const duration = 1200;
    const step = Math.ceil(target / (duration / 16));
    const interval = setInterval(() => {
      count += step;
      if (count >= target) {
        counter.textContent = targetText;
        clearInterval(interval);
      } else {
        counter.textContent = `${count}${targetText.includes('%') ? '%' : ''}`;
      }
    }, 16);
  });
}

function setResultPage() {
  if (typeof pageData === 'undefined' || !pageData.disease) return;
  const title = document.getElementById('predictionTitle');
  const riskBadge = document.getElementById('riskBadge');
  const suggestionText = document.getElementById('suggestionText');
  const precautionText = document.getElementById('precautionText');
  const routineText = document.getElementById('routineText');
  const dietText = document.getElementById('dietText');
  const lifestyleText = document.getElementById('lifestyleText');
  const confidenceValue = document.getElementById('confidenceValue');
  const meterArc = document.getElementById('meterArc');
  const resultImage = document.getElementById('resultImage');

  const diseaseName = pageData.disease || 'Unknown condition';
  title.textContent = diseaseName;
  if (resultImage && pageData.imagePath) {
    resultImage.src = pageData.imagePath;
  }

  let confidence = parseFloat(pageData.confidence) || 0;
  if (confidence <= 1) {
    confidence = Math.round(confidence * 100);
  }
  confidence = Math.min(100, Math.max(0, confidence));
  confidenceValue.textContent = `${confidence}%`;

  const mapping = diseaseMapping[diseaseName] || {
    risk: 'Medium',
    color: 'yellow',
    suggestion: 'Review the result with a healthcare provider.',
    diet: 'Eat balanced meals and drink more water.',
    lifestyle: 'Keep the skin clean and avoid harsh products.',
    precaution: 'Check for any changes and preserve skin health.',
    routine: 'Use gentle, non-irritating care habits.'
  };

  riskBadge.textContent = `${mapping.risk} Risk`;
  riskBadge.style.background = mapping.color === 'red' ? 'rgba(239, 68, 68, 0.16)' : mapping.color === 'yellow' ? 'rgba(234, 179, 8, 0.16)' : 'rgba(34, 197, 94, 0.16)';
  riskBadge.style.color = mapping.color === 'red' ? '#ef4444' : mapping.color === 'yellow' ? '#f59e0b' : '#22c55e';

  suggestionText.textContent = mapping.suggestion;
  precautionText.textContent = mapping.precaution;
  routineText.textContent = mapping.routine;
  dietText.textContent = mapping.diet;
  lifestyleText.textContent = mapping.lifestyle;

  const circumference = 566;
  const offset = circumference - (confidence / 100) * circumference;
  if (meterArc) {
    meterArc.style.strokeDashoffset = offset.toString();
  }
}

function buildHistoryFilters() {
  const searchInput = document.getElementById('historySearch');
  const diseaseSelect = document.getElementById('filterDisease');
  const riskSelect = document.getElementById('filterRisk');
  const sortSelect = document.getElementById('sortHistory');
  const rows = Array.from(document.querySelectorAll('#historyTableBody tr'));

  function filterRows() {
    const searchValue = searchInput.value.toLowerCase();
    const diseaseValue = diseaseSelect.value;
    const riskValue = riskSelect.value;
    const sortValue = sortSelect.value;

    const activeRows = rows.filter((row) => {
      const disease = row.dataset.disease?.toLowerCase() || '';
      const risk = row.dataset.risk || '';
      const confidence = row.dataset.confidence || '';
      const date = row.dataset.date?.toLowerCase() || '';
      const matchesSearch = [disease, risk, confidence, date].some((text) => text.includes(searchValue));
      const matchesDisease = diseaseValue === 'all' || disease === diseaseValue.toLowerCase();
      const matchesRisk = riskValue === 'all' || risk === riskValue;
      return matchesSearch && matchesDisease && matchesRisk;
    });

    activeRows.forEach((row) => row.classList.remove('d-none'));
    rows.filter((row) => !activeRows.includes(row)).forEach((row) => row.classList.add('d-none'));

    const sorted = [...activeRows].sort((a, b) => {
      if (sortValue === 'newest') {
        return new Date(b.dataset.date) - new Date(a.dataset.date);
      }
      if (sortValue === 'oldest') {
        return new Date(a.dataset.date) - new Date(b.dataset.date);
      }
      if (sortValue === 'confidence-desc') {
        return parseFloat(b.dataset.confidence) - parseFloat(a.dataset.confidence);
      }
      if (sortValue === 'confidence-asc') {
        return parseFloat(a.dataset.confidence) - parseFloat(b.dataset.confidence);
      }
      return 0;
    });

    const tbody = document.getElementById('historyTableBody');
    sorted.forEach((row) => tbody.appendChild(row));
  }

  [searchInput, diseaseSelect, riskSelect, sortSelect].forEach((control) => {
    if (control) {
      control.addEventListener('input', filterRows);
      control.addEventListener('change', filterRows);
    }
  });
}

function initAnimations() {
  if (window.gsap) {
    gsap.from('.hero-section .hero-content', { y: 60, opacity: 0, duration: 1.2, ease: 'power3.out' });
    gsap.from('.glass-panel', { y: 30, opacity: 0, duration: 1.2, ease: 'power3.out', stagger: 0.12 });
  }
  if (window.AOS) {
    AOS.init({ once: true, duration: 900, easing: 'ease-out-cubic' });
  }
}

function hidePageLoader() {
  const loader = document.getElementById('pageLoader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  applyTheme(getCurrentTheme());
  loadLanguage();
  const themeButtons = document.querySelectorAll('#themeToggle');
  themeButtons.forEach((btn) => btn.addEventListener('click', () => applyTheme(getCurrentTheme() === 'dark' ? 'light' : 'dark')));
  const languageSelectors = document.querySelectorAll('#languageSelector');
  languageSelectors.forEach((selector) => selector.addEventListener('change', setLanguage));
  initUploadInteraction();
  animateCounters();
  setResultPage();
  buildHistoryFilters();
  initAnimations();
});

window.addEventListener('load', hidePageLoader);
