export const Totalize = (data: any[], key: string) => {
    const removeZeroLeft = (value: string) => {
        return value.replace(/^0+/, '');
    };
    return data.reduce((acc, cur) => {
        const value = cur[key];
        if (typeof value === 'string') {
            const number = removeZeroLeft(value);
            return acc + Number(number);
        }
        return acc + value;
    }, 0);
}

export const formatNumberToCurrency = (value: number) => {
    const number = value.toString().replace(/^0+/, '');
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(Number(number));
}
