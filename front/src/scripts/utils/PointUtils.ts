import type * as THREE from 'three';
import type { IPoint } from '../config/Point';

export const PointUtils = {

    checkHeight( oP: IPoint, cP: IPoint[] ){
        let isOK = true;
        for( let i = 0; i < cP.length; i++ ){
            if( cP[i].position.y < oP.position.y ) {
                isOK = false;
                break;
            }
        }
        return isOK;
    },
}