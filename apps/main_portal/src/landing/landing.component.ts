import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, ButtonModule, TableModule, TagModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements OnInit {

  cols: any[] = [
    { field: 'name', header: 'Name' },
    { field: 'status', header: 'Status' },
    { field: 'address', header: 'City', subfield: 'city' },
    { field: 'address', header: 'Pin Code', subfield: 'pincode' },
    { field: 'sensor_count', header: 'Total Sensor' },
    { field: 'actions', header: 'Action' }
  ];

  accounts: any[] = [];

  constructor(private accountService: AccountService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(data=>{
      this.accounts = data;
    })
  }

  editAccount(account: any) {
    console.log('Edit account:', account);
  }

  onNewAccount() {
    this.router.navigate(['create-account'], {relativeTo: this.route});
  }

}
