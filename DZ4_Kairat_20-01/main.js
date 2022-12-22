const btn = document.querySelector('button')
btn.onclick = () =>
{
    const zapros = new XMLHttpRequest()
    zapros.open('GET', "data.json")
    zapros.setRequestHeader('Content-type', 'application/json')
    zapros.send()
    zapros.onload = () =>
    {
        const data = JSON.parse(zapros.response)
        console.log(data);
        document.querySelector('.name').innerHTML = data.name
        document.querySelector('.date').innerHTML = data.releaseDate
        document.querySelector('.actors').innerHTML = data.mainActors
        document.querySelector('.episodes').innerHTML = data.episodes
        document.querySelector('.director').innerHTML = data.creaters.director
        document.querySelector('.producer').innerHTML = data.creaters.producer
        document.querySelector('.writer').innerHTML = data.creaters.siptwriter
    }
}