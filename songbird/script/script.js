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
variants = SortArray(variants);
// console.log(sortArray)
variants.forEach((el, index) => {
  el.textContent = birdsData[level][index].name;
});



// mix variants end

// variant description start
const variantImage = document.querySelector('.variant__image');
const variantName = document.querySelector('.variant__name');
const variantLatinName = document.querySelector('.variant__name-latin');
const variantDescription = document.querySelector('.variant__description');

const getVariant = (index) => {
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
let randomNum

const getRandomNumber = () => {
  randomNum = Math.round(Math.random() * 5);
  // console.log(randomNum)
}
getRandomNumber();

const isRight = (index) => {
if (index == randomNum) {
    birdImage.src = birdsData[level][index].image;
    birdName.textContent = birdsData[level][index].name;
}
}


// card quiz card end