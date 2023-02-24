import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const { email, message } = formEl.elements;

function feedbackSaver(event) {
  event.preventDefault();
  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify({
      email: email.value,
      message: message.value,
    })
  );
}
feedbackLoader();

function feedbackLoader() {
  const savedFeedback = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (savedFeedback) {
    email.value = savedFeedback.email;
    message.value = savedFeedback.message;
  }
}

function onSubmit(event) {
  event.preventDefault();
  if (email.value === '' || message.value === '') {
    return alert('fill all fields');
  }
  const savedFeedback = JSON.parse(localStorage.getItem('feedback-form-state'));
  const object = {
    email: savedFeedback.email,
    message: savedFeedback.message,
  };
  console.log(object);
  event.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}
formEl.addEventListener('input', throttle(feedbackSaver, 500));
formEl.addEventListener('submit', onSubmit);
