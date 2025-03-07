const cadastroProduto = document.getElementById("cadastro-form");
const produtoNome = document.getElementById("produto-nome");
const descricaoProduto = document.getElementById("descricao-produto");
const valorProduto = document.getElementById("valor-produto");
const buttonSubmit = document.getElementById("submit");
const form = document.getElementById("cadastro-form");
const listaContainer = document.getElementById("lista-container");
const formContainer = document.getElementById("form-container");

let listProduto = JSON.parse(localStorage.getItem("listaProdutos")) ?? [];




// Função para adicionar o objeto ao localStorage
function salvarProduto() {
    let disponibilidade = document.querySelector('input[name="disponivel"]:checked');

    const produto = {
        nome: produtoNome.value,
        descricao: descricaoProduto.value,
        valor: valorProduto.value.replace(',', '.'),
        disponivel: disponibilidade === "sim" ? "sim" : "não"
    };

    listProduto.push(produto);
    ordenarLista();
    localStorage.setItem("listaProdutos", JSON.stringify(listProduto));

    form.reset();
    mostarListaProdutos();
}



// Ordena a lista pelo preço
function ordenarLista() {
    listProduto.sort((a, b) => parseFloat(a.valor) - parseFloat(b.valor));
}

// Atualiza a tela mostrando o formulário ou a lista de produtos
function atualizarTela() {
    if (listProduto.length === 0) {
        formContainer.style.display = "block";
        listaContainer.style.display = "none";
    } else {
        listaContainer.style.display = "block";
        formContainer.style.display = "none";
    }
}

// Mostra a lista de produtos
function mostarListaProdutos() {
    atualizarTela();
    listaContainer.innerHTML = "";

    // Botão para voltar ao formulário
    const botaoAdicionar = document.createElement("button");
    botaoAdicionar.id = "retornar-form";
    botaoAdicionar.textContent = "Adicionar novo produto";
    botaoAdicionar.addEventListener("click", retornarForm);
    listaContainer.appendChild(botaoAdicionar);

    listProduto.forEach((produto, index) => {
        const item = document.createElement("article");
        item.innerHTML = `
            <label>Nome:</label>
            <strong>${produto.nome}</strong><br>
            <label>Valor:</label>
            <span>R$ ${produto.valor}</span><br>
            <label>Descrição:</label>
            <em>${produto.descricao}</em><br>
            <label>Disponível:</label>
            <span>${produto.disponivel}</span><br>
            <button id="remove-button" onclick="removerProduto(${index})">Remover</button>
        `;
        listaContainer.appendChild(item);
    });
}

// Retorna ao formulário a partir da lista
function retornarForm() {
    const listaVisivel = listaContainer.style.display === "block";
    listaContainer.style.display = listaVisivel ? "none" : "block";
    formContainer.style.display = listaVisivel ? "block" : "none";
}

// Remove um produto da lista
function removerProduto(index) {
    listProduto.splice(index, 1);
    localStorage.setItem("listaProdutos", JSON.stringify(listProduto));
    mostarListaProdutos();
}

// Enviar formulário
form.addEventListener("submit", function (event) {
    event.preventDefault();
    salvarProduto();
});
