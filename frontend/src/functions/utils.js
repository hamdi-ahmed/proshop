export const sumSubTotal = (data) => {
    return data.reduce((amount, item) => item.qty + amount, 0)
}

export const sumTotalPrice = (data) => {
    return data.reduce((total, item) => item.price * item.qty + total, 0).toFixed(2)
}


export const shippingPrice = (data) => {
    if (sumTotalPrice(data) < 100) {
        return 0
    } else {
        return 100
    }
}

export const taxPrice = (data) => {
    const tax = (sumTotalPrice(data) * .15).toFixed(2)
    return tax
}

