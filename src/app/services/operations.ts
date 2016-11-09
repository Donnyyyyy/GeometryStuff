import { GeometricOperation } from './';
import { Vector3, Scalar, Line, Plane, LineSegment, GeometryUtils, PlaneEquation } from '../model/';

export class Operations {

    // IDK why I can't initialize array not like this
    // arr = [1,2,3] and have to do something like this arr.push(1), arr.push(2), ...
    // So isOperationsInitialized and initOperations() do all described above.
    private static isOperationsInitialized: boolean = false;

    private static operations: GeometricOperation[] = [];

    // Сrutch
    private static initOperations() {
        Operations.operations.push(
            new GeometricOperation(
                'Длина вектора',
                {
                    'Vector3': 1
                },
                (parameters) => {
                    try {
                        return (<Vector3>parameters[0]).length();
                    } catch (e) {
                        return "ERROR!";
                    }
                }),
            new GeometricOperation(
                'Сложение векторов',
                {
                    'Vector3': 2
                },
                (parameters) => {
                    try {
                        return (<Vector3>parameters[0]).copy().add((<Vector3>parameters[1]));
                    } catch (e) {
                        return "ERROR!";
                    }
                }),
            new GeometricOperation(
                'Вычитание векторов',
                {
                    'Vector3': 2
                },
                (parameters) => {
                    try {
                        return (<Vector3>parameters[0]).copy().add((<Vector3>parameters[1]).getReverse());
                    } catch (e) {
                        return "ERROR!";
                    }
                }),
            new GeometricOperation(
                'Умножение вектора на скаляр',
                {
                    'Vector3': 1,
                    'Scalar': 1
                },
                (parameters) => {
                    try {
                        return (<Vector3>parameters[0]).copy().mul((<Scalar>parameters[1]).value);
                    } catch (e) {
                        try {
                            return (<Vector3>parameters[1]).copy().mul((<Scalar>parameters[0]).value);
                        }
                        catch (e) {
                            return "ERROR!";
                        }
                    }
                }),
            new GeometricOperation(
                'Обратный вектор',
                {
                    'Vector3': 1
                },
                (parameters) => {
                    try {
                        return (<Vector3>parameters[0]).getReverse();
                    } catch (e) {
                        return "ERROR!";
                    }
                }),

            new GeometricOperation(
                'Скалярное произведение векторов',
                {
                    'Vector3': 2
                },
                (parameters) => {
                    try {
                        return GeometryUtils.scalarProduct((<Vector3>parameters[0]), (<Vector3>parameters[1]));
                    } catch (e) {
                        return "ERROR!";
                    }
                }),

            new GeometricOperation(
                'Векторное произведение векторов',
                {
                    'Vector3': 2
                },
                (parameters) => {
                    try {
                        return GeometryUtils.vectorProduct((<Vector3>parameters[0]), (<Vector3>parameters[1]));
                    } catch (e) {
                        return "ERROR!";
                    }
                }),

            new GeometricOperation(
                'Смешанное произведения векторов',
                {
                    'Vector3': 3
                },
                (parameters) => {
                    try {
                        return GeometryUtils.mixedProduct((<Vector3>parameters[0]), (<Vector3>parameters[1]), (<Vector3>parameters[2]));
                    } catch (e) {
                        return "ERROR!";
                    }
                }),

            new GeometricOperation(
                'Коллинеарность векторов',
                {
                    'Vector3': 2
                },
                (parameters) => {
                    try {
                        return GeometryUtils.areCollinear((<Vector3>parameters[0]), (<Vector3>parameters[1]));
                    } catch (e) {
                        return "ERROR!";
                    }
                }),

            new GeometricOperation(
                'Компланарности векторов',
                {
                    'Vector3': 3
                },
                (parameters) => {
                    try {
                        return GeometryUtils.areComplanar((<Vector3>parameters[0]), (<Vector3>parameters[1]), (<Vector3>parameters[2]));
                    } catch (e) {
                        return "ERROR!";
                    }
                }),

            new GeometricOperation(
                'Ориентация тройки векторов',
                {
                    'Vector3': 3
                },
                (parameters) => {
                    try {
                        let orientation = GeometryUtils.getVectorTripleOrientation((<Vector3>parameters[0]), (<Vector3>parameters[1]), (<Vector3>parameters[2]));

                        switch (orientation) {
                            case -1:
                                return "Левая тройка";
                            case 1:
                                return "Правая тройка";
                        }
                    } catch (e) {
                        return "ERROR!";
                    }
                }),

            new GeometricOperation(
                'Разложение вектора по базису',
                {
                    'Vector3': 4
                },
                (parameters) => {
                    try {
                        return GeometryUtils.extendToBasis((<Vector3>parameters[0]), (<Vector3>parameters[1]), (<Vector3>parameters[2]), (<Vector3>parameters[3]));
                    } catch (e) {
                        return "ERROR!";
                    }
                }),

            new GeometricOperation(
                'Угол между векторами',
                {
                    'Vector3': 2
                },
                (parameters) => {
                    try {
                        return GeometryUtils.getAngleVectors((<Vector3>parameters[0]), (<Vector3>parameters[1]));
                    } catch (e) {
                        return "ERROR!";
                    }
                }),

            new GeometricOperation(
                'Точка, делящая данный отрезок в данном отношении',
                {
                    'LineSegment': 1,
                    'Scalar': 1
                },
                (parameters) => {
                    try {
                        return GeometryUtils.divide((<LineSegment>parameters[0]), (<Scalar>parameters[1]).value);
                    } catch (e) {
                        return "ERROR!";
                    }
                }),

            new GeometricOperation(
                'Расстояние между точками',
                {
                    'Vector3': 2,
                },
                (parameters) => {
                    try {
                        let parameter1 = <Vector3>parameters[0];
                        let parameter2 = <Vector3>parameters[1];
                        return GeometryUtils.distancePointPoint(parameter1, parameter2);
                    } catch (e) {
                        return "ERROR!";
                    }
                }),

            new GeometricOperation(
                'Расстояние между точкой и прямой',
                {
                    'Vector3': 1,
                    'Line': 1,
                },
                (parameters) => {
                    try {
                        let parameter1 = <Line>parameters[0];
                        let parameter2 = <Vector3>parameters[1];
                        return GeometryUtils.distanceLinePoint(parameter1, parameter2);

                    } catch (e) {
                        try {
                            let parameter1 = <Line>parameters[1];
                            let parameter2 = <Vector3>parameters[0];
                            return GeometryUtils.distanceLinePoint(parameter1, parameter2);

                        } catch (e) {
                            return "ERROR!";
                        }
                    }
                }),

            new GeometricOperation(
                'Проекция точки на прямую',
                {
                    'Vector3': 1,
                    'Line': 1,
                },
                (parameters) => {
                    try {
                        let parameter1 = <Line>parameters[0];
                        let parameter2 = <Vector3>parameters[1];
                        return GeometryUtils.projectPointLine(parameter2, parameter1);

                    } catch (e) {
                        try {
                            let parameter1 = <Line>parameters[1];
                            let parameter2 = <Vector3>parameters[0];
                            return GeometryUtils.projectPointLine(parameter2, parameter1);

                        } catch (e) {
                            return "ERROR!";
                        }
                    }
                }),

            new GeometricOperation(
                'Расстояние от точки до плоскости',
                {
                    'Plane': 1,
                    'Vector3': 1,
                },
                (parameters) => {
                    try {
                        let parameter1 = <Vector3>parameters[0];
                        let parameter2 = <Plane>parameters[1];
                        return GeometryUtils.distancePointPlane(parameter1, parameter2);

                    } catch (e) {
                        try {
                            let parameter1 = <Vector3>parameters[1];
                            let parameter2 = <Plane>parameters[0];
                            return GeometryUtils.distancePointPlane(parameter1, parameter2);

                        } catch (e) {
                            return "ERROR!";
                        }
                    }
                }),

            new GeometricOperation(
                'Проекция точки на плоскость',
                {
                    'Plane': 1,
                    'Vector3': 1,
                },
                (parameters) => {
                    try {
                        let parameter1 = <Vector3>parameters[0];
                        let parameter2 = <Plane>parameters[1];
                        return GeometryUtils.projectPointPlane(parameter1, parameter2);

                    } catch (e) {
                        try {
                            let parameter1 = <Vector3>parameters[1];
                            let parameter2 = <Plane>parameters[0];
                            return GeometryUtils.projectPointPlane(parameter1, parameter2);

                        } catch (e) {
                            return "ERROR!";
                        }
                    }
                }),

            new GeometricOperation(
                'Проекция прямой на плоскость',
                {
                    'Plane': 1,
                    'Line': 1,
                },
                (parameters) => {
                    try {
                        let parameter1 = <Line>parameters[0];
                        let parameter2 = <Plane>parameters[1];
                        return GeometryUtils.distanceLinePlane(parameter1, parameter2);

                    } catch (e) {
                        try {
                            let parameter1 = <Line>parameters[1];
                            let parameter2 = <Plane>parameters[0];
                            return GeometryUtils.distanceLinePlane(parameter1, parameter2);

                        } catch (e) {
                            return "ERROR!";
                        }
                    }
                }),

            new GeometricOperation(
                'Нормальное уравнение плоскости по трем точкам',
                {
                    'Vector3': 3,
                },
                (parameters) => {
                    try {
                        let parameter1 = <Vector3>parameters[0];
                        let parameter2 = <Vector3>parameters[1];
                        let parameter3 = <Vector3>parameters[2];
                        return PlaneEquation.fromPoints(parameter1, parameter2, parameter3);

                    } catch (e) {
                        return "ERROR!";
                    }
                }),

            new GeometricOperation(
                'Пересечение прямой и плоскости',
                {
                    'Plane': 1,
                    'Line': 1,
                },
                (parameters) => {
                    try {
                        let parameter1 = <Line>parameters[0];
                        let parameter2 = <Plane>parameters[1];
                        return GeometryUtils.intersectLinePlane(parameter1, parameter2);

                    } catch (e) {
                        try {
                            let parameter1 = <Line>parameters[1];
                            let parameter2 = <Plane>parameters[0];
                            return GeometryUtils.intersectLinePlane(parameter1, parameter2);

                        } catch (e) {
                            return "ERROR!";
                        }
                    }
                }),

            new GeometricOperation(
                'Расстояние от прямой до плоскости',
                {
                    'Plane': 1,
                    'Line': 1,
                },
                (parameters) => {
                    try {
                        let parameter1 = <Line>parameters[0];
                        let parameter2 = <Plane>parameters[1];
                        return GeometryUtils.distanceLinePlane(parameter1, parameter2);

                    } catch (e) {
                        try {
                            let parameter1 = <Line>parameters[1];
                            let parameter2 = <Plane>parameters[0];
                            return GeometryUtils.distanceLinePlane(parameter1, parameter2);

                        } catch (e) {
                            return "ERROR!";
                        }
                    }
                }),

            new GeometricOperation(
                'Прямая пересечения 2 плоскостей',
                {
                    'Plane': 2,
                },
                (parameters) => {
                    try {
                        let parameter1 = <Plane>parameters[0];
                        let parameter2 = <Plane>parameters[1];
                        return GeometryUtils.intersectPlanePlane(parameter1, parameter2);

                    } catch (e) {
                        return "ERROR!";
                    }
                }),

            new GeometricOperation(
                'Расстояние между плоскостями',
                {
                    'Plane': 2,
                },
                (parameters) => {
                    try {
                        let parameter1 = <Plane>parameters[0];
                        let parameter2 = <Plane>parameters[1];
                        return GeometryUtils.distancePlanePlane(parameter1, parameter2);

                    } catch (e) {
                        return "ERROR!";
                    }
                }),

            new GeometricOperation(
                'Угол между прямыми',
                {
                    'Line': 2,
                },
                (parameters) => {
                    try {
                        let parameter1 = <Line>parameters[0];
                        let parameter2 = <Line>parameters[1];
                        return GeometryUtils.getAngleLineLine(parameter1, parameter2);

                    } catch (e) {
                        return "ERROR!";
                    }
                }),

            new GeometricOperation(
                'Угол между прямой и плоскостью',
                {
                    'Plane': 1,
                    'Line': 1,
                },
                (parameters) => {
                    try {
                        let parameter1 = <Line>parameters[0];
                        let parameter2 = <Plane>parameters[1];
                        return GeometryUtils.getAngleLinePlane(parameter1, parameter2);

                    } catch (e) {
                        try {
                            let parameter1 = <Line>parameters[1];
                            let parameter2 = <Plane>parameters[0];
                            return GeometryUtils.getAngleLinePlane(parameter1, parameter2);

                        } catch (e) {
                            return "ERROR!";
                        }
                    }
                }),

            new GeometricOperation(
                'Угол между плоскостями',
                {
                    'Plane': 2,
                },
                (parameters) => {
                    try {
                        let parameter1 = <Plane>parameters[0];
                        let parameter2 = <Plane>parameters[1];
                        return GeometryUtils.getAngleVectors(parameter1.getNormal(), parameter2.getNormal());

                    } catch (e) {
                        return "ERROR!";
                    }
                }),

            new GeometricOperation(
                'Объем тэтраэдра по вершинам',
                {
                    'Vector3': 4,
                },
                (parameters) => {
                    try {
                        let parameter1 = <Vector3>parameters[0];
                        let parameter2 = <Vector3>parameters[1];
                        let parameter3 = <Vector3>parameters[2];
                        let parameter4 = <Vector3>parameters[3];
                        return GeometryUtils.tetrahedronVolume(parameter1, parameter2, parameter3, parameter4);

                    } catch (e) {
                        return "ERROR!";
                    }
                })
        );
    }

    public static get(): GeometricOperation[] {
        // Сrutch
        if (!Operations.isOperationsInitialized) {
            Operations.initOperations();
            Operations.isOperationsInitialized = true;
        }
        return Operations.operations;
    }
} 
