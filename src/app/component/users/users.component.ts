import {
  Component,
  OnInit,
  ViewChild,
  Pipe,
  PipeTransform
} from '@angular/core';
import { MatSort, MatSortable, MatTableDataSource } from '@angular/material';
import { UsersService } from '../../../app/service/users.service';

// tslint:disable-next-line:use-pipe-transform-interface
@Pipe({
  name: 'filter'
})
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, PipeTransform {
  filter = [];
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }

    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      console.log(items);
      items = this.filter;
      return it.includes(searchText);
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  dataSource;

  showColumns = ['name', 'username', 'email'];

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(results => {
      if (!results) {
        return;
      }
      this.filter = results;
      this.dataSource = new MatTableDataSource(results);
      this.dataSource.sort = this.sort;
    });
  }

  ngOnFilter(newValue) {
    this.userService.getUsers().subscribe(results => {
      if (!results) {
        return;
      }
      if (newValue != null) {
        this.dataSource = new MatTableDataSource(
          this.filter.filter(
            a => a.email.toLowerCase() === newValue || a.email === newValue
          )
        );
        this.dataSource.sort = this.sort;
      }
      if (newValue === '') {
        this.dataSource = new MatTableDataSource(results);
        this.dataSource.sort = this.sort;
      }
    });
  }
}
