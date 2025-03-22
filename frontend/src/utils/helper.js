
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ; 
    return regex.test(email) 
}

export const getInitials = (name) => {
    if(!name) return "" ; 

    const words = name.split(" ") ; 
    let initials = "" ; 

    for(let i=0 ; i < Math.min(words.length, 2) ; i++){
        initials += words[i][0] ; 
    }

    return initials.toUpperCase()
}

export const addThousandsSeparator = (num) => {
    if(num == null || isNaN(num)) return ; 

    const [integralPart, fractionalPart] = num.toString().split(".") ; 
    const formattedInteger = integralPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger

}

// 2.30