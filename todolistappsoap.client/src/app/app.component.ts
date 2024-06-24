import { Component, OnInit } from '@angular/core';
import { ToDoItem } from './models/todo-item.model';
import { SoapService } from './services/soap.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public toDoItems: ToDoItem[] = [];

  constructor(private soapService: SoapService) { }

  ngOnInit() {
    this.getToDoItems();
  }

  getToDoItems() {
    this.soapService.getToDoItems().subscribe(
      (result) => {
        this.toDoItems = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'todolistappsoap.client';
}
