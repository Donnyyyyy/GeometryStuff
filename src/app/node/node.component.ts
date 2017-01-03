import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

import { Node } from '../model/';

declare var $: any;

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit, AfterViewInit {

  @Input()
  node: Node;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $('.collapsible').collapsible();
    });
  }
}
