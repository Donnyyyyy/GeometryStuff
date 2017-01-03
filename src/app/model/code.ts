export class Program {

    public operations: Operation[];

    public constructor() {
        this.operations = [];
    }

    public addOperation(operation: Operation): Operation {
        this.operations.push(operation);
        return operation;
    }

    public length(): number {
        return this.operations.length;
    }
}

export class Operation {
    public type: OperationType;
    public args: any[];

    public constructor(type: OperationType, ...args) {
        this.type = type;
        this.args = args;
    }

    public getPrettyType(): string {
        if (this.type === OperationType.FETCH) {
            return 'FETCH';
        } else if (this.type === OperationType.STORE) {
            return 'STORE';
        } else if (this.type === OperationType.PUSH) {
            return 'PUSH';
        } else if (this.type === OperationType.POP) {
            return 'POP';
        } else if (this.type === OperationType.ADD) {
            return 'ADD';
        } else if (this.type === OperationType.SUB) {
            return 'SUB';
        } else if (this.type === OperationType.JZ) {
            return 'JZ';
        } else if (this.type === OperationType.JNZ) {
            return 'JNZ';
        } else if (this.type === OperationType.JMP) {
            return 'JMP';
        } else if (this.type === OperationType.LESS) {
            return 'LESS';
        } else if (this.type === OperationType.END) {
            return 'END';
        }
    }

    public toString(): string {
        let str = `${this.getPrettyType()}`;

        for (let arg of this.args) {
            str += ` ${arg}`;
        }
        return str;
    }
}

export enum OperationType {
    FETCH, STORE, PUSH, POP, ADD, SUB, JZ, JNZ, JMP, LESS, END
}
