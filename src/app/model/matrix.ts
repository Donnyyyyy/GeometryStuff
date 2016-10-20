import { Vector3 } from './';

export class Matrix {

    public constructor(public matrix: number[][]) {
    }

    public determinant3x3(): number {
        // only 3x3 matrices
        if (this.matrix.length === 3 && this.matrix[0].length === 3) {
            return this.matrix[0][0] * this.matrix[1][1] * this.matrix[2][2]
                + this.matrix[0][1] * this.matrix[1][2] * this.matrix[2][0]
                + this.matrix[1][0] * this.matrix[2][1] * this.matrix[0][2]
                - this.matrix[0][2] * this.matrix[1][1] * this.matrix[2][0]
                - this.matrix[0][1] * this.matrix[1][0] * this.matrix[2][2]
                - this.matrix[1][2] * this.matrix[2][1] * this.matrix[0][0];
        } else {
            return undefined;
        }
    }

    public determinant2x2(): number {
        // only 2x2 matrices
        if (this.matrix.length === 2 && this.matrix[0].length === 2) {
            return this.matrix[0][0] * this.matrix[1][1]
                - this.matrix[0][1] * this.matrix[1][0];
        } else {
            return undefined;
        }
    }



    public solveKramer4x3(): Vector3 {
        if (this.matrix.length !== 3 && this.matrix[0].length !== 4) {
            return undefined;
        }

        let coefficientsMatrix: Matrix = new Matrix([
            [this.matrix[0][0], this.matrix[0][1], this.matrix[0][2]],
            [this.matrix[1][0], this.matrix[1][1], this.matrix[1][2]],
            [this.matrix[2][0], this.matrix[2][1], this.matrix[2][2]]
        ]);
        let coefMatrixDet: number = coefficientsMatrix.determinant3x3();
        if (coefMatrixDet === 0) {
            return undefined;
        }

        let xMatrix: Matrix = new Matrix([
            [this.matrix[0][3], this.matrix[0][1], this.matrix[0][2]],
            [this.matrix[1][3], this.matrix[1][1], this.matrix[1][2]],
            [this.matrix[2][3], this.matrix[2][1], this.matrix[2][2]]
        ]);

        let yMatrix: Matrix = new Matrix([
            [this.matrix[0][0], this.matrix[0][3], this.matrix[0][2]],
            [this.matrix[1][0], this.matrix[1][3], this.matrix[1][2]],
            [this.matrix[2][0], this.matrix[2][3], this.matrix[2][2]]
        ]);

        let zMatrix: Matrix = new Matrix([
            [this.matrix[0][0], this.matrix[0][1], this.matrix[0][3]],
            [this.matrix[1][0], this.matrix[1][1], this.matrix[1][3]],
            [this.matrix[2][0], this.matrix[2][1], this.matrix[2][3]]
        ]);

        return new Vector3(
            xMatrix.determinant3x3() / coefMatrixDet,
            yMatrix.determinant3x3() / coefMatrixDet,
            zMatrix.determinant3x3() / coefMatrixDet
        );
    }

    public solveKramer3x2(): Vector3 {
        if (this.matrix.length !== 3 && this.matrix[0].length !== 3) {
            return undefined;
        }

        let coefficientsMatrix: Matrix = new Matrix([
            [this.matrix[0][0], this.matrix[0][1]],
            [this.matrix[1][0], this.matrix[1][1]]
        ]);
        let coefMatrixDet: number = coefficientsMatrix.determinant2x2();
        if (coefMatrixDet === 0) {
            return undefined;
        }

        let xMatrix: Matrix = new Matrix([
            [this.matrix[0][2], this.matrix[0][1]],
            [this.matrix[1][2], this.matrix[1][1]]
        ]);

        let yMatrix: Matrix = new Matrix([
            [this.matrix[0][0], this.matrix[0][2]],
            [this.matrix[1][0], this.matrix[1][2]]
        ])

        return new Vector3(
            xMatrix.determinant2x2() / coefMatrixDet,
            yMatrix.determinant2x2() / coefMatrixDet,
            0
        );
    }
}
