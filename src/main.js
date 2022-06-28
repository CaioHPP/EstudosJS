import { emCartaz } from "./servicoAPI.js";

import { buscaFilme } from "./servicoAPI.js";

import { detalhesFilme } from "./servicoAPI.js";

import { generosExistentes } from "./servicoAPI.js";

import { getGenero } from "./servicoAPI.js";

import { filmesTopzeira } from "./servicoAPI.js";

window.onload = function () {
  window.history.pushState({ state: "index" }, "index", "/src/index.html");

  const dataEntries = () => {
    const dataMin = document.getElementById("dataMin");
    const dataMax = document.getElementById("dataMax");
    const anoOrigem = 1900;
    const anoAtual = new Date().getFullYear();
    for (let i = anoAtual; i >= anoOrigem; i--) {
      dataMin.innerHTML += `<option value="${i}">${i}</option>`;
      dataMax.innerHTML += `<option value="${i}">${i}</option>`;
    }
    dataMin.value = 1990;
    dataMax.value = anoAtual;
  };
  dataEntries();

  let aplicaGrafico = new Chart(document.getElementById("grafico1"), {});
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
          <div class="colunas pessoas" id="pessoas">
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
          <div id="resultadosBusca" class="colunas resultado"></div>
        </div>
      </div>
    </section>
  </div>`;
  }

  function montaIndex() {
    return `<section id="busca" class="inner-content nova-sessao">
      <div class="conteudo">
        <div class="conteudo-wrap">
          <div class="textoBemVindo">
            <h2>Bem Vindo!</h2>
            <h3>Este é um site feito para um estudo de Web.</h3>
          </div>
          <div class="caixaDePesquisa">
            <div class="form">
              <label for="">
                <input id="queryBusca" name="query" type="text" placeholder="Busque por um filme..." />
              </label>
              <input type="submit" value="Buscar" classe-pesquisa />
            </div>
          </div>
        </div>
      </div>
    </section>
    <div id="conteudoIndex">
      <section class="inner-content nova-sessao">
        <div class="conteudo-filmes">
          <div class="header-section">
            <h2>Nos Cinemas</h2>
          </div>
          <div class="midia">
            <div id="nosCinemas" class="colunas"></div>
          </div>
        </div>
      </section>
      <section id="topRated" class="inner-content nova-sessao">
        <div class="conteudo-filmes">
          <div class="header-section">
            <h2>Mais bem avaliados</h2>
          </div>
        </div>
        <div class="opcoes">
          <div class="ordenar" id="ordenar">
            <a onclick="abrirAba('ordenar')">
              <div class="texto">
                <h2>Ordenar</h2>
                <span class="material-symbols-outlined" id="icone">
                  chevron_right
                </span>
              </div>
            </a>

            <div class="selecao closed" id="aba">
              <h3>Ordenar por:</h3>
              <div class="ordenacaoInline">
                <select name="" id="ordemApresentacao">
                  <option value="melhorAvaliacao">Melhor Avaliação</option>
                  <option value="menorAvaliacao">Pior Avaliação</option>
                </select>
                <select name="" id="ordemPorVoto">
                  <option value="">--Selecione--</option>
                  <option value="votosMaior">Mais Votado</option>
                  <option value="votosMenor">Menos Votado</option>
                </select>
              </div>
            </div>
          </div>

          <div class="filtrar" id="filtrar">
            <a onclick="abrirAba('filtrar')">
              <div class="texto">
                <h2>Filtrar</h2>
                <span class="material-symbols-outlined" id="icone">chevron_right</span>
              </div>
            </a>
            <div class="filtros closed" id="aba">
              <div class="tituloBotao">
                <h3>Filtrar por:</h3>
                <div class="botoes">

                  <div class="botaoFiltrar">
                    <a id="botaoFiltrar">Filtrar</a>
                  </div>
                  <div class="botaoFiltrar closed">
                    <a id="botaoRestaurar">Restaurar</a>
                  </div>
                </div>
              </div>

              <div>
                <div class="opcoes-filtro">
                  <div class="data">
                    <h3>Data de Lançamento:</h3>

                    <div class="entrada-data">
                      <h4>De:</h4>
                      <div>
                        <select name="dataMin" id="dataMin" class="anoEntrada">
                          <option value=""></option>
                        </select>

                      </div>
                      <h4>Até:</h4>
                      <div>
                        <select name="dataMax" id="dataMax" class="anoEntrada">
                          <option value=""></option>
                        </select>

                      </div>
                    </div>
                  </div>
                  <div class="genero">
                    <h3>Gênero:</h3>
                    <ul class="generos" id="generos"></ul>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class=" topRatedList">
          <div class="grafico">
            <canvas id="grafico1" width="800" height="300"></canvas>
          </div>
          <div class="tabela">
            <table>
              <thead>
                <tr>
                  <th class="rank">Rank</th>
                  <th class="nomeFilme">Nome</th>
                  <th class="notaAvaliacao">Avaliação dos Usuários</th>
                  <th class="votos">N.º de Votos</th>
                  <th class="anoLancamento">Ano de Lançamento</th>
                </tr>
              </thead>
              <tbody id="topRatedFilmes"></tbody>
              <div id="expandeLista"></div>
            </table>
          </div>
        </div>
      </section>`;
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
      divInformacoes.style.width = "auto";
    } else if (tipo.includes("botao")) {
      divImagem.classList.remove("imagem");
      aImagem.classList.remove("imagem");
      aImagem.removeChild(img);
      divImagem.remove(aImagem);
      const span = document.createElement("span");
      span.classList.add("material-symbols-outlined");

      if (tipo === "botaoVoltar") {
        divColuna.setAttribute("id", "botaoVoltar");
        span.append("arrow_back");
        divImagem.style.width = "150px";
        divImagem.classList.add("avancarEVoltar");
        divColuna.classList.add("hidden");
        divColuna.classList.add("unselectable");
      } else if (tipo === "botaoAvancar") {
        divColuna.setAttribute("id", "botaoAvancar");
        span.append("arrow_forward");
        divColuna.setAttribute("onclick", `proxPagina(${filme})`);
        divImagem.style.width = "150px";
        divImagem.classList.add("avancarEVoltar");
        divColuna.classList.add("unselectable");
      } else if (tipo === "botaoMais") {
        span.append("add_circle");
        aImagem.setAttribute("onclick", `proxPagina(${filme})`);
        divImagem.classList.add("avancarBusca");
        divColuna.style.border = 0;
        divColuna.setAttribute("id", "botaoMais");
      }
      aImagem.appendChild(span);

      divImagem.appendChild(aImagem);
      divColuna.classList.add("filme");
      divColuna.append(divImagem);

      return divColuna;
    } else {
      if (tipo === "pesquisa") {
        divColuna.classList.add("filme");
        divColuna.classList.add("pesquisa");
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

      filme.genre_ids.forEach((genero_id) => {
        const li = document.createElement("li");
        const aLi = document.createElement("a");
        aLi.setAttribute("name", "generoLi");
        generos.then((genres) => {
          aLi.append(getGenero(genero_id, genres.genres));
        });

        li.appendChild(aLi);
        ul.appendChild(li);
      });
      if (filme.overview) {
        const descricaoH3 = document.createElement("h3");
        descricaoH3.append(`Descricao: `);
        divDescricao.appendChild(descricaoH3);
        divDescricao.append("\n");
        divDescricao.append(filme.overview || "Descrição não adicionada");
      }

      divInformacoes.appendChild(divGenero);
      divInformacoes.appendChild(dataLancamento);
      divInformacoes.appendChild(divDescricao);
    }
    divColuna.appendChild(divImagem);
    divColuna.appendChild(divInformacoes);
    if (tipo === "filme") {
      divColuna.classList.add("hidden");
    }

    return divColuna;
  }

  function montaLinhas(filme, tipo, indice) {
    const tr = document.createElement("tr");
    tr.setAttribute("ordenacao", "");
    if (tipo === "botao") {
      const divBotao = document.createElement("div");
      const botao = document.createElement("span");
      botao.append("expand_more");
      botao.classList.add("material-symbols-outlined");
      divBotao.appendChild(botao);
      divBotao.classList.add("botaoMais");
      divBotao.setAttribute("onclick", `expandirTopRated(${indice})`);
      divBotao.setAttribute("id", "expandeLista");
      return divBotao;
    }
    const tdRank = document.createElement("td");
    const tdNome = document.createElement("td");
    const tdNota = document.createElement("td");
    const tdNVotos = document.createElement("td");
    const tdAnoLancamento = document.createElement("td");
    const aNome = document.createElement("a");
    const spanToolTip = document.createElement("span");
    const divImg = document.createElement("div");
    const imagem = document.createElement("img");
    const divOver = document.createElement("div");
    const ul = document.createElement("ul");
    const h2 = document.createElement("h2");
    const divGenero = document.createElement("div");
    const over = document.createElement("p");
    const nome = document.createElement("h2");
    const dataLancamento = document.createElement("h3");

    aNome.classList.add("celulaNome");
    aNome.classList.add("tooltip");
    spanToolTip.classList.add("tooltipContent");
    divImg.classList.add("tooltipImagem");
    divOver.classList.add("tooltipTexto");
    divGenero.classList.add("genero");
    ul.classList.add("generos");

    nome.setAttribute("onclick", `abrirFilme(${filme.id})`);

    let caminho = "";
    if (filme.poster_path) {
      caminho = `https://image.tmdb.org/t/p/w500/${filme.poster_path}`;
    } else {
      caminho =
        "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
    }

    imagem.setAttribute("src", caminho);
    imagem.setAttribute("onclick", `abrirFilme(${filme.id})`);

    nome.append(filme.title);
    aNome.append(nome);
    h2.append(filme.title);
    h2.setAttribute("onclick", `abrirFilme(${filme.id})`);
    if (filme.release_date)
      dataLancamento.append(
        new Date(filme.release_date).toLocaleDateString("pt-BR")
      );
    if (filme.overview) over.append(filme.overview);

    filme.genre_ids.forEach((genero_id) => {
      const li = document.createElement("li");
      const aLi = document.createElement("a");
      aLi.setAttribute("name", "generoLi");
      generos.then((genres) => {
        aLi.append(getGenero(genero_id, genres.genres));
        tdNome.classList.add(`${genero_id}`);
      });
      li.appendChild(aLi);
      ul.appendChild(li);
    });

    tdRank.classList.add("celulaOrdem");
    tdNota.classList.add("celulaNota");
    tdNVotos.classList.add("celulaVotos");
    tdAnoLancamento.classList.add("celulaAno");

    divImg.appendChild(imagem);
    divGenero.appendChild(ul);
    divOver.appendChild(h2);
    divOver.appendChild(dataLancamento);
    divOver.appendChild(divGenero);
    divOver.append(over);
    spanToolTip.appendChild(divImg);
    spanToolTip.appendChild(divOver);
    aNome.appendChild(spanToolTip);

    tdRank.append(indice);
    tdNome.append(aNome);
    tdNota.append(filme.vote_average);
    tdNVotos.append(filme.vote_count);
    tdAnoLancamento.append(new Date(filme.release_date).getFullYear());
    tdAnoLancamento.setAttribute("data", filme.release_date);

    tr.appendChild(tdRank);
    tr.appendChild(tdNome);
    tr.appendChild(tdNota);
    tr.appendChild(tdNVotos);
    tr.appendChild(tdAnoLancamento);
    tr.classList.add("hidden");
    return tr;
  }

  function ordenaPor() {
    let filmes = [];
    let filmesNaoOrdenados = [];
    let ordem = document.getElementById("ordemPorVoto").value;

    document.querySelectorAll("[ordenacao]").forEach((tr) => {
      if (tr.classList.contains("hidden")) {
        filmesNaoOrdenados.push(tr);
      } else {
        filmes.push(tr);
      }
    });
    if (ordem === "votosMaior") {
      filmes.sort(
        (a, b) =>
          Number(b.children[3].innerHTML) - Number(a.children[3].innerHTML)
      );
    } else if (ordem === "votosMenor") {
      filmes.sort(
        (a, b) =>
          Number(a.children[3].innerHTML) - Number(b.children[3].innerHTML)
      );
    } else {
      return 1;
    }
    let tagPai = document.getElementById("topRatedFilmes");
    tagPai.innerHTML = "";
    filmes.forEach((filme, indice) => {
      filme.children[0].innerHTML = indice + 1;
      tagPai.appendChild(filme);
    });
    filmesNaoOrdenados.forEach((filme) => {
      tagPai.appendChild(filme);
    });
    atualizaGrafico();
  }

  function filtrarPor(dataMin, dataMax, generos) {
    let filmes = [];
    document.querySelectorAll("[ordenacao]").forEach((tr) => {
      filmes.push(tr);
    });

    if (dataMin) {
      const dataMenor = (filme) => filme.children[4].innerText >= dataMin;
      filmes = filmes.filter(dataMenor);
    }
    if (dataMax) {
      const dataMaior = (filme) => filme.children[4].innerText <= dataMax;
      filmes = filmes.filter(dataMaior);
    }
    if (generos.length) {
      generos.forEach((genero) => {
        filmes = filmes.filter((filme) =>
          filme.children[1].classList.contains(genero)
        );
      });
    }
    let tagPai = document.getElementById("topRatedFilmes");
    tagPai.innerHTML = "";
    filmes.forEach((filme, indice) => {
      filme.children[0].innerHTML = indice + 1;
      tagPai.appendChild(filme);
    });
  }

  function atualizaBusca(resultados) {
    let tagPai = document.getElementById("resultadosBusca");

    resultados.forEach((filme) => {
      tagPai.appendChild(montaColuna(filme, "pesquisa"));
    });
  }

  window.onpopstate = async function (event) {
    if (event && event.state) {
      if (location.pathname.includes("/detalhes/")) {
        carregaFilme(event.state.id_filme);
      } else if (location.pathname.includes("/pesquisa/")) {
        document.getElementById("conteudoSite").innerHTML = montaIndex();
        pesquisaFilme(event.state.query);
      } else if (location.pathname.includes("/src/")) {
        carregaIndex();
      }
    }
  };

  function atualizaDetalhesFilme(filme) {
    document.title = `${filme.title}`;

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
    anoFilme.append(`(${data.getFullYear()})`);
    let classificacao = document.getElementById("classificacao");
    try {
      classificacao.append(
        filme.releases.countries.find(
          (certificacao) => certificacao.iso_3166_1 === "BR"
        ).certification
      );
    } catch (e) {
      classificacao.append("NA");
    }
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
    if (filme.runtime) {
      duracao.append(
        `${Math.floor(filme.runtime / 60)}h${filme.runtime % 60}m`
      );
    } else {
      duracao.append("N/A");
    }
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
      elenco.appendChild(montaColuna(ator, "pessoa"));
      return true;
    });
  }

  function atualizaFiltro() {
    let ul = document.getElementById("generos");
    generos.then((genres) => {
      genres.genres.forEach((genero) => {
        const li = document.createElement("li");
        const aLi = document.createElement("a");
        li.setAttribute("onclick", `ativar(${genero.id})`);
        aLi.id = genero.id;
        aLi.append(genero.name);
        li.appendChild(aLi);
        ul.appendChild(li);
      });
    });
  }

  let totalTopRated = 1;
  function atualizaTopRated(ordem = "melhorAvaliacao", pagina = 0) {
    if (!pagina) {
      if (ordem === "menorAvaliacao") {
        pagina = totalTopRated;
      } else {
        pagina = 1;
      }
    }
    let tagPai = document.getElementById("topRatedFilmes");
    filmesTopzeira(pagina)
      .then(({ data }) => {
        pagina = data.page;
        if (data.total_pages > 500) {
          totalTopRated = 500;
        } else {
          totalTopRated = data.total_pages;
        }

        return data.results;
      })
      .then((filmes) => {
        if (ordem === "menorAvaliacao") {
          filmes = filmes.reverse();
        }
        filmes.forEach((filme, indice) => {
          if (pagina > 1 && pagina !== totalTopRated) {
            try {
              indice =
                document.getElementById("topRatedFilmes").lastChild.firstChild
                  .innerHTML;
            } catch {
              indice = 0;
            }
          }
          tagPai.appendChild(montaLinhas(filme, "filme", Number(indice) + 1));
        });
        if (pagina === 1 || pagina === totalTopRated) {
          for (let i = 0; i < 6; i++) {
            tagPai.children[i].classList.remove("hidden");
          }
        } else {
          for (let i = 0; i < tagPai.children.length; i++) {
            tagPai.children[i].classList.remove("hidden");
          }
        }
      })
      .then(() => {
        document.getElementById("expandeLista").remove();
        let proxPag = pagina + 1;
        if (ordem === "menorAvaliacao") {
          proxPag = pagina - 1;
        }
        tagPai.parentNode.insertBefore(
          montaLinhas("", "botao", proxPag),
          tagPai.nextSibling
        );
        if (document.getElementById("ordemPorVoto").value) {
          ordenaPor();
        }
        atualizaGrafico();
      });
  }

  function atualizaEmCartaz(pagina = 1) {
    let total = 1;
    let tagPai = document.getElementById("nosCinemas");
    if (pagina === 1) {
      tagPai.appendChild(montaColuna(pagina - 1, "botaoVoltar"));
    }
    if (pagina > 1) {
      tagPai.removeChild(tagPai.lastChild);
    }
    emCartaz(pagina)
      .then(({ data }) => {
        pagina = data.page;
        total = data.total_pages;
        return data.results;
      })
      .then((filmes) => {
        filmes.forEach((filme) => {
          tagPai.appendChild(montaColuna(filme, "filme"));
        });
      })
      .then(() => {
        if (pagina > 1) {
          tagPai.appendChild(montaColuna(6, "botaoAvancar"));
        } else if (total > 1 && pagina === 1) {
          tagPai.appendChild(montaColuna(pagina + 1, "botaoAvancar"));
        }
        if (pagina === 1) {
          exibe3Filmes(1);
        }
      });
  }

  const generos = generosExistentes().then(({ data }) => {
    return data;
  });

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

  function carregaFilme(id) {
    document.getElementById("index").removeAttribute("pesquisa");
    document.getElementById("index").removeAttribute("pagina");
    let filme = document.getElementById("conteudoSite");
    filme.innerHTML = montaDetalhes();
    detalhesFilme(id)
      .then(({ data }) => {
        return data;
      })
      .then(atualizaDetalhesFilme);
  }

  window.abrirFilme = function (id) {
    window.history.pushState(
      { state: "detalhes", id_filme: id },
      "Detalhes",
      `/detalhes/${id}`
    );
    carregaFilme(id);
  };

  window.proxPagina = function (pagina, dir = "") {
    if (query) {
      carregaPesquisa(query, pagina);
    } else {
      exibe3Filmes(pagina);
      if (
        pagina === 5 &&
        document.getElementById("nosCinemas").children.length <= 22
      ) {
        atualizaEmCartaz(2);
      }
      let tagPai = document.getElementById("nosCinemas");
      if (dir === "avancar") {
        tagPai.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else if (dir === "voltar") {
        tagPai.scrollTo({
          left: tagPai.scrollWidth,
          behavior: "smooth",
        });
      }
    }
  };

  window.expandirTopRated = function (pagina = 0) {
    if (pagina) {
      atualizaTopRated(
        document.getElementById("ordemApresentacao").value,
        pagina
      );
    }
  };

  window.ativar = function (id) {
    document.getElementById(id).parentNode.classList.toggle("filtroAtivo");
    document.getElementById(id).classList.toggle("ativo");
  };

  window.onscroll = function () {
    if (document.getElementById("index").hasAttribute("pesquisa")) {
      if (document.getElementById("index").getAttribute("pagina") > -1) {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          carregaPesquisa(
            query,
            Number.parseInt(
              document.getElementById("index").getAttribute("pagina")
            ) + 1
          );
        }
      }
    }
  };

  function carregaIndex() {
    document.getElementById("index").removeAttribute("pesquisa");
    document.getElementById("index").removeAttribute("pagina");
    document.title = `Meu Site`;
    query = "";
    let conteudo = document.getElementById("conteudoSite");
    conteudo.innerHTML = "";
    conteudo.innerHTML = montaIndex();

    window.abaPesquisa = document.querySelector("[classe-pesquisa]");
    abaPesquisa.onclick = function (e) {
      e.preventDefault();
      query = document.getElementById("queryBusca").value;
      if (query) {
        window.history.pushState(
          { state: "pesquisa", query },
          "Pesquisa",
          `/pesquisa/${query}`
        );
        document.title = `${query} - Resultados`;
        pesquisaFilme(query);
      }
    };

    const ordemApresentacao = document.getElementById("ordemApresentacao");
    ordemApresentacao.onchange = function (e) {
      document.getElementById("topRatedFilmes").innerHTML = "";
      atualizaTopRated(ordemApresentacao.value);
      ordemPorVotos.options[0].selected = true;
      ordemApresentacao.focus();
    };

    const ordemPorVotos = document.getElementById("ordemPorVoto");
    ordemPorVotos.onchange = function (e) {
      if (ordemPorVotos.value) {
        ordenaPor();
      } else {
        document.getElementById("topRatedFilmes").innerHTML = "";
        atualizaTopRated(ordemApresentacao.value);
      }
      ordemPorVotos.focus();
    };

    const filtrar = document.getElementById("botaoFiltrar");
    filtrar.onclick = function (e) {
      const dataMin = document.getElementById("dataMin").value;
      const dataMax = document.getElementById("dataMax").value;
      const generosFiltrados = document.querySelectorAll(".ativo");
      let generosExigidos = [];
      generosFiltrados.forEach((genero) => {
        generosExigidos.push(genero.id);
      });
      if (dataMin || dataMax || generosExigidos.length) {
        filtrarPor(dataMin, dataMax, generosExigidos);
        document
          .getElementById("botaoRestaurar")
          .parentNode.classList.remove("closed");
        atualizaGrafico();
      } else {
        document.getElementById("topRatedFilmes").innerHTML = "";
        document
          .getElementById("botaoRestaurar")
          .parentNode.classList.add("closed");
        ordemPorVotos.options[0].selected = true;
        atualizaTopRated(ordemApresentacao.value);
      }
    };

    const restaurar = document.getElementById("botaoRestaurar");
    restaurar.onclick = function (e) {
      document.getElementById("topRatedFilmes").innerHTML = "";
      atualizaTopRated(ordemApresentacao.value);
      restaurar.parentNode.classList.add("closed");
      ordemPorVotos.options[0].selected = true;
    };

    atualizaFiltro();
    atualizaEmCartaz();
    atualizaTopRated();
  }

  function carregaPesquisa(query, pagina = 0) {
    document.getElementById("index").setAttribute("pesquisa", true);

    let total = 0;
    buscaFilme(query, pagina)
      .then(({ data }) => {
        pagina = data.page;
        total = data.total_pages;
        return data.results;
      })
      .then(atualizaBusca)
      .then(() => {
        if (pagina < total) {
          document.getElementById("index").setAttribute("pagina", pagina);
        } else {
          document.getElementById("index").setAttribute("pagina", -1);
        }
      });
  }

  window.abaIndex = document.querySelector("[classe-home]");
  window.abaPesquisa = document.querySelector("[classe-pesquisa]");
  abaIndex.onclick = function (e) {
    e.preventDefault();
    ultimaBusca = "";
    window.history.pushState({ state: "index" }, "index", "/src/index.html");
    carregaIndex();
  };
  let ultimaBusca = "";
  let query = "";
  abaPesquisa.onclick = function (e) {
    e.preventDefault();
    query = document.getElementById("queryBusca").value;
    if (query) {
      window.history.pushState(
        { state: "pesquisa", query },
        "Pesquisa",
        `/pesquisa/${query}`
      );
      document.title = `${query} - Resultados`;
      pesquisaFilme(query);
    }
  };

  function pesquisaFilme(query) {
    let pesquisa = document.getElementById("conteudoIndex");
    pesquisa.innerHTML = montaResultado();
    ultimaBusca = query;
    carregaPesquisa(query);
  }

  const ordemApresentacao = document.getElementById("ordemApresentacao");
  ordemApresentacao.onchange = function (e) {
    document.getElementById("topRatedFilmes").innerHTML = "";
    atualizaTopRated(ordemApresentacao.value);
    ordemPorVotos.options[0].selected = true;
    ordemApresentacao.focus();
  };

  const ordemPorVotos = document.getElementById("ordemPorVoto");
  ordemPorVotos.onchange = function (e) {
    if (ordemPorVotos.value) {
      ordenaPor();
    } else {
      document.getElementById("topRatedFilmes").innerHTML = "";
      atualizaTopRated(ordemApresentacao.value);
    }
    ordemPorVotos.focus();
  };

  const filtrar = document.getElementById("botaoFiltrar");
  filtrar.onclick = function (e) {
    const dataMin = document.getElementById("dataMin").value;
    const dataMax = document.getElementById("dataMax").value;
    const generosFiltrados = document.querySelectorAll(".ativo");
    let generosExigidos = [];
    generosFiltrados.forEach((genero) => {
      generosExigidos.push(genero.id);
    });
    if (dataMin || dataMax || generosExigidos.length) {
      filtrarPor(dataMin, dataMax, generosExigidos);
      document
        .getElementById("botaoRestaurar")
        .parentNode.classList.remove("closed");
      atualizaGrafico();
    } else {
      document.getElementById("topRatedFilmes").innerHTML = "";
      document
        .getElementById("botaoRestaurar")
        .parentNode.classList.add("closed");
      ordemPorVotos.options[0].selected = true;
      atualizaTopRated(ordemApresentacao.value);
    }
  };

  const restaurar = document.getElementById("botaoRestaurar");
  restaurar.onclick = function (e) {
    document.getElementById("topRatedFilmes").innerHTML = "";
    atualizaTopRated(ordemApresentacao.value);
    restaurar.parentNode.classList.add("closed");
    ordemPorVotos.options[0].selected = true;
  };

  window.exibe3Filmes = (insidePage) => {
    let filmes = document.querySelectorAll(".filme");

    filmes.forEach((filme, index) => {
      if (index <= insidePage * 3 && index > insidePage * 3 - 3) {
        filme.classList.remove("hidden");
      } else {
        filme.classList.add("hidden");
      }
    });
    if (insidePage === 14) {
      document.getElementById("botaoAvancar").classList.add("hidden");
    } else {
      document.getElementById("botaoAvancar").classList.remove("hidden");
    }
    document
      .getElementById("botaoAvancar")
      .setAttribute("onclick", `proxPagina(${insidePage + 1}, "avancar")`);

    if (insidePage > 1) {
      document.getElementById("botaoVoltar").classList.remove("hidden");
      document
        .getElementById("botaoVoltar")
        .setAttribute("onclick", `proxPagina(${insidePage - 1}, "voltar")`);
    } else {
      document.getElementById("botaoVoltar").classList.add("hidden");
    }
  };

  atualizaEmCartaz();
  atualizaTopRated();
  atualizaFiltro();

  function atualizaGrafico() {
    aplicaGrafico.destroy();

    aplicaGrafico = new Chart(document.getElementById("grafico1"), {});
    let labels = [];
    let datasets = [];
    let datasetsNota = {
      type: "bar",
      label: "Avaliação",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      borderColor: "rgb(255, 99, 132)",
      data: [],
      yAxisID: "y",
    };
    let datasetsVotos = {
      type: "bar",
      label: "N° de Votos",
      backgroundColor: "rgba(54, 162, 235, 0.5)",
      borderColor: "rgb(54, 162, 235)",
      data: [],
      yAxisID: "y1",
    };

    let filmes = document.getElementById("topRatedFilmes");
    filmes = Array.from(filmes.childNodes).filter(
      (filme) => !filme.classList.contains("hidden")
    );

    for (let i = 0; i < 6 && i < filmes.length; i++) {
      labels.push(filmes[i].childNodes[1].innerText);
      datasetsNota.data.push(filmes[i].childNodes[2].innerText);
      datasetsVotos.data.push(filmes[i].childNodes[3].innerText);
    }
    datasets.push(datasetsNota);
    datasets.push(datasetsVotos);

    aplicaGrafico.config.data.labels = labels;
    aplicaGrafico.config.data.datasets = datasets;
    aplicaGrafico.config.options = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      stacked: true, // para otimizar o gráfico
      plugins: {
        title: {
          display: true,
          text: "Votos",
        },
      },
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
          title: {
            display: true,
            text: "Avaliação",
            color: "rgba(255, 99, 132, 1)",
          },
          ticks: {
            color: "rgba(255, 99, 132, 1)",
          },
          grid: {
            color: "rgba(255, 99, 132, 0.1)",
          },
          max: 10,
          min: 0,
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          title: {
            display: true,
            text: "Nº de Votos",
            color: "rgba(54, 162, 235, 1)",
          },
          ticks: {
            color: "rgba(54, 162, 235, 1)",
          },
          grid: {
            color: "rgba(54, 162, 235, 0.1)",
            drawOnChartArea: true, // only want the grid lines for one axis to show up
          },
        },
        x: {
          display: true,
          position: "bottom",
          grid: {
            display: false,
          },
          ticks: {
            source: "labels",
          },
        },
      },
    };

    aplicaGrafico.update();
  }
};
