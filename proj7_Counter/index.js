let counter = document.querySelector('#counter');
let startButton = document.querySelector('#startButton')
let stopButton = document.querySelector('#stopButton')
let firstTimeStartButtonClicked = false;
let interval; // to store the setInterval fn to stop and reset

//on clicking increment value
function inc() {
    console.log('command to increment');
    let counter_val = parseInt(counter.innerText);
    counter_val++;
    counter.innerText = counter_val;
    console.log('succesfully incremented the value');
}

// on clicking decrement value
function dec() {
    console.log('command to decrement');
    let counter_val = parseInt(counter.innerText);
    counter_val--;
    counter.innerText = counter_val;
    console.log('succesfully decremented the value');
}

// on clicking start button
function startCounter(){
    console.log('starting counter');
    startButton.style.display = "none";
    stopButton.style.display = "block";
    let counter_val = parseInt(counter.innerText);
    if(firstTimeStartButtonClicked === false) 
        counter_val = 0;
    interval = setInterval(() => {
        counter_val++;
        counter.innerText = counter_val;
    }, 1000)
    console.log('started the counter');
}

// on clicking stop
function stopCounter() {
    firstTimeStartButtonClicked = true;
    console.log('stopping counter');
    startButton.style.display = "block";
    stopButton.style.display = "none";
    clearInterval(interval);
    interval = null;
    console.log('stopped counter');
}

// on clicking reset
function resetCounter() {
    startButton.style.display = "block";
    stopButton.style.display = "none";
    clearInterval(interval);
    interval = null;    //reset the intervals so can restart later
    let counter_val = parseInt(counter.innerText);
    counter_val = 0;
    counter.innerText = counter_val;
    console.log('counter set to 0');
}