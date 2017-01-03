import { Operation, OperationType } from './';

export class Executor {
    stack: number[];
    memory: number[];
    terminated = false;

    // Compiled VM code
    code: Operation[];
    pointer: number = 0;

    public constructor(code: Operation[]) {
        this.code = code;
    }

    // Execute program step-by-step
    makeStep() {
        if (this.isTerminated()) {
            throw new Error('Already terminated');
        }

        let operation = this.nextOperation();

        if (operation.type === OperationType.FETCH) {
            this.fetch(operation.args[0]);
        } else if (operation.type === OperationType.STORE) {
            this.store(operation.args[0]);
        } else if (operation.type === OperationType.PUSH) {
            this.push(operation.args[0]);
        } else if (operation.type === OperationType.POP) {
            this.pop();
        } else if (operation.type === OperationType.ADD) {
            this.add();
        } else if (operation.type === OperationType.SUB) {
            this.sub();
        } else if (operation.type === OperationType.JZ) {
            this.jumpOnZero(operation.args[0]);
        } else if (operation.type === OperationType.JNZ) {
            this.jumpOnNonZero(operation.args[0]);
        } else if (operation.type === OperationType.JMP) {
            this.jump(operation.args[0]);
        } else if (operation.type === OperationType.LESS) {
            this.less();
        } else if (operation.type === OperationType.END) {
            this.end();
        }
    }

    protected end(){
        this.terminated = true;
    }

    protected less(){
        this.push(this.pop() > this.pop() ? 1 : 0);
    }

    protected jump(jumpTo: number) {
        this.pointer = jumpTo;
    }

    protected jumpOnZero(jumpTo: number) {
        if (!this.pop()) {
            this.jump(jumpTo);
        }
    }

    protected jumpOnNonZero(jumpTo: number) {
        if (this.pop()) {
            this.jump(jumpTo);
        }
    }

    protected add() {
        this.push(this.pop() + this.pop());
    }

    protected sub() {
        this.push(-this.pop() + this.pop());
    }

    protected fetch(address: number) {
        this.push(this.memory[address]);
    }

    protected store(address) {
        this.memory[address] = this.pop();
    }

    protected push(value: number) {
        this.stack.push(value);
    }

    protected pop(): number {
        return this.stack.pop();
    }

    nextOperation(): Operation {
        let next = this.code[this.pointer];
        this.pointer++;

        return next;
    }

    public isTerminated(): boolean {
        return this.terminated;
    }
}

