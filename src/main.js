import { emCartaz } from "./servicoAPI.js";
let filmesEmCartaz = emCartaz()
  .then(({ data }) => {
    return data.results;
  })
  .then(atualizaEmCartaz);

function abrirAba(id) {
  tagDivPai = document.getElementById(id);
  let tagDivFilho = tagDivPai.children.aba.classList;
  tagDivFilho.toggle("closed");
  tagDivFilho.contains("closed")
    ? (tagDivPai.getElementsByTagName("span").icone.innerHTML = "chevron_right")
    : (tagDivPai.getElementsByTagName("span").icone.innerHTML = "expand_more");
}

function atualizaEmCartaz(filmes) {
  let tagPai = document.getElementById("nosCinemas");

  filmes.forEach((element) => {
    console.log(element);
    /* nosCinemas.innerHTML(`div class="coluna filme")>
         < div class= "imagem" >
         <a id="filme" href="detalhesFilme.html" class="imagem">
           <img src="https://picsum.photos/200/300" alt="">
         </a>
           </div >
         <div class="informacoes">
           <h2><a id="filme" href="detalhesFilme.html" title="Filme 1: O Filme">Filme 1: O Filme</a></h2>

           <div class="genero">
             <ul class="generos">
               <li>
                 <a class="no-click">Acao</a>
               </li>
               <li>
                 <a class="">Comedia</a>
               </li>
               <li>
                 <a class="">Tragedia</a>
               </li>
             </ul>
           </div>

           <p id="data-lancamento"></p>
           <div id="overview" class="overview">
             <h3>Descricao: </h3>
           </div>
         </div>
         </div > `); */
  });
}
