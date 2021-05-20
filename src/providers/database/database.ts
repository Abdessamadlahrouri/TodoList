import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
const win: any = window;
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class DatabaseProvider {
  
private db: SQLiteObject;
  constructor(private sqlite: SQLite){
    console.log('Hello DatabaseProvider Provider');
  }
  init() {
    this.sqlite.create({
      name: 'todo',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.db = db;
        this.initTables();
      }).catch((err) => {
        console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
        this.db = win.openDatabase('todo', '1.0', 'database1', 5 * 1024 * 1024);
        this.initTables();

      });
  }
  private initTables() {
    
    this.createUsertable();
    this.createProjettable();
    this.createTasktable();
    this.createTimelinetable() 
  }

    // USER
  createUsertable(){
    return new Promise((resolve, reject) => resolve(this.query(this.db, "CREATE TABLE 'user' ('username' TEXT,'password' TEXT,'question' TEXT,'reponse' TEXT, 'user_id' INTEGER , PRIMARY KEY('user_id'))").then((data) => {
      console.log("user table created");
    }, (error) => {
      console.log("Error: createdkvTable -> " + JSON.stringify(error));
    })));
  }
  InsertUser(username, password, question,reponse) {
    let querys = "insert or replace into user(username,password,question,reponse) values (?,?,?,?)";
    return new Promise((resolve, reject) => resolve(this.query(this.db, querys, [username, password, question,reponse]).then((data) => {
      console.log("Inserted:", data);
      querys = null;
    }, (error) => {
      console.log("ERROR: insert user -> " + JSON.stringify(error.err));
    })));
  }
  
 

  
  getUsers(): Promise<any> {
    let users:any = [];
    return new Promise((resolve, reject) => resolve(this.query(this.db, "SELECT * FROM user").then((data) => {
      for (var i = 0; i < data.res.rows.length; i++) {
        let user = data.res.rows.item(i);
        users.push(user);
      }
      return users;
    }, (error) => {
      console.log("ERROR: get user -> " + JSON.stringify(error));
    })));
  }

  getUserbyId(id): Promise<any> {
    let users:any = [];
    return new Promise((resolve, reject) => resolve(this.query(this.db, "SELECT * FROM user WHERE user_id == "+id).then((data) => {
      for (var i = 0; i < data.res.rows.length; i++) {
        let user = data.res.rows.item(i);
        users.push(user);
      }
      return users;
    }, (error) => {
      console.log("ERROR: get user -> " + JSON.stringify(error));
    })));
  }
  
  updatePassword(user_id,inputpass){
    let querys = "update user set password=? where user_id=?";
    return new Promise((resolve, reject) => resolve(this.query(this.db, querys, [inputpass,user_id]).then((data) => {
      console.log("update:", data);
      querys = null;
    }, (error) => {
      console.log("ERROR: update password -> " + JSON.stringify(error.err));
    })));
  }


 /// TASKS TABLE

 createTasktable(){
  return new Promise((resolve, reject) => resolve(this.query(this.db, "CREATE TABLE 'tasks' ('idtask' INTEGER,'title' TEXT,'description' TEXT,'category' TEXT,'date_deb' TEXT ,'idprojet' INTEGER,PRIMARY KEY('idtask'),FOREIGN KEY('idprojet') REFERENCES 'projet'('idprojet'))").then((data) => {
    console.log("task table created");
  }, (error) => {
    console.log("Error: test -> " + JSON.stringify(error));
  })));
}

  InsertTask(title,dscription,category,date_deb,idprojet) {
    console.log(title)
    console.log(idprojet)
    let querys = "insert or replace into tasks(title,description,category,date_deb,idprojet) values (?,?,?,?,?)";
    return new Promise((resolve, reject) => resolve(this.query(this.db, querys, [title,dscription,category,date_deb,idprojet]).then((data) => {
      console.log("Inserted:", data);
      querys = null;
    }, (error) => {
      console.log("ERROR: insert task -> " + JSON.stringify(error.err));
    })));
  }
  getTasks(idprojet): Promise<any> {
    let tasks:any = [];
    return new Promise((resolve, reject) => resolve(this.query(this.db, "SELECT * FROM tasks WHERE idprojet = "+idprojet).then((data) => {
      for (var i = 0; i < data.res.rows.length; i++) {
        let task = data.res.rows.item(i);
        tasks.push(task);
      }
      return tasks;
    }, (error) => {
      console.log("ERROR: get task -> " + JSON.stringify(error));
    })));
  }
  
  deletetask(idtask) {
    let querys = "delete from tasks WHERE idtask=?";
    return new Promise((resolve, reject) => resolve(this.query(this.db, querys, [idtask]).then((data) => {
      console.log("deleted:", data);
      querys = null;
    }, (error) => {
      console.log("ERROR: deleted task -> " + JSON.stringify(error.err));
    })));
  }

// PROJETS
  createProjettable(){
    return new Promise((resolve, reject) => resolve(this.query(this.db, "CREATE TABLE 'projet' ('idprojet' INTEGER,'title' TEXT,'user_id' INTEGER,PRIMARY KEY('idprojet'),FOREIGN KEY('user_id') REFERENCES 'user'('user_id'))").then((data) => {
      console.log("compte table created");
    }, (error) => {
      console.log("Error: test -> " + JSON.stringify(error));
    })));
  }
  InsertProjet(title,user_id) {
    console.log(title)
    console.log(user_id)
    let querys = "insert or replace into projet(title,user_id) values (?,?)";
    return new Promise((resolve, reject) => resolve(this.query(this.db, querys, [title,user_id]).then((data) => {
      console.log("Inserted:", data);
      querys = null;
    }, (error) => {
      console.log("ERROR: insert user -> " + JSON.stringify(error.err));
    })));
  }
 
  getProjects(user_id): Promise<any> {
    let projects:any = [];
    return new Promise((resolve, reject) => resolve(this.query(this.db, "SELECT * FROM projet WHERE user_id="+user_id).then((data) => {
      for (var i = 0; i < data.res.rows.length; i++) {
        let project = data.res.rows.item(i);
        projects.push(project);
      }
      return projects;
    }, (error) => {
      console.log("ERROR: get user -> " + JSON.stringify(error));
    })));
  }

  // TIMELINE
  
    createTimelinetable(){
     return new Promise((resolve, reject) => resolve(this.query(this.db, "CREATE TABLE 'timeline' ('idtimeline' INTEGER,'title' TEXT,'active' BOOLEAN, 'description' TEXT,'date_deb' TEXT,idtask, PRIMARY KEY('idtimeline'),FOREIGN KEY('idtask') REFERENCES 'tasks'('idtask'))").then((data) => {
       console.log("timeline table created");
    }, (error) => {
      console.log("Error: test -> " + JSON.stringify(error));
    })));
  }
  
  InsertTimeline(title,active,dscription,date_deb,idtask) {
      console.log(title)
      console.log(idtask)
      let querys = "insert or replace into timeline(title,active,description,date_deb,idtask) values (?,?,?,?,?)";
      return new Promise((resolve, reject) => resolve(this.query(this.db, querys, [title,active,dscription,date_deb,idtask]).then((data) => {
        console.log("Inserted:", data);
        querys = null;
      }, (error) => {
        console.log("ERROR: insert task -> " + JSON.stringify(error.err));
      })));
    }
    getTimeline(idtask): Promise<any> {
      let tasks:any = [];
      return new Promise((resolve, reject) => resolve(this.query(this.db, "SELECT * FROM timeline WHERE idtask = "+idtask).then((data) => {
        for (var i = 0; i < data.res.rows.length; i++) {
          let task = data.res.rows.item(i);
          tasks.push(task);
        }
        return tasks;
      }, (error) => {
        console.log("ERROR: get task -> " + JSON.stringify(error));
      })));
    }

  
  query(dbase: any, querys: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        dbase.transaction((tx: any) => {
          tx.executeSql(querys, params,
            (tx: any, res: any) => {
              resolve({ tx: tx, res: res })
            },
            (tx: any, err: any) => reject({ tx: tx, err: err }));
        },
          (err: any) => reject({ err: err }));
      } catch (err) {
        reject({ err: err });
      }
    });
  }
}
