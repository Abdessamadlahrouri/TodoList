import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CategoryPage } from '../pages/category/category';
import { MainPage } from '../pages/main/main';
import { AboutPage} from '../pages/about/about';
import { ProjectsPage } from '../pages/projects/projects';
import { AddprojectPage } from '../pages/addproject/addproject';
import { OthertaskPage } from '../pages/othertask/othertask';
import { TasksPage } from '../pages/tasks/tasks';
import { TimelinePage } from '../pages/timeline/timeline';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CategoryPage,
    MainPage,
    AboutPage,
    ProjectsPage,
    AddprojectPage,
    OthertaskPage,
    TasksPage,
    TimelinePage,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CategoryPage,
    MainPage,
    AboutPage,
    ProjectsPage,
    AddprojectPage,
    OthertaskPage,
    TasksPage,
    TimelinePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite, 
    Toast
  ]
})
export class AppModule {}
