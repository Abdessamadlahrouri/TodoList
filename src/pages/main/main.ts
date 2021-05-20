import { Component } from '@angular/core';

import { CategoryPage } from '../category/category';
import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'main.html'
})
export class MainPage {

  tab1Root = HomePage;
  tab2Root = CategoryPage;
  tab3Root = AboutPage;
  

  constructor() {

  }
}
