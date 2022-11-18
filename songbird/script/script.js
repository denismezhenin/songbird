import birdsDataRu from './birds-data.js';
import birdsDataEn from './birds-data-en.js';
import translation from './language.js';

// fill with text start
let birdsData;

let language = localStorage.getItem('lan');
if (!localStorage.getItem('lan')) {
  language = 'ru';
}

const languageSelect = document.querySelectorAll('.language-selection')


languageSelect.forEach((element, index) => {
  element.innerHTML.toLocaleLowerCase() == language ? element.classList.add('language-selection_active') : element.classList.remove('language-selection_active');
  element.addEventListener('click', () => {
    if (index == 0) {
      language = 'ru';
      birdsData = birdsDataRu; 
      localStorage.setItem('lan', language);
      setText();
      showVariants();
      languageSelect[0].classList.add('language-selection_active');
      languageSelect[1].classList.remove('language-selection_active');
    } else {
      language = 'en';
      birdsData = birdsDataEn;
      localStorage.setItem('lan', language);
      showVariants();
      setText();
      languageSelect[0].classList.remove('language-selection_active');
      languageSelect[1].classList.add('language-selection_active');
    }
  });
});

const setText = () => {
  document.querySelector('.start__button').textContent = translation[1][0].startbutton[language];
  document.querySelector('.quiz_button').textContent = translation[1][0].nextLevel[language];
  document.querySelector('.variant__base__words').textContent = translation[1][0].variantPreview[language];
  document.querySelector('.score__text').textContent = translation[1][0].score[language];
};
setText();

language == 'en' ? birdsData = birdsDataEn : birdsData = birdsDataRu; 

const levels = document.querySelectorAll('.level');
let level = 0;

// console.log(birdsData[level].sort(() => Math.random() - 0.5))

levels.forEach((el, index) => {
  el.textContent = translation[0][index][language];
});

// fill with text end
// mix variants start

let variants = Array.from(document.querySelectorAll('.variant'));

const SortArray = (arr) => {
  arr = arr.sort(() => Math.random() - 0.5);
  return arr;
}
SortArray(variants);

const showVariants = () => {
  //  variants = SortArray(variants);
  // console.log(sortArray)
  variants.forEach((el, index) => {
    el.textContent = birdsData[level][index].name;
  });
}

showVariants();
// variants[0].dataset = '1'

// mix variants end

// variant description start
const variantImage = document.querySelector('.variant__image');
const variantName = document.querySelector('.variant__name');
const variantLatinName = document.querySelector('.variant__name-latin');
const variantDescription = document.querySelector('.variant__description');
const variantsWrapper = document.querySelector('.variant__wrapper');

variantsWrapper.style.display = 'none';

const getVariant = (index) => {
  variantsWrapper.style.display = '';
  variantImage.src = birdsData[level][index].image;
  variantName.textContent = birdsData[level][index].name;
  variantLatinName.textContent = birdsData[level][index].species;
  variantDescription.textContent = birdsData[level][index].description;
};

variants.forEach((el, index) => {
  el.addEventListener('click', () => {
    console.log(index);
    getVariant(index);
    isRight(index);
  });
});

// variant description end

// score start

const score = document.querySelector('.score__number');

const scoreBuffer = new Set();

const addScore = (arr) => {
  // console.log(scoreBuffer)
  if (!NextLevelButton.classList.contains('quiz_button_active')) {
    score.innerHTML = +score.innerHTML + 5 - arr.size;
    scoreBuffer.clear();
  }
}

// score end

// card quiz card start

const birdImage = document.querySelector('.quiz__card__img');
const birdName = document.querySelector('.quiz__card__name');
const NextLevelButton = document.querySelector('.quiz_button');
let randomNum;

const getRandomNumber = () => {
  randomNum = Math.round(Math.random() * 5);
  // console.log(randomNum)
};
getRandomNumber();

const showRightAnswer = () => {
  birdImage.src = birdsData[level][randomNum].image;
  birdName.textContent = birdsData[level][randomNum].name;
}

const highlightLevel = () => {
  levels.forEach((el, index) => {
    if (level == index) {
      levels[index].classList.add('level_active');
      // eslint-disable-next-line no-unused-expressions
      level != 0 ? levels[index - 1].classList.remove('level_active') : null;
    }
  });
};
highlightLevel();

const returnToBase = () => {
  variantsWrapper.style.display = 'none';
  birdImage.src = './assets/images/bird.jpg';
  birdName.textContent = '*****';
};

const nextLevel = () => {
  level += 1;
  // SortArray(variants);
  showVariants();
  NextLevelButton.removeEventListener('click', nextLevel);
  NextLevelButton.classList.remove('quiz_button_active');
  getRandomNumber();
  returnToBase();
  highlightLevel();
  scoreBuffer.clear();
};

const activatedNextLevelButton = () => {
  NextLevelButton.classList.add('quiz_button_active');
  NextLevelButton.addEventListener('click', nextLevel);
};

const isRight = (index) => {
  if (index == randomNum) {
    changeCircleColor(index, 'green');
    playSound('right');
    showRightAnswer();
    addScore(scoreBuffer);
    activatedNextLevelButton();
  } else {
    scoreBuffer.add(index);
    changeCircleColor(index, 'red');
    playSound('wrong');
    console.log(scoreBuffer);
  }
};

const changeCircleColor = (index, color) => {
  if (!NextLevelButton.classList.contains('quiz_button_active')) {
    variants[index].style.setProperty('--circleColor', `${color}`);
  };
};

const playSound = (type) => {
  if (!NextLevelButton.classList.contains('quiz_button_active')) {
    const audio = new Audio(`../assets/audio/${type}.mp3`);
    audio.volume = 0.5;
    audio.play();
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
  console.log(volumeContainerWidth);
  // console.log(parseInt(volumeContainerWidth, 10))
  console.log(skipVolume);
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
