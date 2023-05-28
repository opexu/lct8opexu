import qs from 'qs';
import type { IGet } from "./IGet";
import { GET_ROUTES } from './GetRoutes';

export const GET: IGet = {

    me() {
        return {
            url: GET_ROUTES.me,
            query: qs.stringify({
                populate: {
                    role: true,
                }
            }, { encodeValuesOnly: true }),
        }
    },
}