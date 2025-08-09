// Remove the hardcoded cities array and load it dynamically
let cities = [];
const initialLang = localStorage.getItem('preferred_language') || 'ar';

async function loadCitiesForLocale(langCode) {
  const candidateUrls = [
    `cities.${langCode}.json`,
    'cities.json'
  ];
  for (const url of candidateUrls) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('not ok');
      const data = await res.json();
      cities = data;
      renderCityGrid(cities);
      renderHeroCityGrid();
      return;
    } catch (_) {
      // try next
    }
  }
}

// Sample hotels and guides data
const hotelsData = {
  "جدة": [
    { name: "فندق جدة هيلتون", rating: 4.7, url: "https://www3.hilton.com/en/hotels/saudi-arabia/jeddah-hilton-hotel-JEDHITW/index.html", address: "طريق الكورنيش، جدة", phone: "0126590000", desc: "فندق فاخر مطل على البحر الأحمر مع مرافق راقية." },
    { name: "فندق راديسون بلو", rating: 4.5, url: "https://www.radissonhotels.com/en-us/hotels/radisson-blu-jeddah", address: "طريق المدينة، جدة", phone: "0126521234", desc: "فندق عصري في قلب جدة مع خدمات ممتازة." }
  ],
  "مكة المكرمة": [
    { name: "فندق ساعة مكة فيرمونت", rating: 4.8, url: "https://www.fairmont.com/makkah/", address: "وقف الملك عبدالعزيز، مكة", phone: "0125717777", desc: "فندق فاخر بجوار الحرم المكي الشريف." },
    { name: "فندق أبراج البيت", rating: 4.6, url: "https://www.alfajrhotels.com/", address: "شارع أجياد، مكة", phone: "0125779999", desc: "إقامة مريحة وخدمات مميزة للحجاج والمعتمرين." }
  ],
  "الرياض": [
    { name: "فندق الريتز كارلتون", rating: 4.9, url: "https://www.ritzcarlton.com/en/hotels/saudi-arabia/riyadh", address: "طريق مكة، الرياض", phone: "0118028028", desc: "فندق خمس نجوم في قلب العاصمة." },
    { name: "فندق فورسيزونز الرياض", rating: 4.7, url: "https://www.fourseasons.com/riyadh/", address: "برج المملكة، الرياض", phone: "0112115000", desc: "إطلالة رائعة وخدمات فاخرة في برج المملكة." }
  ],
  "الخبر": [
    { name: "فندق المريديان الخبر", rating: 4.6, url: "https://www.marriott.com/en-us/hotels/dhalk-le-meridien-al-khobar/overview/", address: "شارع الكورنيش، الخبر", phone: "0138969000", desc: "موقع مميز على الكورنيش وخدمات راقية." },
    { name: "فندق سوفيتل الخبر الكورنيش", rating: 4.5, url: "https://all.accor.com/hotel/6808/index.en.shtml", address: "طريق الكورنيش، الخبر", phone: "0138811111", desc: "فندق أنيق مع إطلالة بحرية رائعة." }
  ],
  "العلا": [
    { name: "فندق شادن العلا", rating: 4.8, url: "https://shadenresort.com/", address: "العلا الجديدة، العلا", phone: "0148840000", desc: "منتجع فاخر وسط الطبيعة الخلابة." },
    { name: "منتجع العلا الصحراوي", rating: 4.7, url: "https://www.booking.com/hotel/sa/alula-desert-resort.html", address: "طريق العلا الصحراوي", phone: "0148855555", desc: "تجربة إقامة فريدة في الصحراء." }
  ],
  "الدمام": [
    { name: "فندق شيراتون الدمام", rating: 4.6, url: "https://www.marriott.com/hotels/travel/dmmdx-sheraton-dammam-hotel-and-convention-center/", address: "طريق الملك فهد، الدمام", phone: "0138345555", desc: "فندق فاخر مع مركز مؤتمرات متكامل." },
    { name: "فندق نوفوتيل الدمام", rating: 4.5, url: "https://all.accor.com/hotel/6809/index.en.shtml", address: "طريق الملك عبدالله، الدمام", phone: "0138340000", desc: "فندق عصري مع خدمات مميزة." }
  ],
  "الطائف": [
    { name: "فندق إنتركونتيننتال الطائف", rating: 4.7, url: "https://www.ihg.com/intercontinental/hotels/us/en/taif/tifha/hoteldetail", address: "طريق الملك فيصل، الطائف", phone: "0127320000", desc: "فندق فاخر في قلب الطائف." },
    { name: "فندق هوليدي إن الطائف", rating: 4.5, url: "https://www.ihg.com/holidayinn/hotels/us/en/taif/tifhi/hoteldetail", address: "طريق الملك خالد، الطائف", phone: "0127321111", desc: "إقامة مريحة مع خدمات ممتازة." }
  ],
  "أبها": [
    { name: "فندق قصر أبها", rating: 4.8, url: "https://www.ihg.com/crowneplaza/hotels/us/en/abha/ahahc/hoteldetail", address: "طريق الملك عبدالله، أبها", phone: "0172277777", desc: "فندق فاخر مع إطلالة على جبال عسير." },
    { name: "فندق هيلتون جاردن إن أبها", rating: 4.6, url: "https://www.hilton.com/en/hotels/ahahigi-hilton-garden-inn-abha/", address: "طريق الملك فهد، أبها", phone: "0172270000", desc: "فندق عصري مع خدمات راقية." }
  ],
  "ينبع": [
    { name: "فندق موفنبيك ينبع", rating: 4.7, url: "https://www.movenpick.com/en/middle-east/saudi-arabia/yanbu/", address: "طريق الكورنيش، ينبع", phone: "0143220000", desc: "فندق فاخر مطل على البحر الأحمر." },
    { name: "فندق راديسون بلو ينبع", rating: 4.5, url: "https://www.radissonhotels.com/en-us/hotels/radisson-blu-yanbu", address: "طريق الملك فهد، ينبع", phone: "0143221111", desc: "فندق أنيق مع خدمات مميزة." }
  ],
  "تبوك": [
    { name: "فندق هيلتون جاردن إن تبوك", rating: 4.6, url: "https://www.hilton.com/en/hotels/tuuhtgi-hilton-garden-inn-tabuk/", address: "طريق الملك خالد، تبوك", phone: "0144220000", desc: "فندق عصري مع خدمات راقية." },
    { name: "فندق نوفوتيل تبوك", rating: 4.5, url: "https://all.accor.com/hotel/6810/index.en.shtml", address: "طريق الملك فهد، تبوك", phone: "0144221111", desc: "إقامة مريحة مع خدمات ممتازة." }
  ],
  "حائل": [
    { name: "فندق هيلتون جاردن إن حائل", rating: 4.7, url: "https://www.hilton.com/en/hotels/hashtgi-hilton-garden-inn-hail/", address: "طريق الملك عبدالله، حائل", phone: "0165320000", desc: "فندق فاخر في قلب حائل." },
    { name: "فندق موفنبيك حائل", rating: 4.6, url: "https://www.movenpick.com/en/middle-east/saudi-arabia/hail/", address: "طريق الملك فهد، حائل", phone: "0165321111", desc: "فندق أنيق مع خدمات مميزة." }
  ],
  "نجران": [
    { name: "فندق هيلتون جاردن إن نجران", rating: 4.6, url: "https://www.hilton.com/en/hotels/elhtgi-hilton-garden-inn-najran/", address: "طريق الملك عبدالله، نجران", phone: "0175220000", desc: "فندق عصري مع خدمات راقية." },
    { name: "فندق نوفوتيل نجران", rating: 4.5, url: "https://all.accor.com/hotel/6811/index.en.shtml", address: "طريق الملك فهد، نجران", phone: "0175221111", desc: "إقامة مريحة مع خدمات مميزة." }
  ],
  "جازان": [
    { name: "فندق هيلتون جاردن إن جازان", rating: 4.7, url: "https://www.hilton.com/en/hotels/jzntgi-hilton-garden-inn-jazan/", address: "طريق الملك عبدالله، جازان", phone: "0173220000", desc: "فندق فاخر في قلب جازان." },
    { name: "فندق موفنبيك جازان", rating: 4.6, url: "https://www.movenpick.com/en/middle-east/saudi-arabia/jazan/", address: "طريق الملك فهد، جازان", phone: "0173221111", desc: "فندق أنيق مع خدمات مميزة." }
  ],
  "الباحة": [
    { name: "فندق هيلتون جاردن إن الباحة", rating: 4.8, url: "https://www.hilton.com/en/hotels/bahtgi-hilton-garden-inn-al-baha/", address: "طريق الملك عبدالله، الباحة", phone: "0177270000", desc: "فندق فاخر مع إطلالة على جبال الباحة." },
    { name: "فندق نوفوتيل الباحة", rating: 4.7, url: "https://all.accor.com/hotel/6812/index.en.shtml", address: "طريق الملك فهد، الباحة", phone: "0177271111", desc: "إقامة مريحة مع خدمات مميزة." }
  ],
  "عرعر": [
    { name: "فندق هيلتون جاردن إن عرعر", rating: 4.6, url: "https://www.hilton.com/en/hotels/arhtgi-hilton-garden-inn-arar/", address: "طريق الملك عبدالله، عرعر", phone: "0166220000", desc: "فندق عصري مع خدمات راقية." },
    { name: "فندق موفنبيك عرعر", rating: 4.5, url: "https://www.movenpick.com/en/middle-east/saudi-arabia/arar/", address: "طريق الملك فهد، عرعر", phone: "0166221111", desc: "فندق أنيق مع خدمات مميزة." }
  ]
};

const guidesData = {
  "جدة": [
    { name: "أحمد السلمي", rating: 4.9, phone: "0551234567", desc: "مرشد سياحي خبير في معالم جدة التاريخية." },
    { name: "سارة باوزير", rating: 4.8, phone: "0559876543", desc: "متخصصة في الجولات الثقافية والفنية." }
  ],
  "مكة المكرمة": [
    { name: "محمد القرني", rating: 4.9, phone: "0551112222", desc: "خبرة واسعة في الإرشاد الديني والتاريخي." },
    { name: "خالد الحربي", rating: 4.7, phone: "0553334444", desc: "جولات مميزة للحجاج والمعتمرين." }
  ],
  "الرياض": [
    { name: "نورة العتيبي", rating: 4.8, phone: "0555556666", desc: "مرشدة سياحية متخصصة في معالم الرياض الحديثة." },
    { name: "عبدالله الدوسري", rating: 4.7, phone: "0557778888", desc: "جولات تاريخية وثقافية في العاصمة." }
  ],
  "الخبر": [
    { name: "ليلى الشمري", rating: 4.8, phone: "0559990000", desc: "جولات بحرية وثقافية في الخبر والمنطقة الشرقية." },
    { name: "سلمان التركي", rating: 4.6, phone: "0552223333", desc: "مرشد سياحي بخبرة واسعة في المنطقة." }
  ],
  "العلا": [
    { name: "سلمان العلاوي", rating: 4.9, phone: "0554445555", desc: "متخصص في جولات العلا الأثرية والطبيعية." },
    { name: "ريم المطيري", rating: 4.8, phone: "0556667777", desc: "جولات مميزة في المواقع التاريخية والطبيعية." }
  ],
  "الدمام": [
    { name: "عبدالله الشمري", rating: 4.7, phone: "0558889999", desc: "خبير في معالم الدمام الحديثة والتاريخية." },
    { name: "نورة الخالدي", rating: 4.6, phone: "0550001111", desc: "متخصصة في الجولات الثقافية والتسوق." }
  ],
  "الطائف": [
    { name: "محمد الطائفي", rating: 4.8, phone: "0552223333", desc: "خبير في معالم الطائف التاريخية والطبيعية." },
    { name: "سارة العتيبي", rating: 4.7, phone: "0554445555", desc: "متخصصة في جولات الورود والمنتزهات." }
  ],
  "أبها": [
    { name: "عبدالله العسيري", rating: 4.9, phone: "0556667777", desc: "خبير في معالم أبها الطبيعية والثقافية." },
    { name: "نورة الشهري", rating: 4.8, phone: "0558889999", desc: "متخصصة في جولات القرى التراثية." }
  ],
  "ينبع": [
    { name: "سلمان الينبعاوي", rating: 4.7, phone: "0550001111", desc: "خبير في معالم ينبع البحرية والتاريخية." },
    { name: "ليلى الحازمي", rating: 4.6, phone: "0552223333", desc: "متخصصة في الجولات البحرية والترفيهية." }
  ],
  "تبوك": [
    { name: "محمد التبوكي", rating: 4.8, phone: "0554445555", desc: "خبير في معالم تبوك التاريخية والطبيعية." },
    { name: "سارة الحربي", rating: 4.7, phone: "0556667777", desc: "متخصصة في جولات المواقع الأثرية." }
  ],
  "حائل": [
    { name: "عبدالله الحائلي", rating: 4.9, phone: "0558889999", desc: "خبير في معالم حائل التاريخية والثقافية." },
    { name: "نورة الشمري", rating: 4.8, phone: "0550001111", desc: "متخصصة في جولات القرى التراثية." }
  ],
  "نجران": [
    { name: "سلمان النجراني", rating: 4.7, phone: "0552223333", desc: "خبير في معالم نجران التاريخية والثقافية." },
    { name: "ليلى اليامي", rating: 4.6, phone: "0554445555", desc: "متخصصة في جولات القرى التراثية." }
  ],
  "جازان": [
    { name: "محمد الجازاني", rating: 4.8, phone: "0556667777", desc: "خبير في معالم جازان الطبيعية والثقافية." },
    { name: "سارة المالكي", rating: 4.7, phone: "0558889999", desc: "متخصصة في جولات الجزر والشواطئ." }
  ],
  "الباحة": [
    { name: "عبدالله الباحي", rating: 4.9, phone: "0550001111", desc: "خبير في معالم الباحة الطبيعية والثقافية." },
    { name: "نورة الغامدي", rating: 4.8, phone: "0552223333", desc: "متخصصة في جولات المنتزهات والغابات." }
  ],
  "عرعر": [
    { name: "سلمان العراري", rating: 4.7, phone: "0554445555", desc: "خبير في معالم عرعر التاريخية والثقافية." },
    { name: "ليلى الشمري", rating: 4.6, phone: "0556667777", desc: "متخصصة في جولات المواقع التراثية." }
  ]
};

// Add tourism types data
const tourismTypes = {
  "جدة": {
    types: ["سياحة بحرية", "سياحة تراثية", "سياحة تسوق"],
    description: "تتميز جدة بتنوع سياحي فريد، حيث تجمع بين السياحة البحرية على شواطئ البحر الأحمر، والسياحة التراثية في منطقة البلد التاريخية، وتجربة التسوق العصرية في مراكز التسوق الحديثة."
  },
  "مكة المكرمة": {
    types: ["سياحة دينية", "سياحة تراثية", "سياحة ثقافية"],
    description: "مكة المكرمة وجهة للسياحة الدينية والروحانية، مع مواقع تاريخية وتراثية هامة تعكس تاريخ الإسلام والحضارة الإسلامية."
  },
  "الرياض": {
    types: ["سياحة حضرية", "سياحة تراثية", "سياحة تسوق", "سياحة صحراوية"],
    description: "تجمع الرياض بين الحداثة والتراث، مع مزيج من المعالم التاريخية والمباني الشاهقة، والأسواق التقليدية والمجمعات العصرية."
  },
  "الخبر": {
    types: ["سياحة بحرية", "سياحة عائلية", "سياحة تسوق"],
    description: "تتميز الخبر بواجهتها البحرية الجميلة، والمرافق الترفيهية العائلية، ومراكز التسوق الحديثة."
  },
  "العلا": {
    types: ["سياحة تراثية", "سياحة صحراوية", "سياحة مغامرات"],
    description: "العلا متحف مفتوح للتاريخ والطبيعة، تقدم تجارب فريدة في المواقع الأثرية والمناظر الطبيعية الخلابة."
  }
};

function renderCityGrid(cityList) {
  const grid = document.getElementById('cityGrid');
  if (!grid) return;
  grid.innerHTML = cityList.map(city => `
    <div class="city-card-container">
      <div class="city-card" data-city="${city.name}">
        <img class="city-card-img" src="${city.image || 'image/default-city.jpg'}" alt="${city.name}">
      </div>
      <div class="city-card-title">${city.name}</div>
    </div>
  `).join('');
}

// Load cities data for current language on load
loadCitiesForLocale(initialLang);

document.addEventListener('DOMContentLoaded', () => {
  const cityGridSection = document.getElementById('cityGridSection');
  const btn = document.querySelector('.start-journey-btn');
  const heroSection = document.querySelector('.hero-image-section');
  if (cityGridSection) cityGridSection.classList.remove('visible');
  if (btn && cityGridSection) {
    btn.style.display = 'block';
    btn.onclick = () => {
      btn.style.display = 'none';
      cityGridSection.classList.add('visible');
      if (heroSection) heroSection.classList.add('hide-hero-titles');
      renderCityGrid(cities);
    };
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const showCitiesBtn = document.getElementById('showCitiesBtn');
  const cityGridSection = document.getElementById('cityGridSection');
  if (showCitiesBtn && cityGridSection) {
    showCitiesBtn.addEventListener('click', function() {
      showCitiesBtn.style.display = 'none';
      cityGridSection.style.display = 'block';
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const revealCitiesBtn = document.getElementById('revealCitiesBtn');
  const heroCityGrid = document.getElementById('heroCityGrid');
  const heroContent = document.querySelector('.hero-content');
  if (revealCitiesBtn && heroCityGrid && heroContent) {
    revealCitiesBtn.addEventListener('click', function() {
      // Hide hero text and buttons
      const h1 = heroContent.querySelector('h1');
      const p = heroContent.querySelector('p');
      const heroButtons = heroContent.querySelector('.hero-buttons');
      if (h1) h1.style.display = 'none';
      if (p) p.style.display = 'none';
      if (heroButtons) heroButtons.style.display = 'none';
      // Instantly hide the button
      revealCitiesBtn.style.display = 'none';
      heroCityGrid.style.display = 'block';
      setTimeout(() => {
        heroCityGrid.classList.add('active');
      }, 10);
      // Render city cards in hero section using loaded cities
      renderHeroCityGrid();
    });
  }
});

// Language dropdown behavior and persistence
document.addEventListener('DOMContentLoaded', function() {
  const languageToggle = document.getElementById('languageToggle');
  const languageMenu = document.getElementById('languageMenu');
  const languageOptions = document.querySelectorAll('.language-option');

  if (!languageToggle || !languageMenu) return;

  // Restore saved language selection, if any
  const savedLang = localStorage.getItem('preferred_language');
  if (savedLang) {
    const labelMap = { en: 'English', fr: 'Français', zh: '中文', hi: 'हिन्दी', id: 'Bahasa Indonesia' };
    languageToggle.textContent = labelMap[savedLang] || 'اللغة';
  }

  // Toggle open/close
  languageToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    const isOpen = languageMenu.classList.toggle('open');
    languageToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Option click
  languageOptions.forEach(opt => {
    opt.addEventListener('click', function(e) {
      e.stopPropagation();
      const lang = this.getAttribute('data-lang');
      const text = this.textContent.trim();
      languageToggle.textContent = text;
      localStorage.setItem('preferred_language', lang);
      languageMenu.classList.remove('open');
      languageToggle.setAttribute('aria-expanded', 'false');
      // Placeholder: trigger translation logic hook
      document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    });
  });

  // Close on click outside or Escape
  document.addEventListener('click', function(e) {
    if (!languageMenu.classList.contains('open')) return;
    const within = languageMenu.contains(e.target) || languageToggle.contains(e.target);
    if (!within) {
      languageMenu.classList.remove('open');
      languageToggle.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && languageMenu.classList.contains('open')) {
      languageMenu.classList.remove('open');
      languageToggle.setAttribute('aria-expanded', 'false');
      languageToggle.focus();
    }
  });
});

// Add weather fetching function
async function fetchWeather(cityName) {
  const apiKey = 'YOUR_API_KEY_HERE';
  const savedLang = localStorage.getItem('preferred_language') || 'ar';
  const owLangMap = { ar: 'ar', en: 'en', fr: 'fr', zh: 'zh_cn', hi: 'hi', id: 'id' };
  const owLang = owLangMap[savedLang] || 'ar';
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},sa&appid=${apiKey}&units=metric&lang=${owLang}`);
    const data = await response.json();
    return {
      temp: Math.round(data.main?.temp ?? 0),
      description: (data.weather && data.weather[0]?.description) || '',
      icon: (data.weather && data.weather[0]?.icon) || '01d'
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
}

// Update the renderCityDetails function
function renderCityDetails(cityName) {
  const detailsContainer = document.getElementById('cityDetailsHero');
  if (!detailsContainer) return;
  
  const normalize = str => (str || '').trim().replace(/\s+/g, '');
  const city = cities.find(c => normalize(c.name) === normalize(cityName));
  
  const hotels = hotelsData[cityName] || [];
  const guides = guidesData[cityName] || [];
  const tourism = tourismTypes[cityName] || { types: [], description: "" };
  const currentLang = localStorage.getItem('preferred_language') || 'ar';
  const dict = i18nDictionaries[currentLang] || i18nDictionaries.ar;
  const eventText = (city && city.event && city.event.trim()) ? city.event : dict.city.noEvents;
  
  // Create weather element
  const weatherElement = document.createElement('div');
  weatherElement.className = 'weather-info';
  weatherElement.innerHTML = `<div class="loading-weather">${dict.city.weatherLoading}</div>`;
  
  detailsContainer.innerHTML = `
    <div class="city-details-box">
      <div class="city-event-section">
        <h3>${dict.city.info}</h3>
        <p><b>${dict.city.city}:</b> ${cityName}</p>
        <div class="weather-container"></div>
        <div class="tourism-types">
          <p><b>${dict.city.tourismTypes}</b></p>
          <div class="tourism-tags">
            ${tourism.types.map(type => `<span class="tourism-tag">${type}</span>`).join('')}
          </div>
          <p class="tourism-description">${tourism.description || ''}</p>
        </div>
        <p><b>${dict.city.currentEvent}</b> ${eventText}</p>
        <a href="city-details.html?city=${encodeURIComponent(cityName)}" class="show-more-btn">${dict.city.showMore}</a>
      </div>
      <div class="city-hotels-section">
        <h3>${dict.city.bestHotels(cityName)}</h3>
        <ul>
          ${hotels.slice(0, 1).map(hotel => `
            <li>
              <div><b>${hotel.name}</b> <span>⭐${hotel.rating}</span></div>
              <div class="hotel-desc">${hotel.desc || ''}</div>
              <div class="hotel-meta">📍 ${hotel.address || ''} | ☎️ ${hotel.phone || ''}</div>
              <a href="${hotel.url || 'https://www.example.com'}" target="_blank" class="hotel-website-btn">${dict.city.visitSite}</a>
            </li>
          `).join('')}
        </ul>
      </div>
      <div class="city-guides-section">
        <h3>${dict.city.bestGuides(cityName)}</h3>
        <ul>
          ${guides.slice(0, 1).map(guide => `
            <li>
              <div><b>${guide.name}</b> <span>⭐${guide.rating}</span></div>
              <div class="guide-desc">${guide.desc || ''}</div>
              <div class="guide-meta">☎️ ${guide.phone || ''}</div>
              <a href="https://wa.me/${guide.phone ? guide.phone.replace(/[^\d]/g, '') : ''}" target="_blank" class="guide-book-btn">${dict.city.bookNow}</a>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;

  // Add weather container to the DOM
  const weatherContainer = detailsContainer.querySelector('.weather-container');
  weatherContainer.appendChild(weatherElement);

  // Fetch and update weather
  fetchWeather(cityName).then(weather => {
    if (weather) {
      weatherElement.innerHTML = `
        <div class="weather-data">
          <img src="http://openweathermap.org/img/w/${weather.icon}.png" alt="حالة الطقس">
          <span class="temp">${weather.temp}°C</span>
          <span class="desc">${weather.description}</span>
        </div>
      `;
    } else {
      weatherElement.innerHTML = `<div class="weather-error">${dict.city.weatherError}</div>`;
    }
  });
  
  // Add active class to show the details with animation
  detailsContainer.classList.add('active');
}

// Patch the city grid rendering to enable clicks
const oldRender = document.getElementById('revealCitiesBtn')?.onclick;
function enableHeroCityCardClicks() {
  const grid = document.getElementById('cityGridHero');
  if (!grid) return;
  grid.querySelectorAll('.city-card').forEach(card => {
    card.onclick = function() {
      const cityName = card.getAttribute('data-city');
      renderCityDetails(cityName);
    };
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const revealCitiesBtn = document.getElementById('revealCitiesBtn');
  if (revealCitiesBtn) {
    const oldHandler = revealCitiesBtn.onclick;
    revealCitiesBtn.onclick = function(e) {
      if (oldHandler) oldHandler.call(this, e);
      // Only enable clicks after cities are loaded
      if (cities && cities.length > 0) {
        enableHeroCityCardClicks();
      }
    };
  }
});

// Update hero city grid rendering to use loaded cities
function renderHeroCityGrid() {
  const grid = document.getElementById('cityGridHero');
  if (!grid) return;
  grid.innerHTML = cities.map(city => `
    <div class="city-card-container">
      <div class="city-card" data-city="${city.name}">
        <img class="city-card-img" src="${city.image || 'image/default-city.jpg'}" alt="${city.name}">
      </div>
      <div class="city-card-title">${city.name}</div>
    </div>
  `).join('');

  // Add click event listeners to city cards
  const cityCards = grid.querySelectorAll('.city-card');
  cityCards.forEach(card => {
    card.addEventListener('click', function() {
      const cityName = this.getAttribute('data-city');
      const detailsContainer = document.getElementById('cityDetailsHero');
      // Remove active class from all cards
      cityCards.forEach(c => c.classList.remove('active'));
      // Add active class to clicked card
      this.classList.add('active');
      // Show details for the clicked city
      renderCityDetails(cityName);
    });
  });
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    if (themeIcon) {
      themeIcon.classList.toggle('fa-moon');
      themeIcon.classList.toggle('fa-sun');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const headerNav = document.querySelector('.header-nav');

const menuOverlay = document.querySelector('.menu-overlay');

if (mobileMenuToggle && headerNav) {
  // Signal to other scripts that menu handling is already bound
  window.__menuManaged = true;
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    headerNav.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    if (menuOverlay) menuOverlay.classList.toggle('active');
  });

  if (menuOverlay) {
    menuOverlay.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      headerNav.classList.remove('active');
      document.body.classList.remove('menu-open');
      menuOverlay.classList.remove('active');
    });
  }

  document.addEventListener('click', (e) => {
    if (!headerNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      mobileMenuToggle.classList.remove('active');
      headerNav.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
}

// Close menu when clicking on a link
const headerLinks = document.querySelectorAll('.header-link');
if (mobileMenuToggle && headerNav) {
  headerLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      headerNav.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
}

// -----------------------
// Simple i18n subsystem
// -----------------------
const i18nDictionaries = {
  ar: {
    direction: 'rtl',
    locale: 'ar',
    nav: {
      home: 'الرئيسية',
      problems: 'التحديات',
      presentation: 'العرض التقديمي',
      features: 'الحلول',
      prayer: 'أوقات الصلاة',
      gallery: 'من نخدم',
      famous: 'المناطق المشهورة',
      contact: 'تواصل معنا'
    },
    schedule: {
      headerTitle: 'جدول رحلتك إلى المدينة المنورة',
      headerSubtitle: 'خطط رحلتك الروحانية إلى المدينة المنورة واكتشف أجمل معالمها التاريخية والدينية',
      formTitle: 'معلومات الرحلة',
      start: 'ابدأ جدولة رحلتي',
      generating: 'جاري إنشاء جدول رحلتك المخصص...',
      save: '💾 حفظ الجدول',
      print: '🖨️ طباعة الجدول',
      backHome: '🏠 العودة للرئيسية',
      landmarks: {
        title: 'اختر المعالم التي تريد زيارتها',
        cards: {
          masjidNabawi: { title: 'المسجد النبوي الشريف', desc: 'أحد أقدس المساجد في الإسلام، حيث صلى النبي ﷺ ودفن فيه' },
          qubaMosque: { title: 'مسجد قباء', desc: 'أول مسجد بني في الإسلام، يقع جنوب المدينة المنورة' },
          mountUhud: { title: 'جبل أحد', desc: 'موقع معركة أحد التاريخية، يقع شمال المدينة المنورة' },
          qiblataynMosque: { title: 'مسجد القبلتين', desc: 'المسجد الذي صلى فيه النبي ﷺ نحو القبلتين' },
          alBaqi: { title: 'مقبرة البقيع', desc: 'مقبرة تاريخية تضم رفات العديد من الصحابة' },
          propheticPath: { title: 'المسار النبوي', desc: 'المسار الذي سلكه النبي ﷺ من المدينة إلى قباء' }
        }
      },
      tourGuide: {
        title: 'مرشد المدينة المنورة السياحي',
        subtitle: 'اكتشف المدينة المنورة مع مرشد سياحي محترف ومتخصص في التاريخ الإسلامي',
        features: {
          expertise: { title: 'خبرة متخصصة', desc: 'مرشدون معتمدون من الهيئة العامة للسياحة والتراث الوطني، متخصصون في التاريخ الإسلامي والمدينة المنورة', badge: 'معتمد رسمياً' },
          languages: { title: 'لغات متعددة', desc: 'مرشدون يتحدثون العربية والإنجليزية والفرنسية والأردية والتركية والماليزية لخدمة جميع الزوار', badge: '6 لغات' },
          booking: { title: 'حجز إلكتروني', desc: 'احجز مرشدك السياحي بسهولة عبر التطبيق أو الموقع الإلكتروني مع تأكيد فوري', badge: 'حجز فوري' },
          transport: { title: 'تنقل مريح', desc: 'سيارات مكيفة ومريحة مع سائق محترف لنقلك بين جميع المعالم السياحية', badge: 'سيارة خاصة' },
          flexible: { title: 'جولات مرنة', desc: 'جولات صباحية ومسائية وجولات خاصة حسب رغبتك وميزانيتك', badge: 'مرونة كاملة' },
          photography: { title: 'تصوير احترافي', desc: 'خدمة تصوير احترافية لتوثيق رحلتك مع صور عالية الجودة', badge: 'صور احترافية' }
        },
        pricing: {
          title: 'أسعار المرشدين السياحيين',
          popular: 'الأكثر طلباً',
          bookNow: 'احجز الآن',
          features: {
            guide: '✅ مرشد متخصص',
            visit34: '✅ زيارة 3-4 معالم',
            explanation: '✅ شرح تفصيلي',
            photos: '✅ صور تذكارية',
            visit68: '✅ زيارة 6-8 معالم',
            lunch: '✅ وجبة غداء',
            transport: '✅ تنقل مريح',
            professionalPhotos: '✅ صور احترافية',
            privateGuide: '✅ مرشد خاص',
            customItinerary: '✅ جدول مخصص',
            privateCar: '✅ سيارة خاصة',
            premiumMeals: '✅ وجبات فاخرة'
          },
          packages: {
            halfDay: { title: 'جولة نصف يوم', price: '150 ريال' },
            fullDay: { title: 'جولة يوم كامل', price: '300 ريال' },
            private: { title: 'جولة خاصة', price: '500 ريال' }
          }
        }
      },
      preview: {
        title: 'جدول رحلتك المقترح',
        day1: {
          header: 'اليوم الأول - الوصول والاستقرار',
          activities: [
            { title: 'الوصول إلى المدينة المنورة', desc: 'الوصول إلى الفندق وتسجيل الدخول والراحة' },
            { title: 'زيارة المسجد النبوي الشريف', desc: 'الصلاة في المسجد النبوي وزيارة الروضة المباركة' },
            { title: 'العشاء في المطاعم المحلية', desc: 'تذوق المأكولات المحلية التقليدية' }
          ]
        },
        day2: {
          header: 'اليوم الثاني - المعالم التاريخية',
          activities: [
            { title: 'الفطور في الفندق', desc: 'بداية اليوم بفطور صحي' },
            { title: 'زيارة مسجد قباء', desc: 'أول مسجد بني في الإسلام' },
            { title: 'جولة في المدينة التاريخية', desc: 'استكشاف الأحياء القديمة والأسواق التقليدية' },
            { title: 'الغداء في مطعم محلي', desc: 'تذوق الأطباق المحلية' },
            { title: 'زيارة مسجد القبلتين', desc: 'المسجد الذي صلى فيه النبي ﷺ نحو القبلتين' },
            { title: 'الصلاة في المسجد النبوي', desc: 'الصلاة المغرب والعشاء في المسجد النبوي' }
          ]
        },
        day3: {
          header: 'اليوم الثالث - الطبيعة والتاريخ',
          activities: [
            { title: 'الفطور والاستعداد', desc: 'تحضير للرحلة اليومية' },
            { title: 'زيارة جبل أحد', desc: 'موقع معركة أحد التاريخية والاستمتاع بالمناظر الطبيعية' },
            { title: 'الغداء في المطاعم المحلية', desc: 'تذوق الأطباق المحلية' },
            { title: 'زيارة مقبرة البقيع', desc: 'زيارة المقبرة التاريخية' },
            { title: 'المسار النبوي', desc: 'المشي في المسار الذي سلكه النبي ﷺ' },
            { title: 'الصلاة في المسجد النبوي', desc: 'الصلاة المغرب والعشاء في المسجد النبوي' }
          ]
        }
      },
      form: {
        arrivalDate: { label: 'تاريخ الوصول' },
        departureDate: { label: 'تاريخ المغادرة' },
        peopleCount: { label: 'عدد الأشخاص' },
        accommodation: {
          label: 'نوع الإقامة',
          options: {
            hotel: 'فندق فاخر',
            apartment: 'شقة',
            guesthouse: 'نُزل',
            camping: 'خيام (في المواسم)'
          }
        },
        budget: { label: 'الميزانية التقريبية (بالريال)', placeholder: 'مثال: 5000' },
        regions: {
          label: 'المناطق التي تود زيارتها خارج المدينة المنورة',
          cards: [
            { title: '🏛️ العلا', desc: 'مدائن صالح والآثار النبطية (350 كم - 4 ساعات)' },
            { title: '🌊 ينبع', desc: 'لؤلؤة البحر الأحمر (220 كم - 2.5 ساعة)' },
            { title: '⚔️ بدر', desc: 'موقع غزوة بدر الكبرى (150 كم - 2 ساعة)' },
            { title: '🏰 خيبر', desc: 'واحة خيبر التاريخية (170 كم - 2.5 ساعة)' }
          ]
        },
        interests: { label: 'الاهتمامات الخاصة', placeholder: 'اكتب اهتماماتك الخاصة (مثل: التاريخ الإسلامي، العمارة، الطبيعة، إلخ)' }
      }
    },
    buttons: {
      login: 'تسجيل الدخول',
      darkMode: 'الوضع الليلي'
    },
    hero: {
      title: 'المدينة المنورة',
      subtitle: 'مدينة رسول الله ﷺ',
      description: 'اكتشف المدينة المنورة، ثاني أقدس مدينة في الإسلام، وموطن المسجد النبوي الشريف. استمتع برحلتك الروحانية في هذه المدينة المباركة التي تحتضن تاريخ الإسلام العظيم.',
      start: '🗺️ ابدأ رحلتك',
      download: '📱 تحميل التطبيق'
    },
    city: {
      info: 'معلومات المدينة',
      city: 'المدينة',
      tourismTypes: 'أنواع السياحة:',
      currentEvent: 'الفعالية الحالية:',
      noEvents: 'لا توجد فعاليات حالياً.',
      showMore: 'عرض المزيد من التفاصيل',
      bestHotels: (name) => `أفضل الفنادق في ${name}`,
      bestGuides: (name) => `أفضل المرشدين السياحيين في ${name}`,
      visitSite: 'زيارة الموقع',
      bookNow: 'احجز الآن',
      weatherLoading: 'جاري تحميل معلومات الطقس...',
      weatherError: 'عذراً، لا يمكن تحميل معلومات الطقس حالياً.'
    },
    presentation: {
      title: 'مشروعنا',
      subtitle: 'اكتشف مشروعنا بالتفصيل',
      slide1: {
        title: 'التحديات التي يواجهها الزائر في المدينة المنورة',
        items: [
          'صعوبة إيجاد سكن مرخّص قريب من الخدمات',
          'نقص المعلومات عن الأنشطة السياحية والدينية والثقافية',
          'عدم توفر وسيلة للتواصل الفوري مع خدمات مساندة (مغسلة، بقالة، عامل)',
          'غياب حلول مخصصة للسياحة العلاجية للمرضى والزوار'
        ]
      },
      slide2: {
        title: 'حل متكامل للزوار',
        items: [
          'عرض جميع أماكن الإقامة المرخصة مع خاصية تأكيد الترخيص',
          'تقديم قائمة بالأنشطة (دينية، ثقافية، علاجية) مع الحجز الفوري',
          'ميزة "المواقع القريبة منك" لعرض: مغسلة، بقالة، عامل، خدمات طبية',
          'إرشاد سياحي رقمي مع إمكانية حجز مرشدين معتمدين'
        ]
      },
      slide3: {
        title: 'المدينة المنورة… قلب الضيافة الإسلامية',
        items: [
          'ثاني أقدس مدينة في الإسلام وتستقبل ملايين الحجاج والمعتمرين سنويًا',
          'وجهة متنامية للسياحة العلاجية بفضل مرافقها الطبية المتقدمة',
          'تنوع في المزارات التاريخية والمزارع والأسواق التراثية',
          'نمو مستمر في قطاع الضيافة بدعم من رؤية 2030'
        ]
      },
      slide4: {
        title: 'مزايا تجعل رحلتك أسهل',
        items: [
          'تأكيد الترخيص لكل عقار قبل الحجز',
          'عرض جميع الخدمات القريبة من موقع إقامتك',
          'تصميم جدول سياحي مخصص حسب اهتماماتك',
          'واجهة سهلة الاستخدام بعدة لغات',
          'تكامل مع الخرائط والجهات الرسمية'
        ]
      },
      slide5: {
        title: 'من نخدم؟',
        items: [
          'الحجاج والمعتمرون',
          'الزوار السياحيون من داخل وخارج المملكة',
          'المرضى في برامج السياحة العلاجية',
          'العوائل الباحثة عن إقامة مريحة وخدمات قريبة'
        ]
      },
      slide6: {
        title: 'أثرنا على المدينة والزائر',
        items: [
          'زيادة نسبة إشغال الفنادق المرخصة',
          'رفع جودة تجربة الزائر وتحسين انطباعه',
          'دعم الاقتصاد المحلي عبر زيادة الطلب على الخدمات',
          'تعزيز مكانة المدينة المنورة كمركز للضيافة المتميزة'
        ]
      },
      slide7: {
        title: 'شراكتنا مع صندوق التنمية السياحي',
        items: [
          'تمويل لتوسيع قاعدة البيانات وتطوير التقنية',
          'شراكات مع الفنادق والمرافق السياحية',
          'دعم تسويقي للوصول إلى أكبر شريحة من الزوار',
          'مواءمة المشروع مع مبادرات رؤية 2030'
        ]
      },
      prev: 'السابق',
      next: 'التالي',
      swipeHint: 'اسحب لليمين أو اليسار للتنقل'
    },
    statistics: {
      title: 'إحصائيات حية',
      subtitle: 'أرقام تتحدث عن نفسها',
      labels: {
        visitors: 'زائر سنوياً',
        hotels: 'فندق مرخص',
        satisfaction: '% رضا الزوار',
        nationalities: 'جنسية مختلفة'
      }
    },
    features: {
      title: 'مميزات المدينة',
      subtitle: 'اكتشف ما يجعل المدينة المنورة وجهة روحانية فريدة',
      masjid: { title: 'المسجد النبوي الشريف', desc: 'أحد أقدس المساجد في الإسلام، حيث صلى النبي ﷺ ودفن فيه. يتميز بقبته الخضراء الشهيرة والروضة المباركة.' },
      historical: { title: 'المواقع التاريخية', desc: 'اكتشف المواقع التاريخية العديدة مثل مسجد قباء، جبل أحد، مسجد القبلتين، وغيرها من المعالم الإسلامية المهمة.' },
      nature: { title: 'الطبيعة الخلابة', desc: 'استمتع بالطبيعة الجميلة للمدينة المنورة مع الجبال الخضراء والواحات المزدهرة والمناخ المعتدل على مدار العام.' },
      stay: { title: 'الإقامة المميزة', desc: 'اختر من بين مجموعة واسعة من الفنادق والمنتجعات الفاخرة القريبة من المسجد النبوي الشريف.' },
      food: { title: 'المأكولات المحلية', desc: 'تذوق أشهى الأطباق المحلية والمأكولات التقليدية التي تشتهر بها المدينة المنورة.' },
      guides: { title: 'المرشدين المحترفين', desc: 'استفد من خبرة المرشدين السياحيين المحترفين الذين يعرفون كل تفاصيل المدينة المنورة.' }
    },
    prayer: {
      title: 'أوقات الصلاة',
      subtitle: 'أوقات الصلاة في المدينة المنورة اليوم',
      names: { fajr: 'الفجر', dhuhr: 'الظهر', asr: 'العصر', maghrib: 'المغرب', isha: 'العشاء' }
    },
    gallery: {
      title: 'معالم المدينة المنورة',
      subtitle: 'اكتشف أجمل معالم المدينة المنورة'
    },
    famous: {
      title: 'الواجهة الخارجية مناطق المدينة المشهورة',
      subtitle: 'اكتشف أشهر المناطق والمدن القريبة من المدينة المنورة'
    },
    testimonials: {
      title: 'آراء الزوار',
      subtitle: 'تجارب حقيقية من زوار المدينة المنورة'
    },
    map: {
      title: 'خريطة تفاعلية',
      subtitle: 'اكتشف أهم المعالم والخدمات في المدينة المنورة'
    },
    activities: {
      title: 'فعاليات المدينة المنورة',
      subtitle: 'اكتشف الأنشطة والفعاليات المميزة في المدينة المنورة',
      cards: [
        { title: 'الزيارات الدينية', desc: 'زيارة المسجد النبوي الشريف، مسجد قباء، مسجد القبلتين، وجبل أحد. جولات إرشادية مع مرشدين معتمدين.', time: '⏰ 2-4 ساعات', price: '💰 من 50 ريال', button: 'احجز الآن' },
        { title: 'الجولات التاريخية', desc: 'اكتشف المواقع التاريخية الإسلامية، المتاحف، والأسواق التراثية. تعرف على تاريخ المدينة العريق.', time: '⏰ 3-5 ساعات', price: '💰 من 80 ريال', button: 'احجز الآن' },
        { title: 'جولات الطبيعة', desc: 'استمتع بالطبيعة الخلابة للمدينة المنورة. زيارات للمزارع، الواحات، والمناطق الجبلية الجميلة.', time: '⏰ 4-6 ساعات', price: '💰 من 120 ريال', button: 'احجز الآن' },
        { title: 'جولات التسوق', desc: 'اكتشف الأسواق التقليدية والمراكز التجارية الحديثة. تسوق التمور، العطور، والهدايا التذكارية.', time: '⏰ 2-3 ساعات', price: '💰 من 30 ريال', button: 'احجز الآن' },
        { title: 'جولات الطعام', desc: 'تذوق أشهى المأكولات المحلية والمطاعم التقليدية. تعرف على المطبخ المحلي وأشهر الأطباق.', time: '⏰ 2-4 ساعات', price: '💰 من 100 ريال', button: 'احجز الآن' },
        { title: 'السياحة العلاجية', desc: 'زيارة المراكز الطبية المتخصصة، المنتجعات الصحية، والمرافق العلاجية المميزة في المدينة.', time: '⏰ 1-3 أيام', price: '💰 من 500 ريال', button: 'احجز الآن' }
      ]
    },
    contact: {
      title: 'تواصل معنا',
      subtitle: 'لأي استفسار حول رحلتك إلى المدينة المنورة',
      form: {
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        message: 'رسالتك',
        submit: 'إرسال الرسالة'
      }
    }
  },
  en: {
    direction: 'ltr',
    locale: 'en',
    nav: {
      home: 'Home',
      problems: 'Challenges',
      presentation: 'Presentation',
      features: 'Solutions',
      prayer: 'Prayer Times',
      gallery: 'Who We Serve',
      famous: 'Famous Regions',
      contact: 'Contact Us'
    },
    schedule: {
      headerTitle: 'Your Trip Schedule to Medina',
      headerSubtitle: 'Plan your spiritual journey to Medina and discover its most beautiful historical and religious landmarks',
      formTitle: 'Trip Information',
      start: 'Start scheduling my trip',
      generating: 'Generating your personalized schedule...',
      save: '💾 Save Schedule',
      print: '🖨️ Print Schedule',
      backHome: '🏠 Back to Home',
      landmarks: {
        title: 'Choose the landmarks you want to visit',
        cards: {
          masjidNabawi: { title: 'Prophet’s Mosque', desc: 'One of Islam’s holiest mosques; the Prophet ﷺ prayed and is buried here' },
          qubaMosque: { title: 'Quba Mosque', desc: 'The first mosque built in Islam, south of Medina' },
          mountUhud: { title: 'Mount Uhud', desc: 'Site of the historic Battle of Uhud, north of Medina' },
          qiblataynMosque: { title: 'Qiblatayn Mosque', desc: 'The mosque where the Prophet ﷺ prayed towards both qiblas' },
          alBaqi: { title: 'Al-Baqi Cemetery', desc: 'Historic cemetery of many Companions' },
          propheticPath: { title: 'The Prophetic Path', desc: 'The route the Prophet ﷺ walked from Medina to Quba' }
        }
      },
      tourGuide: {
        title: 'Medina Tour Guide',
        subtitle: 'Explore Medina with a professional guide specialized in Islamic history',
        features: {
          expertise: { title: 'Specialized expertise', desc: 'Certified guides by the Tourism Authority, specialized in Islamic history and Medina', badge: 'Officially certified' },
          languages: { title: 'Multiple languages', desc: 'Guides speaking Arabic, English, French, Urdu, Turkish and Malay', badge: '6 languages' },
          booking: { title: 'Online booking', desc: 'Book your guide easily via app or website with instant confirmation', badge: 'Instant booking' },
          transport: { title: 'Comfortable transport', desc: 'Air-conditioned comfortable cars with professional driver', badge: 'Private car' },
          flexible: { title: 'Flexible tours', desc: 'Morning/evening and private tours based on your budget and preference', badge: 'Full flexibility' },
          photography: { title: 'Professional photography', desc: 'Professional photography to document your trip with high-quality photos', badge: 'Pro photos' }
        },
        pricing: {
          title: 'Tour guide pricing',
          popular: 'Most popular',
          bookNow: 'Book now',
          features: {
            guide: '✅ Specialized guide',
            visit34: '✅ Visit 3–4 landmarks',
            explanation: '✅ Detailed explanation',
            photos: '✅ Souvenir photos',
            visit68: '✅ Visit 6–8 landmarks',
            lunch: '✅ Lunch included',
            transport: '✅ Comfortable transport',
            professionalPhotos: '✅ Professional photos',
            privateGuide: '✅ Private guide',
            customItinerary: '✅ Custom itinerary',
            privateCar: '✅ Private car',
            premiumMeals: '✅ Premium meals'
          },
          packages: {
            halfDay: { title: 'Half-day tour', price: '150 SAR' },
            fullDay: { title: 'Full-day tour', price: '300 SAR' },
            private: { title: 'Private tour', price: '500 SAR' }
          }
        }
      },
      preview: {
        title: 'Your suggested trip schedule',
        day1: {
          header: 'Day 1 – Arrival and settling',
          activities: [
            { title: 'Arrival to Medina', desc: 'Hotel check-in and rest' },
            { title: 'Visit the Prophet’s Mosque', desc: 'Pray at the Prophet’s Mosque and visit Al-Rawdah' },
            { title: 'Dinner at local restaurants', desc: 'Taste traditional local cuisine' }
          ]
        },
        day2: {
          header: 'Day 2 – Historical landmarks',
          activities: [
            { title: 'Breakfast at hotel', desc: 'Start the day with a healthy breakfast' },
            { title: 'Visit Quba Mosque', desc: 'The first mosque built in Islam' },
            { title: 'Old city tour', desc: 'Explore old neighborhoods and traditional markets' },
            { title: 'Lunch at local restaurant', desc: 'Taste local dishes' },
            { title: 'Visit Qiblatayn Mosque', desc: 'The mosque where the Prophet ﷺ prayed towards both qiblas' },
            { title: 'Prayer at the Prophet’s Mosque', desc: 'Maghrib and Isha prayers at the Prophet’s Mosque' }
          ]
        },
        day3: {
          header: 'Day 3 – Nature and history',
          activities: [
            { title: 'Breakfast and preparation', desc: 'Prepare for the day trip' },
            { title: 'Visit Mount Uhud', desc: 'Historic Battle of Uhud site and scenic views' },
            { title: 'Lunch in local restaurants', desc: 'Taste local dishes' },
            { title: 'Visit Al-Baqi cemetery', desc: 'Visit the historic cemetery' },
            { title: 'The Prophetic Path', desc: 'Walk the path the Prophet ﷺ took' },
            { title: 'Prayer at the Prophet’s Mosque', desc: 'Maghrib and Isha prayers at the Prophet’s Mosque' }
          ]
        }
      },
      form: {
        arrivalDate: { label: 'Arrival date' },
        departureDate: { label: 'Departure date' },
        peopleCount: { label: 'Number of people' },
        accommodation: {
          label: 'Accommodation type',
          options: {
            hotel: 'Luxury hotel',
            apartment: 'Apartment',
            guesthouse: 'Guesthouse',
            camping: 'Tents (seasonal)'
          }
        },
        budget: { label: 'Approximate budget (SAR)', placeholder: 'e.g., 5000' },
        regions: {
          label: 'Regions outside Medina you wish to visit',
          cards: [
            { title: '🏛️ Al-Ula', desc: 'Hegra (Madain Saleh) and Nabataean ruins (350 km – 4 hours)' },
            { title: '🌊 Yanbu', desc: 'Pearl of the Red Sea (220 km – 2.5 hours)' },
            { title: '⚔️ Badr', desc: 'Site of the Battle of Badr (150 km – 2 hours)' },
            { title: '🏰 Khaybar', desc: 'Historic oasis of Khaybar (170 km – 2.5 hours)' }
          ]
        },
        interests: { label: 'Special interests', placeholder: 'Write your interests (e.g., Islamic history, architecture, nature, etc.)' }
      }
    },
    buttons: {
      login: 'Login',
      darkMode: 'Dark Mode'
    },
    hero: {
      title: 'Al Madinah Al Munawwarah',
      subtitle: 'The City of the Messenger ﷺ',
      description: 'Discover Medina, the second holiest city in Islam and home to the Prophet’s Mosque. Enjoy your spiritual journey in this blessed city rich with Islamic history.',
      start: '🗺️ Start your journey',
      download: '📱 Download App'
    },
    city: {
      info: 'City Information',
      city: 'City',
      tourismTypes: 'Tourism types:',
      currentEvent: 'Current event:',
      noEvents: 'No events at the moment.',
      showMore: 'Show more details',
      bestHotels: (name) => `Top hotels in ${name}`,
      bestGuides: (name) => `Top guides in ${name}`,
      visitSite: 'Visit website',
      bookNow: 'Book now',
      weatherLoading: 'Loading weather...',
      weatherError: 'Sorry, weather is unavailable right now.'
    },
    
    presentation: {
      title: 'Our Project',
      subtitle: 'Discover our project in detail',
      slide1: {
        title: 'Visitor challenges in Medina',
        items: [
          'Difficulty finding licensed lodging near services',
          'Lack of information about touristic, religious, and cultural activities',
          'No instant way to contact support services (laundry, grocery, worker)',
          'No tailored solutions for medical tourism visitors'
        ]
      },
      slide2: {
        title: 'An integrated solution for visitors',
        items: [
          'Show all licensed accommodations with license verification',
          'Provide lists of activities (religious, cultural, medical) with instant booking',
          '"Nearby you" feature for laundry, grocery, worker, and medical services',
          'Digital tour guidance with booking for certified guides'
        ]
      },
      slide3: {
        title: 'Medina… the heart of Islamic hospitality',
        items: [
          'The second holiest city in Islam, welcoming millions of pilgrims annually',
          'A growing destination for medical tourism with advanced facilities',
          'Diverse historical sites, farms, and heritage markets',
          'Continuous hospitality growth driven by Vision 2030'
        ]
      },
      slide4: {
        title: 'Features that make your trip easier',
        items: [
          'License verification for every property before booking',
          'See all services near your stay',
          'Build a personalized itinerary based on your interests',
          'Easy multilingual interface',
          'Integration with maps and official entities'
        ]
      },
      slide5: {
        title: 'Who do we serve?',
        items: [
          'Hajj and Umrah pilgrims',
          'Domestic and international tourists',
          'Patients in medical tourism programs',
          'Families seeking comfort and nearby services'
        ]
      },
      slide6: {
        title: 'Our impact on the city and visitors',
        items: [
          'Increase occupancy of licensed hotels',
          'Improve visitor experience and satisfaction',
          'Support the local economy by increasing service demand',
          'Enhance Medina’s position as a center of premium hospitality'
        ]
      },
      slide7: {
        title: 'Our partnership with the Tourism Development Fund',
        items: [
          'Funding to expand the database and develop the technology',
          'Partnerships with hotels and tourism facilities',
          'Marketing support to reach a wider audience',
          'Alignment with Vision 2030 initiatives'
        ]
      },
      // For presentation.html (slides indexed differently)
      slide2Alt: { items: [
        'Difficulty finding licensed lodging near services',
        'Lack of information about touristic, religious, and cultural activities',
        'No instant way to contact support services (laundry, grocery, worker)',
        'No tailored solutions for medical tourism visitors'
      ]},
      slide3Alt: { items: [
        'Show all licensed accommodations with license verification',
        'Provide lists of activities (religious, cultural, medical) with instant booking',
        '"Nearby you" feature for laundry, grocery, worker, and medical services',
        'Digital tour guidance with booking for certified guides'
      ]},
      slide4Alt: { items: [
        'The second holiest city in Islam, welcoming millions of pilgrims annually',
        'A growing destination for medical tourism with advanced facilities',
        'Diverse historical sites, farms, and heritage markets',
        'Continuous hospitality growth driven by Vision 2030'
      ]},
      slide5Alt: { items: [
        'License verification for every property before booking',
        'See all services near your stay',
        'Build a personalized itinerary based on your interests',
        'Easy multilingual interface',
        'Integration with maps and official entities'
      ]},
      slide6Alt: { items: [
        'Hajj and Umrah pilgrims',
        'Domestic and international tourists',
        'Patients in medical tourism programs',
        'Families seeking comfort and nearby services'
      ]},
      slide7Alt: { items: [
        'Increase occupancy of licensed hotels',
        'Improve visitor experience and satisfaction',
        'Support the local economy by increasing service demand',
        'Enhance Medina’s position as a center of premium hospitality'
      ]},
      slide8Alt: { items: [
        'Funding to expand the database and develop the technology',
        'Partnerships with hotels and tourism facilities',
        'Marketing support to reach a wider audience',
        'Alignment with Vision 2030 initiatives'
      ]},
      prev: 'Previous',
      next: 'Next',
      swipeHint: 'Swipe right or left to navigate'
    },
    statistics: {
      title: 'Live Statistics',
      subtitle: 'Numbers that speak for themselves',
      labels: {
        visitors: 'Visitors per year',
        hotels: 'Licensed hotels',
        satisfaction: 'Visitor satisfaction %',
        nationalities: 'Different nationalities'
      }
    },
    features: {
      title: 'Our Project',
      subtitle: 'Discover what makes Medina a unique spiritual destination',
      masjid: { title: 'Prophet’s Mosque', desc: 'One of Islam’s holiest mosques with the famous Green Dome and Al-Rawdah.' },
      historical: { title: 'Historical Sites', desc: 'Discover many historic sites like Quba Mosque, Mount Uhud, and Qiblatain.' },
      nature: { title: 'Beautiful Nature', desc: 'Enjoy Medina’s beautiful nature with green mountains and oases all year round.' },
      stay: { title: 'Premium Stays', desc: 'Choose from a wide range of luxury hotels and resorts near the Prophet’s Mosque.' },
      food: { title: 'Local Cuisine', desc: 'Taste delicious local dishes and traditional foods Medina is known for.' },
      guides: { title: 'Professional Guides', desc: 'Benefit from expert tour guides who know Medina in detail.' }
    },
    prayer: {
      title: 'Prayer Times',
      subtitle: 'Today’s prayer times in Medina',
      names: { fajr: 'Fajr', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha' }
    },
    gallery: {
      title: 'Medina Landmarks',
      subtitle: 'Discover the most beautiful landmarks in Medina',
      items: [
        'Prophet’s Mosque',
        'Quba Mosque',
        'Mount Uhud',
        'Qiblatain Mosque',
        'Medina’s Beautiful Nature',
        'Quba Mosque Interior'
      ]
    },
    famous: {
      title: 'Famous Regions',
      subtitle: 'Explore popular regions and nearby cities around Medina',
      cards: [
        { title: 'Al-Ula', desc: 'City of history and ruins, including Hegra (Madain Saleh), Al-‘Ula Castle, and more ancient sites', distance: '📍 350 km from Medina', duration: '⏰ 4 hours by car', button: 'Explore Al-Ula' },
        { title: 'Yanbu', desc: 'Pearl of the Red Sea, famous for beautiful beaches, stunning scenery, and marine activities', distance: '📍 220 km from Medina', duration: '⏰ 2.5 hours by car', button: 'Explore Yanbu' },
        { title: 'Badr', desc: 'Site of the Battle of Badr, a decisive Islamic battle, includes Badr Museum and key historical sites', distance: '📍 150 km from Medina', duration: '⏰ 2 hours by car', button: 'Explore Badr' },
        { title: 'Khaybar', desc: 'Historic oasis and site of the Expedition of Khaybar; famous for ancient forts and dense palms', distance: '📍 170 km from Medina', duration: '⏰ 2.5 hours by car', button: 'Explore Khaybar' }
      ]
    },
    testimonials: {
      title: 'Visitor Reviews',
      subtitle: 'Real experiences from Medina visitors'
    },
    map: {
      title: 'Interactive Map',
      subtitle: 'Discover key landmarks and services in Medina',
      legend: {
        title: 'Map Locations',
        items: [
          'Medina',
          'Al-Ula – Nabataean Ruins',
          'Yanbu – Red Sea',
          'Badr – Historic Battle',
          'Khaybar – Historic Oasis'
        ],
        instructions: {
          title: 'Instructions:',
          items: [
            'Click any marker to view details',
            'Use mouse wheel to zoom in/out',
            'Drag the map to move'
          ]
        }
      }
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Any inquiries about your trip to Medina',
      form: {
        name: 'Full name',
        email: 'Email address',
        phone: 'Phone number',
        message: 'Your message',
        submit: 'Send message'
      }
    },
    activities: {
      title: 'Medina Activities',
      subtitle: 'Discover the best activities and events in Medina',
      cards: [
        { title: 'Religious Visits', desc: 'Visit the Prophet’s Mosque, Quba Mosque, Qiblatain Mosque, and Mount Uhud. Guided tours with certified guides.', time: '⏰ 2–4 hours', price: '💰 from 50 SAR', button: 'Book now' },
        { title: 'Historical Tours', desc: 'Explore Islamic historical sites, museums, and heritage markets. Learn about Medina’s rich history.', time: '⏰ 3–5 hours', price: '💰 from 80 SAR', button: 'Book now' },
        { title: 'Nature Tours', desc: 'Enjoy Medina’s beautiful nature. Visits to farms, oases, and scenic mountain areas.', time: '⏰ 4–6 hours', price: '💰 from 120 SAR', button: 'Book now' },
        { title: 'Shopping Tours', desc: 'Discover traditional markets and modern malls. Shop for dates, perfumes, and souvenirs.', time: '⏰ 2–3 hours', price: '💰 from 30 SAR', button: 'Book now' },
        { title: 'Food Tours', desc: 'Taste delicious local cuisine and traditional restaurants. Discover the local kitchen and famous dishes.', time: '⏰ 2–4 hours', price: '💰 from 100 SAR', button: 'Book now' },
        { title: 'Medical Tourism', desc: 'Visit specialized medical centers, wellness resorts, and premium healthcare facilities in the city.', time: '⏰ 1–3 days', price: '💰 from 500 SAR', button: 'Book now' }
      ]
    }
  },
  fr: {
    direction: 'ltr',
    locale: 'fr',
    nav: {
      home: 'Accueil',
      problems: 'Défis',
      presentation: 'Présentation',
      features: 'Solutions',
      prayer: 'Heures de prière',
      gallery: 'À qui nous servons',
      famous: 'Régions célèbres',
      contact: 'Contactez-nous'
    },
    schedule: {
      headerTitle: 'Votre programme de voyage à Médine',
      headerSubtitle: 'Planifiez votre voyage spirituel à Médine et découvrez ses plus beaux sites historiques et religieux',
      formTitle: 'Informations sur le voyage',
      start: 'Commencer la planification de mon voyage',
      generating: 'Génération de votre programme personnalisé…',
      save: '💾 Enregistrer le programme',
      print: '🖨️ Imprimer le programme',
      backHome: '🏠 Retour à l’accueil',
      form: {
        arrivalDate: { label: 'Date d’arrivée' },
        departureDate: { label: 'Date de départ' },
        peopleCount: { label: 'Nombre de personnes' },
        accommodation: {
          label: 'Type d’hébergement',
          options: {
            hotel: 'Hôtel de luxe',
            apartment: 'Appartement',
            guesthouse: 'Maison d’hôtes',
            camping: 'Tentes (saisonnier)'
          }
        },
        budget: { label: 'Budget approximatif (SAR)', placeholder: 'ex. : 5000' },
        regions: {
          label: 'Régions en dehors de Médine que vous souhaitez visiter',
          cards: [
            { title: '🏛️ Al-‘Ula', desc: 'Hégra (Madain Saleh) et ruines nabatéennes (350 km – 4 h)' },
            { title: '🌊 Yanbu', desc: 'Perle de la mer Rouge (220 km – 2,5 h)' },
            { title: '⚔️ Badr', desc: 'Site de la bataille de Badr (150 km – 2 h)' },
            { title: '🏰 Khaybar', desc: 'Oasis historique de Khaybar (170 km – 2,5 h)' }
          ]
        },
        interests: { label: 'Centres d’intérêt', placeholder: 'Indiquez vos centres d’intérêt (histoire islamique, architecture, nature, etc.)' }
      }
    },
    buttons: {
      login: 'Se connecter',
      darkMode: 'Mode sombre'
    },
    hero: {
      title: 'Al-Madinah Al-Munawwarah',
      subtitle: 'La ville du Messager ﷺ',
      description: 'Découvrez Médine, la deuxième ville la plus sainte de l’Islam et abritant la Mosquée du Prophète. Profitez d’un voyage spirituel dans cette ville bénie riche d’histoire islamique.',
      start: '🗺️ Commencer votre voyage',
      download: '📱 Télécharger l’application'
    },
    city: {
      info: 'Informations sur la ville',
      city: 'Ville',
      tourismTypes: 'Types de tourisme :',
      currentEvent: 'Événement actuel :',
      noEvents: 'Aucun événement pour le moment.',
      showMore: 'Afficher plus de détails',
      bestHotels: (name) => `Meilleurs hôtels à ${name}`,
      bestGuides: (name) => `Meilleurs guides à ${name}`,
      visitSite: 'Visiter le site',
      bookNow: 'Réserver',
      weatherLoading: 'Chargement de la météo...',
      weatherError: 'Désolé, météo indisponible pour le moment.'
    },
    schedule: {
      headerTitle: 'Votre programme de voyage à Médine',
      headerSubtitle: 'Planifiez votre voyage spirituel à Médine et découvrez ses plus beaux sites historiques et religieux',
      formTitle: 'Informations sur le voyage',
      start: 'Commencer la planification de mon voyage',
      generating: 'Génération de votre programme personnalisé…',
      save: '💾 Enregistrer le programme',
      print: '🖨️ Imprimer le programme',
      backHome: '🏠 Retour à l’accueil'
    },
    presentation: {
      title: 'Notre projet',
      subtitle: 'Découvrez notre projet en détail',
      slide1: {
        title: 'Défis des visiteurs à Médine',
        items: [
          'Difficulté à trouver un hébergement licencié près des services',
          "Manque d’informations sur les activités touristiques, religieuses et culturelles",
          'Pas de moyen instantané pour contacter les services d’assistance (blanchisserie, épicerie, travailleur)',
          'Absence de solutions adaptées au tourisme médical'
        ]
      },
      slide2: {
        title: 'Solution intégrée pour les visiteurs',
        items: [
          'Afficher tous les hébergements licenciés avec vérification de licence',
          'Proposer des listes d’activités (religieuses, culturelles, médicales) avec réservation immédiate',
          'Fonction « À proximité » pour blanchisserie, épicerie, travailleur, services médicaux',
          'Guidage touristique numérique avec réservation de guides certifiés'
        ]
      },
      slide3: {
        title: 'Médine… le cœur de l’hospitalité islamique',
        items: [
          'Deuxième ville la plus sainte de l’Islam, accueillant des millions de pèlerins chaque année',
          'Destination en croissance pour le tourisme médical grâce à des installations avancées',
          'Sites historiques, fermes et marchés du patrimoine variés',
          'Croissance continue de l’hôtellerie portée par la Vision 2030'
        ]
      },
      slide4: {
        title: 'Des atouts pour faciliter votre voyage',
        items: [
          'Vérification de la licence pour chaque propriété avant la réservation',
          'Voir tous les services près de votre séjour',
          'Construire un itinéraire personnalisé selon vos intérêts',
          'Interface multilingue facile',
          'Intégration avec les cartes et les entités officielles'
        ]
      },
      slide5: {
        title: 'À qui nous servons ?',
        items: [
          'Pèlerins du Hajj et de la Umrah',
          'Touristes nationaux et internationaux',
          'Patients des programmes de tourisme médical',
          'Familles recherchant confort et services à proximité'
        ]
      },
      slide6: {
        title: 'Notre impact sur la ville et les visiteurs',
        items: [
          'Augmenter le taux d’occupation des hôtels licenciés',
          'Améliorer l’expérience et la satisfaction des visiteurs',
          "Soutenir l’économie locale en augmentant la demande de services",
          'Renforcer la position de Médine comme centre d’hospitalité de premier plan'
        ]
      },
      slide7: {
        title: 'Notre partenariat avec le Fonds de développement du tourisme',
        items: [
          'Financement pour étendre la base de données et développer la technologie',
          'Partenariats avec des hôtels et des installations touristiques',
          'Soutien marketing pour atteindre un public plus large',
          'Alignement avec les initiatives de la Vision 2030'
        ]
      },
      prev: 'Précédent',
      next: 'Suivant',
      swipeHint: 'Faites glisser à droite ou à gauche pour naviguer'
    },
    statistics: {
      title: 'Statistiques en direct',
      subtitle: 'Des chiffres qui parlent d’eux-mêmes',
      labels: {
        visitors: 'Visiteurs par an',
        hotels: 'Hôtels licenciés',
        satisfaction: 'Satisfaction des visiteurs %',
        nationalities: 'Nationalités différentes'
      }
    },
    features: {
      title: 'Notre projet',
      subtitle: 'Découvrez ce qui fait de Médine une destination spirituelle unique',
      masjid: { title: 'Mosquée du Prophète', desc: 'L’une des mosquées les plus saintes de l’Islam avec la célèbre Coupole Verte et Al-Rawdah.' },
      historical: { title: 'Sites historiques', desc: 'Découvrez de nombreux sites historiques comme la mosquée de Quba, le mont Uhud et Qiblatain.' },
      nature: { title: 'Nature magnifique', desc: 'Profitez de la belle nature de Médine avec des montagnes verdoyantes et des oasis toute l’année.' },
      stay: { title: 'Séjours de qualité', desc: 'Choisissez parmi une large gamme d’hôtels et de complexes de luxe près de la Mosquée du Prophète.' },
      food: { title: 'Cuisine locale', desc: 'Goûtez aux plats locaux délicieux et aux mets traditionnels pour lesquels Médine est connue.' },
      guides: { title: 'Guides professionnels', desc: 'Bénéficiez de guides touristiques experts qui connaissent Médine en détail.' }
    },
    prayer: {
      title: 'Heures de prière',
      subtitle: 'Heures de prière à Médine aujourd’hui',
      names: { fajr: 'Fajr', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha' }
    },
    gallery: {
      title: 'Lieux emblématiques de Médine',
      subtitle: 'Découvrez les plus beaux sites de Médine',
      items: [
        'Mosquée du Prophète',
        'Mosquée de Quba',
        'Mont Uhud',
        'Mosquée Qiblatain',
        'La belle nature de Médine',
        'Intérieur de la mosquée de Quba'
      ]
    },
    famous: {
      title: 'Régions célèbres',
      subtitle: 'Explorez les régions populaires et les villes proches de Médine',
      cards: [
        { title: 'Al-‘Ula', desc: 'Ville d’histoire et de vestiges, incluant Hégra (Madain Saleh), le château d’Al-‘Ula et d’autres sites anciens', distance: '📍 350 km de Médine', duration: '⏰ 4 heures en voiture', button: 'Découvrir Al-‘Ula' },
        { title: 'Yanbu', desc: 'Perle de la mer Rouge, réputée pour ses belles plages, ses paysages et ses activités nautiques', distance: '📍 220 km de Médine', duration: '⏰ 2,5 heures en voiture', button: 'Découvrir Yanbu' },
        { title: 'Badr', desc: 'Site de la bataille de Badr, bataille décisive de l’Islam, avec musée de Badr et sites historiques', distance: '📍 150 km de Médine', duration: '⏰ 2 heures en voiture', button: 'Découvrir Badr' },
        { title: 'Khaybar', desc: 'Oasis historique, site de l’expédition de Khaybar ; célèbre pour ses forts anciens et ses palmeraies', distance: '📍 170 km de Médine', duration: '⏰ 2,5 heures en voiture', button: 'Découvrir Khaybar' }
      ]
    },
    testimonials: {
      title: 'Avis des visiteurs',
      subtitle: 'Des expériences réelles de visiteurs de Médine'
    },
    map: {
      title: 'Carte interactive',
      subtitle: 'Découvrez les principaux sites et services à Médine',
      legend: {
        title: 'Lieux sur la carte',
        items: [
          'Médine',
          'Al-‘Ula – Ruines nabatéennes',
          'Yanbu – Mer Rouge',
          'Badr – Bataille historique',
          'Khaybar – Oasis historique'
        ],
        instructions: {
          title: 'Instructions :',
          items: [
            'Cliquez sur un marqueur pour voir les détails',
            "Utilisez la molette de la souris pour zoomer/dézoomer",
            'Faites glisser la carte pour vous déplacer'
          ]
        }
      }
    },
    contact: {
      title: 'Contactez-nous',
      subtitle: 'Toute question concernant votre voyage à Médine',
      form: {
        name: 'Nom complet',
        email: 'Adresse e-mail',
        phone: 'Numéro de téléphone',
        message: 'Votre message',
        submit: 'Envoyer le message'
      }
    },
    activities: {
      title: 'Activités à Médine',
      subtitle: 'Découvrez les meilleures activités et événements à Médine',
      cards: [
        { title: 'Visites religieuses', desc: 'Visitez la Mosquée du Prophète, la mosquée de Quba, la mosquée Qiblatain et le mont Uhud. Visites guidées avec des guides certifiés.', time: '⏰ 2–4 heures', price: '💰 à partir de 50 SAR', button: 'Réserver' },
        { title: 'Tours historiques', desc: 'Explorez les sites historiques islamiques, les musées et les marchés du patrimoine. Découvrez l’histoire riche de Médine.', time: '⏰ 3–5 heures', price: '💰 à partir de 80 SAR', button: 'Réserver' },
        { title: 'Tours nature', desc: 'Profitez de la nature magnifique de Médine. Visites des fermes, des oasis et des zones montagneuses pittoresques.', time: '⏰ 4–6 heures', price: '💰 à partir de 120 SAR', button: 'Réserver' },
        { title: 'Tours shopping', desc: 'Découvrez les marchés traditionnels et les centres commerciaux modernes. Achetez des dattes, des parfums et des souvenirs.', time: '⏰ 2–3 heures', price: '💰 à partir de 30 SAR', button: 'Réserver' },
        { title: 'Tours gastronomiques', desc: 'Goûtez à la délicieuse cuisine locale et aux restaurants traditionnels. Découvrez la cuisine locale et les plats célèbres.', time: '⏰ 2–4 heures', price: '💰 à partir de 100 SAR', button: 'Réserver' },
        { title: 'Tourisme médical', desc: 'Visitez des centres médicaux spécialisés, des resorts de bien-être et des établissements de santé haut de gamme.', time: '⏰ 1–3 jours', price: '💰 à partir de 500 SAR', button: 'Réserver' }
      ]
    }
  },
  zh: {
    direction: 'ltr',
    locale: 'zh',
    nav: {
      home: '首页',
      problems: '挑战',
      presentation: '介绍',
      features: '解决方案',
      prayer: '祈祷时间',
      gallery: '服务对象',
      famous: '著名地区',
      contact: '联系我们'
    },
    schedule: {
      headerTitle: '你的麦地那行程表',
      headerSubtitle: '规划你的麦地那心灵之旅，探索最美的历史与宗教景点',
      formTitle: '行程信息',
      start: '开始安排行程',
      generating: '正在生成您的个性化行程…',
      save: '💾 保存行程',
      print: '🖨️ 打印行程',
      backHome: '🏠 返回首页',
      form: {
        arrivalDate: { label: '到达日期' },
        departureDate: { label: '离开日期' },
        peopleCount: { label: '人数' },
        accommodation: {
          label: '住宿类型',
          options: {
            hotel: '豪华酒店',
            apartment: '公寓',
            guesthouse: '旅舍',
            camping: '帐篷（季节性）'
          }
        },
        budget: { label: '预估预算（里亚尔）', placeholder: '例如：5000' },
        regions: {
          label: '你想在麦地那之外参观的地区',
          cards: [
            { title: '🏛️ 欧拉', desc: '黑格拉（马代因萨利赫）与纳巴泰遗址（350 公里 – 4 小时）' },
            { title: '🌊 延布', desc: '红海明珠（220 公里 – 2.5 小时）' },
            { title: '⚔️ 白德尔', desc: '白德尔大战遗址（150 公里 – 2 小时）' },
            { title: '🏰 海拜尔', desc: '海拜尔历史绿洲（170 公里 – 2.5 小时）' }
          ]
        },
        interests: { label: '特别兴趣', placeholder: '写下你的兴趣（如：伊斯兰历史、建筑、自然等）' }
      }
    },
    buttons: {
      login: '登录',
      darkMode: '深色模式'
    },
    hero: {
      title: '麦地那',
      subtitle: '先知之城 ﷺ',
      description: '探索麦地那——伊斯兰教第二圣城，先知清真寺所在地。于这座充满伊斯兰历史的祝福之城开启你的心灵之旅。',
      start: '🗺️ 开始你的旅程',
      download: '📱 下载应用'
    },
    city: {
      info: '城市信息',
      city: '城市',
      tourismTypes: '旅游类型：',
      currentEvent: '当前活动：',
      noEvents: '目前没有活动。',
      showMore: '查看更多详情',
      bestHotels: (name) => `最佳酒店：${name}`,
      bestGuides: (name) => `最佳导游：${name}`,
      visitSite: '访问网站',
      bookNow: '立即预订',
      weatherLoading: '正在加载天气…',
      weatherError: '抱歉，目前无法获取天气信息。'
    },
    schedule: {
      headerTitle: '你的麦地那行程表',
      headerSubtitle: '规划你的麦地那心灵之旅，探索最美的历史与宗教景点',
      formTitle: '行程信息',
      start: '开始安排行程',
      generating: '正在生成您的个性化行程…',
      save: '💾 保存行程',
      print: '🖨️ 打印行程',
      backHome: '🏠 返回首页'
    },
    presentation: {
      title: '我们的项目',
      subtitle: '详细了解我们的项目',
      slide1: {
        title: '麦地那游客面临的挑战',
        items: [
          '难以找到靠近服务的持证住宿',
          '缺乏有关旅游、宗教和文化活动的信息',
          '无法即时联系支持服务（洗衣店、杂货店、工人）',
          '缺少面向医疗旅游访客的定制解决方案'
        ]
      },
      slide2: {
        title: '面向游客的一体化解决方案',
        items: [
          '展示所有持证住宿并提供执照验证',
          '提供活动列表（宗教、文化、医疗）并支持即时预订',
          '“附近”功能：洗衣、杂货、劳务、医疗服务',
          '数字化导览并可预订认证导游'
        ]
      },
      slide3: {
        title: '麦地那：伊斯兰待客之道的中心',
        items: [
          '伊斯兰第二圣城，每年迎接数百万朝觐者',
          '医疗旅游目的地快速增长，配备先进设施',
          '多样的历史遗迹、农场与传统市集',
          '在“2030愿景”的推动下，酒店与接待业持续发展'
        ]
      },
      slide4: {
        title: '让旅程更轻松的优势',
        items: [
          '预订前核验每一处住宿的许可证',
          '查看住宿附近的全部服务',
          '基于兴趣生成个性化行程',
          '易用的多语言界面',
          '与地图和官方机构集成'
        ]
      },
      slide5: {
        title: '我们的服务对象',
        items: [
          '朝觐与副朝朝圣者',
          '国内外游客',
          '医疗旅游项目中的患者',
          '寻求舒适与便捷服务的家庭'
        ]
      },
      slide6: {
        title: '我们对城市与游客的影响',
        items: [
          '提高持证酒店的入住率',
          '提升游客体验与满意度',
          '通过增加服务需求来促进本地经济',
          '强化麦地那作为高品质接待中心的地位'
        ]
      },
      slide7: {
        title: '与旅游发展基金的合作',
        items: [
          '为扩充数据库并开发技术提供资金',
          '与酒店和旅游设施建立合作伙伴关系',
          '营销支持以触达更广泛受众',
          '与“2030愿景”倡议保持一致'
        ]
      },
      prev: '上一页',
      next: '下一页',
      swipeHint: '左右滑动以导航'
    },
    statistics: {
      title: '实时统计',
      subtitle: '数据胜于言语',
      labels: {
        visitors: '每年游客数',
        hotels: '持证酒店',
        satisfaction: '游客满意度 %',
        nationalities: '不同国籍'
      }
    },
    features: {
      title: '我们的项目',
      subtitle: '探索麦地那作为独特心灵目的地的魅力',
      masjid: { title: '先知清真寺', desc: '伊斯兰最神圣的清真寺之一，拥有著名的绿色圆顶和罗达区。' },
      historical: { title: '历史景点', desc: '探索众多历史景点，如库巴清真寺、乌侯德山和两朝向清真寺。' },
      nature: { title: '优美自然', desc: '畅享麦地那的优美自然风光，青山绿水与绿洲相伴全年。' },
      stay: { title: '优质住宿', desc: '从靠近先知清真寺的豪华酒店与度假村中任君选择。' },
      food: { title: '当地美食', desc: '品尝麦地那闻名的地道美食和传统佳肴。' },
      guides: { title: '专业向导', desc: '资深导游为您详尽讲解麦地那的一切。' }
    },
    prayer: {
      title: '祈祷时间',
      subtitle: '今日麦地那祈祷时间',
      names: { fajr: '晨礼', dhuhr: '晌礼', asr: '晡礼', maghrib: '昏礼', isha: '宵礼' }
    },
    gallery: {
      title: '麦地那地标',
      subtitle: '探索麦地那最美的地标',
      items: [
        '先知清真寺',
        '库巴清真寺',
        '乌侯德山',
        '两朝向清真寺',
        '麦地那的优美自然',
        '库巴清真寺内部'
      ]
    },
    famous: {
      title: '著名地区',
      subtitle: '探索麦地那周边的热门地区与城市',
      cards: [
        { title: '欧拉', desc: '历史与遗迹之城，包括黑格拉（马代因萨利赫）、欧拉城堡等古遗址', distance: '📍 距麦地那 350 公里', duration: '⏰ 自驾约 4 小时', button: '探索欧拉' },
        { title: '延布', desc: '红海明珠，以美丽海滩、迷人风光和海上活动闻名', distance: '📍 距麦地那 220 公里', duration: '⏰ 自驾约 2.5 小时', button: '探索延布' },
        { title: '白德尔', desc: '白德尔大战遗址，伊斯兰历史上的关键战役，设有白德尔博物馆等历史景点', distance: '📍 距麦地那 150 公里', duration: '⏰ 自驾约 2 小时', button: '探索白德尔' },
        { title: '海拜尔', desc: '历史绿洲，海拜尔远征遗址；以古堡与密集椰枣林著称', distance: '📍 距麦地那 170 公里', duration: '⏰ 自驾约 2.5 小时', button: '探索海拜尔' }
      ]
    },
    testimonials: {
      title: '游客评价',
      subtitle: '来自麦地那游客的真实体验'
    },
    map: {
      title: '互动地图',
      subtitle: '发现麦地那的重要地标与服务',
      legend: {
        title: '地图位置',
        items: [
          '麦地那',
          '欧拉—纳巴泰遗址',
          '延布—红海',
          '白德尔—历史战役',
          '海拜尔—历史绿洲'
        ],
        instructions: {
          title: '使用说明：',
          items: [
            '点击任意标记查看详情',
            '使用鼠标滚轮缩放',
            '拖动地图进行移动'
          ]
        }
      }
    },
    contact: {
      title: '联系我们',
      subtitle: '关于您麦地那旅程的任何咨询',
      form: {
        name: '姓名',
        email: '电子邮件',
        phone: '电话号码',
        message: '您的留言',
        submit: '发送信息'
      }
    },
    activities: {
      title: '麦地那活动',
      subtitle: '探索麦地那的精彩活动与事件',
      cards: [
        { title: '宗教参访', desc: '参观先知清真寺、库巴清真寺、两朝向清真寺与乌侯德山。认证导游带领。', time: '⏰ 2–4 小时', price: '💰 起价 50 里亚尔', button: '立即预订' },
        { title: '历史之旅', desc: '探索伊斯兰历史遗迹、博物馆与传统市集。了解麦地那的悠久历史。', time: '⏰ 3–5 小时', price: '💰 起价 80 里亚尔', button: '立即预订' },
        { title: '自然之旅', desc: '畅享麦地那的优美自然。造访农场、绿洲与风景山地。', time: '⏰ 4–6 小时', price: '💰 起价 120 里亚尔', button: '立即预订' },
        { title: '购物之旅', desc: '探索传统集市与现代商场。选购椰枣、香水与纪念品。', time: '⏰ 2–3 小时', price: '💰 起价 30 里亚尔', button: '立即预订' },
        { title: '美食之旅', desc: '品尝地道美食与传统餐厅。了解当地菜系与名菜。', time: '⏰ 2–4 小时', price: '💰 起价 100 里亚尔', button: '立即预订' },
        { title: '医疗旅游', desc: '造访专业医疗中心、康养度假村与高端医疗设施。', time: '⏰ 1–3 天', price: '💰 起价 500 里亚尔', button: '立即预订' }
      ]
    }
  },
  hi: {
    direction: 'ltr',
    locale: 'hi',
    nav: {
      home: 'मुख्य पृष्ठ',
      problems: 'चुनौतियाँ',
      presentation: 'प्रस्तुति',
      features: 'समाधान',
      prayer: 'नमाज़ समय',
      gallery: 'हम किसकी सेवा करते हैं',
      famous: 'प्रसिद्ध क्षेत्र',
      contact: 'संपर्क करें'
    },
    schedule: {
      headerTitle: 'मदीना के लिए आपकी यात्रा तालिका',
      headerSubtitle: 'मदीना की आध्यात्मिक यात्रा की योजना बनाएं और इसके सुंदर ऐतिहासिक और धार्मिक स्थलों की खोज करें',
      formTitle: 'यात्रा जानकारी',
      start: 'मेरी यात्रा की योजना शुरू करें',
      generating: 'आपका निजी शेड्यूल तैयार हो रहा है…',
      save: '💾 तालिका सहेजें',
      print: '🖨️ तालिका प्रिंट करें',
      backHome: '🏠 मुख्य पृष्ठ पर वापस जाएँ',
      form: {
        arrivalDate: { label: 'आगमन तिथि' },
        departureDate: { label: 'प्रस्थान तिथि' },
        peopleCount: { label: 'लोगों की संख्या' },
        accommodation: {
          label: 'आवास का प्रकार',
          options: {
            hotel: 'लक्ज़री होटल',
            apartment: 'अपार्टमेंट',
            guesthouse: 'गेस्टहाउस',
            camping: 'टेंट (मौसमी)'
          }
        },
        budget: { label: 'अनुमानित बजट (रियाल)', placeholder: 'उदा.: 5000' },
        regions: {
          label: 'मदीना के बाहर वे क्षेत्र जिन्हें आप देखना चाहते हैं',
          cards: [
            { title: '🏛️ अल-उला', desc: 'हिज्र (मदाइन सालेह) और नबातीय खंडहर (350 किमी – 4 घंटे)' },
            { title: '🌊 यम्बू', desc: 'रेड सी का मोती (220 किमी – 2.5 घंटे)' },
            { title: '⚔️ बद्र', desc: 'बद्र की लड़ाई का स्थल (150 किमी – 2 घंटे)' },
            { title: '🏰 ख़ैबर', desc: 'ख़ैबर का ऐतिहासिक नखलिस्तान (170 किमी – 2.5 घंटे)' }
          ]
        },
        interests: { label: 'विशेष रुचियाँ', placeholder: 'अपनी रुचियाँ लिखें (जैसे: इस्लामी इतिहास, वास्तुकला, प्रकृति, आदि)' }
      }
    },
    buttons: {
      login: 'लॉग इन',
      darkMode: 'डार्क मोड'
    },
    hero: {
      title: 'अल-मदीना अल-मुनव्वरा',
      subtitle: 'रसूल की नगरी ﷺ',
      description: 'मदीना, इस्लाम का दूसरा सबसे पवित्र शहर और मस्जिद-ए-नबवी का घर। इस धन्य शहर में अपनी आध्यात्मिक यात्रा का आनंद लें।',
      start: '🗺️ अपनी यात्रा शुरू करें',
      download: '📱 ऐप डाउनलोड करें'
    },
    city: {
      info: 'शहर की जानकारी',
      city: 'शहर',
      tourismTypes: 'पर्यटन प्रकार:',
      currentEvent: 'वर्तमान कार्यक्रम:',
      noEvents: 'फिलहाल कोई कार्यक्रम नहीं।',
      showMore: 'और विवरण देखें',
      bestHotels: (name) => `${name} में सर्वश्रेष्ठ होटल`,
      bestGuides: (name) => `${name} में सर्वश्रेष्ठ गाइड`,
      visitSite: 'वेबसाइट देखें',
      bookNow: 'अभी बुक करें',
      weatherLoading: 'मौसम लोड हो रहा है...',
      weatherError: 'क्षमा करें, मौसम उपलब्ध नहीं है।'
    },
    schedule: {
      headerTitle: 'मदीना के लिए आपकी यात्रा तालिका',
      headerSubtitle: 'मदीना की आध्यात्मिक यात्रा की योजना बनाएं और इसके सुंदर ऐतिहासिक और धार्मिक स्थलों की खोज करें',
      formTitle: 'यात्रा जानकारी',
      start: 'मेरी यात्रा की योजना शुरू करें',
      generating: 'आपका निजी शेड्यूल तैयार हो रहा है…',
      save: '💾 तालिका सहेजें',
      print: '🖨️ तालिका प्रिंट करें',
      backHome: '🏠 मुख्य पृष्ठ पर वापस जाएँ'
    },
    presentation: {
      title: 'हमारा प्रोजेक्ट',
      subtitle: 'हमारे प्रोजेक्ट के बारे में विस्तार से जानें',
      slide1: {
        title: 'मदीना में आगंतुकों की चुनौतियाँ',
        items: [
          'सेवाओं के पास लाइसेंस प्राप्त आवास खोजना कठिन',
          'पर्यटन, धार्मिक और सांस्कृतिक गतिविधियों की जानकारी की कमी',
          'समर्थन सेवाओं से तुरंत संपर्क का साधन नहीं (लॉन्ड्री, किराना, कार्यकर्ता)',
          'मेडिकल टूरिज़्म आगंतुकों के लिए अनुकूलित समाधान का अभाव'
        ]
      },
      slide2: {
        title: 'आगंतुकों के लिए समग्र समाधान',
        items: [
          'लाइसेंस सत्यापन के साथ सभी लाइसेंस प्राप्त आवास दिखाएँ',
          'गतिविधियों (धार्मिक, सांस्कृतिक, चिकित्सा) की सूची और तुरंत बुकिंग',
          '“आपके पास” फीचर: लॉन्ड्री, किराना, कर्मचारी, चिकित्सा सेवाएँ',
          'प्रमाणित गाइड के साथ डिजिटल टूर मार्गदर्शन'
        ]
      },
      slide3: {
        title: 'मदीना… इस्लामी आतिथ्य का हृदय',
        items: [
          'इस्लाम का दूसरा सबसे पवित्र शहर, हर वर्ष लाखों तीर्थयात्री आते हैं',
          'उन्नत सुविधाओं के साथ चिकित्सा पर्यटन के लिए उभरता गंतव्य',
          'विविध ऐतिहासिक स्थल, फ़ॉर्म और विरासत बाज़ार',
          'विज़न 2030 से प्रेरित सतत अतिथि-सत्कार वृद्धि'
        ]
      },
      slide4: {
        title: 'ऐसी खूबियाँ जो आपकी यात्रा आसान बनाती हैं',
        items: [
          'बुकिंग से पहले हर संपत्ति का लाइसेंस सत्यापन',
          'अपने ठहराव के पास की सभी सेवाएँ देखें',
          'आपकी रुचियों के आधार पर निजी समय-सारणी बनाना',
          'आसान बहुभाषी इंटरफ़ेस',
          'मानचित्र और आधिकारिक संस्थाओं के साथ इंटिग्रेशन'
        ]
      },
      slide5: {
        title: 'हम किसकी सेवा करते हैं?',
        items: [
          'हज और उमरा के तीर्थयात्री',
          'घरेलू और अंतरराष्ट्रीय पर्यटक',
          'मेडिकल टूरिज़्म कार्यक्रमों के मरीज़',
          'आराम और निकट सेवाएँ खोजने वाले परिवार'
        ]
      },
      slide6: {
        title: 'शहर और आगंतुकों पर हमारा प्रभाव',
        items: [
          'लाइसेंस प्राप्त होटलों का ऑक्यूपेंसी बढ़ाना',
          'आगंतुक अनुभव और संतुष्टि में सुधार',
          'सेवाओं की मांग बढ़ाकर स्थानीय अर्थव्यवस्था का समर्थन',
          'मदीना की प्रतिष्ठा को प्रीमियम आतिथ्य केंद्र के रूप में मजबूत करना'
        ]
      },
      slide7: {
        title: 'पर्यटन विकास निधि के साथ हमारी साझेदारी',
        items: [
          'डेटाबेस के विस्तार और तकनीक के विकास हेतु वित्तपोषण',
          'होटलों और पर्यटन सुविधाओं के साथ साझेदारियाँ',
          'अधिक दर्शकों तक पहुँचने के लिए विपणन समर्थन',
          'विज़न 2030 पहलों के साथ संरेखण'
        ]
      },
      prev: 'पिछला',
      next: 'अगला',
      swipeHint: 'नेविगेट करने के लिए दाएँ या बाएँ स्वाइप करें'
    },
    statistics: {
      title: 'लाइव आँकड़े',
      subtitle: 'स्वयं बोलने वाले आँकड़े',
      labels: {
        visitors: 'प्रति वर्ष आगंतुक',
        hotels: 'लाइसेंस प्राप्त होटल',
        satisfaction: 'आगंतुक संतुष्टि %',
        nationalities: 'विभिन्न राष्ट्रीयताएँ'
      }
    },
    features: {
      title: 'हमारा प्रोजेक्ट',
      subtitle: 'खोजिए क्या बनाता है मदीना को अनोखा आध्यात्मिक गंतव्य',
      masjid: { title: 'मस्जिद-ए-नबवी', desc: 'इस्लाम की पवित्रतम मस्जिदों में से एक, मशहूर हरी गुम्बद और रौज़ा के साथ।' },
      historical: { title: 'ऐतिहासिक स्थल', desc: 'क़ुबा मस्जिद, ओहद पर्वत, क़िबलतैन मस्जिद आदि ऐतिहासिक स्थलों की खोज करें।' },
      nature: { title: 'सुंदर प्रकृति', desc: 'मदीना की हरी-भरी पहाड़ियों और नखलिस्तानों का सालभर आनंद लें।' },
      stay: { title: 'उत्तम आवास', desc: 'मस्जिद-ए-नबवी के निकट लग्ज़री होटलों और रिसॉर्ट्स में से चुनें।' },
      food: { title: 'स्थानीय भोजन', desc: 'मदीना के मशहूर स्वादिष्ट स्थानीय और पारंपरिक व्यंजनों का स्वाद लें।' },
      guides: { title: 'प्रोफेशनल गाइड', desc: 'विशेषज्ञ टूर गाइड्स की मदद से मदीना को गहराई से जानें।' }
    },
    prayer: {
      title: 'नमाज़ समय',
      subtitle: 'आज मदीना में नमाज़ के समय',
      names: { fajr: 'फ़ज्र', dhuhr: 'ज़ुहर', asr: 'असर', maghrib: 'मग़रिब', isha: 'इशा' }
    },
    gallery: {
      title: 'मदीना के प्रमुख स्थल',
      subtitle: 'मदीना के सबसे सुंदर स्थलों की खोज करें',
      items: [
        'मस्जिद-ए-नबवी',
        'मस्जिद-ए-क़ुबा',
        'ज mount उहुद',
        'मस्जिद-ए-क़िब्लतैन',
        'मदीना की सुंदर प्रकृति',
        'क़ुबा मस्जिद का अंदरूनी हिस्सा'
      ]
    },
    famous: {
      title: 'प्रसिद्ध क्षेत्र',
      subtitle: 'मदीना के आसपास के लोकप्रिय क्षेत्र और शहर',
      cards: [
        { title: 'अल-उला', desc: 'इतिहास और खंडहरों का शहर, हिज्र (मदाइन सालेह), अल-उला किला और अन्य प्राचीन स्थल', distance: '📍 मदीना से 350 किमी', duration: '⏰ कार से 4 घंटे', button: 'अल-उला देखें' },
        { title: 'यम्बू', desc: 'रेड सी का मोती, सुंदर समुद्र तटों, मनमोहक प्राकृतिक दृश्य और समुद्री गतिविधियों के लिए प्रसिद्ध', distance: '📍 मदीना से 220 किमी', duration: '⏰ कार से 2.5 घंटे', button: 'यम्बू देखें' },
        { title: 'बद्र', desc: 'बद्र की लड़ाई का स्थल — इस्लामी इतिहास की निर्णायक लड़ाई, बद्र संग्रहालय और महत्वपूर्ण ऐतिहासिक स्थल', distance: '📍 मदीना से 150 किमी', duration: '⏰ कार से 2 घंटे', button: 'बद्र देखें' },
        { title: 'ख़ैबर', desc: 'ऐतिहासिक नखलिस्तान और ख़ैबर अभियान का स्थल; प्राचीन किलों और घने खजूर के पेड़ों के लिए प्रसिद्ध', distance: '📍 मदीना से 170 किमी', duration: '⏰ कार से 2.5 घंटे', button: 'ख़ैबर देखें' }
      ]
    },
    testimonials: {
      title: 'आगंतुक समीक्षाएँ',
      subtitle: 'मदीना के आगंतुकों के वास्तविक अनुभव'
    },
    map: {
      title: 'इंटरैक्टिव मानचित्र',
      subtitle: 'मदीना के प्रमुख स्थलों और सेवाओं की खोज करें',
      legend: {
        title: 'मानचित्र पर स्थान',
        items: [
          'मदीना',
          'अल-उला – नबातीय खंडहर',
          'यम्बू – लाल सागर',
          'बद्र – ऐतिहासिक युद्ध',
          'ख़ैबर – ऐतिहासिक नखलिस्तान'
        ],
        instructions: {
          title: 'निर्देश:',
          items: [
            'विवरण देखने के लिए किसी भी मार्कर पर क्लिक करें',
            'ज़ूम इन/आउट के लिए माउस व्हील का उपयोग करें',
            'मानचित्र को खींचकर स्थानांतरित करें'
          ]
        }
      }
    },
    contact: {
      title: 'हमसे संपर्क करें',
      subtitle: 'मदीना की यात्रा से जुड़ी कोई भी पूछताछ',
      form: {
        name: 'पूरा नाम',
        email: 'ईमेल पता',
        phone: 'फ़ोन नंबर',
        message: 'आपका संदेश',
        submit: 'संदेश भेजें'
      }
    },
    activities: {
      title: 'मदीना की गतिविधियाँ',
      subtitle: 'मदीना की श्रेष्ठ गतिविधियाँ और कार्यक्रम जानें',
      cards: [
        { title: 'धार्मिक भ्रमण', desc: 'मस्जिद-ए-नबवी, मस्जिद-ए-क़ुबा, मस्जिद-ए-क़िब्लतैन और ज mount उहुद की यात्रा। प्रमाणित गाइड्स के साथ टूर।', time: '⏰ 2–4 घंटे', price: '💰 50 रियाल से', button: 'अभी बुक करें' },
        { title: 'ऐतिहासिक पर्यटन', desc: 'इस्लामी ऐतिहासिक स्थलों, संग्रहालयों और विरासत बाज़ारों की खोज। मदीना के समृद्ध इतिहास को जानें।', time: '⏰ 3–5 घंटे', price: '💰 80 रियाल से', button: 'अभी बुक करें' },
        { title: 'प्रकृति भ्रमण', desc: 'मदीना की सुंदर प्रकृति का आनंद लें। फ़ार्म, नखलिस्तान और मनोहर पर्वतीय क्षेत्रों की यात्राएँ।', time: '⏰ 4–6 घंटे', price: '💰 120 रियाल से', button: 'अभी बुक करें' },
        { title: 'खरीदारी भ्रमण', desc: 'पारंपरिक बाज़ारों और आधुनिक मॉल्स की खोज। खजूर, इत्र और स्मृति चिह्न खरीदें।', time: '⏰ 2–3 घंटे', price: '💰 30 रियाल से', button: 'अभी बुक करें' },
        { title: 'फूड टूर', desc: 'स्थानीय व्यंजनों और पारंपरिक रेस्तरां का स्वाद लें। स्थानीय कुकिंग और प्रसिद्ध पकवान जानें।', time: '⏰ 2–4 घंटे', price: '💰 100 रियाल से', button: 'अभी बुक करें' },
        { title: 'मेडिकल टूरिज़्म', desc: 'विशेषज्ञ मेडिकल सेंटर, वेलनेस रेज़ॉर्ट्स और प्रीमियम हेल्थकेयर सुविधाओं की यात्रा।', time: '⏰ 1–3 दिन', price: '💰 500 रियाल से', button: 'अभी बुक करें' }
      ]
    }
  },
  id: {
    direction: 'ltr',
    locale: 'id',
    nav: {
      home: 'Beranda',
      problems: 'Tantangan',
      presentation: 'Presentasi',
      features: 'Solusi',
      prayer: 'Waktu Shalat',
      gallery: 'Siapa yang Kami Layani',
      famous: 'Wilayah Terkenal',
      contact: 'Hubungi Kami'
    },
    schedule: {
      headerTitle: 'Jadwal Perjalanan Anda ke Madinah',
      headerSubtitle: 'Rencanakan perjalanan spiritual Anda ke Madinah dan jelajahi landmark sejarah dan religiusnya yang terindah',
      formTitle: 'Informasi Perjalanan',
      start: 'Mulai penjadwalan perjalanan saya',
      generating: 'Sedang membuat jadwal perjalanan Anda…',
      save: '💾 Simpan Jadwal',
      print: '🖨️ Cetak Jadwal',
      backHome: '🏠 Kembali ke Beranda',
      form: {
        arrivalDate: { label: 'Tanggal kedatangan' },
        departureDate: { label: 'Tanggal keberangkatan' },
        peopleCount: { label: 'Jumlah orang' },
        accommodation: {
          label: 'Jenis akomodasi',
          options: {
            hotel: 'Hotel mewah',
            apartment: 'Apartemen',
            guesthouse: 'Guesthouse',
            camping: 'Tenda (musiman)'
          }
        },
        budget: { label: 'Perkiraan anggaran (SAR)', placeholder: 'mis.: 5000' },
        regions: {
          label: 'Wilayah di luar Madinah yang ingin Anda kunjungi',
          cards: [
            { title: '🏛️ Al-Ula', desc: 'Hegra (Madain Saleh) dan peninggalan Nabatea (350 km – 4 jam)' },
            { title: '🌊 Yanbu', desc: 'Mutiara Laut Merah (220 km – 2,5 jam)' },
            { title: '⚔️ Badr', desc: 'Lokasi Perang Badr (150 km – 2 jam)' },
            { title: '🏰 Khaybar', desc: 'Oasis bersejarah Khaybar (170 km – 2,5 jam)' }
          ]
        },
        interests: { label: 'Minat khusus', placeholder: 'Tuliskan minat Anda (mis.: sejarah Islam, arsitektur, alam, dll.)' }
      }
    },
    buttons: {
      login: 'Masuk',
      darkMode: 'Mode Gelap'
    },
    hero: {
      title: 'Al-Madinah Al-Munawwarah',
      subtitle: 'Kota Rasul ﷺ',
      description: 'Jelajahi Madinah, kota tersuci kedua dalam Islam dan rumah Masjid Nabi. Nikmati perjalanan spiritual Anda di kota penuh berkah ini yang kaya akan sejarah Islam.',
      start: '🗺️ Mulai perjalananmu',
      download: '📱 Unduh Aplikasi'
    },
    city: {
      info: 'Informasi Kota',
      city: 'Kota',
      tourismTypes: 'Jenis pariwisata:',
      currentEvent: 'Acara saat ini:',
      noEvents: 'Tidak ada acara saat ini.',
      showMore: 'Lihat detail selengkapnya',
      bestHotels: (name) => `Hotel terbaik di ${name}`,
      bestGuides: (name) => `Pemandu terbaik di ${name}`,
      visitSite: 'Kunjungi situs',
      bookNow: 'Pesan sekarang',
      weatherLoading: 'Memuat cuaca...',
      weatherError: 'Maaf, cuaca tidak tersedia saat ini.'
    },
    schedule: {
      headerTitle: 'Jadwal Perjalanan Anda ke Madinah',
      headerSubtitle: 'Rencanakan perjalanan spiritual Anda ke Madinah dan jelajahi landmark sejarah dan religiusnya yang terindah',
      formTitle: 'Informasi Perjalanan',
      start: 'Mulai penjadwalan perjalanan saya',
      generating: 'Sedang membuat jadwal perjalanan Anda…',
      save: '💾 Simpan Jadwal',
      print: '🖨️ Cetak Jadwal',
      backHome: '🏠 Kembali ke Beranda'
    },
    presentation: {
      title: 'Proyek Kami',
      subtitle: 'Pelajari proyek kami secara detail',
      slide1: {
        title: 'Tantangan yang dihadapi pengunjung di Madinah',
        items: [
          'Sulit menemukan akomodasi berlisensi dekat layanan',
          'Kurangnya informasi tentang aktivitas wisata, religi, dan budaya',
          'Tidak ada cara instan menghubungi layanan pendukung (laundry, toko, pekerja)',
          'Tidak ada solusi khusus bagi wisatawan medis'
        ]
      },
      slide2: {
        title: 'Solusi terintegrasi untuk pengunjung',
        items: [
          'Tampilkan semua akomodasi berlisensi dengan verifikasi lisensi',
          'Daftar aktivitas (religi, budaya, medis) dengan pemesanan instan',
          'Fitur “Terdekat” untuk laundry, toko, pekerja, layanan medis',
          'Panduan tur digital dengan pemesanan pemandu tersertifikasi'
        ]
      },
      slide3: {
        title: 'Madinah… pusat keramahan Islam',
        items: [
          'Kota tersuci kedua dalam Islam, menyambut jutaan peziarah setiap tahun',
          'Destinasi wisata medis yang berkembang dengan fasilitas canggih',
          'Ragam situs bersejarah, perkebunan, dan pasar warisan',
          'Pertumbuhan perhotelan berkelanjutan didorong oleh Visi 2030'
        ]
      },
      slide4: {
        title: 'Fitur yang memudahkan perjalanan Anda',
        items: [
          'Verifikasi lisensi untuk setiap properti sebelum pemesanan',
          'Lihat semua layanan di dekat tempat menginap',
          'Buat jadwal perjalanan personal sesuai minat Anda',
          'Antarmuka multibahasa yang mudah',
          'Integrasi dengan peta dan lembaga resmi'
        ]
      },
      slide5: {
        title: 'Siapa yang kami layani?',
        items: [
          'Peziarah Haji dan Umrah',
          'Wisatawan domestik dan internasional',
          'Pasien dalam program wisata medis',
          'Keluarga yang mencari kenyamanan dan layanan terdekat'
        ]
      },
      slide6: {
        title: 'Dampak kami pada kota dan pengunjung',
        items: [
          'Meningkatkan okupansi hotel berlisensi',
          'Meningkatkan pengalaman dan kepuasan pengunjung',
          'Mendukung ekonomi lokal dengan meningkatkan permintaan layanan',
          'Memperkuat posisi Madinah sebagai pusat keramahtamahan premium'
        ]
      },
      slide7: {
        title: 'Kemitraan kami dengan Dana Pengembangan Pariwisata',
        items: [
          'Pendanaan untuk memperluas basis data dan mengembangkan teknologi',
          'Kemitraan dengan hotel dan fasilitas pariwisata',
          'Dukungan pemasaran untuk menjangkau audiens yang lebih luas',
          'Selaras dengan inisiatif Visi 2030'
        ]
      },
      prev: 'Sebelumnya',
      next: 'Berikutnya',
      swipeHint: 'Geser ke kanan atau kiri untuk navigasi'
    },
    statistics: {
      title: 'Statistik Langsung',
      subtitle: 'Angka yang berbicara sendiri',
      labels: {
        visitors: 'Pengunjung per tahun',
        hotels: 'Hotel berlisensi',
        satisfaction: 'Kepuasan pengunjung %',
        nationalities: 'Kebangsaan berbeda'
      }
    },
    features: {
      title: 'Proyek Kami',
      subtitle: 'Temukan apa yang menjadikan Madinah destinasi spiritual yang unik',
      masjid: { title: 'Masjid Nabawi', desc: 'Salah satu masjid tersuci dalam Islam dengan Kubah Hijau yang terkenal dan Al-Rawdah.' },
      historical: { title: 'Situs bersejarah', desc: 'Jelajahi banyak situs bersejarah seperti Masjid Quba, Gunung Uhud, dan Qiblatain.' },
      nature: { title: 'Alam yang indah', desc: 'Nikmati keindahan alam Madinah dengan pegunungan hijau dan oasis sepanjang tahun.' },
      stay: { title: 'Akomodasi premium', desc: 'Pilih dari berbagai hotel dan resor mewah dekat Masjid Nabawi.' },
      food: { title: 'Masakan lokal', desc: 'Cicipi hidangan lokal lezat dan makanan tradisional khas Madinah.' },
      guides: { title: 'Pemandu profesional', desc: 'Manfaatkan pemandu wisata ahli yang mengetahui Madinah secara detail.' }
    },
    prayer: {
      title: 'Waktu Shalat',
      subtitle: 'Waktu shalat hari ini di Madinah',
      names: { fajr: 'Subuh', dhuhr: 'Dzuhur', asr: 'Ashar', maghrib: 'Maghrib', isha: 'Isya' }
    },
    gallery: {
      title: 'Landmark Madinah',
      subtitle: 'Jelajahi landmark terindah di Madinah',
      items: [
        'Masjid Nabawi',
        'Masjid Quba',
        'Gunung Uhud',
        'Masjid Qiblatain',
        'Keindahan alam Madinah',
        'Interior Masjid Quba'
      ]
    },
    famous: {
      title: 'Wilayah Terkenal',
      subtitle: 'Jelajahi wilayah populer dan kota terdekat di sekitar Madinah',
      cards: [
        { title: 'Al-Ula', desc: 'Kota sejarah dan peninggalan, termasuk Hegra (Madain Saleh), Benteng Al-Ula, dan situs kuno lainnya', distance: '📍 350 km dari Madinah', duration: '⏰ 4 jam berkendara', button: 'Jelajahi Al-Ula' },
        { title: 'Yanbu', desc: 'Mutiara Laut Merah, populer dengan pantai indah, pemandangan menawan, dan aktivitas bahari', distance: '📍 220 km dari Madinah', duration: '⏰ 2,5 jam berkendara', button: 'Jelajahi Yanbu' },
        { title: 'Badr', desc: 'Lokasi Perang Badr, pertempuran penting dalam sejarah Islam; memiliki Museum Badr dan situs bersejarah', distance: '📍 150 km dari Madinah', duration: '⏰ 2 jam berkendara', button: 'Jelajahi Badr' },
        { title: 'Khaybar', desc: 'Oasis bersejarah dan lokasi Ekspedisi Khaybar; terkenal dengan benteng kuno dan kebun kurma lebat', distance: '📍 170 km dari Madinah', duration: '⏰ 2,5 jam berkendara', button: 'Jelajahi Khaybar' }
      ]
    },
    testimonials: {
      title: 'Ulasan Pengunjung',
      subtitle: 'Pengalaman nyata dari pengunjung Madinah'
    },
    map: {
      title: 'Peta Interaktif',
      subtitle: 'Temukan landmark dan layanan utama di Madinah',
      legend: {
        title: 'Lokasi di peta',
        items: [
          'Madinah',
          'Al-Ula – Peninggalan Nabatea',
          'Yanbu – Laut Merah',
          'Badr – Pertempuran bersejarah',
          'Khaybar – Oasis bersejarah'
        ],
        instructions: {
          title: 'Instruksi:',
          items: [
            'Klik penanda mana pun untuk melihat detail',
            'Gunakan roda mouse untuk memperbesar/perkecil',
            'Seret peta untuk berpindah'
          ]
        }
      }
    },
    contact: {
      title: 'Hubungi Kami',
      subtitle: 'Pertanyaan tentang perjalanan Anda ke Madinah',
      form: {
        name: 'Nama lengkap',
        email: 'Alamat email',
        phone: 'Nomor telepon',
        message: 'Pesan Anda',
        submit: 'Kirim pesan'
      }
    }
  }
};

function applyTranslations(langCode) {
  const dict = i18nDictionaries[langCode] || i18nDictionaries.ar;
  // Direction and lang on root
  document.documentElement.setAttribute('lang', dict.locale);
  document.documentElement.setAttribute('dir', dict.direction);

  // Nav/hero and any other data-i18n nodes
  document.querySelectorAll('[data-i18n]').forEach(node => {
    const key = node.getAttribute('data-i18n');
    const parts = key.split('.');
    let value = dict;
    for (const p of parts) {
      value = value?.[p];
    }
    if (typeof value === 'string') {
      if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
        // If there's a placeholder string at this key, use placeholder; otherwise set value
        const placeholderKey = key + '.placeholder';
        let placeholderValue = dict;
        for (const p of placeholderKey.split('.')) placeholderValue = placeholderValue?.[p];
        if (typeof placeholderValue === 'string') node.setAttribute('placeholder', placeholderValue);
        else node.setAttribute('placeholder', value);
      } else if (node.tagName === 'OPTION') {
        node.textContent = value;
      } else {
        node.textContent = value;
      }
    }
  });

  // Update dynamic city details labels if currently rendered
  const detailsContainer = document.getElementById('cityDetailsHero');
  if (detailsContainer && detailsContainer.classList.contains('active')) {
    // Attempt to re-render with the last selected city
    const activeCard = document.querySelector('#cityGridHero .city-card.active');
    const cityName = activeCard ? activeCard.getAttribute('data-city') : null;
    if (cityName) {
      renderCityDetails(cityName);
    }
  }
}

// Apply saved language (or default ar) on load
document.addEventListener('DOMContentLoaded', function() {
  const savedLang = localStorage.getItem('preferred_language') || 'ar';
  applyTranslations(savedLang);
});

// Ensure late-loaded content (like forms) also gets translated after all scripts/styles
window.addEventListener('load', function() {
  const savedLang = localStorage.getItem('preferred_language') || 'ar';
  applyTranslations(savedLang);
});

// Listen to language change from the dropdown and re-apply
document.addEventListener('languageChanged', function(e) {
  const lang = e.detail?.lang || 'ar';
  applyTranslations(lang);
  // Reload locale-specific datasets if available
  loadCitiesForLocale(lang);
});

function showCityDetailsOverlayMobile() {
  const details = document.getElementById('cityDetailsHero');
  const grid = document.getElementById('cityGridHero');
  if (!details || !grid) return;
  details.classList.add('active');
  grid.classList.add('hide');
  document.body.style.overflow = 'hidden'; // lock scroll
  // Remove old close button if present
  const oldBtn = details.querySelector('.city-details-close');
  if (oldBtn) oldBtn.remove();
  // Add close button
  const btn = document.createElement('button');
  btn.className = 'city-details-close';
  btn.innerHTML = '&times;';
  btn.onclick = function(e) {
    e.stopPropagation();
    hideCityDetailsOverlayMobile();
  };
  details.prepend(btn);
  // Close when clicking outside the content (but not on the content itself)
  details.onclick = function(e) {
    if (e.target === details) hideCityDetailsOverlayMobile();
  };
}
function hideCityDetailsOverlayMobile() {
  const details = document.getElementById('cityDetailsHero');
  const grid = document.getElementById('cityGridHero');
  if (!details || !grid) return;
  details.classList.remove('active');
  grid.classList.remove('hide');
  document.body.style.overflow = ''; // restore scroll
  // Remove close button to avoid duplicates
  const btn = details.querySelector('.city-details-close');
  if (btn) btn.remove();
  // Remove the click handler to avoid memory leaks
  details.onclick = null;
}

// Patch city card click for mobile overlay
function enableHeroCityCardClicks() {
  const grid = document.getElementById('cityGridHero');
  if (!grid) return;
  grid.querySelectorAll('.city-card').forEach(card => {
    card.onclick = function() {
      const cityName = card.getAttribute('data-city');
      renderCityDetails(cityName);
      if (window.innerWidth <= 768) {
        showCityDetailsOverlayMobile();
      }
    };
  });
}

// Floating Icons Scroll Control and Up/Down Functionality
document.addEventListener('DOMContentLoaded', function() {
  const floatingIcons = document.querySelector('.floating-icons');
  const aboutSection = document.querySelector('.about-section');
  const scrollUpIcon = document.getElementById('scrollUpIcon');
  const scrollDownIcon = document.getElementById('scrollDownIcon');

  let lastScrollY = window.scrollY;
  let ticking = false;

  // Show/hide icons after about section and make them follow
  function updateFloatingIcons() {
    if (!floatingIcons || !aboutSection) return;
    
    const aboutSectionBottom = aboutSection.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    
    if (aboutSectionBottom < 0) {
      floatingIcons.style.display = 'flex';
      
      // Calculate position based on scroll
      const maxScroll = document.body.scrollHeight - windowHeight;
      const scrollPercentage = (scrollY / maxScroll) * 100;
      
      // Position the icons relative to viewport with smooth following
      floatingIcons.style.position = 'fixed';
      floatingIcons.style.right = '20px';
      
      // Calculate the vertical position based on scroll
      const viewportHeight = window.innerHeight;
      const minTop = 20; // Minimum distance from top
      const maxTop = viewportHeight - floatingIcons.offsetHeight - 20; // Maximum distance from top
      const targetTop = minTop + (scrollPercentage / 100) * (maxTop - minTop);
      
      // Apply smooth transition
      floatingIcons.style.transition = 'top 0.3s ease-out';
      floatingIcons.style.top = `${targetTop}px`;
      floatingIcons.style.zIndex = '1000';
    } else {
      floatingIcons.style.display = 'none';
    }
    
    ticking = false;
  }

  // Use requestAnimationFrame for smooth scrolling
  function onScroll() {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateFloatingIcons();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Update on scroll and resize
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateFloatingIcons);
  updateFloatingIcons(); // Run on load

  // Scroll up
  if (scrollUpIcon) {
    scrollUpIcon.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // Scroll down
  if (scrollDownIcon) {
    scrollDownIcon.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
  }
});
