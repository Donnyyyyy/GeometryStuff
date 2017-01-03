import { Parser, Lexer, Node, NodeType } from './';

describe('Model: Parser', () => {

    it('should create parser', () => {
        let lexer = new Lexer(
            `a = 5 + 4 - (2 + 912 - (b - c)) + d;
            while(a + b < (c - d + 4) - 2){
                a = 3 - 2;
            }
            
            if(4 < 5)
             a = 2;`
        ); 

        let parser = new Parser(lexer);

        expect(parser).toBeDefined();
    });

    it('should parse single VAR expression', () => {
        let lexer = new Lexer(
            `a = 5 + 4 - (2 + 912 - (b - c)) + d;
            while(a + b < (c - d + 4) - 2){
                a = 3 - 2;
            }
            
            if(4 < 5)
             a = 2;`
        ); 

        let parser = new Parser(lexer);

        let varExpr = parser.parseExpression()
        expect(varExpr.type).toEqual(NodeType.VAR);
        expect(varExpr.value).toEqual('a');
    });
});