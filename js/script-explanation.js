
const searchInput = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')


const cities = []

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

//promise
const promContent = fetch(endpoint)
                         .then(response => response.json())
                         .then(result => cities.push(...result))


// function generic that returns a filtered array from the word in argument
const findMatches = function(word, cities){
    return cities.filter( place =>{
        //regex helps to do this more easily to find the match
        const regex = new RegExp(word, 'gi')
        return place.city.match(regex) || place.state.match(regex)
    })
}

function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const showMatches = function(){
    
    //array filtered with matches from input value
    const matchArr = findMatches(this.value, cities)

    console.log(matchArr)

    // create html elements from the transformed array by map that 
    //takes only the cities and the states
    const htmlOutput = matchArr.map( place =>{

        
        //* highlight the letters from input value that correspont to the city Name
        //* -creating a span to envolve the letters from input.value
        //input value regex to help to do the replace method more easily
        const regex = new RegExp(this.value , 'gi')
        //inside the place.city (city name) replace the letters from input.value to higlighted  because of adding span .hl around the letters from input.value
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>` )
        const stateName = place.state.replace( regex, `<span class="hl">${this.value}</span>`)

       //after adding span element we will create the rest html elements
       return `
        <li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population">${numberWithCommas(place.population)}</span>
        </li> 
       `
    }).join('')

    suggestions.innerHTML = htmlOutput
}


searchInput.addEventListener('keyup', showMatches)