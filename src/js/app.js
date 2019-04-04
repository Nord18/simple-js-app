(function() {
    let menu = [{
            name: 'oatmeal',
            price: 25
        },
        {
            name: 'omelet-vegetables',
            price: 25
        },
        {
            name: 'azerbaijan-set',
            price: 30
        },
        {
            name: 'omelet-tomatoes',
            price: 45
        },
        {
            name: 'cheesecake',
            price: 45
        },
        {
            name: 'spinach-soup',
            price: 50
        },
        {
            name: 'soup-pity',
            price: 85
        },
        {
            name: 'borsch',
            price: 95,
        },
        {
            name: 'soup',
            price: 100
        },
        {
            name: 'potato-free',
            price: 125
        },
        {
            name: 'potato-home',
            price: 135
        },
        {
            name: 'rice',
            price: 150
        }
    ];

    let addBtn = document.querySelectorAll('.products-box__btn');

    let qty = document.querySelectorAll('.products-box__fields');

    let qtyItem = document.querySelector('.top-bar__item');

    let qtyPrice = document.querySelector('.top-bar__price');

    let sumAdd = 0;

    let sumMult = 0;

    let productBox = document.querySelectorAll('.products-box__item');

    let selectCategory = document.querySelector('#select-category');

    let selectPrice = document.querySelector('#select-price');

    let form = document.querySelector('#form');

    let modal = document.querySelector('.modal');

    let btnCheck = document.querySelector('.top-bar__btn');

    Array.prototype.forEach.call(addBtn, button => {
        button.addEventListener('click', () => {
            Array.prototype.forEach.call(qty, elementName => {
                menu.forEach(product => {
                    if ((elementName.name === product.name) && (elementName.value)) {
                        let resultMult = +elementName.value * product.price;
                        sumMult += resultMult;
                        sumAdd += +elementName.value
                        qtyPrice.textContent = sumMult;
                        qtyItem.textContent = sumAdd
                    }
                });
                elementName.value = '';
            })
        })
    });

    selectCategory.addEventListener('change', evt => {
        let selectVal = evt.currentTarget.value;
        Array.prototype.forEach.call(productBox, prodItem => {
            if ((selectVal === 'all') || (prodItem.dataset.category === selectVal)) {
                prodItem.classList.add('data-category')
            } else {
                prodItem.classList.remove('data-category')
            }
        })
    });

    selectPrice.addEventListener('change', evt => {
        let selectVal = evt.currentTarget.value;
        Array.prototype.forEach.call(productBox, prodItem => {
            if ((selectVal === 'all') || (+prodItem.dataset.price <= +selectVal)) {
                prodItem.classList.add('data-price')
            } else {
                prodItem.classList.remove('data-price')
            }
        })
    });

    btnCheck.addEventListener('click', evt => {
        evt.preventDefault();
        if((sumMult === 0) && (sumAdd === 0)) {
            alert('Выберите товар!')
        } else {
            modal.style.visibility = 'visible';
            modal.style.opacity = '1';
        }
    });

    form.addEventListener('submit', evt => {
        evt.preventDefault();
        if (form.name.value === '' || form.email.value === '') {
            alert('Заполнителя поля!');
            form.name.classList.add('error');
            form.email.classList.add('error')
        } else {
            alert('Спасибо за покупку!');
            qtyItem.textContent = 'XXX';
            qtyPrice.textContent = 'XXX';
            form.name.classList.remove('error');
            form.email.classList.remove('error');
            modal.style.visibility = 'hidden';
            modal.style.opacity = '0';
            sumAdd = 0;
            sumMult = 0
        }
    })
})()