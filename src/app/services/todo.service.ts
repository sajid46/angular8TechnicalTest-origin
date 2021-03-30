import { ITodo } from "src/app/models/todo.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  baseUrl: string;
  ITodo: any;
  Url: string;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:3000/";
  }

  getTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(`${this.baseUrl}tasks`);
  }

  deleteTodos(id: string): ITodo {
    try {
      this.http.delete(`${this.baseUrl}tasks/${id}`).subscribe((todos) => {
        return todos;
      });
    } catch (error) {
      return error.message;
    }
  }

  patchTodos(id: string, checked: boolean) {
    try {
      this.http
        .patch(`${this.baseUrl}tasks/${id}`, { id: id, status: checked })
        .subscribe((todos) => {
          return todos;
        });
    } catch (error) {
      return error.message;
    }
  }

  postTodos(task: string): ITodo {
    try {
      this.http
        .post(`${this.baseUrl}tasks`, {
          tasks: task,
          dateAdded: new Date(),
          status: false,
        })
        .subscribe((todos) => {
          return todos;
        });
    } catch (error) {
      return null;
    }
  }

  // patchTodos(id: number): string {
  //   // try {
  //   //   this.http.patch(`${this.baseUrl}patch/${id}`);
  //   //   return "deleted";
  //   // } catch (error) {
  //   //   return error.message;
  //   // }
  // }

  // postTodos() {
  //   this.http
  //     .post(`${this.baseUrl}post`, {
  //       id: 1,
  //       description: "Homework",
  //       dateAdded: "25/03/2021",
  //       status: "false",
  //     })
  //     .toPromise()
  //     .then((dat: any) => {
  //       console.log(dat);
  //     });
  // }
}
