import birdsDataRu from './birds-data.js';
import birdsDataEn from './birds-data-en.js';
import translation from './language.js';

// start screen start

// let tempAudio

const quiz = document.querySelector('.quiz');
const startButton = document.querySelector('.start__button');
const startWrapper = document.querySelector('.start');
const header = document.querySelector('.header');
// let variants = [];
let isGameStart = false;

const startGame = async () => {
  quiz.style.display = 'flex';
  header.style.display = 'flex';
  winMessageWrapper.style.display = 'none';
  startWrapper.style.display = 'none';
  level = 0;


  // variants = Array.from(document.querySelectorAll('.variant'));
  // variants = SortArray(variants);
  showVariants();
  getRandomNumber();
  returnToBase();
  highlightLevel();
  scoreBuffer.clear();
  score.textContent = 0;
  changeCircleColorToBase();
  await newMusic('card', randomNum)
  await newMusic('variant', randomNum)

  // setInt()
  // tempAudio = new createNewAudio(quizCard)
  // tempAudio.newAudio()
  // tempAudio.clearAudio()
  // tempAudio.playAudio()
  // quizCard.querySelector('.audio__play-button').addEventListener('click', tempAudio.playAudio);
  // ac()
  if (!isGameStart) {
    addEventlistenersToVariats();
    audioHandlers(quizCard, 'card');
    rangeHadler(quizCard, 'card');
    volumeHandler(quizCard, 'card')
    audioHandlers(variantsWrapper, 'variant');
    rangeHadler(variantsWrapper, 'variant');
    volumeHandler(variantsWrapper, 'variant')
    setInt(quizCard, 'card')
    setInt(variantsWrapper, 'variant')
  }
  isGameStart = true;
}

const addEventlistenersToVariats = () => {
  variants.forEach((el, index) => {
    el.addEventListener('click', () => {
      // console.log(index);
      getVariant(index);
      isRight(index, birdsData[level][index].id);
      
    });
  });
}

startButton.addEventListener('click', startGame);


// start screen end

// fill with text start
let birdsData;

let language = localStorage.getItem('lan');
if (!localStorage.getItem('lan')) {
  language = 'ru';
}

const languageSelect = document.querySelectorAll('.language-selection');

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
};

const showVariants = () => {
  let temp = birdsData[level]
  temp.sort(() => Math.random() - 0.5)
  // console.log(temp)
  // console.log(birdsData[level])
  //  variants = SortArray(variants);
  // console.log(sortArray)
  variants.forEach((el, index) => {
    // el.textContent = birdsData[level][el.dataset.number].name;
    el.textContent = birdsData[level][index].name;
  });
}
// console.log(variants[0].dataset.number)

// variants[0].dataset = '1'

// mix variants end

// variant description start
const variantImage = document.querySelector('.variant__image');
const variantName = document.querySelector('.variant__name');
const variantLatinName = document.querySelector('.variant__name-latin');
const variantDescription = document.querySelector('.variant__description');
const variantsWrapper = document.querySelector('.variant__wrapper');

variantsWrapper.style.display = 'none';

const getVariant = async (index) => {
  if (!variantAudio.paused) {
    variantAudio.pause()
    variantsWrapper.querySelector('.audio__play-button').classList.remove('pause');
  }
  await newMusic('variant', index)
  variantsWrapper.style.display = '';
  variantImage.src = birdsData[level][index].image;
  variantName.textContent = birdsData[level][index].name;
  variantLatinName.textContent = birdsData[level][index].species;
  variantDescription.textContent = birdsData[level][index].description;
};

// variants.forEach((el, index) => {
//   el.addEventListener('click', () => {
//     console.log(index);
//     getVariant(index);
//     isRight(index);
//   });
// });

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
let rightAnswer;

const getRandomNumber = () => {
  randomNum = Math.round(Math.random() * 5);
  rightAnswer = birdsData[level][randomNum].id;
  console.log(birdsData[level][randomNum].name)
  // console.log(randomNum)
};

const showRightAnswer = () => {
  birdImage.src = birdsData[level][randomNum].image;
  birdName.textContent = birdsData[level][randomNum].name;
}
     
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
};

const nextLevel = async() => {
  if (level == 5) {
    showWinMessage()
    NextLevelButton.classList.remove('quiz_button_active');
  } else {
    level += 1;
    // variants = Array.from(document.querySelectorAll('.variant'));
    // variants = SortArray(variants);
    // tempAudio.clearAudio()
    if (!cardAduio.paused) {
      cardAduio.pause()
      quizCard.querySelector('.audio__play-button').classList.remove('pause');
    }
    showVariants();
    showVariants();
    NextLevelButton.removeEventListener('click', nextLevel);
    NextLevelButton.classList.remove('quiz_button_active');
    getRandomNumber();
    returnToBase();
    highlightLevel();
    scoreBuffer.clear();
    changeCircleColorToBase()
    await newMusic('card', randomNum)
  //  setInt() 
    // createNewAudio(quizCard)
    
    // tempAudio = new createNewAudio(quizCard)
    // tempAudio.newAudio()
  }
};

const activatedNextLevelButton = () => {
  NextLevelButton.classList.add('quiz_button_active');
  NextLevelButton.addEventListener('click', nextLevel);
};

const isRight = (index, variantNumber) => {
  if (variantNumber == rightAnswer) {
    // console.log('index', index)
    changeCircleColor(index, 'green');
    playSound('right');
    showRightAnswer();
    addScore(scoreBuffer);
    activatedNextLevelButton();
    if (!cardAduio.paused) {
      cardAduio.pause()
      quizCard.querySelector('.audio__play-button').classList.remove('pause');
    }
  } else {
    // console.log('index', index)
    scoreBuffer.add(index);
    changeCircleColor(index, 'red');
    playSound('wrong');
  }
};

const changeCircleColor = (index, color) => {
  if (!NextLevelButton.classList.contains('quiz_button_active')) {
    // console.log('color', index)
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
  };
};

// card quiz card end

// audio starts

// const audioTimeline = document.querySelector('.audio__timeline');
// const audioProgressBar = document.querySelector('.audio__progress-bar');
// const audioPlayButton = document.querySelector('.audio__play-button');
// const audioCurrent = document.querySelector('.audio__current-time');
// const audioTotalTime = document.querySelector('.audio__total-time');
// const audioVolumeButton = document.querySelector('.audio__volume-button');
// const audioVolumeRange = document.querySelector('.audio__volume-range');
// const audioVolumeValue = document.querySelector('.audio__value');
const quizCard = document.querySelector('.quiz__card');

const getAudioTime = (num) => {
   let seconds = parseInt(num, 10);
  const minutes = parseInt(seconds / 60, 10);
  // console.log(num)
  seconds -= minutes * 60;
  return `${minutes}:${String(seconds).padStart(2, 0)}`;
};
let interval
// class createNewAudio {

//   constructor(parent) {
//     this.parent = parent;
//     // this.audio = audio
//   }



//   async newAudio() {
//     const temp = await `${birdsData[level][randomNum].audio}`;
//   // const audio = await new Audio(`${birdsData[level][randomNum].audio}`);
//   const audio = new Audio(temp);
//   // document.querySelector('.audio__total-time').textContent = getAudioTime(audio.duration);
 
//   setAudioTime(audio);
//   rangeHadler(this.parent, audio);
//   volumeHandler(this.parent, audio);
//   // audioHandlers(parent)
//   // setRangeUpdate(parent)


//   // let interval
//   // // if(~~interval) {
//   //   clearInterval(interval)
//   // } else {
//   interval = setInterval(intervalHandler, 250, this.parent, audio);
//   // }



//   const playAudio = () => {
//     if (audio.paused) {
//       audio.play();
//     } else {
//       audio.pause();
//     };
//   };
//   const tooglePlayButton = () => {
//     this.parent.querySelector('.audio__play-button').classList.toggle('pause');
//   };
  
//   const toogleVolumeButton = () => {
//     this.parent.querySelector('.audio__volume-button').classList.toggle('mute');
//   };
  
//   // const muteAudio = () => {
//   //   if (audio.muted) {
//   //     audio.muted = false;
//   //   } else {
//   //     audio.muted = true;
//   //   }
//   // };
//   // return audio

//   // function ac () {
//   //   console.log(111)
//   //   parent.removeEventListener('click', playAudio)
//   // }

//   // parent.addEventListener('click', playAudio)



//   // this.parent.querySelector('.audio__play-button').removeEventListener('click', playAudio);
//   // this.parent.querySelector('.audio__play-button').removeEventListener('click', tooglePlayButton);
//   // this.parent.querySelector('.audio__volume-button').removeEventListener('click', toogleVolumeButton);
//   // this.parent.querySelector('.audio__volume-button').removeEventListener('click', muteAudio);
//   this.parent.querySelector('.audio__play-button').addEventListener('click', playAudio);
//   // this.parent.querySelector('.audio__play-button').addEventListener('click', tooglePlayButton);
//   // this.parent.querySelector('.audio__volume-button').addEventListener('click', toogleVolumeButton);
//   // this.parent.querySelector('.audio__volume-button').addEventListener('click', muteAudio);
//   audio.onended = () => tooglePlayButton();
//   // function clearAudio() {
//   //   console.log(1)
//   //   clearInterval(interval);
//   //   this.parent.querySelector('.audio__play-button').removeEventListener('click', playAudio);
//   //   // this.parent.querySelector('.audio__play-button').removeEventListener('click', tooglePlayButton);
//   //   // this.parent.querySelector('.audio__volume-button').removeEventListener('click', toogleVolumeButton);
//   //   // this.parent.querySelector('.audio__volume-button').removeEventListener('click', muteAudio);
//   //   // parent.removeEventListener('click', playAudio)
//   // }
//   }

//   // async playAudio() {
//   //   // console.log(audio)
//   //   console.log(this.audio)
//   //   if (this.audio.paused) {
//   //     this.audio.play();
//   //   } else {
//   //     this.audio.pause();
//   //   };
//   // };

//   clearAudio() {
//     console.log(1)
//     clearInterval(interval)
//     this.parent.querySelector('.audio__play-button').removeEventListener('click',this. playAudio);
//     // this.parent.querySelector('.audio__play-button').removeEventListener('click', tooglePlayButton);
//     // this.parent.querySelector('.audio__volume-button').removeEventListener('click', toogleVolumeButton);
//     // this.parent.querySelector('.audio__volume-button').removeEventListener('click', muteAudio);
//     // parent.removeEventListener('click', playAudio)
//   }

  
// }
// createNewAudio(quizCard)

let cardAduio;
let variantAudio;

const newMusic = async (type , number) => {
  // audio = new Audio(`${birdsData[level][randomNum].audio}`)
  let tempAudio = await `${birdsData[level][number].audio}`;
  if (type == 'card') {
    cardAduio = new Audio(tempAudio);
    // quizCard.querySelector('.audio__total-time').textContent = getAudioTime(cardAduio.duration);
    setAudioTime(quizCard, cardAduio)
    cardAduio.onended = () => {
      quizCard.querySelector('.audio__play-button').classList.remove('pause');
      cardAduio.currentTime = 0;
    }
  
  } else {
    variantAudio = new Audio(tempAudio);
    setAudioTime(variantsWrapper, variantAudio)
    variantAudio.onended = () => {
      variantsWrapper.querySelector('.audio__play-button').classList.remove('pause');
      variantAudio.currentTime = 0;
    }
  }
     
  // console.log(cardAduio)
  // setAudioTime(audio)
  // setInt()
}

const setAudioTime = (parent, audio) => {
  audio.addEventListener(
    'loadeddata',
    () => {
      parent.querySelector('.audio__total-time').textContent = getAudioTime(audio.duration);
      // audio.volume = 0.75;
    },
  );
}

const rangeHadler = (parent, type) => {
console.log(type)
  parent.querySelector('.audio__timeline').addEventListener('click', (e) => {
    let audio
    console.log(type)
    type == 'card' ? audio = cardAduio : audio = variantAudio;
    console.log(audio)
    const rangeWidth = window.getComputedStyle(parent.querySelector('.audio__timeline')).width;
    const skipTime = (e.offsetX / parseInt(rangeWidth, 10)) * audio.duration;
    audio.currentTime = skipTime;
  });
};


const volumeHandler = (parent, type) => {
  parent.querySelector('.audio__volume-range').addEventListener('click', (e) => {
    let audio
    console.log(type)
    type == 'card' ? audio = cardAduio : audio = variantAudio;
    console.log(audio)
    const volumeContainerWidth = window.getComputedStyle(parent.querySelector('.audio__volume-range')).width;
    const skipVolume = e.offsetX / parseInt(volumeContainerWidth, 10);
    // console.log(e.offsetX)
    // console.log(volumeContainerWidth);
    // console.log(parseInt(volumeContainerWidth, 10))
    // console.log(skipVolume);
    audio.volume = skipVolume;
    parent.querySelector('.audio__value').style.width = `${skipVolume * 100}%`;
    console.log(audio.volume);
  });
}

const intervalHandler = (parent, type) => {
  let audio
  type == 'card' ? audio = cardAduio : audio = variantAudio;
  parent.querySelector('.audio__progress-bar').style.width = `${(audio.currentTime / audio.duration) * 100}%`;
  parent.querySelector('.audio__current-time').textContent = getAudioTime(audio.currentTime);
}

const setInt = (parent, type) => {
  // clearInterval(interval)
  interval = setInterval(intervalHandler, 250, parent, `${type}`);
}

// document.querySelector('.audio__play-button').addEventListener('click', playAudio)


// const setRangeUpdate = (parent) => {
// setInterval((parent) => {
//   parent.querySelector('.audio__progress-bar').style.width = `${(audio.currentTime / audio.duration) * 100}%`;
//   parent.querySelector('.audio__current-time').textContent = getAudioTime(audio.currentTime);
// }, 250);
// }


const playAudio = (type) => {
  let audio
  type == 'card' ? audio = cardAduio : audio = variantAudio;
  // console.log(audio)
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
  let audio
  type == 'card' ? audio = cardAduio : audio = variantAudio;
  // console.log(audio)
  if (audio.muted) {
    audio.muted = false;
  } else {
    audio.muted = true;
  }
};

 const audioHandlers = (parent, type) => {
  // console.log(`${audio}`);
  parent.querySelector('.audio__play-button').addEventListener('click', () => {
    playAudio(`${type}`)
  });
  parent.querySelector('.audio__play-button').addEventListener('click', () => {
    tooglePlayButton(parent)
  });
  parent.querySelector('.audio__volume-button').addEventListener('click', () => {
    toogleVolumeButton(parent)
  });
  parent.querySelector('.audio__volume-button').addEventListener('click', () => {
    muteAudio(`${type}`)
  });
  // audio.onended = () => tooglePlayButton(parent);
 }
//  audioHandlers(quizCard, cardAduio)
// audio.onended = () => tooglePlayButton();

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
console.log('не получается плээр доработать, постараюсь доделать, прросьба проверить позже')