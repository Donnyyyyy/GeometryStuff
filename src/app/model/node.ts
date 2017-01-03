export class Node {

    public childs: Node[];

    public constructor(public type: NodeType, public value?: any, ...childs: Node[]) {
        this.childs = childs;
    }

    public toString(): string {
        let self: string;
        if (this.type === NodeType.VAR) {
            self = `VAR ${this.value}`;
        } else if (this.type === NodeType.CONST) {
            self = `CONST ${this.value}`;
        } else if (this.type === NodeType.ADD) {
            self = `ADD`;
        } else if (this.type === NodeType.SUB) {
            self = `SUB`;
        } else if (this.type === NodeType.LESS) {
            self = `LESS`;
        } else if (this.type === NodeType.SET) {
            self = `SET`;
        } else if (this.type === NodeType.IF) {
            self = `IF`;
        } else if (this.type === NodeType.IFELSE) {
            self = `IFELSE`;
        } else if (this.type === NodeType.WHILE) {
            self = `WHILE`;
        } else if (this.type === NodeType.DO) {
            self = `DO`;
        } else if (this.type === NodeType.EMPTY) {
            self = `EMPTY`;
        } else if (this.type === NodeType.SEQ) {
            self = `SEQ`;
        } else if (this.type === NodeType.PROG) {
            self = `PROG`;
        } else if (this.type === NodeType.ERR) {
            self = `ERR: ${this.value}`;
        } else if (this.type === NodeType.END) {
            self = `END`;
        }
        return self;
        // + ((this.childs.length > 0) ? ', childs: ' + this.childs.reduce(
        //     (p, c, i) => { return p + ' ' + c.toString() },
        //     '')
        //     : '');
    }
}

export enum NodeType {
    VAR, CONST, ADD, SUB, LESS, SET, IF, IFELSE, WHILE, DO, EMPTY, SEQ, PROG, ERR, END
}