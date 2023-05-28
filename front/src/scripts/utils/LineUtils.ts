import * as THREE from 'three';
import { PointUtils } from './PointUtils';

export const LineUtils = {

    createLineMesh( pointsArr: THREE.Vector3[] ): THREE.Line {

        const geo = new THREE.BufferGeometry().setFromPoints( pointsArr );
        const mat = new THREE.LineBasicMaterial( { color: 0xffff00 } );
        const lineMesh = new THREE.Line( geo, mat );

        return lineMesh;
    },

    createLine3Arr( pointsArr: THREE.Vector3[] ): THREE.Line3[]{
        const line3Arr = [];
        for( let i = 0; i < pointsArr.length - 1; i++ ){
            const startPoint = pointsArr[ i ];
            const endPoint = i === pointsArr.length - 2 ? pointsArr[ 0 ] : pointsArr[ i + 1 ];
            const line = new THREE.Line3( startPoint, endPoint );
            line3Arr.push( line );
        }
        return line3Arr;
    },

    remapPoints( pointsArr: THREE.Vector3[], p: THREE.Vector3 ): THREE.Vector3[] {

        const line3Arr = this.createLine3Arr( pointsArr );

        let closestIndex = -1;
        let minDist = Number.MAX_VALUE;
        let closestPoint = new THREE.Vector3();
        for( let i = 0; i < line3Arr.length; i++ ){
            const line = line3Arr[i];
            const closestLinePoint = new THREE.Vector3();
            line.closestPointToPoint( p, false, closestLinePoint );
            const dist = p.distanceTo( closestLinePoint );
            if( dist < minDist ){
                closestIndex = i;
                minDist = dist;
                closestPoint = closestLinePoint;
            }
        }

        const closestLine = line3Arr[ closestIndex ];
        let p0 = new THREE.Vector3();
        let p1 = new THREE.Vector3();
        let p2 = new THREE.Vector3();
        let p3 = new THREE.Vector3();
        let p4 = new THREE.Vector3();
        let p5 = new THREE.Vector3();
        if( closestIndex === 0 ){
            p0 = closestPoint;
            p1 = pointsArr[1];
            p2 = pointsArr[2];
            p3 = pointsArr[3];
            p4 = pointsArr[0];
            p5 = closestPoint;
        }else if( closestIndex === 1 ){
            p0 = closestPoint;
            p1 = pointsArr[2];
            p2 = pointsArr[3];
            p3 = pointsArr[0];
            p4 = pointsArr[1];
            p5 = closestPoint;
        }else if( closestIndex === 2 ){
            p0 = closestPoint;
            p1 = pointsArr[3];
            p2 = pointsArr[0];
            p3 = pointsArr[1];
            p4 = pointsArr[2];
            p5 = closestPoint;
        }else if( closestIndex === 3 ){
            p0 = closestPoint;
            p1 = pointsArr[0];
            p2 = pointsArr[1];
            p3 = pointsArr[2];
            p4 = pointsArr[3];
            p5 = closestPoint;
        }

        const remapPoints = [ p0, p1, p2, p3, p4, p5 ];
        for( let i = 0; i < remapPoints.length - 1; i++ ){
            const startPoint = remapPoints[ i ];
            let endPoint = remapPoints[ i + 1 ];
            endPoint = PointUtils.anglePoint( startPoint, endPoint, 3 );
            remapPoints[ i + 1 ] = endPoint;
        }

        return remapPoints;
    },

    trimPoints( line3Arr: THREE.Line3[], p: THREE.Vector3 ) {

        let closestLineIndex = -1;
        let minDist = Number.MAX_VALUE;
        let closestPoint = new THREE.Vector3();
        for( let i = 0; i < line3Arr.length; i++ ){
            const line = line3Arr[i];
            const cP = new THREE.Vector3();
            line.closestPointToPoint( p, false, cP );
            const dist = p.distanceTo( cP );
            if( dist < minDist ){
                minDist = dist;
                closestLineIndex = i;
                closestPoint = cP;
            }
        }

        const pointArr = [];
        for( let i = 0; i <= closestLineIndex; i++ ){
            pointArr.push( line3Arr[i].start );
            if( i === closestLineIndex ) pointArr.push( closestPoint );
        }

        const newLine3Arr = [];
        let lengthLine = 0;
        for( let i = 0; i < pointArr.length - 1; i++ ){
            const startPoint = pointArr[ i ];
            const endPoint = pointArr[ i + 1 ];
            const line = new THREE.Line3( startPoint, endPoint );
            newLine3Arr.push( line );
            lengthLine += line.distance();
        }

        return {
            pointsArr: pointArr,
            //line3Arr: newLine3Arr,
            lineLength: lengthLine,
        };
    }
}