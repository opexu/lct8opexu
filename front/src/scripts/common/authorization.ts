import { GET } from "@/_api/GET/GET";
import { LCTRequest } from "@/_api/Request";
import type { IAuth, IUser } from "./IAuth";
import { COOKIE } from "./VueCookies";

async function isAuhenticated(): Promise<IAuth> {

    if( window.$cookies?.isKey( COOKIE.jwt ) ){
        try {
            const authResponse = await LCTRequest.GET<IUser>( GET.me() );
            console.log('authResponse',authResponse);
            
            return {
                isAuth: true,
                user: authResponse
            }
        } catch ( e ) {
            return {
                isAuth: false,
            }
        }
    }
    else {
        console.warn('JWT токен не найден');
        return {
            isAuth: false,
        }
    }
}

export { isAuhenticated }