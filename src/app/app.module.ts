import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TaskCardComponent } from './componentes/Task/task-card/task-card.component';
import { TaskListComponent } from './componentes/Task/task-list/task-list.component';
import { TaskFormModalComponent } from './componentes/Task/task-form-modal/task-form-modal.component';
import { FormsModule } from '@angular/forms';
import { ConfirmModalComponent } from './componentes/shared/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskCardComponent,
    TaskListComponent,
    TaskFormModalComponent,
    ConfirmModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
