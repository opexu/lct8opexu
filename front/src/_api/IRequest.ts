import type { IGetParams } from "./GET/IGet";

interface IRequest {
    GET<T>( params: IGetParams ): Promise<T>;
    GETRAW( params: IGetParams ): Promise<Response>;
    POST<K,T extends BodyInit>( url: string, data: T ): Promise<K>;
    POSTFORM<K,T extends BodyInit>( url: string, data: T ): Promise<K>;
}

export type {
    IRequest,
}