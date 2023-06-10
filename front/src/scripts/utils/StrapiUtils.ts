import type { IStrapiAttribute, IStrapiData, IStrapiResponse } from "./IStrapi";

export const StrapiUtils = {
    getModelURL( response: IStrapiResponse ): { name: string, url: string } {
        
        const obj = {
            name: '',
            url: '',
        };
        
        ( response.data as IStrapiData[] ).forEach( data => {
            const modelData = data.attributes['Model3D'] as IStrapiResponse;
            obj.name = ( modelData.data as IStrapiData ).attributes['name'] as string;
            obj.url = ( modelData.data as IStrapiData ).attributes['url'] as string;
        })

        return obj;
    }
}