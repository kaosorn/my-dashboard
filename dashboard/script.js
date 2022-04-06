
getTime()
getCrypto()
getBG()
getWeather()
getQuote()
setInterval(getTime, 60000)


async function getBG() {
    try{
        const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
        const data = await res.json()
    
        document.body.style.backgroundImage = `url(${data.urls.full})`
        
        const picLocation = document.querySelector(".pic-place")
    
        if(data.location.name != null) {
            
            picLocation.innerHTML = `${data.location.name}`
        }else{
            
            picLocation.innerHTML = `${data.user.name}`
            
        }
    } catch(err) {
        console.log(err)
        document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1438786657495-640937046d18?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDQxMTc5MDE&ixlib=rb-1.2.1&q=85")
        `
        document.querySelector(".pic-place").innerHTML = "Eccose"
    }
  
}

async function getCrypto() {
    try{
        const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true")
        const data = await res.json()
        
        document.querySelector(".crypto-name").innerHTML = "Bitcoin"
    
        const btc_symbol = "https://logos-world.net/wp-content/uploads/2020/08/Bitcoin-Logo.png"
        document.querySelector(".crypto-img").src = btc_symbol
    
    
        document.querySelector(".crypto-price").innerHTML = `$${data.bitcoin.usd}`
        const dailyChange = data.bitcoin.usd_24h_change
    
        const dailyChangeLabel = document.querySelector(".crypto-change")
        
        if(dailyChange >= 0) {
            dailyChangeLabel.innerHTML = `+${dailyChange.toLocaleString()}%`
            dailyChangeLabel.classList.add("green-text")
        }else{
            dailyChangeLabel.innerHTML = `${dailyChange.toLocaleString()}%`
        }
    }catch(err) {
        document.querySelector(".crypto").innerHTML = ''
    }

}

async function getWeather() {
    const res = await fetch("https://apis.scrimba.com/openweathermap/data/2.5/weather?q=Fort Wayne&units=imperial")
    const data = await res.json()

    const weatherArr = {
        temp: data.main.temp,
        description: data.weather[0].description,
        city: data.name,
        icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
    }

    renderWeather(weatherArr)

}

async function getQuote() {
    try{
        const res = await fetch("https://zenquotes.io/api/random")
        const data = await res.json()
        document.querySelector(".quote").innerHTML = `"${data[0].q}" - ${data[0].a}`
    }catch(err) {
        console.log(err)
        document.querySelector(".quote").innerHTML = `"The journey of a thousand miles begins with one step." - Lao Tzu`
    }
}

function getTime() {
    let currDate = new Date()
    document.querySelector(".time").innerHTML = currDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true})
}


function renderWeather(weather) {
    document.querySelector(".temp").innerHTML = `${weather.temp} °F`
    document.querySelector(".description").innerHTML = `${weather.description}`
    document.querySelector(".city").innerHTML = `${weather.city}`
    document.querySelector(".weathericon").src = weather.icon
    
}







