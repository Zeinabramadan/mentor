import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public user = {};
  public users;
  public addSaveBtn;
  public userData = {};
  public header;
  public editMode;
  public disabled = false;
  public openAddModal = false;
  public accountTypes = ['admin', 'user'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['id', 'name', 'email', 'accountType', 'controls'];
  constructor(
    private usersService: UsersService,
    private serviceTitle: Title,
    private snackBar: MatSnackBar
  ) {}

  getUsers() {
    this.usersService.getAllUsers().subscribe(response => {
      if (!response) {
        return;
      }
      this.users = new MatTableDataSource(response['records']);
      this.users.paginator = this.paginator;
    });
  }
  ngOnInit() {
    this.serviceTitle.setTitle('Manage users');
    this.getUsers();
  }

  /**
   * edit user function
   * @param id number
   */
  editUser(userId, user) {
    this.usersService.editUser(userId, user).subscribe(
      response => {
        if (response['success']) {
          this.snackBar.open('User updated successfully', user.name, {
            duration: 2000
          });
          this.closeModal();
        }
      },
      error => {
        this.disabled = false;
        console.log(error);
      }
    );
  }

  addUser() {
    this.usersService.addNewUser(this.userData).subscribe(
      response => {
        if (response['success']) {
          this.snackBar.open('User added successfully', '', {
            duration: 2000
          });
          this.closeModal();
          this.getUsers();
        }
      },
      error => {
        this.disabled = false;
        console.log(error);
      }
    );
  }

  deleteUser(user) {
    if (confirm(`Delete ${user.name}`)) {
      this.usersService.deleteUser(user).subscribe(
        response => {
          this.snackBar.open('User deleted successfully', user.name, {
            duration: 2000
          });
          this.getUsers();
        },
        error => {
          console.log(error.message);
        }
      );
    }
  }

  submit(f) {
    this.disabled = true;
    if (this.editMode) {
      this.editUser(this.userData['id'], f);
    } else {
      this.addUser();
    }
  }

  closeModal() {
    this.openAddModal = false;
  }
  executeOnClose() {
    this.closeModal();
  }
}
