const API_URL = 'http://localhost:4000/clientes'

//LISTAR CLIENTES
document.querySelector("#listButton").addEventListener('click', async () => {
    try {
        const response = await axios.get(API_URL)
        const lista = document.querySelector("#peopleList")
        lista.innerHTML = ''
        response.data.forEach(client => {
            const li = document.createElement('li')
            li.innerHTML = `
            <div>
                ID: ${client._id} |
                Nome: ${client.nome} |
                Email: ${client.email} |
                Fidelizado: ${client.fidelizado}
            </div>
            `
            lista.appendChild(li)
        });
    } catch (error) {
        console.log(error)
    }
})

//CRIAR CLIENTE
document.querySelector('#createForm').addEventListener('submit', async () => {
    const nome = document.querySelector('#name').value
    const email = document.querySelector('#email').value
    const fidelizado = document.querySelector('#fidelized').checked
    try {
        const response = await axios.post(API_URL, { nome, email, fidelizado })
        alert(response.data.message)
    } catch (error) {
        alert('erro ao criar pessoa')
    }
})

//ATUALIZAR CLIENTE POR ID
document.querySelector('#updatePersonForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const clientId = document.querySelector('#updateId').value
    const nome = document.querySelector('#updateName').value
    const email = document.querySelector('#updateEmail').value
    const fidelizado = document.querySelector('#updateFidelized').checked
    
    const updateData = {}

    if (nome) {
        updateData.nome = nome
    }
    if (email) {
        updateData.email = email
    }
    updateData.fidelizado = fidelizado

    try {
        const response = await axios.patch(`${API_URL}/${clientId}`, updateData)
        document.querySelector('#updateResponse').innerHTML = `<p>${response.data.message} => Nome: ${nome} | Email: ${email} | Fidelizado: ${fidelizado}</p>`
        document.querySelector('#updateId').value = ""
        document.querySelector('#updateName').value = ""
        document.querySelector('#updateEmail').value = ""
        document.querySelector('#updateFidelized').checked = false
    } catch (error) {
        console.log(error)
        document.querySelector('#updateResponse').innerHTML = `<p>Erro ao atualizar cliente. Verifique o ID. </p>`
    }
})

//DELETAR CLIENTE POR ID
document.querySelector('#deleteForm').addEventListener('submit', async (e) =>{
    e.preventDefault()
    const id = document.querySelector('#deleteId').value

    try {
        const response = await axios.delete(`${API_URL}/${id}`)
        alert(response.data.message)
    } catch (error) {
        alert('Erro ao deletar cliente. Verifique o ID.')
    }
})


