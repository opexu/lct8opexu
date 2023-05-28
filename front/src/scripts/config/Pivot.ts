import * as THREE from "three"

enum Dir {
    O = 'O', 
    XP = '+X', 
    XN = '-X', 
    YP = '+Y', 
    YN = '-Y', 
    ZP = '+Z', 
    ZN = '-Z'
}

const DirV = {
    [Dir.O]: new THREE.Vector3( 0, 0, 0 ),
    [Dir.XP]: new THREE.Vector3( 1, 0, 0 ),
    [Dir.XN]: new THREE.Vector3( -1, 0, 0 ),
    [Dir.YP]: new THREE.Vector3( 0, 1, 0 ),
    [Dir.YN]: new THREE.Vector3( 0, -1, 0 ),
    [Dir.ZP]: new THREE.Vector3( 0, 0, 1 ),
    [Dir.ZN]: new THREE.Vector3( 0, 0, -1 ),
}

export {
    Dir, DirV
}