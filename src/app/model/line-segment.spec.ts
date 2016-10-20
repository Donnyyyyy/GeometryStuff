import { TestBed } from '@angular/core/testing';
import { Vector3, LineSegment } from './';

describe('Model: Segment', () => {

    it('should correctly get segment as vector', () => {
        let segment: LineSegment = new LineSegment(new Vector3(1, 2, 3), new Vector3(4, -8, 0))

        expect(segment.asVector3())
            .toEqual(new Vector3(3, -10, -3));
    });

});