import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Treemap } from '../models/response-treetter';
import * as d3 from 'd3';
import DOM from '@observablehq/stdlib/src/dom';

@Component({
  selector: 'app-d3-treemap',
  templateUrl: './d3-treemap.component.html',
  styleUrls: ['./d3-treemap.component.scss']
})
export class D3TreemapComponent implements OnInit {

  @ViewChild('treemap', { static: true }) private treemapContent: ElementRef;
  @Input() treemapData: Treemap;

  elemento: any;
  seleccion: any;
  height = 200;
  width = 225;
  userData = {
    name: 'Usuario',
    picProfile: './assets/images/icon/treetter.png',
    verified: false
  };

  constructor() { }

  ngOnInit(): void {
    this.elemento = this.treemapContent.nativeElement;
    this.seleccion = d3.select(this.elemento);
    this.userData.name = this.treemapData.name;
    this.userData.picProfile = this.treemapData.picProfile;
    this.userData.verified = this.treemapData.verified ? this.treemapData.verified : false;
    this.createTreemap();
  }

  createTreemap() {
    const format = d3.format(',d');
    const treemapCreate = (data: any) =>
      d3
        .treemap()
        .tile(d3.treemapSliceDice)
        .size([this.width, this.height])
        .padding(1)
        .round(true)(
          d3
            .hierarchy(data)
            .sum(n => n.value)
        );

    const root = treemapCreate(this.treemapData);

    const svg = this.seleccion
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .style('font', '10px sans-serif');

    const leaf = svg
      .selectAll('g')
      .data(root.leaves())
      .join('g')
      .attr('transform', (n: any) => `translate(${n.x0}, ${n.y0})`);

    leaf.append('title').text(
      n => `${n.data.description}\n${format(n.data.size)}`
    );

    leaf
      .append('rect')
      .attr('id', (n: any) => (n.leafUid = DOM.uid('leaf')).id)
      .attr('fill', (n: any) => n.data.color)
      .attr('width', (n: any) => n.x1 - n.x0)
      .attr('height', (n: any) => n.y1 - n.y0);

    leaf.on('mouseout',
      () => {}
    );
    leaf.on('mouseover',
      () =>{}
    );
  }

}
