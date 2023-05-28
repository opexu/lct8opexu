import * as THREE from 'three';
import type { IPoint } from '../config/Point';
import { DirV } from '../config/Pivot';

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

    boxClosestPoint( box: THREE.Box3, p: IPoint, offset: number, angleDeg: number ): { sidePoint: THREE.Vector3, downPoint: THREE.Vector3 } {
        const ZN_Plane = new THREE.Plane( DirV['+Z'], box.min.z - offset );
        const ZP_Plane = new THREE.Plane( DirV['+Z'], box.max.z + offset );
        const XN_Plane = new THREE.Plane( DirV['+X'], box.min.x - offset );
        const XP_Plane = new THREE.Plane( DirV['+X'], box.max.x + offset );

        const planes = [ ZN_Plane, ZP_Plane, XN_Plane, XP_Plane ];

        const projZN = new THREE.Vector3();
        const projZP = new THREE.Vector3();
        const projXN = new THREE.Vector3();
        const projXP = new THREE.Vector3();

        const projPoints = [ projZN, projZP, projXN, projXP ];
        
        let minDist = Number.MAX_VALUE;
        let closestIndex = -1;
        for( let i = 0; i < planes.length; i++ ){
            planes[i].projectPoint( p.position, projPoints[i] );
            const dist = p.position.distanceTo( projPoints[i] );
            if( dist < minDist ){
                closestIndex = i;
                minDist = dist;
            }
        }
        const sideClosestPoint = projPoints[ closestIndex ];

        const angledSidePoint = this.anglePoint( p.position, sideClosestPoint, angleDeg );

        const YN_Plane = new THREE.Plane( DirV['+Y'], box.min.y + offset );
        const downClosestPoint = new THREE.Vector3();
        YN_Plane.projectPoint( sideClosestPoint, downClosestPoint );

        return {
            sidePoint: angledSidePoint,
            downPoint: downClosestPoint,
        }
    },

    anglePoint( vO: THREE.Vector3, vA: THREE.Vector3, angleDeg: number ): THREE.Vector3 {
        const vOA = new THREE.Vector3().subVectors( vA, vO );
        const AB = Math.tan( THREE.MathUtils.degToRad( angleDeg ) ) * vOA.length();
        const vAB = new THREE.Vector3( vA.x, vA.y + AB, vA.z );
        return vAB;
    },

    findDir( vO: THREE.Vector3, vA: THREE.Vector3 ): THREE.Vector3 {
        const vAB = new THREE.Vector3().subVectors( vA, vO );

        if( vAB.x > 0 ){
            if( vAB.z > 0 ){
                if( Math.abs( vAB.x ) > Math.abs( vAB.z ) ){
                    return DirV['+X'];
                }else{
                    return DirV['+Z'];
                }
            }else{
                if( Math.abs( vAB.x ) > Math.abs( vAB.z ) ){
                    return DirV['+X'];
                }else{
                    return DirV['-Z'];
                }
            }
        }else{
            if( vAB.z > 0 ){
                if( Math.abs( vAB.x ) > Math.abs( vAB.z ) ){
                    return DirV['-X'];
                }else{
                    return DirV['+Z'];
                }
            }else{
                if( Math.abs( vAB.x ) > Math.abs( vAB.z ) ){
                    return DirV['-X'];
                }else{
                    return DirV['-Z'];
                }
            }
        }
    },

    offsetRect( l: number, w: number, offset: number ): THREE.Vector3[]{
        const p0 = new THREE.Vector3( l / 2, 0, w / 2 );
        const offsetV = new THREE.Vector3( offset, 0, offset );
        p0.add( offsetV );
        
        const p1 = new THREE.Vector3( p0.x, 0, -p0.z);
        const p2 = new THREE.Vector3( -p1.x, 0, p1.z );
        const p3 = new THREE.Vector3( p2.x, 0, -p2.z );

        return [ p0, p1, p2, p3, p0 ];
    }
}