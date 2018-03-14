import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent implements OnInit {

  awards = [
    ['🏆', '2017', 'Nasa SpaceApps', 'Winner and Galactic Impact Global Finalist', 'Simple app that uses leapmotion to control the earth globe'],
    ['🏆', '2017', '100 Ideas Zaragoza', 'Winner of both using the most innovative technology and creating the best collaborative application for citizens', 'App that uses blockchain and smart contracts to secure the trading of different city services'],
    ['', '2018', 'Google Hashcode', '4189 position worldwide', 'Resolving the Google proposed problem of managing autonomous vehicles that take clients from one place to the other'],
    ['🏆', '2018', 'uCode by Adidas', 'Winner of the Fan Experience challenge', 'Using IoT and AR, trigger DevOps capabilities together with a MEAN server and manage ChatOps smartly']
  ]

  constructor() { }

  ngOnInit() {
  }

}
