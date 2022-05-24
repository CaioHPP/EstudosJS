import { emCartaz } from "./servicoAPI.js";

import { buscaFilme } from "./servicoAPI.js";

import { detalhesFilme } from "./servicoAPI.js";

import { generosExistentes } from "./servicoAPI.js";

import { getGenero } from "./servicoAPI.js";

function montaDetalhes() {
  return `<div id="conteudoIndex">
  <div class="conteudoDetalhes">
    <section class="inner-content nova-sessao" id="sessao">
      <div class="detalhes-filme" id="grad">
        <div class="poster">
          <img alt="Imagem do Filme" id="posterFilme" />
        </div>
        <div class="conteudo-filme">
          <div class="titulo">
            <h2 id="nomeFilme"></h2>
            <span class="data" id="anoFilme"></span>
          </div>
          <div class="descricao">
            <div class="informacoes">
              <span class="classificao" id="classificacao"></span>
              <span class="dataFilme" id="dataFilme"></span>
              <div class="genero">
                <ol class="generos" id="generos">
                </ol>
              </div>
              <span class="material-symbols-outlined"> schedule </span>
              <span class="duracao" id="duracao"></span>
            </div>
            <div class="sinopse">
              <h3>Sinopse</h3>
              <div class="texto">
                <p id="overview"></p>
              </div>
            </div>
            <div class="arte">
              <ol id="criacao">
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="inner-content nova-sessao">
      <div class="conteudo-filmes">
        <div class="header-section">
          <h2>Elenco Principal</h2>
        </div>
        <div class="midia">
          <div class="colunas" id="pessoas">
            <div class="coluna pessoa">
              <div class="imagem">
                <img src="https://picsum.photos/200/300" alt="" />
              </div>
              <div class="informacoes">
                <h4 class="nome">Nome da pessoa</h4>
                <h5 class="papel">Papel da pessoa</h5>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
</div>
`;
}

function montaResultado() {
  return `<div class="conteudoPesquisa">
    <section class="resultadosBusca">
      <div class="containerResultados">
        <div class="midia">
          <div id="resultadoBusca" class="colunas resultado"></div>
        </div>
      </div>
    </section>
  </div>`;
}

function montaColuna(filme, tipo) {
  const divColuna = document.createElement("div");
  const divImagem = document.createElement("div");
  const aImagem = document.createElement("a");
  const img = document.createElement("img");
  const divInformacoes = document.createElement("div");
  const aNome = document.createElement("a");

  divColuna.classList.add(tipo);
  divColuna.classList.add("coluna");
  divImagem.classList.add("imagem");
  aImagem.classList.add("imagem");
  divInformacoes.classList.add("informacoes");

  let caminho = "";
  if (filme.poster_path || filme.profile_path) {
    caminho = `https://image.tmdb.org/t/p/w500/${
      filme.poster_path || filme.profile_path
    }`;
  } else {
    caminho =
      "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
  }

  img.setAttribute("src", caminho);
  aImagem.appendChild(img);
  divImagem.appendChild(aImagem);
  aNome.append(filme.title || filme.name);

  if (tipo === "pessoa") {
    const h4 = document.createElement("h4");
    const h5 = document.createElement("h5");
    h4.appendChild(aNome);
    h5.append(filme.character);
    divInformacoes.appendChild(h4);
    divInformacoes.appendChild(h5);
  } else {
    if (tipo === "pesquisa") {
      divColuna.classList.add("filme");
    }
    const h2 = document.createElement("h2");
    const divGenero = document.createElement("div");
    const ul = document.createElement("ul");
    const dataLancamento = document.createElement("p");
    const divDescricao = document.createElement("div");

    divGenero.classList.add("genero");
    ul.classList.add("generos");
    divDescricao.classList.add("overview");

    h2.appendChild(aNome);
    divInformacoes.appendChild(h2);
    divGenero.appendChild(ul);
    dataLancamento.append(filme.release_date || "");

    ul.setAttribute("id", filme.id);
    aNome.setAttribute("onclick", `abrirFilme(${filme.id})`);
    aImagem.setAttribute("onclick", `abrirFilme(${filme.id})`);

    filme.genre_ids.forEach((genero) => {
      const li = document.createElement("li");
      const aLi = document.createElement("a");
      aLi.setAttribute("name", "generoLi");
      aLi.append(genero);
      li.appendChild(aLi);
      ul.appendChild(li);
    });
    if (filme.overview) {
      const descricaoH3 = document.createElement("h3");
      descricaoH3.append(`Descricao: `);
      divDescricao.appendChild(descricaoH3);
      divDescricao.append("\n");
      divDescricao.append(filme.overview || "Descricao Nao Adicionada");
    }

    divInformacoes.appendChild(divGenero);
    divInformacoes.appendChild(dataLancamento);
    divInformacoes.appendChild(divDescricao);
  }
  divColuna.appendChild(divImagem);
  divColuna.appendChild(divInformacoes);

  return divColuna;
}

function atualizaBusca(resultados) {
  let tagPai = document.getElementById("resultadoBusca");

  console.log("peguei a tag pra atualizar");
  console.log(tagPai);
  resultados.forEach((filme) => {
    console.log(filme);
    tagPai.appendChild(montaColuna(filme, "pesquisa"));
  });
}

function atualizaDetalhesFilme(filme) {
  console.log(filme);
  let caminho = "";
  if (filme.poster_path) {
    caminho = `https://image.tmdb.org/t/p/w500/${filme.poster_path}`;
  } else {
    caminho =
      "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
  }
  let caminho2 = "";
  if (filme.backdrop_path) {
    caminho2 = `https://image.tmdb.org/t/p/original/${filme.backdrop_path}`;
  }
  let back = document.getElementById("sessao");
  back.style.backgroundImage = `url(${caminho2})`;
  back.style.display = "block";
  let grad = document.getElementById("grad");
  grad.style.backgroundImage =
    "linear-gradient(to right, rgb(26, 26, 26) 150px, rgba(60, 61, 62, 0.84) 100%)";
  let poster = document.getElementById("posterFilme");
  poster.setAttribute("src", caminho);
  let nomeFilme = document.getElementById("nomeFilme");
  nomeFilme.append(filme.title);
  let anoFilme = document.getElementById("anoFilme");
  let data = new Date(filme.release_date);
  anoFilme.append(data.getFullYear());
  let classificacao = document.getElementById("classificacao");
  classificacao.append(
    filme.releases.countries.find(
      (certificacao) => certificacao.iso_3166_1 === "BR"
    ).certification
  );
  let dataFilme = document.getElementById("dataFilme");
  dataFilme.append(data.toLocaleDateString("pt-BR"));

  let ol = document.getElementById("generos");
  filme.genres.forEach((genero) => {
    const li = document.createElement("li");
    li.setAttribute("name", "generoLi");
    li.append(genero.name);
    ol.appendChild(li);
  });
  let duracao = document.getElementById("duracao");
  duracao.append(`${Math.floor(filme.runtime / 60)}h${filme.runtime % 60}m`);
  let overview = document.getElementById("overview");
  overview.append(filme.overview);

  let criacao = document.getElementById("criacao");
  let criadores = filme.credits.crew.filter((pessoa) => {
    return (
      pessoa.job === "Director" ||
      pessoa.job === "Screenplay" ||
      pessoa.job === "Writer" ||
      pessoa.job === "Characters"
    );
  });
  criadores.sort(function (a, b) {
    return b.popularity - a.popularity;
  });
  criadores.forEach((criador) => {
    const novoCriador = document.createElement("li");
    const h4 = document.createElement("h4");
    const h5 = document.createElement("h5");
    novoCriador.classList.add("perfil");
    h4.classList.add("nome");
    h5.classList.add("papel");
    h4.append(criador.name);
    h5.append(criador.job);
    novoCriador.append(h4);
    novoCriador.append(h5);
    criacao.appendChild(novoCriador);
  });

  const elenco = document.getElementById("pessoas");
  let atores = filme.credits.cast.filter((pessoa) => {
    return pessoa.known_for_department === "Acting";
  });
  atores.sort(function (a, b) {
    return b.popularity - a.popularity;
  });
  atores.every((ator, indice) => {
    if (indice > 9) {
      return false;
    }
    console.log(ator, indice);
    elenco.appendChild(montaColuna(ator, "pessoa"));
    return true;
  });
}

function atualizaEmCartaz() {
  const filmesEmCartaz = emCartaz()
    .then(({ data }) => {
      return data.results;
    })
    .then((filmes) => {
      let tagPai = document.getElementById("nosCinemas");

      filmes.forEach((filme) => {
        tagPai.appendChild(montaColuna(filme, "filme"));
      });
    });
}
function atualizaGenero() {
  const generos = generosExistentes()
    .then(({ data }) => {
      return data;
    })
    .then((generos) => {
      document.getElementsByName("generoLi").forEach((genero) => {
        genero.innerHTML = getGenero(
          parseInt(genero.innerHTML),
          generos.genres
        );
      });
    });
}

window.onload = function () {
  window.abrirAba = function (id) {
    let tagDivPai = document.getElementById(id);
    let tagDivFilho = tagDivPai.children.aba.classList;
    tagDivFilho.toggle("closed");
    tagDivFilho.contains("closed")
      ? (tagDivPai.getElementsByTagName("span").icone.innerHTML =
          "chevron_right")
      : (tagDivPai.getElementsByTagName("span").icone.innerHTML =
          "expand_more");
  };

  window.abrirFilme = function (id) {
    let filme = document.getElementById("conteudoSite");
    filme.innerHTML = montaDetalhes();
    detalhesFilme(id)
      .then(({ data }) => {
        return data;
      })
      .then(atualizaDetalhesFilme);
  };

  function carregaIndex() {
    try {
      let conteudo = document.getElementById("conteudoIndex");
      fetch("./conteudoIndex.html")
        .then((resp) => resp.text())
        .then((html) => (conteudo.innerHTML = html))
        .then(atualizaEmCartaz)
        .then(atualizaGenero);
    } catch {
      document.location.reload(true);
    }
  }

  function carregaPesquisa(query) {
    let pesquisa = document.getElementById("conteudoIndex");
    pesquisa.innerHTML = montaResultado();
    buscaFilme(query)
      .then(({ data }) => {
        return data.results;
      })
      .then(atualizaBusca)
      .then(atualizaGenero);
  }

  const abaIndex = document.querySelector("[classe-home]");
  abaIndex.onclick = function (e) {
    e.preventDefault();
    ultimaBusca = "";
    carregaIndex();
  };

  const abaPesquisa = document.querySelector("[classe-pesquisa]");
  let ultimaBusca = "";
  let query = "";
  abaPesquisa.onclick = function (e) {
    e.preventDefault();
    query = abaPesquisa.form.query.value;
    if (query && ultimaBusca !== query) {
      ultimaBusca = query;
      console.log(query);
      carregaPesquisa(query);
    }
  };
};
