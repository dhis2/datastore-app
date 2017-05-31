

export function validateKeyOrNamespace(value) {
    const invalidSymbols = ['#'];

    const invalid = {
        valid: false,
        message: 'Required Field.',
    };
    const valid = {
        valid: true,
        message: '',
    }

    if(!value) return invalid;

    let matchedChar = "";
    invalidSymbols.forEach(symb => {
        if(value.includes(symb)) {
            matchedChar = symb;
        }
    });

    const symbErrMsg = `You cannot use this character: ${matchedChar} in namespaces or keys`;
    invalid.message = symbErrMsg;
    return matchedChar ? invalid : valid;
}