import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Task } from "../models/Task";


//Not used. It's just an example of how to use observables to share data between components using injectable services.

@Injectable({providedIn: 'root'})
export class TaskSharedDataService {

    private subject = new Subject<Task>();

    sendMessage(task: Task) {
        this.subject.next(task);
    }
 
    getMessage(): Observable<Task> {
        return this.subject.asObservable();
    }
}