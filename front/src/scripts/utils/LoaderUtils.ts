import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

export const OBJUtils = {

    objLoader: new OBJLoader(),
    
    async getObj( url: string ): Promise<THREE.Object3D>{
        return new Promise(( resolve, reject ) => {
            this.objLoader.load(
                'backend' + url,
                function ( obj ) { resolve( obj );},
                function ( xhr ) {},
                function ( err ) { reject( 'An error happened' ); }
            );
        })
    }
}