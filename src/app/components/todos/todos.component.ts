import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ITodo } from "src/app/models/todo.model";
import { TodoService } from "src/app/services/todo.service";

import { map, takeUntil, tap } from "rxjs/operators";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.scss"],
})
export class TodosComponent implements OnInit, OnDestroy {
  todos: ITodo[];

  isChecked: boolean;
  todoslist$: Observable<ITodo[]>;
  todoslistID: Observable<number[]>;
  newtask: string;

  newTaskForm = new FormGroup({ newtask: new FormControl() });
  newTask: string;

  protected unsubscribe$ = new Subject<void>();

  constructor(private service: TodoService) {}

  ngOnInit(): void {
    this.isChecked = false;
    this.FetchToList();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private FetchToList() {
    this.todoslist$ = this.service.getTodos().pipe(
      takeUntil(this.unsubscribe$),
      map((todos) => todos as ITodo[])
    );

    this.sort();
  }

  addNewTask() {
    if (this.newTaskForm.controls.newtask.value.trim() !== "") {
      var newTask = this.service.postTodos(
        this.newTaskForm.controls.newtask.value
      );
      this.newTask = "";
      alert("New Task added.");
      this.FetchToList();
    }
  }

  removeTodo(event) {
    var deleted = this.service.deleteTodos(event.target.id);
    alert("Deleted");
    this.FetchToList();
  }

  completedTodo(event) {
    this.service.patchTodos(event.source.id, event.checked);
    alert(event.checked == true ? "Done" : "Not Done");
    this.FetchToList();
  }

  sort() {
    this.todoslist$ = this.todoslist$.pipe(
      map((data) => {
        data.sort((a, b) => {
          return a.status < b.status ? -1 : 1;
        });
        return data;
      })
    );
  }
}
