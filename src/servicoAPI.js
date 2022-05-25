const urlAPI = "https://api.themoviedb.org/3/";
const keyAPI = "?api_key=721dc9f1ceea2fe30a6f0514d5586aa7";

const lingua = "pt-BR";
const regiao = "BR";

export const generosExistentes = () => {
  const url = `${urlAPI}genre/movie/list${keyAPI}&language=${lingua}`;
  const response = axios.get(url);
  return response;
};

export const getGenero = (id, generos) =>
  generos.find((genero) => genero.id === id).name;

export function buscaFilme(texto, pagina) {
  let url = `${urlAPI}search/movie${keyAPI}&language=${lingua}&region=${regiao}&query=${texto}`;
  if (pagina) {
    url += `&page=${pagina}`;
    console.log(url);
  }
  let encodedurl = encodeURI(url);

  const response = axios.get(encodedurl);
  return response;
}

export function emCartaz(pagina) {
  let url = `${urlAPI}movie/now_playing${keyAPI}&language=${lingua}&region=${regiao}`;
  if (pagina) {
    url += `&page=${pagina}`;
  }
  let encodedurl = encodeURI(url);
  const response = axios.get(encodedurl);
  return response;
}

export function detalhesFilme(idFilme) {
  const url = `${urlAPI}movie/${idFilme}${keyAPI}&language=${lingua}&append_to_response=releases,credits`;
  let encodedurl = encodeURI(url);
  const response = axios.get(encodedurl);
  return response;
}

function filmesTopzeira() {
  const url = `${urlAPI}movie/top_rated${keyAPI}&language=${lingua}&region=${regiao}`;
  let encodedurl = encodeURI(url);
  console.log(encodedurl);
  const response = axios.get(encodedurl);
  return response;
}
