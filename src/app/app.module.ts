import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TodosComponent } from "./components/todos/todos.component";
import { MatIconModule } from "@angular/material/icon";
import { MaterialModule } from "./modules/materials/materials.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";

@NgModule({
  declarations: [AppComponent, TodosComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [HttpClient, ...environment.providers],
  bootstrap: [AppComponent],
})
export class AppModule {}
