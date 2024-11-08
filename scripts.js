const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')


let minhaListaDeItens = []

function adicionarNovaTarefa() {
    if(input.value == ''){
        showToast('Por favor, insira uma tarefa!');
        return; // encerra a função caso o input seja vazio
       
    }
    
    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false

    })
   

    input.value = ''

    mostrarTarefas()
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast'; // Adicione estilos para .toast no CSS
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out'); // Adicione estilos para fade-out no CSS
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 500) // Tempo de duração do fade-out
    }, 3000) // Tempo que o toast ficará visível
}

function mostrarTarefas() {

    let novaLi = ''

    minhaListaDeItens.forEach((item, posicao) => {
        novaLi = novaLi + `
         <li class="task ${item.concluida && 'done'}">
                <img src="https://img.icons8.com/fluency/48/checked-checkbox.png" alt="checked-checkbox" onclick="concluirTarefa(${posicao})">
                <p>${item.tarefa}</p>
                <img src="https://img.icons8.com/3d-fluency/94/trash.png" alt="trash" onclick="deletarItem(${posicao})"> 
            </li>`
    })


    listaCompleta.innerHTML = novaLi

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))

}

function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida

    mostrarTarefas()

}

function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1)

    mostrarTarefas()


}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }


    mostrarTarefas()
}




recarregarTarefas()
button.addEventListener('click', adicionarNovaTarefa)

