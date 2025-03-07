const nomeProduto = document.getElementById("produto-nome");
const descricaoProduto = document.getElementById("descricao-produto");
const valorProduto = document.getElementById("valor-produto");
const form = document.querySelector("form");
const listaContainer = document.getElementById("lista-container");
const formContainer = document.getElementById("cadastro-form");



// verifica se existe uma lista no local storage e cria uma caso não haja
let listProduto = JSON.parse(localStorage.getItem("listaProdutos")) ?? [];

// adicionar evento para formatar o input de valor
valorProduto.addEventListener("input", function() {
    let value = this.value.replace(/\D/g, ""); 
    value = value.replace(/^0+/, ""); 

  
    let intPart = value.slice(0, -2) || "0";
    let decimalPart = value.slice(-2).padStart(2, "0");

    this.value = intPart + "," + decimalPart;
});


// função para criar o objeto que será adicionado ao local storage com as informções dos produtos
function salvarProduto() {
    // checagem de marcação da disponibilidade do produto
    let disponibilidade = document.querySelector('input[name="disponivel"]:checked');
    
    
    const produto = {
        nome: nomeProduto.value,
        descricao: descricaoProduto.value,
        valor: valorProduto.value,
        disponivel: disponibilidade.value === "sim" ? "sim" : "não"
        
    };

    
    listProduto.push(produto);
    localStorage.setItem("listaProdutos", JSON.stringify(listProduto));
    ordenarLista(listProduto);
    form.reset();
    
}


// função para orndernar a lista do menor para o maior
function ordenarLista(listProduto) {
    listProduto.sort((a, b) => {
        // converter o valor do input para float
        let valorA = parseFloat(a.valor.replace(',', '.'));
        let valorB = parseFloat(b.valor.replace(',', '.'));

        return valorA - valorB;
}) 
}

//função para atualizar a tela entre o formulário e a lista de produtos
function atualizarTela() {
    if (listProduto.length === 0) {
        formContainer.style.display = "block";
        listaContainer.style.display = "none";
    
    } else {
        listaContainer.style.display = "block";
        formContainer.style.display = "none";

    }
}

// principal função para criar os elementos na lista de produtos
function mostrarListaProduto() {
   
    atualizarTela();

    listaContainer.innerHTML = "";

    //criação do botão para adicionar itens a partir da lista de produtos
    const botaoAdicionar = document.createElement("button");
    botaoAdicionar.id = "retornar-form";
    botaoAdicionar.textContent = "Adicionar novo produto";
    botaoAdicionar.addEventListener("click", retontarForm);
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
            <span>${produto.disponivel}<br>
            <button id="remove-button" onclick="removerProduto(${index})">Remover</button>
            
        `;

   
        listaContainer.appendChild(item);
    });

    
    
}

// função para retornar ao formulário a partir do botãoAdicionar
function retontarForm() {
    const listaVisivel = listaContainer.style.display === "block";
    listaContainer.style.display = listaVisivel ? "none" : "block";
    formContainer.style.display = listaVisivel ? "block" : "none";
}




// remover produto da lista
function removerProduto(index) {
    listProduto.splice(index, 1); 
    localStorage.setItem("listaProdutos", JSON.stringify(listProduto));
    mostrarListaProduto();
}

// Enviar formulário 
form.addEventListener("submit", function(event) {
    event.preventDefault();
    salvarProduto();
    mostrarListaProduto(); 
    
});



