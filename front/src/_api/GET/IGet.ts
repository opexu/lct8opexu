interface IGetParams {
    url: string;
    query?: string;
}

interface IGet {
    me(): IGetParams;
    model( id: number ): IGetParams;
}

export type {
    IGet, IGetParams
}