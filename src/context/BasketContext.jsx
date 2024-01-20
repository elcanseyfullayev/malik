import React, { createContext, useState } from 'react'
export const BasketContext = createContext()

function BasketProvider({ children }) {
    const [basket, setBasket] = useState([])

    const addBasket = (item) => {
        const index = basket.findIndex((x) => x._id === item._id)
        if (index === -1) {
            setBasket([...basket, { ...item, count: 1 }])
        }
        setBasket([...basket])
        console.log(basket);
    }

    const removeItem = (item) => {
        const itemToRemove = basket.find((x) => x._id === item._id)
        if (!itemToRemove) {
            return
        }
        const updatedBasket = basket.filter((X) => X._id !== item._id)
        setBasket(updatedBasket)
    }

    const increaseCount = (item) => {
        const index = basket.findIndex((x) => x._id === item._id)
        basket[index].count++
        setBasket([...basket])
    }

    const decreaseCount = (item) => {
        const index = basket.findIndex((x) => x._id === item._id)
        if (basket[index].count === 1) {
            return
        }
        basket[index].count--
        setBasket([...basket])
    }

    return (
        <>
            <BasketContext.Provider value={{ basket, addBasket, removeItem, increaseCount, decreaseCount }}>
                {children}
            </BasketContext.Provider>
        </>
    )
}

export default BasketProvider