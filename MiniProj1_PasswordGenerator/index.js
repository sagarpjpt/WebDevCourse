const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-Indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]"); //store all buttons
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 8;
let checkCount = 0;
handleSlider();
//set default strenght indicator color
setIndicator('#ccc');

//it reflect the password length to ui
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
  const min = inputSlider.min;
  const max = inputSlider.max;
  inputSlider.style.backgroundSize =
    ((passwordLength - min) * 100) / (max - min) + "% 100%";
}

//set default color of strength indicator color
function setIndicator(color) {
  indicator.style.backgroundColor = color;
  //add shadow
  indicator.style.boxShadow = `0 0 10px 1px ${color}`;
}

function getRandInteger(min, max) {
  //generates random number between min and max
  //Math.random() gives number b/w [0,1)
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
  return getRandInteger(0, 9);
}

function generateLowerCase() {
  return String.fromCharCode(getRandInteger(97, 123));
}

function generateUpperCase() {
  return String.fromCharCode(getRandInteger(65, 91));
}

function generateSymbol() {
  const randInd = getRandInteger(0, symbols.length); //generating random index
  return symbols.charAt(randInd);
}

//calc strength of password
function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (uppercaseCheck.checked) hasUpper = true;
  if (lowercaseCheck.checked) hasLower = true;
  if (numbersCheck.checked) hasNum = true;
  if (symbolsCheck.checked) hasSym = true;

  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

async function copyContent() {
    try{
        //copy the content displayed on input field where generated password shown
        await navigator.clipboard.writeText(passwordDisplay.value); //return promise
        copyMsg.innerText = "Copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }

    //to make <span data-copyMsg></span> visible
    copyMsg.classList.add("active");

    setTimeout(() =>{
        copyMsg.classList.remove("active");
    }, 2000);
}

function shufflePassword() {
    let array = Array.from(password);
    // fisher yates method
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); //random number between [0, i+1)
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach( (checkbox) =>{
      if(checkbox.checked)
          checkCount++;
  });
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handCheckBoxChange);
})

inputSlider.addEventListener('input', (e) =>{
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})

generateBtn.addEventListener('click', () => {
    console.log('generateing password');
    //none of checkbox are selected 
    if(checkCount <= 0) return;
    let len = passwordLength;
    // lets start the journey to find new password

    //remove old password
    password = "";

    // lets put the stuff mentioned by checkboxes
    if(uppercaseCheck.checked){
      password += generateUpperCase();
      len--;
    }

    if(lowercaseCheck.checked){
      password += generateLowerCase();
      len--;
    }

    if(numbersCheck.checked){
      password += generateRandomNumber();
      len--;
    }

    if(symbolsCheck.checked){
      password += generateSymbol();
      len--;
    }

    const funArr = [generateLowerCase, generateRandomNumber, generateSymbol, generateUpperCase];

    for(let i = 0;i < len;i++){
      const random = getRandInteger(0, funArr.length);
      password += funArr[random]();
    }

    //shuffle the array
    password = shufflePassword();

    // display the generated password
    passwordDisplay.value = password;

    // calculate strength
    calcStrength();

})