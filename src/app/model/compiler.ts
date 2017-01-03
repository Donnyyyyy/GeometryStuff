import { Parser, Program, Operation, OperationType, Node, NodeType } from '.';

export class Compiler {

    programTreeRoot: Node;
    program: Program;

    public constructor(programTreeNode: Node) {
        if (programTreeNode.type === NodeType.PROG) {
            this.programTreeRoot = programTreeNode;
        }
        else {
            throw new Error("Program tree node must have PROG type");
        }
        this.program = new Program();
    }

    public compile() {
        this.processNode(this.programTreeRoot);
        return this.program;
    }

    private processNode(node: Node) {
        if (node.type === NodeType.VAR || node.type === NodeType.CONST) {
            this.program.addOperation(new Operation(
                (node.type === NodeType.VAR) ? OperationType.FETCH : OperationType.PUSH,
                (node.type === NodeType.VAR) ? this.getVarAdress(node.value) : node.value
            ));
        } else if (node.type === NodeType.LESS) {
            this.processNode(node.childs[0]); // left side
            this.processNode(node.childs[1]); // right side

            this.program.addOperation(new Operation(OperationType.LESS));
        }  
        else if (node.type === NodeType.ADD || node.type === NodeType.SUB) {
            this.processNode(node.childs[0]);
            this.program.addOperation(new Operation(
                node.type === NodeType.ADD ? OperationType.ADD : OperationType.SUB
            ));
            
        } else if (node.type === NodeType.SET) {
            // Right side
            this.processNode(node.childs[1]);

            this.program.addOperation(new Operation(
                OperationType.STORE,
                this.getVarAdress(node.childs[0].value) // left child (must be a VAR) value = variable name
            ));
        } else if (node.type === NodeType.SEQ || node.type === NodeType.PROG) {
            for (let nodeChild of node.childs) {
                this.processNode(nodeChild);
            }
        } else if (node.type === NodeType.ERR) {
            throw new Error("Program must be valid");

        } else if (node.type === NodeType.IF || node.type === NodeType.IFELSE) {
            // Condition
            this.processNode(node.childs[0]);

            let jumpOnFalse = this.program.addOperation(new Operation(
                OperationType.JZ,
                -1
            ));

            // True body
            this.processNode(node.childs[1]);
            // Jump to line after true-body
            jumpOnFalse.args[0] = this.program.length();

            if (node.type === NodeType.IFELSE) {
                // jump over else body
                let jumpOverFalse = this.program.addOperation(new Operation(
                    OperationType.JMP,
                    -1
                ));
                jumpOnFalse.args[0]++;

                // Else Body
                this.processNode(node.childs[2]);
                // Set else-body end
                jumpOverFalse.args[0] = this.program.length();
            }
        } else if (node.type === NodeType.WHILE) {
            let conditionStart = this.program.length();

            // Condition
            this.processNode(node.childs[0]);

            let jumpOnFalse = this.program.addOperation(new Operation(
                OperationType.JZ,
                -1
            ));

            // Body
            this.processNode(node.childs[1]);

            // Jump to condition 
            let jumpToCondition = this.program.addOperation(new Operation(
                OperationType.JMP,
                conditionStart
            ));

            // Set body end
            jumpOnFalse.args[0] = this.program.length();

        } else if (node.type === NodeType.DO) {
            let bodyStart = this.program.length();

            // Body
            this.processNode(node.childs[0]);

            // Condition
            this.processNode(node.childs[1]);

            let jumpOnTrue = this.program.addOperation(new Operation(
                OperationType.JNZ,
                bodyStart
            ));
        } else if (node.type === NodeType.END) {
            this.program.addOperation(new Operation(
                OperationType.END
            ));
        }
    }

    // Specified by the memory arrangement, we have a-z - 0-25
    private getVarAdress(name: string): number {
        return name.charCodeAt(0) - 'a'.charCodeAt(0);
    }
}