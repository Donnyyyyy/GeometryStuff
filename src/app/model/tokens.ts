export class Token {

    public constructor(public tokenType: TokenType,
        public value: any) { };

    public getPrettyType(): string {
        switch (this.tokenType) {
            case TokenType.NUM:
                return 'NUM';
            case TokenType.ID:
                return 'ID';
            case TokenType.IF:
                return 'IF';
            case TokenType.ELSE:
                return 'ELSE';
            case TokenType.WHILE:
                return 'WHILE';
            case TokenType.DO:
                return 'DO';
            case TokenType.LBRA:
                return 'LBRA';
            case TokenType.RBRA:
                return 'RBRA';
            case TokenType.LPAR:
                return 'LPAR';
            case TokenType.RPAR:
                return 'RPAR';
            case TokenType.PLUS:
                return 'PLUS';
            case TokenType.MINUS:
                return 'MINUS';
            case TokenType.LESS:
                return 'LESS';
            case TokenType.EQUAL:
                return 'EQUAL';
            case TokenType.SEMICOLON:
                return 'SEMICOLON';
            case TokenType.EOF:
                return 'EOF';
            case TokenType.ERROR:
                return 'ERROR';
        }
    }
}

export enum TokenType {
    NUM, ID, IF, ELSE, WHILE, DO, LBRA, RBRA, LPAR, RPAR, PLUS, MINUS, LESS,
    EQUAL, SEMICOLON, EOF, ERROR
}

