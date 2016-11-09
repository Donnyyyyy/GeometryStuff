import { Vector3, Line } from './';

export class LineSegment {

    public start: Vector3;
    public end: Vector3;
    public line: Line;

    public constructor(start: Vector3, end: Vector3) {
        this.start = start;
        this.end = end;
        this.line = new Line(start, end);
    }

    /**
     * Returns Vector equal to this segment moved to (0, 0, 0)
     */
    public asVector3() {
        return this.end.copy().add(this.start.getReverse());
    }

    public asVector3Arr() {
        return [this.start.copy(), this.end.copy()];
    }

    public getType() {
        return 'LineSegment';
    }
}