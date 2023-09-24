import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/shared/models/Task';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  @Output() deleteTaskClicked : EventEmitter<Task> = new EventEmitter<Task>();
  @Output() editTaskClicked : EventEmitter<Task> = new EventEmitter<Task>();
  @Output() completeTaskChanged : EventEmitter<Task> = new EventEmitter<Task>();

  @Input()
  task: Task;
  isClicked: boolean = false;

  onTaskClicked(){
    this.isClicked = true;
  }

  onCompleteTask(event: any) : void{
    console.log(event)
    if(event.target.checked){
      this.task.CompletedDate = new Date();
    } else {
      this.task.CompletedDate = null;
    }

    this.completeTaskChanged.emit(this.task);
  }
  
  onTaskClosed() {
    this.isClicked = false
  }

  onEditTaskClicked(){
    this.editTaskClicked.emit(this.task);
  }

  OnDeleteBtnClick(){
    this.deleteTaskClicked.emit(this.task);
  }
}
