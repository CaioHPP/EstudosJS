const axios = require('axios')

const urlAPI = 'https://api.themoviedb.org/3/'
const keyAPI = '?api_key=721dc9f1ceea2fe30a6f0514d5586aa7'

const lingua = 'pt-BR'
const regiao = 'BR'



function buscaFilme(texto){
    const url =  `${urlAPI}search/movie${keyAPI}&language=${lingua}&region=${regiao}&query=${texto}`
    encodedurl = encodeURI(url)
    console.log(encodedurl)
    const response = axios.get(encodedurl)
    return response
}
buscaFilme('Jack Reacher')
.then(({data})=>{
    console.log(data)
})
