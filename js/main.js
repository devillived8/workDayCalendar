
    const shiftCycle = [
      'night', 'night',
      'off', 'off',
      'day-shift', 'day-shift',
      'off', 'off'
    ];

    const startDate = new Date(2025, 6, 26); // 26 июля 2025 — ночная смена
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    const calendar = document.getElementById("calendar");
    const monthLabel = document.getElementById("month-label");
    const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

 function renderCalendar(month, year, highlightedDate = null) {
  calendar.innerHTML = "";

  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);
  const daysInMonth = monthEnd.getDate();

  const monthName = monthStart.toLocaleString('ru-RU', { month: 'long' });
  monthLabel.textContent = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`;

  // Заголовки дней недели (воскресенье в конце)
  for (let d = 0; d < 7; d++) {
    const header = document.createElement('div');
    header.className = 'day day-header';
    header.textContent = dayNames[d];
    calendar.appendChild(header);
  }

  // Корректировка первого дня недели (1 = понедельник, 0 = воскресенье)
  let firstDay = monthStart.getDay();
  // Преобразуем воскресенье (0) в 6, остальные дни уменьшаем на 1
  firstDay = firstDay === 0 ? 6 : firstDay - 1;

  // Пустые ячейки перед первым днем месяца
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    empty.className = 'day';
    calendar.appendChild(empty);
  }

  const msPerDay = 24 * 60 * 60 * 1000;

  // Дни месяца
  for (let date = 1; date <= daysInMonth; date++) {
    const currentDate = new Date(year, month, date);
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';
    dayDiv.textContent = date;

    const daysSinceStart = Math.floor((currentDate - startDate) / msPerDay);
    if (!isNaN(daysSinceStart)) {
      const index = ((daysSinceStart % shiftCycle.length) + shiftCycle.length) % shiftCycle.length;
      const shift = shiftCycle[index];
      dayDiv.classList.add(shift);
    }

    if (
      highlightedDate &&
      currentDate.getFullYear() === highlightedDate.getFullYear() &&
      currentDate.getMonth() === highlightedDate.getMonth() &&
      currentDate.getDate() === highlightedDate.getDate()
    ) {
      dayDiv.classList.add('selected-date');
    }

    calendar.appendChild(dayDiv);
  }
}


    function changeMonth(direction) {
      currentMonth += direction;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear -= 1;
      } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear += 1;
      }
      renderCalendar(currentMonth, currentYear);
    }

    function goToToday() {
  const today = new Date();
  currentMonth = today.getMonth();
  currentYear = today.getFullYear();
  renderCalendar(currentMonth, currentYear);
  document.getElementById('datePicker').value = '';
}

function goToDate() {
  const input = document.getElementById('datePicker').value;
  if (!input) return;

  const selected = new Date(input);
  currentMonth = selected.getMonth();
  currentYear = selected.getFullYear();
  renderCalendar(currentMonth, currentYear, selected);
}



    renderCalendar(currentMonth, currentYear);






    // PARTICLES

    window.addEventListener('load', () => {
  particlesJS('particles-js', {
    "particles": {
      "number": { "value": 50, "density": { "enable": true, "value_area": 800 }},
      "color": { "value": "#007BFF" },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.5, "random": true },
      "size": { "value": 3, "random": true },
      "move": { "enable": true, "speed": 2, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": { "enable": true, "mode": "grab" },
        "onclick": { "enable": true, "mode": "push" }
      },
      "modes": {
        "grab": { "distance": 150, "line_linked": { "opacity": 0.6 }},
        "push": { "particles_nb": 4 }
      }
    },
    "retina_detect": true
  });
});