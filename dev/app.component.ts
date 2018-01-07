import {Component} from 'angular2/core';
import {ControlGroup} from 'angular2/common';
import {ToDoAppService} from './todoapp.service';
import {RouteConfig, Router, RouterLink} from 'angular2/router';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {AllTaskListComponent} from './task/alltask/alltask-list.component';
import {CompletedTaskListComponent} from './task/completedtask/completedtask-list.component';
import {PendingTaskListComponent} from './task/pendingtask/pendingtask-list.component';


@Component({
    selector: 'my-app', 
    template: `

        <div class="flex" align="center">
            <div id="add-task" class="container">
                <form (ngSubmit)="onSubmit(f)" #f="ngForm">
                    <div>
                       <input type="text" ngControl="addTask" [(ngModel)]="addTask" class="textBoxStyle" placeholder="What's on you mind...">
                    </div>
                    <button type="submit" class="submitStyle">Submit</button>
                </form>
            </div>
        </div>
        
        <header class="headerStyle" align="center">
            <nav>
                <a [routerLink]="['AllTasks']" (click)="toggle(1)" [ngClass]="{'activeClass': activeLink === 1}" class="linkStyle">All Task /</a>
                <a [routerLink]="['PendingTask']" (click)="toggle(2)" [ngClass]="{'activeClass': activeLink === 2}" class="linkStyle">Pending Task /</a>
                <a [routerLink]="['CompletedTask']" (click)="toggle(3)" [ngClass]="{'activeClass': activeLink === 3}" class="linkStyle">Completed Task</a>
            </nav>
        </header>
        <div class="taskListStyle" align="center">
            <router-outlet></router-outlet>
        </div>       
    `,
    providers: [ToDoAppService],
    styleUrls: ["../src/css/task-list.css"],
    directives: [AllTaskListComponent, ROUTER_DIRECTIVES]
})

@RouteConfig([
    {path: '/0', name: 'AllTasks', component: AllTaskListComponent, useAsDefault: true},
    {path: '/1', name: 'CompletedTask', component: CompletedTaskListComponent},
    {path: '/2', name: 'PendingTask', component: PendingTaskListComponent}
])

export class AppComponent {
    response: string;
    addTask:string;
    activeLink: number;

    constructor(private _todoappService: ToDoAppService, private _router: Router){}

    toggle(newValue: number) {
    if (this.activeLink === newValue) {
      this.activeLink = 0;
    }
    else {
      this.activeLink = newValue;
    }
  }
    onSubmit(form: ControlGroup){
        
        if(form.value.addTask === null || form.value.addTask.trim() === '')
            return false;
        
        this.addTask = '';
        this._todoappService.addTask(form.value.addTask).subscribe(
            response => this.response = JSON.stringify(response),
            error => console.log(JSON.stringify(error))
        );
        
        this._router.navigate(['CompletedTask']);
        this._router.navigate(['AllTasks']);
    }
} 