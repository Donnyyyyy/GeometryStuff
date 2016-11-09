export class Polynomial {

    public coefficients: number[];

    public constructor(...coefficients: number[]) {
        this.coefficients = coefficients;
    }

    public value(x: number): number {
        return this.coefficients.reduce((p, c, i, arr) => { return p + Math.pow(c, i); })
    }

    public equals(anther: Polynomial) {
        if (anther.coefficients.length !== this.coefficients.length) {
            return false;
        }

        let i = 0;
        while (i < this.coefficients.length) {
            if (this.coefficients[i] !== anther.coefficients[i]) {
                return false;
            }
            i++;
        }

        return true;
    }
}
