const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'Untitled.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)

const btn1 = document.getElementById('btn1');

var country = 'United States'
var inflationRate
var marketReturn

const p1 = document.createElement('p')
var totalCash;
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/inflation?country=' + country,
    headers: { 'X-Api-Key': 'JMxGZZvsB34bApLtRXXdAw==JMj8VS7onSBEYMc6' },
    contentType: 'application/json',
    success: function (result) {
        var rate = result[0].yearly_rate_pct
        console.log("Yearly Inflation Rate: " + rate);

        var cash = document.getElementById("cash").value

        console.log("Approx. Cash in 1 Year: " + cash * (1 - rate / 100))

        const card = document.createElement('div')
        card.setAttribute('class', 'card')

        const h1 = document.createElement('h1')
        h1.textContent = "Yearly Inflation Rate: " + rate + "%"

        p1.innerText = cash * (1 - rate / 100);

        totalCash = cash * (1 - rate / 100);

        container.appendChild(card)
        card.appendChild(h1)
        card.appendChild(p1)
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});


var bondVal = 15

const bondCard = document.createElement('div')
bondCard.setAttribute('class', 'card')

const bondH = document.createElement('h1')
bondH.textContent = "Bond is Baseline"

const bondP = document.createElement('p')
bondP.innerText = bondVal

container.appendChild(bondCard)
bondCard.appendChild(bondH)
bondCard.appendChild(bondP)



var totalStock;

var request = new XMLHttpRequest()
const p2 = document.createElement('p')
request.open('GET', 'https://financialmodelingprep.com/api/v3/stock-price-change/SPY?apikey=819db39adc3caaf1abdfa242fbdf39ef', true)
request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
        var prof = data[0]["1Y"]
        console.log(prof)

        var stok = document.getElementById("stock").value

        console.log("Approx Stock Val in 1 Yr: " + stok * (1 + (prof / 100))) 

        const card = document.createElement('div')
        card.setAttribute('class', 'card')

        const h1 = document.createElement('h1')
        h1.textContent = "Yearly Market Return: " + prof + "%"


        p2.innerText = stok * (1 + (prof / 100))

        totalStock = stok * (1 + (prof / 100))

        container.appendChild(card)
        card.appendChild(h1)
        card.appendChild(p2)
    } else {
        console.log('error')
    }
}

request.send()




if (btn1) {
    btn1.addEventListener("click", function () {
        const np1 = document.createElement('p')
        np1.innerText = cash * (1 - rate / 100);
        
    });
}

const out = document.createElement('div')
out.setAttribute('class', 'card')

const outH = document.createElement('h1')
outH.textContent = "Estimated Portfolio after 1 Year"

const outP = document.createElement('p')

var sum = totalCash + totalStock + bondVal

outP.innerText = "Stocks: " + totalStock / sum + "\n Bonds: " + bondVal / sum + "\n Cash: " + totalCash / sum

container.appendChild(out)
out.appendChild(outH)
out.appendChild(outP)