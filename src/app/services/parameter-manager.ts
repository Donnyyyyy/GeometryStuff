
export class ParameterManager {

    public requiredSignature: { [type: string]: number };
    public currentSignature: { [type: string]: number };

    public constructor(requiredSignature?: { [type: string]: number }) {
        if (requiredSignature) {
            this.requiredSignature = requiredSignature;
        }
        this.currentSignature = {};
    }

    public add(type: string) {
        if (isNaN(this.currentSignature[type])) {
            this.currentSignature[type] = 1;
        } else {
            this.currentSignature[type] += 1;
        }
    }

    public remove(type: string) {
        this.currentSignature[type] -= 1;
    }

    public isValid(): boolean {
        return this.requiredSignature && this.contains(this.requiredSignature, this.currentSignature) && this.contains(this.currentSignature, this.requiredSignature);
    }

    public contains(dict1: { [type: string]: number }, dict2: { [type: string]: number }): boolean {
        for (let key in dict2) {
            if (dict2[key] > 0) {
                if (!dict1[key] || dict1[key] !== dict2[key]) {
                    return false;
                }
            }
        }
        return true;
    }
}
