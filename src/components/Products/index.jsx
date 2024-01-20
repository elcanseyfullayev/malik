import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BasketContext } from '../../context/BasketContext';

function Products() {
    const [products, setProducts] = useState([])
    const [sortBy, setSortBy] = useState('default');
    const { basket, addBasket ,removeItem,increaseCount,decreaseCount} = useContext(BasketContext)

    async function getFetch() {
        await fetch("http://localhost:4200/")
            .then(res => res.json())
            .then(data =>
                setProducts(data))
    }

    useEffect(() => {
        getFetch()
    }, [])

    const sortedProducts = [...products];

    if (sortBy === 'price-asc') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'title-asc') {
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'title-desc') {
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    }


    return (
        <>
            <section id='products'>
                <div>
                    <label>Sort by:</label>
                    <select onChange={(e) => setSortBy(e.target.value)}>
                        <option value="default">Default</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                        <option value="title-asc">Title (A-Z)</option>
                        <option value="title-desc">Title (Z-A)</option>
                    </select>
                </div>
                {sortedProducts.map((product) => (
                    <div className="product" key={product._id}>
                        <h1>{product.title}</h1>
                        <p>{product.about}</p>
                        <Link to={`/details/${product._id}`}>details</Link>
                        <p>{product.price}</p>
                        <button onClick={() => addBasket(product)}>addbasket</button>
                    </div>
                ))}
                <Link to={"/add"}>Add</Link>
            </section>

            <section id='basket'>
                <h1>BASKET:</h1>
                <div className="basket">
                    {basket.map((basketitem) => (
                        <div className="basketitem">
                            <h1>{basketitem.title}</h1>
                            <p>{basketitem.price}</p>
                            <button onClick={() => removeItem(basketitem)}>remmove</button>
                            <div className="count">
                                <button onClick={() => decreaseCount(basketitem)}>-</button>
                                <p>{basketitem.count}</p>
                                <button onClick={() => increaseCount(basketitem)}>+</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Products