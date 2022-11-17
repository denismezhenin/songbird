import birdsData from './birds-data.js';
import language from './language.js';

// fill with text start
const levels = document.querySelectorAll('.level');
let level = 0;

levels.forEach((el, index) => {
  el.textContent = language[0][index].section;
});

// fill with text end
// mix variants start

let variants = Array.from(document.querySelectorAll('.variant'));

const SortArray = (arr) => {
  arr = arr.sort(() => Math.random() - 0.5);
  return arr;
}

const showVariants = () => {
  variants = SortArray(variants);
  // console.log(sortArray)
  variants.forEach((el, index) => {
    el.textContent = birdsData[level][index].name;
  });
}

showVariants()




// mix variants end

// variant description start
const variantImage = document.querySelector('.variant__image');
const variantName = document.querySelector('.variant__name');
const variantLatinName = document.querySelector('.variant__name-latin');
const variantDescription = document.querySelector('.variant__description');
const variantsWrapper = document.querySelector('.variant__wrapper');

variantsWrapper.style.display = 'none'

const getVariant = (index) => {
  variantsWrapper.style.display = ''
  variantImage.src = birdsData[level][index].image;
  variantName.textContent = birdsData[level][index].name;
  variantLatinName.textContent = birdsData[level][index].species;
  variantDescription.textContent = birdsData[level][index].description;
};

variants.forEach((el, index) => {
  el.addEventListener('click', () => {
    // console.log(index);
    getVariant(index);
    isRight(index);
  });
});

// variant description end

// card quiz card start

const birdImage = document.querySelector('.quiz__card__img');
const birdName = document.querySelector('.quiz__card__name');
const NextLevelButton = document.querySelector('.quiz_button');
let randomNum; 

const getRandomNumber = () => {
  randomNum = Math.round(Math.random() * 5);
  // console.log(randomNum)
}
getRandomNumber();

const showRightAnswer = () => {
  birdImage.src = birdsData[level][randomNum].image;
  birdName.textContent = birdsData[level][randomNum].name;
}

const highlightLevel = () => {
  levels.forEach((el, index) => {
   if (level == index) {
    levels[index].classList.add('level_active')
    level != 0 ? levels[index - 1].classList.remove('level_active') : null
   }
  
  });
}
highlightLevel()

const returnToBase = () => {
  variantsWrapper.style.display = 'none'
  birdImage.src = './assets/images/bird.jpg'
  birdName.textContent = '*****';
}

const nextLevel = () => {
  showVariants()
  NextLevelButton.removeEventListener('click', nextLevel)
  NextLevelButton.classList.remove('quiz_button_active')
  getRandomNumber()
  returnToBase()
  highlightLevel()
}

const activatedNextLevelButton = () => {
  NextLevelButton.classList.add('quiz_button_active')
  NextLevelButton.addEventListener('click', nextLevel)
}

const isRight = (index) => {
  if (index == randomNum) {
    showRightAnswer()
    level++
    activatedNextLevelButton()
};
};


// card quiz card end

// audio starts

const audioTimeline = document.querySelector('.audio__timeline');
const audioProgressBar = document.querySelector('.audio__progress-bar');
const audioPlayButton = document.querySelector('.audio__play-button');
const audioCurrent = document.querySelector('.audio__current-time');
const audioTotalTime = document.querySelector('.audio__total-time');
const audioVolumeButton = document.querySelector('.audio__volume-button');
const audioVolumeRange = document.querySelector('.audio__volume-range');
const audioVolumeValue = document.querySelector('.audio__value');

const getAudioTime = (num) => {
  let seconds = parseInt(num, 10);
  const minutes = parseInt(seconds / 60, 10);
  // console.log(num)
  seconds -= minutes * 60;
  return `${minutes}:${String(seconds).padStart(2, 0)}`;
};

const audio = new Audio(`${birdsData[level][randomNum].audio}`);

audio.addEventListener(
  'loadeddata',
  () => {
    audioTotalTime.textContent = getAudioTime(audio.duration);
    audio.volume = 0.75;
  },
);

audioTimeline.addEventListener('click', (e) => {
  const rangeWidth = window.getComputedStyle(audioTimeline).width;
  const skipTime = (e.offsetX / parseInt(rangeWidth, 10)) * audio.duration;
  audio.currentTime = skipTime;
});

audioVolumeRange.addEventListener('click', (e) => {
  const volumeContainerWidth = window.getComputedStyle(audioVolumeRange).width;
  const skipVolume = e.offsetX / parseInt(volumeContainerWidth, 10);
  // console.log(e.offsetX)
  console.log(volumeContainerWidth)
  // console.log(parseInt(volumeContainerWidth, 10))
  console.log(skipVolume)
  audio.volume = skipVolume;
  audioVolumeValue.style.width = `${skipVolume * 100}%`;
  // console.log(audio.volume);
});

setInterval(() => {
  audioProgressBar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
  audioCurrent.textContent = getAudioTime(audio.currentTime);
}, 250);

const playAudio = () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  };
};
const tooglePlayButton = () => {
  audioPlayButton.classList.toggle('pause');
};

const toogleVolumeButton = () => {
  audioVolumeButton.classList.toggle('mute');
};

const muteAudio = () => {
  if (audio.muted) {
    audio.muted = false;
  } else {
    audio.muted = true;
  }
};

audioPlayButton.addEventListener('click', playAudio);
audioPlayButton.addEventListener('click', tooglePlayButton);
audioVolumeButton.addEventListener('click', toogleVolumeButton);
audioVolumeButton.addEventListener('click', muteAudio);
audio.onended = () => tooglePlayButton();

// audio ends

