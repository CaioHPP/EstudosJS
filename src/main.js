import { emCartaz } from "./servicoAPI.js";

import { buscaFilme } from "./servicoAPI.js";

import { generosExistentes } from "./servicoAPI.js";

import { getGenero } from "./servicoAPI.js";

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
    console.log(id);
  };

  function carregaIndex() {
    let conteudo = document.getElementById("conteudoIndex");
    fetch("./conteudoIndex.html")
      .then((resp) => resp.text())
      .then((html) => (conteudo.innerHTML = html))
      .then(atualizaEmCartaz)
      .then(atualizaGenero);
  }

  function carregaPesquisa(query) {
    let pesquisa = document.getElementById("conteudoIndex");
    fetch("./pesquisa.html")
      .then((resp) => resp.text())
      .then((html) => (pesquisa.innerHTML = html));
    buscaFilme(query)
      .then(({ data }) => {
        return data.results;
      })
      .then(atualizaBusca)
      .then(atualizaGenero);
  }

  function montaColuna(filme, tipo) {
    const divColuna = document.createElement("div");
    divColuna.classList.add("coluna");
    divColuna.classList.add("filme");
    if (tipo === "pesquisa") divColuna.classList.add("pesquisa");

    const divImagem = document.createElement("div");
    divImagem.classList.add("imagem");

    const aImagem = document.createElement("a");
    aImagem.classList.add("imagem");

    aImagem.setAttribute("onclick", `abrirFilme(${filme.id})`);

    const img = document.createElement("img");
    let caminho = "";
    if (filme.poster_path) {
      caminho = `https://image.tmdb.org/t/p/w500/${filme.poster_path}`;
    } else {
      caminho =
        "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
    }
    img.setAttribute("src", caminho);

    aImagem.appendChild(img);
    divImagem.appendChild(aImagem);

    const divInformacoes = document.createElement("div");
    divInformacoes.classList.add("informacoes");

    const h2 = document.createElement("h2");
    const aNome = document.createElement("a");
    aNome.setAttribute("onclick", `abrirFilme(${filme.id})`);
    aNome.append(filme.title);

    h2.appendChild(aNome);
    divInformacoes.appendChild(h2);

    const divGenero = document.createElement("div");
    divGenero.classList.add("genero");

    const ul = document.createElement("ul");
    ul.classList.add("generos");
    ul.setAttribute("id", filme.id);
    filme.genre_ids.forEach((genero) => {
      const li = document.createElement("li");
      const aLi = document.createElement("a");
      aLi.setAttribute("name", "generoLi");
      aLi.append(genero);
      li.appendChild(aLi);
      ul.appendChild(li);
    });
    divGenero.appendChild(ul);

    const dataLancamento = document.createElement("p");
    dataLancamento.append(filme.release_date || "");

    const divDescricao = document.createElement("div");
    divDescricao.classList.add("overview");

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
    divColuna.appendChild(divImagem);
    divColuna.appendChild(divInformacoes);

    return divColuna;
  }

  function atualizaBusca(resultados) {
    let tagPai = document.getElementById("resultadoBusca");

    resultados.forEach((filme) => {
      tagPai.appendChild(montaColuna(filme, "pesquisa"));
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
          tagPai.appendChild(montaColuna(filme, "Cartaz"));
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
          ).name;
        });
      });
  }
  atualizaEmCartaz();
  atualizaGenero();

  const abaIndex = document.querySelector("[classe-home]");
  abaIndex.onclick = function (e) {
    e.preventDefault();
    carregaIndex();
  };

  const abaPesquisa = document.querySelector("[classe-pesquisa]");
  abaPesquisa.onclick = function (e) {
    e.preventDefault();
    let query = abaPesquisa.form.query.value;
    if (query) {
      carregaPesquisa(query);
    }
  };
};
