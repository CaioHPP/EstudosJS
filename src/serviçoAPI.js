const axios = require("axios");

const urlAPI = "https://api.themoviedb.org/3/";
const keyAPI = "?api_key=721dc9f1ceea2fe30a6f0514d5586aa7";

const lingua = "pt-BR";
const regiao = "BR";

const generos = () => {
  const url = `${urlAPI}genre/movie/list${keyAPI}&language=${lingua}`;
  const response = axios.get(url);

  return response;
};

const getGenero = (id, generos) => generos.find((genero) => genero.id === id);

function buscaFilme(texto) {
  const url = `${urlAPI}search/movie${keyAPI}&language=${lingua}&region=${regiao}&query=${texto}`;
  encodedurl = encodeURI(url);
  console.log(encodedurl);
  const response = axios.get(encodedurl);
  return response;
}
export buscaFilme()


function nosCinemas(jorge2) {
  const url = `${urlAPI}movie/now_playing${keyAPI}&language=${lingua}&region=${regiao}`;
  const response = axios.get(url);
  return response;
}

function filmesTopzeira() {
  const url = `${urlAPI}movie/top_rated${keyAPI}&language=${lingua}&region=${regiao}`;
  encodedurl = encodeURI(url);
  console.log(encodedurl);
  const response = axios.get(encodedurl);
  return response;
}

buscaFilme("Jack").then(({ data: { results } }) => {
  let jorge;

  generos().then(({ data: { genres: generos } }) => {
    jorge = results.map((filme) => {
      filme.genre_ids = filme.genre_ids.map((id) => {
        return getGenero(id, generos).name;
      });
      return filme;
    });
    console.log(jorge);
  });
});

 
nosCinemas()
.then(({data})=>{
    console.log(data)
}).catch(console.log)

/*
filmesTopzeira()
.then(({data})=>{
    console.log()
})
.catch(console.log)
*/


