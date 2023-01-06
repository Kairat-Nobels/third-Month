const tabs = document.querySelectorAll('.tabheader__item')
const tabsParent = document.querySelector('.tabheader__items')
const tabContent = document.querySelectorAll('.tabcontent')

const hideTabContent = () =>
{
    tabContent.forEach((item) => {
        item.style.display = 'none';
    })
    tabs.forEach((item) =>
    {
        item.classList.remove('tabheader__item_active');
    })
}
hideTabContent()
const showTabContent = (i = 0) =>
{
    tabContent[i].style.display = 'block'
    tabs[i].classList.add('tabheader__item_active')
}
showTabContent()

// дз задание первое
let c = 0;
const slider = e =>
{
    setInterval((i) =>
    {
        if (c === 4) c = 0;
        hideTabContent()
        showTabContent(c);
        c++;
    }, 2300);
}
slider()
tabsParent.addEventListener('click', (e) =>
{
   
    if (e.target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) =>
        {
            if (e.target === item) {
                hideTabContent()
                showTabContent(i)
                c = i;
            }
        })      
    }
})
// конец первого задания дз

// modal
const modal = document.querySelector('.modal')
const modalTrigger = document.querySelector('.btn_white')
const closeModalBtn = document.querySelector('.modal__close')
const modalTrigger2 = document.querySelector('.btn_dark')
const openModal = () =>
{
    modal.classList.add('show')
    modal.classList.remove('hide')
    document.body.style.overflow = 'hidden'
}
const closeModal = () =>
{
    modal.classList.add('hide');
    modal.classList.remove('show')
    document.body.style.overflow = ''
    // messageBlock.style.background = 'rgb(73, 159, 185)'
}
modalTrigger.addEventListener('click', openModal)
modalTrigger2.addEventListener('click', openModal)
closeModalBtn.addEventListener('click', closeModal)

const diolog = document.querySelector('.modal__dialog')
modal.addEventListener('click', (e) =>
{
    if (!diolog.contains(e.target) && modal.classList.contains('show')) closeModal();
})
const scroolEnd = () => {
    const footer = document.documentElement;
    if (footer.scrollTop + footer.clientHeight >= footer.scrollHeight - 0.8) {
        openModal();
    }
}
window.addEventListener("scroll", scroolEnd)

const message = {
    loading: "Идет загрузка...",
    success: "Спасибо скоро свяжемся!!!",
    fail: "Что-то пошло не так :("
}

// dz 6

const postData = (url, data) =>
{
    const res = fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: data
    })
    return res
}

const forms = document.querySelectorAll('form')
const bindData = (form) =>
{
    form.onsubmit = (e) =>
    {
        e.preventDefault()

        const messageBlock = document.createElement('div')
        messageBlock.setAttribute('class', 'messageBlock')
        messageBlock.textContent = message.loading
        diolog.append(messageBlock)
        const formData = new FormData(form)
        const object = {}

        formData.forEach((item, i) =>
        {
            const arr = [item, i]
            console.log(arr);
            object[i] = item
        })
        const json = JSON.stringify(object)

        const closeMessage = function ()
        {
            setTimeout(() =>
            {
                messageBlock.remove()
            }, 3000);
        }
       
        postData('server.php', json)
            .then((data) =>
            {
                console.log(data.status)
                setTimeout(() => {
                    if (data.status == 200) {
                        console.log('ok')
                        messageBlock.textContent = message.success
                        messageBlock.style.background = 'rgb(236, 231, 237)'
                        messageBlock.style.color = 'rgb(70, 173, 29)'
                        closeMessage()
                    }
                    else {
                        console.log("not ok")
                        messageBlock.textContent = message.fail
                        messageBlock.style.background = 'red'
                        closeMessage()
                    }
                }, 1500);
                
            })
            .catch(() =>
            {
                console.error(e)
                setTimeout(() => {
                    console.log("not ok")
                    messageBlock.textContent = message.fail
                    messageBlock.style.background = 'red'
                    closeMessage()
                }, 1500);
            })
            .finally(() =>
            {
                setTimeout(() => {
                    closeModal()
                }, 3500);
                document.getElementById('input1').value = ''
                document.getElementById('input2').value = ''
            })
    } 
}
forms.forEach((item) =>
{
    bindData(item)
})

// lesson 7
class Menu
{
    constructor(img, altimg, title, descr, price)
    {
        this.src = img
        this.title = title
        this.price = price
        this.altimg = altimg
        this.description = descr
    }
    render()
    {
        const wrapper = document.querySelector('#cardWrapper')
        const elem = document.createElement('div')
        elem.classList.add('menu__item')
        elem.innerHTML = `
        <div class="menu__item">
            <img src=${this.src} alt=${this.altimg}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.description}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена: </div>
                <div class="menu__item-total"><span>${this.price}</span> грн.день</div>
            </div>
        </div>
        `
        wrapper.append(elem)
    }
}

const getMenu = async(url) =>
{
    const res = await fetch(url)
    return await res.json()
}
getMenu('db.json').then((data) =>
{
    data.menu.forEach(({ img, altimg, title, descr, price}) =>
    {
        new Menu(img, altimg, title, descr, price).render()
    })
})


// timer
const deadline = "2023-03-23"
const getTime = (deadline) =>
{
    const t = new Date(deadline) - new Date()
    days = Math.floor(t / (1000 * 60 * 60 * 24))
    hours = Math.floor((t / (100 * 60 * 60)) % 24)
    minutes = Math.floor((t / 1000 / 60) % 60)
    seconds = Math.floor((t / 1000) % 60)
    
    return {
        total: t,
        days: days, 
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
}

console.log(getTime(deadline));
const setClock = (element, deadline) =>
{
    const elem = document.querySelector(element)
    const days = elem.querySelector('#days')
    const hours = elem.querySelector('#hours')
    const minutes = elem.querySelector('#minutes')
    const seconds = elem.querySelector('#seconds')

    const makeZero = (num) =>
    {
        if (num > 0 && num < 10) return `0${num}`
        else return num
    }

    const updateClock = () =>
    {
        const t = getTime(deadline)
        days.innerHTML = makeZero(t.days)
        hours.innerHTML = makeZero(t.hours)
        minutes.innerHTML = makeZero(t.minutes)
        seconds.innerHTML = makeZero(t.seconds)
    }

    setInterval(updateClock, 1000)
}

setClock(".timer", deadline)