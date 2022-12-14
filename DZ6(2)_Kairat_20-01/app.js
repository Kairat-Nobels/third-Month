const som = document.querySelector('#som')
const usd = document.querySelector('#usd')
const eu = document.querySelector('#eu')
const convert = (elem, target, target2) =>
{
    elem.oninput = () =>
    {
        // const request = new XMLHttpRequest()
        // request.open('GET', "data.json")
        // request.setRequestHeader('Content-type', 'application/json')
        // request.send()
        
        fetch('data.json')
            .then(response => response.json())
            .then(json =>
            {
                if (elem === som) {
                    target.value = (elem.value / json.usd).toFixed(2);
                    target2.value = (elem.value / json.eu).toFixed(2);
                } 
                else if (elem === usd) {
                    target.value = (elem.value * json.usd).toFixed(2);
                    target2.value = (target.value/json.eu).toFixed(2)
                } 
                else if (elem === eu){
                    target.value = (elem.value * json.eu).toFixed(2)
                    target2.value = (target.value/json.usd).toFixed(2)
                }
                elem.value === '' && (target.value = '')
                elem.value === '' && (target2.value = '')
            })
          
        // request.onload = () =>
        // {
        //     // console.log(request.response);
        //     const data = JSON.parse(request.response)
        //     if (elem === som) {
        //         target.value = (elem.value / data.usd).toFixed(2);
        //         target2.value = (elem.value / data.eu).toFixed(2);
        //     } 
        //     else if (elem === usd) {
        //         target.value = (elem.value * data.usd).toFixed(2);
        //         target2.value = (target.value/data.eu).toFixed(2)
        //     } 
        //     else if (elem === eu){
        //         target.value = (elem.value * data.eu).toFixed(2)
        //         target2.value = (target.value/data.usd).toFixed(2)
        //     }
        //     elem.value === '' && (target.value = '')
        //     elem.value === '' && (target2.value = '')
        // }
    }
}
convert(som, usd, eu)
convert(usd, som, eu)
convert(eu, som, usd)


// som.oninput = () =>
// {
//     const request = new XMLHttpRequest()
//     request.open('GET', "data.json")
//     request.setRequestHeader('Content-type', 'application/json')
//     request.send()
//     request.onload = () =>
//     {
//         console.log(request.response);
//         const data = JSON.parse(request.response)
//         usd.value = (som.value/data.usd).toFixed(2)
//     }
// }