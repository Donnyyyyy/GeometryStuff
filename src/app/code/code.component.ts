import { Component, OnInit } from '@angular/core';

import { Lexer, Token, TokenType } from '../model/';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {

  code: string = "";
  lexer: Lexer;

  constructor() { }

  ngOnInit() {
  }

  processCode() {
    this.lexer = new Lexer(this.code);
  }

  next() {
    let next = this.lexer.next();
    console.log(`${next.getPrettyType()}: ${next.value}`);
  }
}
