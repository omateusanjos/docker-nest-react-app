export type Transaction = {
    1: 'Venda produtor',
    2: 'Venda afiliado',
    3: 'Comissão paga',
    4: 'Comissão recebida',
}

export interface FileUploadedFile {
    type: number;
    date: string,
    product: string,
    value: string,
    seller: string,
}

export interface ColumsType {
    Header: string;
    accessor: string;
}