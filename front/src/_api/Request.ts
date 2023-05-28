import type { IRequest } from "./IRequest";
import { COOKIE } from "./../scripts/common/VueCookies";
import type { IGetParams } from "./GET/IGet";
import { HOST } from "./Host";

export const LCTRequest: IRequest = {
    
    async GET<T>({ url, query }: IGetParams): Promise<T> {

        const fetchURL = query ? HOST.ROOT_API() + url + `?${query}` : HOST.ROOT_API() + url;
        const headers = new Headers();
        if( window.$cookies?.isKey( COOKIE.jwt ) ){
            headers.append('Authorization', `Bearer ${window.$cookies.get( COOKIE.jwt )}`)
        }

        const requestInit: RequestInit = {
            method: 'GET',
            headers: headers,
        }

        try {
            const response = await fetch( fetchURL, requestInit );
            if( response.ok ) return await response.json() as T;
            else {
                console.error('fetch GET responce error', response);
                throw new Error('fetch GET responce error');
            }
        }catch( e ){
            throw new Error('fetch GET error');
        }
    },

    async GETRAW({ url, query }: IGetParams): Promise<Response> {

        const fetchURL = query ? HOST.ROOT_API() + url + `?${query}` : HOST.ROOT_API() + url;
        const headers = new Headers();
        if( window.$cookies?.isKey( COOKIE.jwt ) ){
            headers.append('Authorization', `Bearer ${window.$cookies.get( COOKIE.jwt )}`)
        }

        const requestInit: RequestInit = {
            method: 'GET',
            headers: headers,
        }

        try {
            return await fetch( fetchURL, requestInit );
        }catch( e ){
            throw new Error('fetch GET error');
        }
    },
    
    async POST<K,T extends BodyInit>( route: string, data: T ): Promise<K> {
        
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if( window.$cookies?.isKey( COOKIE.jwt ) ){
            headers.append('Authorization', `Bearer ${window.$cookies.get( COOKIE.jwt )}`)
        }

        const requestInit: RequestInit = {
            method: 'POST',
            headers: headers,
        }

        if( data ){
            requestInit.body = data;
        }

        try {
            const response = await fetch( `${HOST.ROOT_API()}${route}`, requestInit );
            if( response.ok ) return await response.json() as K;
            else {
                console.error('fetch POST responce error', response);
                throw new Error('fetch POST responce error');
            }
        }catch( e ){
            throw new Error('fetch POST error');
        }
    },

    async POSTFORM<K,T extends BodyInit>( route: string, data: T ): Promise<K> {
        
        const headers = new Headers();
        if( window.$cookies?.isKey( COOKIE.jwt ) ){
            headers.append('Authorization', `Bearer ${window.$cookies.get( COOKIE.jwt )}`)
        }

        const requestInit: RequestInit = {
            method: 'POST',
            headers: headers,
            body: data,
        }

        try {
            const response = await fetch( `${HOST.ROOT_API()}${route}`, requestInit );
            if( response.ok ) return await response.json() as K;
            else {
                console.error('fetch POST responce error', response);
                throw new Error('fetch POST responce error');
            }
        }catch( e ){
            throw new Error('fetch POST error');
        }
    },
}