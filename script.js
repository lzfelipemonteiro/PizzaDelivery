let quantityModal = 1
let cart = []
let modalKey = 0

const elemento = (el) => document.querySelector(el)
const elementos = (el) => document.querySelectorAll(el)

/** Listagem das Pizza */
pizzaJson.map((item, index) => {
  let pizzaItem = elemento('.models .pizza-item').cloneNode(true)


  pizzaItem.setAttribute('data-key', index)
  pizzaItem.querySelector('.pizza-item--img img').src = item.img
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
  pizzaItem.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault();

    let key = e.target.closest('.pizza-item').getAttribute('data-key')
    quantityModal = 1
    modalKey = key

    const singlePizza = pizzaJson[key]
    // const tamanhosPizza = singlePizza.sizes
    // console.log(tamanhosPizza)

    elemento('.pizzaInfo h1').innerHTML = singlePizza.name
    elemento('.pizzaBig img').src = singlePizza.img
    elemento('.pizzaInfo--desc').innerHTML = singlePizza.description
    elemento('.pizzaInfo--actualPrice').innerHTML = `R$ ${singlePizza.price.toFixed(2)}`
    elemento('.pizzaInfo--size.selected').classList.remove('selected')
    elemento('.pizzaInfo--qt').innerHTML = quantityModal

    elementos('.pizzaInfo--size').forEach((size, sizeIndex) => {
      if (sizeIndex === 2) {
        size.classList.add('selected')
      }
      size.querySelector('span').innerHTML = singlePizza.sizes[sizeIndex]
    })

    let modal = elemento('.pizzaWindowArea')
    modal.style.opacity = 0
    modal.style.display = 'flex'
    setTimeout(() => {
      modal.style.opacity = 1
    }, 100)


  })

  elemento('.pizza-area').append(pizzaItem)
})

/** Eventos do Modal */

function closeModal() {
  elemento('.pizzaWindowArea').style.opacity = 0
  setTimeout(() => {
    elemento('.pizzaWindowArea').style.display = 'none'
  }, 500)

}

elementos('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
  item.addEventListener('click', closeModal)
})

/** Botões de quantidade do modal */
elemento('.pizzaInfo--qtmais').addEventListener('click', () => {
  quantityModal++
  elemento('.pizzaInfo--qt').innerHTML = quantityModal
})

elemento('.pizzaInfo--qtmenos').addEventListener('click', () => {
  quantityModal === 1 ? quantityModal : quantityModal--
  elemento('.pizzaInfo--qt').innerHTML = quantityModal
})

elementos('.pizzaInfo--size').forEach((size, sizeIndex) => {
  size.addEventListener('click', (e) => {
    elemento('.pizzaInfo--size.selected').classList.remove('selected')
    size.classList.add('selected')
  })
})

elemento('.pizzaInfo--addButton').addEventListener('click', () => {
  let size = parseInt(elemento('.pizzaInfo--size.selected').getAttribute('data-key'))
  let id = pizzaJson[modalKey].id
  let quantity = quantityModal
  let identifier = `${id}@${size}`

  const key = cart.findIndex(item => item.identifier === identifier)

  if (!key) {
    cart[key].quantity += quantity
  } else {
    cart.push({
      identifier,
      id,
      size,
      quantity,
    })
  }
  // console.log(cart);
  closeModal()
  updateCart()
})

/** Abrir carrinho no celular */
elemento('.menu-openner').addEventListener('click', () => {
  if (cart.length > 0) {
    elemento('aside').style.left = '0'
  }
})

/** Fechar carrinho no celular */
elemento('.menu-closer').addEventListener('click', () => {
  elemento('aside').style.left = '100vw'
})

function updateCart() {
  elemento('.menu-openner span').innerHTML = cart.length

  if (cart.length > 0) {
    openCart()
    elemento('.cart').innerHTML = ""

    let subtotal = 0
    let desconto = 0.9
    let total = 0

    /** Montagem de cada item do carrinho */
    cart.map((item, index) => {
      let cartPizzaItem = elemento('.models .cart--item').cloneNode(true)
      let pizza = pizzaJson.find((pizzaItem) => pizzaItem.id === item.id)
      let sizePizza = ['P', 'M', 'G']
      subtotal += pizza.price * item.quantity

      cartPizzaItem.querySelector('img').src = pizza.img
      cartPizzaItem.querySelector('.cart--item-nome').innerHTML = `${pizza.name} (${sizePizza[item.size]})`
      cartPizzaItem.querySelector('.cart--item--qt').innerHTML = item.quantity
      // console.log(item.quantity)

      cartPizzaItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
        item.quantity++
        updateCart()
        // cartPizzaItem.querySelector('.cart--item--qt').innerHTML = item.quantity
      })

      cartPizzaItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
        if (item.quantity === 1) {
          itemRemove = cart.findIndex(item => item.id === pizza.id)
          cart.splice(itemRemove, 1)
        } else {
          item.quantity--
        }
        // cartPizzaItem.querySelector('.cart--item--qt').innerHTML = item.quantity
        updateCart()
      })


      elemento('.cart--area .cart').append(cartPizzaItem)
    })

    total = subtotal * desconto
    descontoFormatted = subtotal - total

    elemento('.subtotal').lastElementChild.innerHTML = `R$ ${subtotal.toFixed(2)}`
    elemento('.desconto').lastElementChild.innerHTML = `R$ ${descontoFormatted.toFixed(2)}`
    elemento('.total').lastElementChild.innerHTML = `R$ ${total.toFixed(2)}`
    // console.log(cartPizzaItem)
  } else {
    closeCart()
    elemento('aside').style.left = '100vw'
  }
}

function openCart() {
  elemento('aside').classList.add('show')
  // console.log('abre carrinho')
}

function closeCart() {
  elemento('aside').classList.remove('show')
  // console.log('fecha carrinho')
}

