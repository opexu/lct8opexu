interface IStrapiResponse {
    data: IStrapiData[] | IStrapiData;
}

interface IStrapiData {
    id: number;
    attributes: IStrapiAttribute;
}

interface IStrapiAttribute {
    [key: string]: IStrapiResponse | string | null;
}

export type {
    IStrapiResponse,
    IStrapiData,
    IStrapiAttribute,
}