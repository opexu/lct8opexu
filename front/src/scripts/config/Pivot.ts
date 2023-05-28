enum Dir {
    O, XP, XN, YP, YN, ZP, ZN
}

const DirV = {
    [Dir.O]: { x: 0, y: 0, z: 0 },
    [Dir.XP]: { x: 1, y: 0, z: 0 },
    [Dir.XN]: { x: -1, y: 0, z: 0 },
    [Dir.YP]: { x: 0, y: 1, z: 0 },
    [Dir.YN]: { x: 0, y: -1, z: 0 },
    [Dir.ZP]: { x: 0, y: 0, z: 1 },
    [Dir.ZN]: { x: 0, y: 0, z: -1 },
}

export {
    Dir, DirV
}