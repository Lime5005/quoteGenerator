const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')

const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')

const loader = document.getElementById('loader')

let apiData = []

function showLoadingSpinner() {
    loader.hidden = false
    quoteContainer.hidden = true
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false
        loader.hidden = true
    }
}

function newQuote() {
    const quote = apiData[Math.floor(Math.random() * apiData.length)]
        //console.log(quote);

    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.innerText = quote.text

    if (quote.author === '') {
        authorText.innerText = 'Anonymous'
    } else {
        authorText.innerText = quote.author
    }
}

// Get quotes from API
async function getQuotes() {
    showLoadingSpinner()
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl)
        apiData = await response.json()
            // How to get just one quote:
            //console.log(apiData[1].text);
        newQuote()
            // How to get a random integer within 0 and 3: 
            // let object = Math.floor(Math.random() * 3)
            // console.log(object);
        removeLoadingSpinner()
    } catch (err) {
        console.log('Oh, something went wrong', err);
    }
}

function tweetQuote() {
    const quote = quoteText.innerText
    const author = authorText.innerText
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`

    window.open(twitterUrl, '_blank')
}

twitterBtn.addEventListener('click', tweetQuote)
newQuoteBtn.addEventListener('click', getQuotes)

getQuotes()