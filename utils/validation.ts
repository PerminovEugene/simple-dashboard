export const checkRequired = (obj: any, keyName: string, keyText: string, errors: any) => {
    if (!obj[keyName]) {
        errors[keyName] = `Field ${keyText} is required`;
    }
}

export const checkMaxLength = (
    obj: any,
    keyName: string,
    keyText: string,
    errors: any,
    length: number
) => {
    if (obj[keyName] && obj[keyName].length > length) {
        errors[keyName] = `Field ${keyText} is too long`;
    }
}
