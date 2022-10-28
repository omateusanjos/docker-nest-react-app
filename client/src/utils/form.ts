

import { ColumsType, FileUploadedFile } from '../types/form';

export const removeSpacesAndSetCamelcase = (value: string) => {
    const remove = [" ", "-"];
    remove.forEach((item) => {
        value = value.replace(item, "");
    });
    return value.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toLocaleLowerCase()).replace(/ /g, "");

}

export const readFileAndRetornJSON = async (file: File | string): Promise<FileUploadedFile[]> => {
    let text;
    if (typeof file === 'string') {
        text = file;
    } else {
        const res = await fetch(URL.createObjectURL(file));
        text = await res.text();
    }
    const processor = text?.split("\n");
    const dataProcessor = processor?.map((line) => {
        return line.trim().split("|");
    });

    const formatData = (data: string) => {
        data = data.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1");
        return data;
    }

    return dataProcessor.map((line_1) => {
        const line = [...line_1][0];


        return {
            type: parseInt(line.substring(0, 1)),
            date: formatData(line.substring(1, 11)),
            product: removeSpacesAndSetCamelcase(line.substring(26, 56)),
            value: line.substring(56, 66),
            seller: removeSpacesAndSetCamelcase(line.substring(66, 86)),
        }
    }).filter((item) => !Number.isNaN(item.type));
};

export const onChange = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const content =
        evt.target.files && readFileAndRetornJSON(evt.target.files[0]);
    content?.then((r: any) => console.log(r));
}

export const getKeys = (obj: FileUploadedFile[]) => {
    const columns: ColumsType[] = [];
    obj.forEach((item) => {
        Object.keys(item).forEach((key) => {
            if (!columns.find((column) => column.accessor === key)) {
                columns.push({
                    Header: key.charAt(0).toUpperCase() + key.slice(1),
                    accessor: key,
                });
            }
        });
    });
    return columns;
};

export const getRows = (obj: FileUploadedFile[]) => {
    const rows: FileUploadedFile[] = [];
    obj.forEach((item) => {
        rows.push(item);
    });
    return rows;
};

export const parserToTable = (file: FileUploadedFile[]) => {

    return { columns: getKeys(file), data: getRows(file) };
};


export const isTXT = (file: File) => file.type === "text/plain";
export const checkFileAndReturnJSON = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (isTXT(evt.currentTarget.files?.[0]!)) {
        return readFileAndRetornJSON(evt.currentTarget.files?.[0]!);
    }
};

export const MockColumns = [
    {
        "Header": "Type",
        "accessor": "type"
    },
    {
        "Header": "Date",
        "accessor": "date"
    },
    {
        "Header": "Product",
        "accessor": "product"
    },
    {
        "Header": "Value",
        "accessor": "value"
    },
    {
        "Header": "Seller",
        "accessor": "seller"
    }
]