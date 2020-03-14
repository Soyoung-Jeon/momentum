// 백그라운드 이미지 랜덤 전환 효과

const IMG_NUMBER = 5; // 이미지 추가 시 변경


const image = document.querySelector(".wrap_bg > img");
const random = () => {
  const num = Math.floor(Math.random() * IMG_NUMBER) + 1;
  image.setAttribute("src", `img/${num}.jpg`);
};


// 시계
const clock = document.querySelector(".wrap_clock > h1")

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clock.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

// 이름 입력 폼
const form = document.querySelector(".form"),
      input = form.querySelector("input"),
      greeting = document.querySelector(".greeting");

const USER = "currentUser", SHOWING = "showing";

const saveName = text => { localStorage.setItem(USER, text); }

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    sayHello(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING);
    greeting.classList.remove(SHOWING);
    form.addEventListener("submit", handleSubmit);
}

function sayHello(text) {
    form.classList.remove(SHOWING);
    greeting.classList.add(SHOWING);
    greeting.innerText = `반갑습니다. ${text}님`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER);
    if(currentUser === null){
        askForName();
    }
    else {
        sayHello(currentUser);
    }
}

function init(){
    random();
    loadName();
    getTime();
    setInterval(getTime, 1000);
}

init();