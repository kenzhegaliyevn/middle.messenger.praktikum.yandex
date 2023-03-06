export interface FormDataElement {
    isValid: boolean,
    value: string
}

export type FormDataType = Record<string, FormDataElement>;
