import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Executor, Lexer, Parser, Token, TokenType, Node, Program, Compiler } from '../model/';

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
  executor: Executor;

  exception: string = undefined;
  valid = false;
  terminated: boolean;
  inExecution = false;

  constructor() { }

  ngOnInit() {
  }

  processCode() {
    this.terminated = false;
    this.exception = undefined;

    try {
      this.lexer = new Lexer(this.code);
      this.fillTokens();

      let parser = new Parser(new Lexer(this.code));
      this.node = parser.parse();

      let compiler = new Compiler(this.node);
      this.program = compiler.compile();
      this.executor = new Executor(this.program);

      this.valid = true;
    } catch (e) {
      this.valid = false;
      this.exception = e;
    }
  }

  charOf(code: number) {
    return String.fromCharCode(code);
  }

  start() {
    while (this.inExecution && !this.terminated) {
      this.makeStep();
    }
    this.inExecution = false;
  }

  makeStep() {
    this.executor.makeStep();
    this.terminated = this.executor.isTerminated();
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
