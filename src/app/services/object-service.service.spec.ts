/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ObjectService, ObjectData } from './object-service.service';
import { Vector3, Line, LineSegment, Plane, Scalar } from '../model';

describe('Service: ObjectService', () => {

    it('should parse a scalar', () => {
        let service: ObjectService = new ObjectService();
        let types = service.getObjectTypes();

        let data: ObjectData = new ObjectData(types[0], { 'Значение': 100500 });

        expect(service.parseObject(data))
            .toEqual(new Scalar(100500));
    });

    it('should parse a vector', () => {
        let service: ObjectService = new ObjectService();
        let types = service.getObjectTypes();

        let vector: Vector3 = new Vector3(-1, 0, 3);
        let data: ObjectData = new ObjectData(types[1], { 'Координаты': { x: vector.x, y: vector.y, z: vector.z } });

        expect(service.parseObject(data))
            .toEqual(vector);
    });

    it('should parse a line', () => {
        let service: ObjectService = new ObjectService();
        let types = service.getObjectTypes();

        let vector1: Vector3 = new Vector3(-1, 0, 3);
        let vector2: Vector3 = vector1.getReverse();
        let data: ObjectData = new ObjectData(types[2], {
            A: { x: vector1.x, y: vector1.y, z: vector1.z },
            B: { x: vector2.x, y: vector2.y, z: vector2.z }
        });

        expect(service.parseObject(data))
            .toEqual(new Line(vector1, vector2));
    });

    it('should parse a segment', () => {
        let service: ObjectService = new ObjectService();
        let types = service.getObjectTypes();

        let vector1: Vector3 = new Vector3(-1, 0, 3);
        let vector2: Vector3 = vector1.getReverse();
        let data: ObjectData = new ObjectData(types[3], {
            'Начало': { x: vector1.x, y: vector1.y, z: vector1.z },
            'Конец': { x: vector2.x, y: vector2.y, z: vector2.z }
        });

        expect(service.parseObject(data))
            .toEqual(new LineSegment(vector1, vector2));
    });

    it('should parse a plane', () => {
        let service: ObjectService = new ObjectService();
        let types = service.getObjectTypes();

        let a: Vector3 = new Vector3(-1, 0, 3);
        let b: Vector3 = a.getReverse();
        let c: Vector3 = a.copy().add(b.mul(7));
        let data: ObjectData = new ObjectData(types[4], {
            A: { x: a.x, y: a.y, z: a.z },
            B: { x: b.x, y: b.y, z: b.z },
            C: { x: c.x, y: c.y, z: c.z }
        });

        expect(service.parseObject(data))
            .toEqual(new Plane(a, b, c));
    });

    it('should return converted scalar', () => {
        let scalar = ObjectService.asObjectData(new Scalar(1488));

        expect(scalar.type)
            .toEqual('Скаляр');

        expect(scalar.params)
            .toEqual({
                Значение: 1488
            });
    });

    it('should return converted vector', () => {
        let vector = ObjectService.asObjectData(new Vector3(1, 2, 3));

        let params = {
            Координаты: {
                x: 1,
                y: 2,
                z: 3
            }
        };

        expect(vector.type)
            .toEqual('Вектор');

        expect(vector.params)
            .toEqual(params);
    });

    it('should return converted line', () => {
        let line = ObjectService.asObjectData(new Line(
            new Vector3(1, 2, 2),
            new Vector3(3, 2, 2)
        ));

        expect(line.type)
            .toEqual('Прямая');

        expect(line.params)
            .toEqual({
                A: {
                    x: 1,
                    y: 2,
                    z: 2
                },
                B: {
                    x: 3,
                    y: 2,
                    z: 2
                }
            });
    });

    it('should return converted segment', () => {
        let segment = ObjectService.asObjectData(new LineSegment(
            new Vector3(1, 0, -9),
            new Vector3(1, 9, 7)
        ));
        expect(segment.type)
            .toEqual('Отрезок');

        expect(segment.params)
            .toEqual({
                Начало: {
                    x: 1,
                    y: 0,
                    z: -9
                },
                Конец: {
                    x: 1,
                    y: 9,
                    z: 7
                }
            });
    });

    it('should return converted plane', () => {
        let plane = ObjectService.asObjectData(new Plane(
            new Vector3(1, 2, 2),
            new Vector3(3, 2, 2),
            new Vector3(2, -2, 8)
        ));

        expect(plane.type)
            .toEqual('Плоскость');

        expect(plane.params)
            .toEqual({
                A: {
                    x: 1,
                    y: 2,
                    z: 2
                },
                B: {
                    x: 3,
                    y: 2,
                    z: 2
                },
                C: {
                    x: 2,
                    y: -2,
                    z: 8
                }
            });
    });
});
