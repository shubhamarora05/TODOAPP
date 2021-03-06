import {Component} from 'angular2/core';
import {ToDoAppService} from '../../todoapp.service';
import {OnInit} from 'angular2/core';
import {Task} from '../task';
import { Router, Location} from 'angular2/router';

 
@Component({
    selector: 'contact-list',
    
    template: `<table class="tableStyle">
        <tr *ngFor="#allTask of allTasks" class="trStyle"> 
            <td width="40px">
                <img src="../../dev/images/pending.png" class="imgStyle" *ngIf="allTask.taskType === 'P'" name="taskStatus" id="taskStatus" width="20px" height="20px" (click)="updateTask(allTask.taskID,allTask.taskType)"/>
                <img src="../../dev/images/completed.png" class="imgStyle" *ngIf="allTask.taskType === 'C'" name="taskStatus" id="taskStatus" width="20px" height="20px" (click)="updateTask(allTask.taskID,allTask.taskType)"/>
            </td>
            <td width="800px" class="tdStyle">
                {{allTask.taskDescription}}
            </td>
            <td>
                <img src="../../dev/images/remove.png" class="imgStyle" name="delete" id="delete" width="20px" height="20px" (click)="deleteTask(allTask.taskID)"/>
            </td>
        </tr>
    </table>
    `,
    styleUrls: ["../../../src/css/task-list.css"],
    providers: [ToDoAppService]

})
export class PendingTaskListComponent implements OnInit{
    public allTasks: Task[];

    route: string;

    response: string;
    
    
    constructor(private _todoappService: ToDoAppService, private router:Router, private location:Location){}

    getAllTask(taskType: string){
        this._todoappService.getTask(taskType).then((allTasks : Task[]) => this.allTasks = allTasks);
    }

    updateTask(taskID : string, taskType: string){
        
        this._todoappService.updateTask(taskID,taskType).subscribe(
            response => this.response = JSON.stringify(response),
            error => console.log(JSON.stringify(error))
        );

        this.router.navigate(['CompletedTask']);
        this.router.navigate(['PendingTask']);
    }

    deleteTask(taskID : string){
       
        this._todoappService.deleteTask(taskID).subscribe(
            response => this.response = JSON.stringify(response),
            error => console.log(JSON.stringify(error))
        );

         this.router.navigate(['CompletedTask']);
        this.router.navigate(['PendingTask']);
    }

    ngOnInit():any{
        this.getAllTask('P');
    }
}