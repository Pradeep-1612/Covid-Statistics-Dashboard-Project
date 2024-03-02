import { Component, OnInit } from '@angular/core';
import { faHome, faGlobe, faSyringe } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  faHome = faHome;
  faGlobe = faGlobe;
  faSyringe = faSyringe;

  // Asset paths will be differed from local environment to Production environment. So, we're fetching asset path from index.html
  assetPath = localStorage.getItem('Asset_path');
  constructor() { }

  ngOnInit(): void {
  }

}
