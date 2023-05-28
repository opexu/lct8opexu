interface IRoom {
    length: number;
    width: number;
    height: number;
    floor: IFloor;
    wall: IWall;
}

interface IWall {
    thickness: number;
}

interface IFloor {
    thikness: number;
}

export type {
    IRoom, IWall, IFloor,
}