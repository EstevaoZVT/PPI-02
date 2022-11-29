/**
 * salvar
 * Salva os dados do formulário na collection do Firebase
 * @param {object} event - Evento do objeto que foi clicado
 * @param {string} collection - Nome da collection que será salva no Firebase
 * @return {null} - Snapshot atualizado dos dados
 */

const { default: swal } = require("sweetalert")

function salvar(event, collection) {
    event.preventDefault() // evita que o formulário seja recarregado
        //Verificando os campos obrigatórios
    if (document.getElementById('marca').value === '') { alert('⚠ É obrigatório informar a marca da Moto!') } else if (document.getElementById('modelo').value === '') { alert('⚠ É obrigatório informar o Modelo da Moto!') } else if (document.getElementById('anomoto').value === '') { alert('⚠ É obrigatório informar o Ano de fabricação da Moto!') } else if (document.getElementById('id').value !== '') { alterar(event, collection) } else { incluir(event, collection) }
}

function incluir(event, collection) {
    event.preventDefault() // evita que o formulário seja recarregado
        //Obtendo os campos do formulário
    const form = document.forms[0]
    const data = new FormData(form)
        //Obtendo os valores dos campos
    const motos = Object.fromEntries(data.entries())
        //console.log(`Os dados são:`)
        //console.log(values)
        //O retorno é uma Promise (promessa)
    return firebase.database().ref(collection).push(motos)
        .then(() => {
            alert('✔ Registro cadastrado com sucesso!')
            document.getElementById('formCadastro').reset() //limpar o formulário
        })
        .catch(error => {
            console.error(`Ocorreu um erro: ${error.code}-${error.message}`)
            alert(`❌ Falha ao incluir: ${error.message}`)
        })
}

/**
 * obtemDados.
 * Obtém os dados da collection a partir do Firebase.
 * @param {string} collection - Nome da Collection no Firebase
 * @return {object} - Uma tabela com os dados obtidos
 */
function obtemDados(collection) {
    var tabela = document.getElementById('tabelaDados')
    firebase.database().ref(collection).on('value', (snapshot) => {
        tabela.innerHTML = ''
        let cabecalho = tabela.insertRow()
        cabecalho.className = 'table-info'
        cabecalho.insertCell().textContent = 'Marca'
        cabecalho.insertCell().textContent = 'Modelo'
        cabecalho.insertCell().textContent = 'Ano da Moto'    
        cabecalho.insertCell().textContent = 'Kilometragem da Moto'
        cabecalho.insertCell().textContent = 'Valor da Moto'
        cabecalho.insertCell().textContent = 'Condição da Moto'
        cabecalho.insertCell().textContent = 'Opções'

        snapshot.forEach(item => {
            //Dados do Firebase
            let db = item.ref.path.pieces_[0] //collection
            let id = item.ref.path.pieces_[1] //id
            let registro = JSON.parse(JSON.stringify(item.val()))
                //Criando as novas linhas na tabela
            let novalinha = tabela.insertRow()
            novalinha.insertCell().textContent = item.val().marca
            novalinha.insertCell().textContent = item.val().modelo
            novalinha.insertCell().textContent = item.val().anomoto
            novalinha.insertCell().textContent = item.val().kmmoto
            novalinha.insertCell().textContent = item.val().valormoto
            novalinha.insertCell().textContent = item.val().condicao
            novalinha.insertCell().innerHTML =
            `
            <button class ='btn btn-danger' title='Remove o registro corrente' onclick=remover('${db}','${id}')>🗑 Excluir </button>
            <button class ='btn btn-warning' title='Edita o registro corrente' onclick=carregaDadosAlteracao('${db}','${id}')>✏ Editar </button>
            `
        })
        let rodape = tabela.insertRow()
        rodape.className = 'table-primary'
        rodape.insertCell().textContent = ''
        rodape.insertCell().textContent = ''
        rodape.insertCell().textContent = ''
        rodape.insertCell().innerHTML = totalRegistros(collection)
        rodape.insertCell().textContent = ''
        rodape.insertCell().textContent = ''
        rodape.insertCell().textContent = ''
    })
}

/** 
 * totalRegistros.
 * Retorna a contagem total do número de registros da collection informada
 * @param {string} collection - Nome da Collection no Firebase
 * @return {string} - Texto com o total de registros
 * */
function totalRegistros(collection) {
    var retorno = '...'
    firebase.database().ref(collection).on('value', (snapshot) => {
        if (snapshot.numChildren() === 0) {
            retorno = '‼ Ainda não há nenhum registro cadastrado!'
        } else {
            retorno = `Total de Registros: ${snapshot.numChildren()}`
        }
    })
    return retorno
}
/**
 * remover
 * Remove os dados da collection a partir do id informado
 * @param {string} db - Nome da collection no Firebase
 * @param {integer} id - Id do registro do Firebase
 * @return {null} - Snapshot atualizado dos dados
 */
function remover(db, id) {
    //Iremos confirmar o usuário
    if (window.confirm('!!Confirma a exclusão do registro?')) {
        let dadoExclusao = firebase.database().ref().child(db + '/' + id)
        dadoExclusao.remove()
            .then(() => {
                alert('✅Registro removido com sucesso!')
            })
            .catch(error => {
                alert('❌Falha ao excluir: ' + error.message)
            })
    }
}

function carregaDadosAlteracao(db, id) {
    firebase.database().ref(db).on('value', (snapshot) => {
        snapshot.forEach(item => {
            if (item.ref.path.pieces_[1] === id) {
                //Se for igual ao ID, iremos igualar os campos

                document.getElementById('id').value = item.ref.path.pieces_[1]
                document.getElementById('marca').value = item.val().marca
                document.getElementById('modelo').value = item.val().modelo
                document.getElementById('anomoto').value = item.val().anomoto
                document.getElementById('kmmoto').value = item.val().kmmoto
                document.getElementById('valormoto').value = item.val().valormoto

                //Campo sexo
                if (item.val().condicao === 'Nova') {
                    document.getElementById('condicaoNova').checked = true
                } else {
                    document.getElementById('condicaoUsada').checked = true
                }
            }
        })
    })
}

function alterar(event, collection) {
    event.preventDefault()
        //Obtendo os campos do formulário
    const form = document.forms[0];
    const data = new FormData(form);
    //Obtendo os valores dos campos
    const value = Object.fromEntries(data.entries());
    console.log(value)
        //Enviando os dados dos campos para o Firebase
    return firebase.database().ref().child(collection + '/' + value.id).update({
            marca: value.marca,
            modelo: value.modelo,
            anomoto: value.anomoto,
            kmmoto: value.kmmoto,
            valormoto: value.valormoto,
            condicao: value.condicao
            
        })
        .then(() => {
            alert('✅ Registro alterado com sucesso!')
            document.getElementById('formCadastro').reset()
        })
        .catch(error => {
            console.log(error.code)
            console.log(error.message)
            alert('❌ Falha ao alterar: ' + error.message)
        })
}

