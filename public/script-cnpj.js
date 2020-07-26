const inputCNPJ = document.getElementById('input_cnpj')
const result = document.getElementById('result_cnpj')

// Reference used to calculate verification digits for CNPJ ---> https://www.geradorcnpj.com/algoritmo_do_cnpj.htm
function validateCNPJ() {

    if (inputCNPJ.value.match(/(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)|(^\d{14}$)/)) {    // Validating formatt. Accepts only numbers (14 chars) or numbers with correct ponctuation (18 chars)
        
        const cnpj = inputCNPJ.value.replace(/\D/g,'')  // Getting rid of poncuation
        const arrayCNPJ14 = cnpj.split("")  // Transforming in array to easily manipulate later
        const arrayCNPJ12 = cnpj.split("").splice(0, 12)    // Eliminating the two last verification digits
        
        // Saving inputed verification digits to validate later
        const firstValDigit = arrayCNPJ14[12]   
        const secondValDigit = arrayCNPJ14[13]

        // Calling function to calculate verification digits
        const calculatedFirstDigit = calculateVerificationDigit(arrayCNPJ12)
        const calculatedSecondDigit = calculateVerificationDigit([...arrayCNPJ12, calculatedFirstDigit])

        // Validating verification digits
        if (firstValDigit != calculatedFirstDigit | secondValDigit != calculatedSecondDigit) {
            return(result.innerText = 'One or both verification digits are incorrect! Please, make sure you typed correctly and try again.')
        } else {
            return(result.innerText = 'Perfect! Your CNPJ is valid. Both the format and verification digits are correct.')
        }

        // The verification digits are calculated the same way, but the second uses also the first digit
        // This way I could use a function, and verify the length of the array to know if the calculus refers to the first or second digit
        function calculateVerificationDigit (arrayCNPJ) {

            const cnpjLength = arrayCNPJ.length

            // The multiplication array consists of fixed numbers that works like "weights". There is a different one for each verification digit.
            let multiArray = []
            if (cnpjLength == 12) {
                multiArray = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
            } else if (cnpjLength == 13) {
                multiArray = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
            }

            const multDigi = []            
            for (let i = 0; i < cnpjLength; i++) {
                multDigi.push(arrayCNPJ[i] * multiArray[i]) // Multiplying each one of the digits by its corresponding weight
            }

            const sumRes = multDigi.reduce((a, b) => a + b, 0) // Sum of all elements of the multiplication 
            const leftOver = sumRes % 11  // Calculating the module 
            
            // If the left over of the division is less than 2, the digit must be 0, otherwise, it must be 11 subtracted by the left over
            if (leftOver < 2) {
                let calculatedDigit = 0
            } else {
                calculatedDigit = 11 - leftOver
            }

            return(calculatedDigit)
        }

    } else {
        result.innerText = "The CNPJ is not in an acceptable format. Please, type only numbers or the correct ponctuation (xx.xxx.xxx/xxxx-xx)."
    }
}