import APIHubla from '../../api';
import { FileUploadedFile } from '../types/form';


export const createTransactions = async (file: FileUploadedFile[]) => {
    try {
        const response = await APIHubla.post(
            "/transactions",
            { file: file }
        );
        return response.data;
    } catch (error) {
        return error;
    }

};

export const getTransactions = async (): Promise<FileUploadedFile[] | unknown> => {
    try {
        const response = await APIHubla.get<FileUploadedFile[]>("/transactions");
        return response.data;
    } catch (error) {
        return error;
    }
}