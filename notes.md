## Promise

```js

function fazer() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {

      resolve('ok')

    }, 3000)
  })

  return promise
}

fazer().then(response => {
  console.log(response)
})


```

## Fecth

```js

const url = 'https://alunos.b7web.com.br/api/ping'
const params = {
  method: 'POST',
  body: JSON.stringify({
    nome: 'Felipe',
    idade: 24
  })
}

fetch(url, params)
  .then(response => response.json())
  .then(json => {
    console.log(json)
  })

```