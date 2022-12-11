import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');


formRef.addEventListener('submit', getData);

function getData(evt) {
  evt.preventDefault();
  const {
    elements: { delay, step, amount }
  } = evt.currentTarget;
  // let promises = [];
  for (let index = 0; index < amount.value; index++) {
    let timeOut = +delay.value + (+step.value * index);

    createPromise(index+1, timeOut)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      })
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay)
  })
}

