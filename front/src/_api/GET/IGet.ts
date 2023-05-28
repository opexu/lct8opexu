interface IGetParams {
    url: string;
    query?: string;
}

interface IGet {
    me(): IGetParams;
}

export type {
    IGet, IGetParams
}