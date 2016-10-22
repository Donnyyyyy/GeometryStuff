import { Token, TokenType } from './';

export class Lexer {

    SYMBOLS = {
        '{': TokenType.LBRA, '}': TokenType.RBRA, '=': TokenType.EQUAL, ';': TokenType.SEMICOLON, '(': TokenType.LPAR,
        ')': TokenType.RPAR, '+': TokenType.PLUS, '-': TokenType.MINUS, '<': TokenType.LESS
    }

    WORDS = {
        'if': TokenType.IF, 'else': TokenType.ELSE,
        'do': TokenType.DO, 'while': TokenType.WHILE
    }

    private code: string;
    private pointer: number;

    public constructor(code: string) {
        this.code = code;
        this.pointer = 0;
    }

    public next(): Token {
        let lastChar: string = this.nextChar();

        if (lastChar == undefined) {
            return new Token(TokenType.EOF, null);

        } else if (this.isSpace(lastChar)) {
            return this.next();

        } else if (lastChar >= '0' && lastChar <= '9') {
            // return to its start
            this.pointer--;
            return this.parseNumber();

        } else if (this.SYMBOLS[lastChar]) {
            return new Token(this.SYMBOLS[lastChar], null);

        } else {
            this.pointer--;
            let word = this.nextWord();

            if (this.WORDS[word]) {
                return new Token(this.WORDS[word], null);
            } else {
                return new Token(TokenType.ID, word);
            }
        }
    }

    private parseNumber(): Token {
        let str: string = "";
        let last: string = this.nextChar();

        while (last !== undefined && !this.isSpace(last) && last >= '0' && last <= '9') {
            str += last;
            last = this.nextChar();
        }
        if (last !== undefined)
            this.pointer--;

        return new Token(TokenType.NUM, +str);
    }

    private nextWord() {
        let word: string = "";
        let last: string = this.nextChar();

        while (last !== undefined && !this.isSpace(last) && last >= 'a' && last <= 'z') {
            word += last;
            last = this.nextChar();
        }
        if (last !== undefined)
            this.pointer--;

        return word;
    }

    private isSpace(char: string){
        return char === ' ' || char === '   ' || char === '\n';
    }

    private nextChar() {
        if (this.code === undefined || this.pointer >= this.code.length) {
            return undefined;
        }

        let char = this.code[this.pointer];
        this.pointer++;
        return char;
    }
}