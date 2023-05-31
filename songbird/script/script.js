import birdsDataRu from './birds-data.js';
import birdsDataEn from './birds-data-en.js';
import translation from './language.js';

// start screen start
const setBg = async () => {
  const img = new Image();
  img.src = await ('./assets/images/game.png');
  document.body.style.backgroundImage = `url('${img.src}')`;
};

const quiz = document.querySelector('.quiz');
const startButton = document.querySelector('.start__button');
const startWrapper = document.querySelector('.start');
const header = document.querySelector('.header');
const levels = document.querySelectorAll('.level');
let isGameStart = false;

const startGame = async () => {
  if (!isGameStart) {
    await setBg();
    addEventlistenersToVariats();
    audioHandlers(quizCard, 'card');
    rangeHadler(quizCard, 'card');
    volumeHandler(quizCard, 'card');
    audioHandlers(variantsWrapper, 'variant');
    rangeHadler(variantsWrapper, 'variant');
    volumeHandler(variantsWrapper, 'variant');
    setInt(quizCard, 'card');
    setInt(variantsWrapper, 'variant');
    setInt(gallery, 'gallery');
    audioHandlers(gallery, 'gallery');
    rangeHadler(gallery, 'gallert');
    volumeHandler(gallery, 'gallery');
  }
  isGameStart = true;
  NextLevelButton.removeEventListener('click', nextLevel);
  NextLevelButton.classList.remove('quiz_button_active');
  quiz.style.display = 'flex';
  header.style.display = 'flex';
  winMessageWrapper.style.display = 'none';
  startWrapper.style.display = 'none';
  galleryCardWrapper.classList.remove('gallery__card__wrapper_active');
  level = 0;
  showVariants();
  getRandomNumber();
  returnToBase();
  highlightLevel();
  scoreBuffer.clear();
  score.textContent = 0;
  changeCircleColorToBase();
  await newMusic('card', randomNum);
  await newMusic('variant', randomNum);
  await newMusic('gallery', randomNum);
}

const addEventlistenersToVariats = () => {
  variants.forEach((el, index) => {
    el.addEventListener('click', () => {
      getVariant(variantsWrapper, index);
      document.querySelector('.variant__base__words').style.display = 'none';
      isRight(index, birdsData[level][index].id);
    });
  });
};

startButton.addEventListener('click', startGame);

// start screen end

// fill with text start
let birdsData;

let language = localStorage.getItem('lan');
if (!localStorage.getItem('lan')) {
  language = 'en';
}

const languageSelect = document.querySelectorAll('.language-selection');
language == 'en' ? birdsData = birdsDataEn : birdsData = birdsDataRu; 

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
  document.querySelector('.gallery-page').textContent = translation[1][0].gallery[language];
  levels.forEach((el, index) => {
    el.textContent = translation[0][index][language];
  });
};
setText();

let level = 0;

// fill with text end
// mix variants start

let variants = Array.from(document.querySelectorAll('.variant'));


const showVariants = () => {
  const temp = birdsData[level];
  temp.sort(() => Math.random() - 0.5);
  variants.forEach((el, index) => {
    el.textContent = birdsData[level][index].name;
  });
};

// mix variants end

// variant description start
const variantsWrapper = document.querySelector('.variant__wrapper');

variantsWrapper.style.display = 'none';

const getVariant = async (parent, index) => {
  if (!variantAudio.paused) {
    variantAudio.pause();
    variantsWrapper.querySelector('.audio__play-button').classList.remove('pause');
  }
  await newMusic('variant', index);
  parent.style.display = '';
  parent.querySelector('.variant__image').src = birdsData[level][index].image;
  parent.querySelector('.variant__name').textContent = birdsData[level][index].name;
  parent.querySelector('.variant__name-latin').textContent = birdsData[level][index].species;
  parent.querySelector('.variant__description').textContent = birdsData[level][index].description;
};

// variant description end

// score start

const score = document.querySelector('.score__number');

const scoreBuffer = new Set();

const addScore = (arr) => {
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
let rightAnswer;

const getRandomNumber = () => {
  randomNum = Math.round(Math.random() * 5);
  rightAnswer = birdsData[level][randomNum].id;
};

const showRightAnswer = () => {
  birdImage.src = birdsData[level][randomNum].image;
  birdName.textContent = birdsData[level][randomNum].name;
};

const highlightLevel = () => {
  levels.forEach((el, index) => {
    if (level == index) {
      levels[index].classList.add('level_active');
    } else {
      levels[index].classList.remove('level_active');
    }
  });
};
// highlightLevel();

const returnToBase = () => {
  variantsWrapper.style.display = 'none';
  birdImage.src = './assets/images/bird.jpg';
  birdName.textContent = '*****';
  document.querySelector('.variant__base__words').style.display = 'block';
};

const nextLevel = async () => {
  if (level == 5) {
    showWinMessage();
    NextLevelButton.classList.remove('quiz_button_active');
    stopaduioPlayer();
  } else {
    level += 1;
    stopaduioPlayer();
    showVariants();
    showVariants();
    NextLevelButton.removeEventListener('click', nextLevel);
    NextLevelButton.classList.remove('quiz_button_active');
    getRandomNumber();
    returnToBase();
    highlightLevel();
    scoreBuffer.clear();
    changeCircleColorToBase();
    await newMusic('card', randomNum);
  }
};

const activatedNextLevelButton = () => {
  NextLevelButton.classList.add('quiz_button_active');
  NextLevelButton.addEventListener('click', nextLevel);
};

const isRight = (index, variantNumber) => {
  if (variantNumber == rightAnswer) {
    changeCircleColor(index, 'green');
    playSound('right');
    showRightAnswer();
    addScore(scoreBuffer);
    activatedNextLevelButton();
    if (!cardAduio.paused) {
      cardAduio.pause();
      quizCard.querySelector('.audio__play-button').classList.remove('pause');
    }
  } else {
    scoreBuffer.add(index);
    changeCircleColor(index, 'red');
    playSound('wrong');
  }
};

const changeCircleColor = (index, color) => {
  if (!NextLevelButton.classList.contains('quiz_button_active')) {
    variants[index].style.setProperty('--circleColor', `${color}`);
  };
};

const changeCircleColorToBase = () => {
  variants.forEach(el => el.style.setProperty('--circleColor', `#376588`));
};

const playSound = (type) => {
  if (!NextLevelButton.classList.contains('quiz_button_active')) {
    const audio = new Audio(`./assets/audio/${type}.mp3`);
    audio.volume = 0.5;
    audio.play();
  }
};

// card quiz card end

// audio starts

const quizCard = document.querySelector('.quiz__card');

const getAudioTime = (num) => {
  let seconds = parseInt(num, 10);
  const minutes = parseInt(seconds / 60, 10);
  seconds -= minutes * 60;
  return `${minutes}:${String(seconds).padStart(2, 0)}`;
};
let interval;
let cardAduio;
let variantAudio;
let galleryAudio;

const newMusic = async (type, number) => {
  let tempAudio = await `${birdsData[level][number].audio}`;
  if (type == 'card') {
    cardAduio = new Audio(tempAudio);
    setAudioTime(quizCard, cardAduio);
    cardAduio.onended = () => {
      quizCard.querySelector('.audio__play-button').classList.remove('pause');
      cardAduio.currentTime = 0;
    }
  } else if (type == 'variant') {
    variantAudio = new Audio(tempAudio);
    setAudioTime(variantsWrapper, variantAudio);
    variantAudio.onended = () => {
      variantsWrapper.querySelector('.audio__play-button').classList.remove('pause');
      variantAudio.currentTime = 0;
    };
  } else {
    galleryAudio = new Audio(tempAudio);
    setAudioTime(gallery, galleryAudio);
    galleryAudio.onended = () => {
      gallery.querySelector('.audio__play-button').classList.remove('pause');
      galleryAudio.currentTime = 0;
    };
  }
};

const setAudioTime = (parent, audio) => {
  audio.addEventListener(
    'loadeddata',
    () => {
      parent.querySelector('.audio__total-time').textContent = getAudioTime(audio.duration);
    },
  );
}

const rangeHadler = (parent, type) => {
  parent.querySelector('.audio__timeline').addEventListener('click', (e) => {
    let audio;
    if (type == 'card') {
      audio = cardAduio;
    } else if (type == 'variant') {
      audio = variantAudio;
    } else {
      audio = galleryAudio;
    }
    const rangeWidth = window.getComputedStyle(parent.querySelector('.audio__timeline')).width;
    const skipTime = (e.offsetX / parseInt(rangeWidth, 10)) * audio.duration;
    audio.currentTime = skipTime;
  });
};

const volumeHandler = (parent, type) => {
  parent.querySelector('.audio__volume-range').addEventListener('click', (e) => {
    let audio;
    if (type == 'card') {
      audio = cardAduio;
    } else if (type == 'variant') {
      audio = variantAudio;
    } else {
      audio = galleryAudio;
    }
    const volumeContainerWidth = window.getComputedStyle(parent.querySelector('.audio__volume-range')).width;
    const skipVolume = e.offsetX / parseInt(volumeContainerWidth, 10);
    audio.volume = skipVolume;
    parent.querySelector('.audio__value').style.width = `${skipVolume * 100}%`;
  });
}

const intervalHandler = (parent, type) => {
  let audio;
  if (type == 'card') {
    audio = cardAduio;
  } else if (type == 'variant') {
    audio = variantAudio;
  } else {
    audio = galleryAudio;
  }
  // let audio
  // type == 'card' ? audio = cardAduio : audio = variantAudio;
  parent.querySelector('.audio__progress-bar').style.width = `${(audio.currentTime / audio.duration) * 100}%`;
  parent.querySelector('.audio__current-time').textContent = getAudioTime(audio.currentTime);
}

const setInt = (parent, type) => {
  interval = setInterval(intervalHandler, 250, parent, `${type}`);
};

const stopaduioPlayer = () => {
  if (!cardAduio.paused) {
    cardAduio.pause();
    quizCard.querySelector('.audio__play-button').classList.remove('pause');
  }
  if (!variantAudio.paused) {
    variantAudio.pause();
    variantsWrapper.querySelector('.audio__play-button').classList.remove('pause');
  }
  if (!galleryAudio.paused) {
    galleryAudio.pause();
    gallery.querySelector('.audio__play-button').classList.remove('pause');
  }
}

const playAudio = (type) => {
  let audio;
  if (type == 'card') {
    audio = cardAduio;
  } else if (type == 'variant') {
    audio = variantAudio;
  } else {
    audio = galleryAudio;
  }
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  };
};

const tooglePlayButton = (parent) => {
  parent.querySelector('.audio__play-button').classList.toggle('pause');
};

const toogleVolumeButton = (parent) => {
  parent.querySelector('.audio__volume-button').classList.toggle('mute');
};

const muteAudio = (type) => {
  let audio;
  if (type == 'card') {
    audio = cardAduio;
  } else if (type == 'variant') {
    audio = variantAudio;
  } else {
    audio = galleryAudio;
  }
  if (audio.muted) {
    audio.muted = false;
  } else {
    audio.muted = true;
  }
};

const audioHandlers = (parent, type) => {
  parent.querySelector('.audio__play-button').addEventListener('click', () => {
    playAudio(`${type}`);
  });
  parent.querySelector('.audio__play-button').addEventListener('click', () => {
    tooglePlayButton(parent);
  });
  parent.querySelector('.audio__volume-button').addEventListener('click', () => {
    toogleVolumeButton(parent);
  });
  parent.querySelector('.audio__volume-button').addEventListener('click', () => {
    muteAudio(`${type}`);
  });
};

// audio ends

//  win message starts

const winMessageWrapper = document.querySelector('.win-message');
const winTitle = document.querySelector('.win-message__title');
const winText = document.querySelector('.win-message__text');
const winButton = document.querySelector('.win-message__button');

const showWinMessage = () => {
  quiz.style.display = 'none';
  winMessageWrapper.style.display = 'flex';
  winTitle.textContent = translation[1][0].title[language];
  winButton.textContent = translation[1][0].winButton[language];
  if (score.textContent == 30) {
    winText.textContent = `${translation[1][0].winMaxScore[language]}`;
  } else {
    winText.textContent = `${translation[1][0].winTextStart[language]} ${score.textContent} ${translation[1][0].winTextEnd[language]}`;
  }
};

winButton.addEventListener('click', startGame);

//  win message ends

//gallery starts 
const gallery = document.querySelector('.gallery');
const galleryWrapper = document.querySelector('.gallery__list');
const galleryCardWrapper = document.querySelector('.gallery__card__wrapper');

const createGallery = () => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < birdsData.length; i++) {
    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < birdsData[i].length; j++) {
      let li = document.createElement('li');
      li.classList.add('gallery__item');
      let img = document.createElement('img');
      img.classList.add('img');
      img.src = `${birdsData[i][j].image}`;
      li.dataset.level = i;
      li.dataset.number = j;
      li.append(img);
      galleryWrapper.append(li);
    }
  }
}

galleryWrapper.addEventListener('click', async (e) => {
  if (e.target.closest('.gallery__item')) {
    const target = e.target.closest('.gallery__item');
    level = target.dataset.level;
    const number = target.dataset.number;
    galleryCardWrapper.classList.add('gallery__card__wrapper_active');
    await newMusic('gallery', number);
    getVariant(gallery, number);
  }
});

document.addEventListener('click', (e) => {
  const target = e.target.classList;
  if (target.contains('gallery__card__wrapper_active')) {
    galleryCardWrapper.classList.remove('gallery__card__wrapper_active');
    stopaduioPlayer();
  }
});

document.querySelector('.gallery-page').addEventListener('click', () => {
  stopaduioPlayer();
  createGallery();
  quiz.style.display = 'none';
  winMessageWrapper.style.display = 'none';
});

document.querySelector('.main-page').addEventListener('click', () => {
  stopaduioPlayer();
  startGame();
  const temp = document.querySelectorAll('.gallery__item');
  temp.forEach(el => el.remove());
});

// gallery ends
