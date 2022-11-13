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
var totalCash = 5;
function interestR() {
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/inflation?country=' + country,
        headers: { 'X-Api-Key': 'JMxGZZvsB34bApLtRXXdAw==JMj8VS7onSBEYMc6' },
        contentType: 'application/json',
        success: function (result) {
            inflationRate = result[0].yearly_rate_pct
            console.log("Yearly Inflation Rate: " + inflationRate);

            var cash = document.getElementById("cash").value

            console.log("Approx. Cash in 1 Year: " + cash * (1 - inflationRate / 100))

            const card = document.createElement('div')
            card.setAttribute('class', 'card')

            const h1 = document.createElement('h1')
            h1.textContent = "Yearly Inflation Rate: " + inflationRate + "%"

            p1.innerText = cash * (1 - inflationRate / 100);

            totalCash = cash * (1 - inflationRate / 100);

            container.appendChild(card)
            card.appendChild(h1)
            card.appendChild(p1)
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}

var bondVal = document.getElementById("bonds").value

const bondCard = document.createElement('div')
bondCard.setAttribute('class', 'card')

const bondH = document.createElement('h1')
bondH.textContent = "Bond is Baseline"

const bondP = document.createElement('p')
bondP.innerText = bondVal

container.appendChild(bondCard)
bondCard.appendChild(bondH)
bondCard.appendChild(bondP)



var totalStock = 80;

var request = new XMLHttpRequest()
const p2 = document.createElement('p')
request.open('GET', 'https://financialmodelingprep.com/api/v3/stock-price-change/SPY?apikey=819db39adc3caaf1abdfa242fbdf39ef', true)
function stockReturn() {
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
            marketReturn = data[0]["1Y"]
            console.log(marketReturn)

            var stok = document.getElementById("stock").value

            totalStock = stok * (1 + (marketReturn / 100))

            console.log(totalStock)

            console.log("Approx Stock Val in 1 Yr: " + stok * (1 + (marketReturn / 100)))

            const card = document.createElement('div')
            card.setAttribute('class', 'card')

            const h1 = document.createElement('h1')
            h1.textContent = "Yearly Market Return: " + marketReturn + "%"


            p2.innerText = stok * (1 + (marketReturn / 100))


            container.appendChild(card)
            card.appendChild(h1)
            card.appendChild(p2)
        } else {
            console.log('error')
        }
    }

    request.send()
}

function fun1() {
    bondVal = document.getElementById("bonds").value
    container.childNodes[0].childNodes[1].textContent = bondVal

    totalStock = document.getElementById("stock").value * (1 + (marketReturn / 100))
    container.childNodes[2].childNodes[1].textContent = totalStock

    totalCash = document.getElementById("cash").value * (1 - inflationRate / 100);
    container.childNodes[3].childNodes[1].textContent = totalCash

    sum = (totalCash + totalStock + bondVal * 1.0)

    console.log(sum)
    console.log(totalCash)
    console.log(totalStock)
    console.log(bondVal)

    container.childNodes[1].childNodes[1].innerText = "Stocks: " + totalStock / sum * 100 + "% \n Bonds: " + bondVal / sum * 100 + "% \n Cash: " + totalCash / sum * 100 + "%\n"

}

if (btn1) {
    btn1.addEventListener("click", fun1)
}

const out = document.createElement('div')
out.setAttribute('class', 'card')

const outH = document.createElement('h1')
outH.textContent = "Estimated Portfolio after 1 Year"

const outP = document.createElement('p')

var sum = totalCash + totalStock + bondVal;

async function s() {
    await interestR();
    await stockReturn();


    outP.innerText = "Stocks: " + 100000 / 120000 * 100 + "% \n Bonds: " + (15000 * 1.0)/ 120000 * 100 + "% \n Cash: " + 5000 / 120000 * 100 + "% \n"

    container.appendChild(out)
    out.appendChild(outH)
    out.appendChild(outP)
}

s();