
const small = document.querySelector(".small")
const button = document.querySelector('.run')
const stoped = document.querySelector('.stop')
let posX = 0;
let posY = 0;
let chek = false
let chekup = false
const move = () =>
{
    if (runing === true) {
        
        if (posX <= 440 && chek === false) {
            posX += 10;
            small.style.left = `${posX}px`;
            setTimeout(move, 40);
        } else if (posX >= 440 && posY <= 440) {
            posY += 10;
            small.style.top = `${posY}px`;
            setTimeout(move, 40);
        } else if (posX > 0 && posY >= 440) {
            chek = true
            posX -= 10;
            small.style.left = `${posX}px`;
            setTimeout(move, 40);
        } else if (chekup === false && posY > 0) {
            if (posY === 10) chek = false
            posY -= 10;
            small.style.top = `${posY}px`;
            setTimeout(move, 40);
        }
    }
}
let runing = true;
button.onclick = () =>
{
    runing = true;
    move();
} 
stoped.onclick = () => runing = false

const vremuy = document.querySelector('.time')
const word = document.querySelector('.rezult')
let second = 0;
const time = setInterval(() =>
{
    if (second === 59) vremuy.innerText = "1:00"
    else vremuy.innerText = ++second;
}, 1000);
setTimeout(() =>
{
    word.innerText = "Вы пробыли на сайте ровно минуту! 🥳"
    clearInterval(time)
}, 60000);