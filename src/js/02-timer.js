import { Report } from 'notiflix/build/notiflix-report-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btnStart = document.querySelector('button[data-start]');
const refs = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
      // return window.alert('Please choose a date in the future');
      return Report.failure(
        'Error',
        'Please choose a date in the future',
        'Okay',
);
    }

    // const day = selectedDates[0].getDate();
    // const hours = selectedDates[0].getHours();
    // const minutes = selectedDates[0].getMinutes();
    // const seconds = selectedDates[0].getSeconds();
    // console.log('day', day);
    // console.log('hours', hours);
    // console.log('minutes', minutes);
    // console.log('seconds', seconds);

    btnStart.disabled = false;

    btnStart.addEventListener('click', () => {
      // refs.days.textContent = day;
      // refs.hours.textContent = hours;
      // refs.minutes.textContent = minutes;
      // refs.seconds.textContent = seconds;

      const timerId = setInterval(() => {
        const timer = selectedDates[0].getTime() - Date.now();
        const { days, hours, minutes, seconds } = convertMs(timer);
        console.log(`${days}:${hours}:${minutes}:${seconds}`);

        refs.days.textContent = days;
        refs.hours.textContent = hours;
        refs.minutes.textContent = minutes;
        refs.seconds.textContent = seconds;

        if (`${days}:${hours}:${minutes}:${seconds}` === '00:00:00:00') {
          clearInterval(timerId);
        }
      }, 1000)
    });
  },
};

flatpickr('input[type="text"]', options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}