import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Lexer, Parser, Token, TokenType, Node, Program, Compiler } from '../model/';

declare var $: any;

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit, AfterViewInit {

  code: string = "";
  lexer: Lexer;
  tokens: string[];
  node: Node;
  program: Program = new Program();
  exception: string = undefined;

  constructor() { }

  ngOnInit() {
  }

  processCode() {
    this.exception = undefined;

    try {
      this.lexer = new Lexer(this.code);
      this.fillTokens();

      let parser = new Parser(new Lexer(this.code));
      this.node = parser.parse();

      let compiler = new Compiler(this.node);

      this.program = compiler.compile();
    } catch (e) {
      this.exception = e;
    }
    console.log(this.program);
  }

  fillTokens() {
    this.tokens = [];

    let token;
    do {
      token = this.lexer.next();
      this.tokens.push(token);
    } while (token.type !== TokenType.EOF);
  }

  next() {
    let next = this.lexer.next();
    console.log(`${next.getPrettyType()}: ${next.value}`);
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $('.collapsible').collapsible();
    });
  }
}
