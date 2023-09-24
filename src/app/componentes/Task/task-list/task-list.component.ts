import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/models/Task';
import TaskService from 'src/app/shared/services/TaskService';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{

  constructor(private _taskService : TaskService){

  }

  todoTaskList : Task[] = [];
  doneTaskList : Task[] = [];
  taskGroups = [{name: 'ToDo', value: this.todoTaskList}, {name: 'Done', value: this.doneTaskList}]

  selectedTask : Task | null;
  formVisible: boolean = false;
  modalVisible: boolean = false;

  ngOnInit() : void {
    this.load();
  }

  private load(): void {
    this.todoTaskList.length = 0;
    this.doneTaskList.length = 0;
    
    let tasks = this._taskService.GetTasks();
    tasks.forEach(x => {
      x.CompletedDate ? this.doneTaskList.push(x) : this.todoTaskList.push(x);
    });
  }

  onEditTaskClicked(target : Task) {
    this.selectedTask = target;
    this.formVisible = true;
  }
  
  onCompletedTaskChanged(target: Task) {
    this._taskService.UpdateTask(target);
    this.load();
  }

  onFormButtonClicked(target: boolean){
    if(target){
      this.load();
    } else {
      this.reset();
    }
  }

  onDeleteTaskClicked(target: Task){
    this.modalVisible = true;
    this.selectedTask = target;
  }

  onModalConfirmation(target: boolean) {
    if(target && this.selectedTask) {
      if(this._taskService.DeleteTask(this.selectedTask.Id)){
        this.reset();
        this.load();
      } else {
        console.log(`Error deleting task id: ${target}`)
      }
    } else {
      this.reset();
    }
  }

  onAddClicked(){
    this.formVisible = true;
    this.selectedTask = {'Id': 0, 'Title': '', 'Description': '', 'DueDate': new Date()};
  }

  reset(){
    this.formVisible = false;
    this.modalVisible = false;
    this.selectedTask = null;
  }
}
