import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Task } from 'src/app/shared/models/Task';
import TaskService from 'src/app/shared/services/TaskService';

@Component({
  selector: 'app-task-form-modal',
  templateUrl: './task-form-modal.component.html',
  styleUrls: ['./task-form-modal.component.css']
})
export class TaskFormModalComponent implements OnChanges{

  constructor(private _taskService : TaskService){

  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['task']){
      this.taskToUpdate = {...this.task};
    }
  }

  
  @Input() task : Task;
  taskToUpdate : Task; 
  @Output() taskChanged : EventEmitter<boolean> = new EventEmitter<boolean>();

  onDueDateChanged(event: any){
    this.taskToUpdate.DueDate = event.target.value;
  }

  onSave():void {
    if(this.taskToUpdate.Id <= 0){
      let taskInserted =  this._taskService.AddTask(this.taskToUpdate);
      if(taskInserted){
        this.taskToUpdate = {...taskInserted};
      }
    } else {
      this._taskService.UpdateTask(this.taskToUpdate);
    }

    this.taskChanged.emit(true);
  }

  onCancel():void {
    this.taskChanged.emit(false);
  }
}
