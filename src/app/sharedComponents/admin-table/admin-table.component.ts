import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss']
})
export class AdminTableComponent implements OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = [];

  @Input() cols;
  @Input() data;
  public tableData: [];
  constructor() {}

  async ngOnChanges(changes: SimpleChanges) {
    this.displayedColumns = this.cols;
    this.tableData = this.data;
    this.data.paginator = await this.paginator;
  }
}
