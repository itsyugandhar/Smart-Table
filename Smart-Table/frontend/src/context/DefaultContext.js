import React from 'react'

const DefaultConext = React.createContext({
    cartItems: [],
    incrementCartItemQuantity: () => {},
    decrementCartItemQuantity : () => {},
    orders : [],
    addToOrders : () => {},
    addToCart : () => {},
    removeItem : () => {},
})

export default DefaultConext