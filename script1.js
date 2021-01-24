const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')

// Get quote from API
async function getQuote() {
    // To solve the CORS policy problem:
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try {
        // 一个一个按先后顺序来
        const response = await fetch(proxyUrl + apiUrl)
        const data = await response.json()
            // If the author is blank, give a name:
        if (data.quoteAuthor === '') {
            quoteAuthor.innerText = 'Anonymous'
        } else {
            authorText.innerText = data.quoteAuthor
        }
        //Reduce size for long quotes:
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText
            //console.log(data);
    } catch (error) {
        //getQuote()
        console.log('whoops, no quote', error)
    }
}

// Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText
    const author = authorText.innerText
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`

    window.open(twitterUrl, '_blank')
}

// Event listener
newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)
    // On load:
getQuote();