import { Token, TokenType, Node, NodeType, Lexer } from './';

/**
 * Dictionary:
 * Statement: assignment/comparison/while/do/if/else
 * Body: if/else/while body ({<body>})
 * Expression: a + 4 - b + ((2 - c) - (d - e))
 */
export class Parser {

    protected lexer: Lexer;

    /**
     * Used to store tokens obtained from lexer when function can't handle that type of tokens
     * (e.g. parseStatement() can't handle TokenType.NUMBER and passes it into parseExpression())
     */
    protected tokensQueue: Token[] = [];

    public constructor(lexer: Lexer) {
        this.lexer = lexer;
    }

    parse(): Node {
        let program = new Node(NodeType.PROG);

        let token;

        do {
            token = this.nextToken();
            if (token.type === TokenType.EOF) {
                break;
            } else {
                this.tokensQueue.push(token);
            }

            program.childs.push(this.parseStatement());
        } while (token.type !== TokenType.EOF);
        program.childs.push(new Node(NodeType.END));

        return program;
    }

    parseStatement(leftSide?: Node): Node {
        let token: Token = this.nextToken();

        // In case of NUM/ID push in the tokensQueue, parse it as left-side expression for the next statement
        if (token.type === TokenType.NUM || token.type == TokenType.ID || token.type == TokenType.LPAR) {
            this.tokensQueue.push(token);
            return this.parseStatement(this.parseExpression(undefined));
        }
        else if (token.type === TokenType.EQUAL) {
            return this.parseSetOrLess(leftSide, NodeType.SET);
        }
        else if (token.type === TokenType.LESS) {
            return this.parseSetOrLess(leftSide, NodeType.SET);
        }
        else if (token.type === TokenType.SEMICOLON) {
            return new Node(NodeType.EMPTY);
        }
        else if (token.type === TokenType.LBRA) {
            this.tokensQueue.push(token);
            return this.parseBody();
        }
        else if (token.type === TokenType.IF) {
            let ifNode = new Node(
                NodeType.IF,
                undefined,
                this.parseCondition(),
                this.parseBody()
            );

            token = this.nextToken();
            if (token.type === TokenType.ELSE) {
                ifNode.type = NodeType.IFELSE;
                ifNode.childs.push(this.parseBody());
            }
            else {
                this.tokensQueue.push(token);
            }

            return ifNode;
        }
        else if (token.type === TokenType.WHILE) {
            return new Node(
                NodeType.WHILE,
                undefined,
                this.parseCondition(),
                this.parseBody()
            );
        }
        else if (token.type === TokenType.DO) {
            let doNode = new Node(
                NodeType.DO,
                undefined,
                this.parseBody()
            );

            token = this.nextToken();
            if (token.type === TokenType.WHILE) {
                doNode.childs.push(this.parseCondition());

                token = this.nextToken();
                if (token.type !== TokenType.SEMICOLON) {
                    return new Node(NodeType.ERR, `";" expected.`);
                }
            }
            else {
                return new Node(NodeType.ERR, `"WHILE" expected.`);
            }

            return doNode;
        }
        else {
            return new Node(NodeType.ERR, 'Unexpected ' + token.toString());
        }
    }

    parseCondition(): Node {
        let token = this.nextToken();

        if (token.type !== TokenType.LPAR) {
            return new Node(NodeType.ERR, `"(" expected.`);
        }

        return new Node(
            NodeType.LESS,
            undefined,
            this.parseExpression(TokenType.LESS),
            this.parseExpression(TokenType.RPAR)
        );
    }

    parseBody(): Node {
        let token = this.nextToken();
        let multipleStatements = false;

        if (token.type === TokenType.LBRA) {
            multipleStatements = true;
        } else {
            this.tokensQueue.push(token);
        }

        let body: Node = new Node(NodeType.SEQ);

        do {
            let child: Node = this.parseStatement();
            body.childs.push(child);
            token = this.nextToken();
            if (token.type === TokenType.RBRA) {
                break;
            }
            if (multipleStatements && token.type === TokenType.EOF) {
                throw new Error(`Unexpected EOF, expected '}'`);
            }

            this.tokensQueue.push(token);
        } while (multipleStatements);

        return body;
    }

    /**
     * nodeType must be SET or LESS
     */
    parseSetOrLess(leftSide: Node, nodeType: NodeType): Node {
        // If there is no left side - return error
        if (!leftSide) {
            return new Node(NodeType.ERR, `Expected left side expression  before assignment.`);
            // VAR wrapped by SEQ -> SEQ -> VAR
        } else if (nodeType === NodeType.SET && leftSide.childs[0].childs[0] && leftSide.childs[0].childs[0].type !== NodeType.VAR) {
            return new Node(NodeType.ERR, `Left side expression must be a variable.`);
        } else {
            return new Node(
                nodeType,
                0,
                (nodeType === NodeType.SET) ? leftSide.childs[0].childs[0] : leftSide, // extract VAR from the wrapper
                this.parseExpression(TokenType.SEMICOLON) // right side
            );
        }
    }

    /**
     * endsWith: default to undefined;
     * If endsWith === undefined then first unexpected token will be handled as endsWith (Handy in case of parsing left-side expressions)
     * Returns undefined if endsWith reached before an expression.
     * 
     * !NOTE: first operand will be wrapped by SEQ with a single child (do not forget it in this.parseSetOrLess(..))
     */
    parseExpression(endsWith: TokenType = undefined): Node {
        let token: Token = this.nextToken();
        let expression: Node = new Node(NodeType.SEQ);
        let sign: NodeType = NodeType.SEQ; // First child is a VAR/CONST wrapped by SEQ with a single child

        while (token.type !== endsWith) {
            if (token.type === endsWith) {
                return expression;
            }
            else if ((token.type === TokenType.PLUS) || (token.type === TokenType.MINUS)) {
                if (sign === undefined) {
                    sign = (token.type === TokenType.PLUS) ? NodeType.ADD : NodeType.SUB;
                } else {
                    return new Node(NodeType.ERR, `Unexpected + ${token.toString()} (sing already defined)`);
                }
            }
            else if ((token.type === TokenType.ID) || (token.type === TokenType.NUM) || (token.type === TokenType.LPAR)) {
                if (sign !== undefined) {
                    let child: Node;

                    if (token.type === TokenType.ID) {
                        child = new Node(NodeType.VAR, token.value);
                    } else if (token.type === TokenType.NUM) {
                        child = new Node(NodeType.CONST, token.value);
                    } if (token.type === TokenType.LPAR) {
                        child = this.parseExpression(TokenType.RPAR);
                    }

                    expression.childs.push(new Node(sign, undefined, child));
                    sign = undefined;
                } else {
                    return new Node(NodeType.ERR, `Unexpected + ${token.toString()}`);
                }
            }
            else {
                if (endsWith === undefined) {
                    this.tokensQueue.push(token);
                    return expression;
                }

                return new Node(NodeType.ERR, 'Unexpected ' + token.toString());
            }

            token = this.nextToken();
        }

        return expression;
    }

    nextNumOrId(): Node {
        let token: Token = this.nextToken();
        return new Node(token.type === TokenType.ID ? NodeType.VAR : NodeType.CONST,
            token.value);
    }

    nextToken(): Token {
        let next = this.tokensQueue.pop();

        if (next) {
            return next;
        }
        else {
            return this.lexer.next();
        }
    }
}