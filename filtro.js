const data = [
    {
        id: 1,
        name: "Apple MacBook Pro 2022 - Laptop con chip M2",
        img: 'https://m.media-amazon.com/images/I/71K+bhq9bZL._AC_SL1500_.jpg',
        price: 2000,
        cat: 'Notebook',
    },
    {
        id: 2,
        name: 'Lucktiger Unidad flash USB de 1 TB',
        img: 'https://m.media-amazon.com/images/I/51ndvZ9G5xL._AC_SL1451_.jpg',
        price: 40,
        cat: 'Drive',
    },
    {
        id: 3,
        name: 'STGAubron PC de escritorio para juegos, Intel Core i7',
        img: 'https://m.media-amazon.com/images/I/81IpXvF-GzL._AC_SL1500_.jpg',
        price: 934,
        cat: 'Case Gaming',
    },
    {
        id: 4,
        name: 'Samsung 970 EVO Plus Series',
        img: 'https://m.media-amazon.com/images/I/61qLPvqqj4L._AC_SL1001_.jpg',
        price: 40,
        cat: 'Drive',
    },
    {
        id: 5,
        name: 'AMANSON Funda para PC preinstala 9 ventiladores',
        img: 'https://m.media-amazon.com/images/I/71ZyxM9OdaL._AC_SL1500_.jpg',
        price: 119,
        cat: 'Case Gaming',
    },
    {
        id: 6,
        name: "BENGOO G9000 - Auriculares estéreo para juegos para PS4",
        img: 'https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_SL1000_.jpg',
        price: 23,
        cat: 'Auriculares',
    },
    {
        id: 7,
        name: 'Auricular para juegos para PS4, Xbox One, computadora, laptop, Mac, PS4',
        img: 'https://m.media-amazon.com/images/I/617AAEmjdbL._AC_SL1000_.jpg',
        price: 145,
        cat: 'Auriculares',
    },
    {
        id: 8,
        name: 'Schkner Alfombrilla de mouse RGB para juegos con carga inalámbrica de 15 W',
        img: 'https://m.media-amazon.com/images/I/81BOqYb7maL._AC_SL1500_.jpg',
        price: 34,
        cat: 'PAD',
    },
];

const productsContainer = document.querySelector('.products');
const searchInput = document.querySelector('.search');
const categoriesContainer = document.querySelector('.cats');
const priceRange = document.querySelector('.priceRange');
const priceValue = document.querySelector('.priceValue');

const displayProducts = (filteredProducts) => {
    productsContainer.innerHTML = filteredProducts
        .map(
            (product) =>
                `
        <div class="product">
            <img
            src=${product.img}
            alt=""
            />
            <span class="name">${product.name}</span>
            <span class="priceText">${product.price}</span>
        </div>
        `
        )
        .join('');
};

displayProducts(data);

searchInput.addEventListener('keyup', (e) => {
    const value = e.target.value.toLowerCase();

    if (value) {
        displayProducts(
            data.filter(
                (item) =>
                    item.name.toLocaleLowerCase().indexOf(value) !== -1
            )
        );
    } else {
        displayProducts(data);
    }
});

setCategories = () => {
    const allCats = data.map((item) => item.cat);
    const categories = [
        'All',
        ...allCats.filter((item, i) => {
            return allCats.indexOf(item) === i;
        }),
    ];

    categoriesContainer.innerHTML = categories
        .map(
            (cat) =>
                `
            <span class="cat">${cat}</span>
            `
        )
        .join('');

    //activar boton click en categorias
    categoriesContainer.addEventListener('click', (e) => {
        const selectdCat = e.target.textContent;

        selectdCat === 'All'
            ? displayProducts(data)
            : displayProducts(
                data.filter((item) => item.cat === selectdCat)
            );
    });
};


//Precios Rango de Precios
const setPrices = () => {
    const priceList = data.map((item) => item.price)
    const minPrice = Math.min(...priceList)
    const maxPrice = Math.max(...priceList)


    priceRange.min = minPrice
    priceRange.max = maxPrice
    priceRange.value = maxPrice
    priceValue.textContent = "$" + maxPrice

    priceRange.addEventListener("input", (e) => {
        priceValue.textContent = "$" + e.target.value
        displayProducts(data.filter(item => item.price <= e.target.value))
    })

}


setCategories();
setPrices();


