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