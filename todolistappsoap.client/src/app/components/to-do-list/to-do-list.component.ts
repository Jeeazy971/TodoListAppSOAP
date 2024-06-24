import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToDoItem } from '../../models/todo-item.model';
import { SoapService } from '../../services/soap.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  toDoItems: ToDoItem[] = [];

  constructor(private soapService: SoapService, private router: Router) { }

  ngOnInit(): void {
    this.loadToDoItems();
  }

  loadToDoItems(): void {
    this.soapService.getToDoItems().subscribe(items => {
      this.toDoItems = items;
    });
  }

  editToDoItem(id: number): void {
    this.router.navigate(['/edit-todo', id]);
  }

  addToDoItem(): void {
    this.router.navigate(['/add-todo']);
  }

  deleteToDoItem(id: number): void {
    this.soapService.deleteToDoItem(id).subscribe(() => {
      this.loadToDoItems();
    });
  }
}
