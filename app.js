function requisitar() {
  const url = 'https://alunos.b7web.com.br/api/ping'
  const params = {
    method: 'GET',
    // body: JSON.stringify({
    //   nome: 'Felipe',
    //   idade: 24
    // })
  }


  fetch(url, params)
    .then(response => response.json())
    .then(json => {
      console.log(json)
    })
}

async function requisitar2() {
  const url = 'https://alunos.b7web.com.br/api/ping'
  const params = {
    method: 'GET',
    // body: JSON.stringify({
    //   nome: 'Felipe',
    //   idade: 24
    // })
  }


  const response = await fetch(url, params)
  const responseJSON = await response.json()
  console.log(responseJSON)
}

// requisitar()

requisitar2()
console.log('texto de espera')