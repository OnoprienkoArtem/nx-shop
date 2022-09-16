import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService, User } from '@bluebits/users';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,  
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  deleteUser(user: User): void {
    this.confirmationService.confirm({
      message: `Do you want to delete this '${user.name}' user?`,
      header: `Delete '${user.name}' user`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(user.id).subscribe({
          next: () => {
            this.fetchUsers();
            this.messageService.add({severity: 'success', summary: 'Success', detail: `User ${user.name} is deleted`});
          },
          error: () => this.messageService.add({severity: 'success', summary: 'Success', detail: 'User is not deleted'})
        });
      },      
    });
  }

  updateUser(userId: string): void {
    this.router.navigateByUrl(`users/form/${userId}`);
  }

  getCountryName(countryKey: string): undefined | string {
    if (countryKey) {
      return this.usersService.getCountry(countryKey);
    }
  }

  private fetchUsers(): void {
    this.usersService.getUsers().subscribe(users => this.users = users);
  }
}
