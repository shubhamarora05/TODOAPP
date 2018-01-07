import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http'; 
import 'rxjs/Rx';
import 'rxjs/Rx';
import * as myGlobals from './globals';

@Injectable()
export class ToDoAppService{

    constructor(private _http: Http){}
    
   addTask(addTask: string){
        
        return this._http.post(myGlobals.serviceIP+'/ToDoAppServer/AddNewTask', addTask).map(response => response.json());
    }

    deleteTask(taskID: string){
        return this._http.post(myGlobals.serviceIP+'/ToDoAppServer/DeleteTask', taskID).map(response => response.json());
    }

    updateTask(taskID: string, taskType: string){
        const body = JSON.stringify({taskID: taskID,taskType: taskType});
        return this._http.post(myGlobals.serviceIP+'/ToDoAppServer/UpdateTask', body).map(response => response.json());
    }

    getTask(taskType: string){
        
        let promise = new Promise((resolve, reject) => {
            let apiURL = myGlobals.serviceIP+`/ToDoAppServer/ShowTask/`+taskType;
            this._http.post(apiURL,'')
                .toPromise()
                .then(
                    res => {
                        console.log(res.json());
                       resolve(res.json());
                    }
                );
        });
        return promise;
    }
}