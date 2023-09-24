import { Injectable } from "@angular/core";
import {Task} from "../models/Task"

@Injectable({providedIn: 'root'})
export default class TaskService {
    
    
    
    private nextId = -1;

    private TaskList : Task[] = [
        {Id: 1, Title: 'Task 1', Description: 'Task 1 description', DueDate: new Date(2023,9,30), CompletedDate: undefined},
        {Id: 2, Title: 'Task 2', Description: 'Task 2 description', DueDate: new Date(2023,9,30), CompletedDate: new Date(2023,9,8)},
    ];

    private getNextId() : number{

        // how function passed to the sort function works
        // function compareFn(a, b) {
        //     if (a is less than b by some ordering criterion) {
        //       return -1; -> returns [a, b]
        //     } else if (a is greater than b by the ordering criterion) {
        //       return 1; -> returns [b, a;]
        //     }
        //     // a must be equal to b
        //     return 0; -> it does not change array order
        //   }
        if(this.nextId < 0){
            this.TaskList.sort((x, y) => x.Id - y.Id);
            let lastElement = this.TaskList.slice(-1);
            this.nextId =  lastElement.length > 0 ? lastElement[0].Id + 1 : 1;
        } else {
            this.nextId = this.nextId + 1;
        }
        
        return this.nextId;
    }


    public GetTasks() : Task[]{
        return this.TaskList;
    }

    public GetTaskById(id: number) : Task[]{
        return this.TaskList.filter(x => x.Id === id);
    }

    public AddTask(task: Task) : Task{

        task.Id = this.getNextId();
        this.TaskList.push(task);
        return task;
    }

    public UpdateTask(task: Task) : boolean {
        let taskToUpdate = this.TaskList.find(x => x.Id === task.Id);
        if(taskToUpdate){
            taskToUpdate.Title = task.Title;
            taskToUpdate.Description = task.Description;
            taskToUpdate.DueDate = task.DueDate;
            taskToUpdate.CompletedDate = task.CompletedDate;

            return true;
        }

        return false;
    }

    public DeleteTask(taskId: number) : boolean {
        let existTask = this.TaskList.some(x => x.Id === taskId);
        if(existTask) {
            this.TaskList = this.TaskList.filter(x => x.Id !== taskId);
            return true;
        }

        return false;
    }
}