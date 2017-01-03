export class Token {

    public constructor(public type: TokenType,
        public value: any) { };

    public getPrettyType(): string {
        switch (this.type) {
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

    public toString(): string {
        if(this.type === TokenType.NUM || this.type === TokenType.ID){
            return this.value + "";
        } else if(this.type === TokenType.IF){
            return 'IF';
        } else if(this.type === TokenType.ELSE){
            return 'ELSE';
        } else if(this.type === TokenType.WHILE){
            return 'WHILE';
        } else if(this.type === TokenType.DO){
            return 'DO';
        } else if(this.type === TokenType.LBRA){
            return '{';
        } else if(this.type === TokenType.RBRA){
            return '}';
        } else if(this.type === TokenType.LPAR){
            return '(';
        } else if(this.type === TokenType.RPAR){
            return ')';
        } else if(this.type === TokenType.PLUS){
            return '+';
        } else if(this.type === TokenType.MINUS){
            return '-';
        } else if(this.type === TokenType.LESS){
            return '<';
        } else if(this.type === TokenType.EQUAL){
            return '=';
        } else if(this.type === TokenType.SEMICOLON){
            return ';';
        } else if(this.type === TokenType.EOF){
            return 'EOF';
        } else if(this.type === TokenType.ERROR){
            return this.value + "";
        }
    }
}

export enum TokenType {
    NUM, ID, IF, ELSE, WHILE, DO, LBRA, RBRA, LPAR, RPAR, PLUS, MINUS, LESS,
    EQUAL, SEMICOLON, EOF, ERROR
}

