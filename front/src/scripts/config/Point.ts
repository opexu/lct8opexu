enum PointType {
    Input = "Точка подключения",
    Output = "Стояк",
    Cross = "Пересечение"
}

enum IntersectType {
    None, Triple, Cross, Branch, Reduction, Pipe,
}

enum PointColor {
    Red = 0xff0000,
    Green = 0x00ff00,
    Blue = 0x0000ff,
    Yellow = 0xffff00,
    Violet = 0xff00ff,
}

interface IPoint {
    index: number;
    name: string;
    position: THREE.Vector3;
    intersectType: IntersectType;
    pointType: PointType;
    pointColor: PointColor;
}

interface ILine {
    start: IPoint;
    end: IPoint;
}

export type {
    IPoint,
}

export {
    PointType,
    IntersectType,
    PointColor
}