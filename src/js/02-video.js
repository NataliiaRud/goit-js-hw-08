import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(timeRecord, 1000));

function timeRecord({ duration, percent, seconds }) {
  localStorage.setItem('videoplayer-current-time', seconds);
}

try {
  player.setCurrentTime(
    JSON.parse(localStorage.getItem('videoplayer-current-time') || 0)
  );
} catch (error) {
  console.log(error.name);
}
