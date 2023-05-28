import { Vector3 } from 'three';
import { IntersectType, PointType, PointColor } from './Point';

export const TEST_POINTS_ARR = [
    {
        index: 0,
        name: 'Стояк',
        position: new Vector3( 7, -0.5, 3 ),
        intersectType: IntersectType.None,
        pointType: PointType.Output,
        pointColor: PointColor.Red,
    },
    {
        index: 1,
        name: 'A',
        position: new Vector3( 5, 1.5, -4 ),
        intersectType: IntersectType.None,
        pointType: PointType.Input,
        pointColor: PointColor.Blue,
    },
    {
        index: 2,
        name: 'B',
        position: new Vector3( 4, 1.8, 4 ),
        intersectType: IntersectType.None,
        pointType: PointType.Input,
        pointColor: PointColor.Blue,
    },
    {
        index: 3,
        name: 'C',
        position: new Vector3( -5, 1.7, -4 ),
        intersectType: IntersectType.None,
        pointType: PointType.Input,
        pointColor: PointColor.Blue,
    },
]