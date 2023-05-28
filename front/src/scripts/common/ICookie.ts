import type { IObjectIterable } from "../interfaces/CommonInterfaces";

interface ICookie extends IObjectIterable {
    user: string,
    jwt: string,
}

export type {
    ICookie,
}