import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Toolbar } from '../../../../components/toolbar/toolbar';
import { MatIcon } from "@angular/material/icon";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MobileBD } from '../../interfaces/mobileBD.interface';
import { MobilServices } from '../../services/mobil.services';
import { PrettyNamePipe } from "../../../../pipes/prettyName.pipe";
import { DefaultValuePipe } from "../../../../pipes/default-value.pipe";



@Component({
  selector: 'app-list-page',
  imports: [Toolbar, MatFormFieldModule, MatInputModule, MatTableModule, MatIcon, MatPaginatorModule, MatSortModule, PrettyNamePipe, DefaultValuePipe],
  templateUrl: './list-page.html',
  styleUrl: './list-page.css',
})
export class ListPage {



  columns: string[] = ['tipo', 'nombre', 'imei1', 'imei2', 'sistema_operativo',];
  displayedColumns = [...this.columns, 'actions'];

  dataSource = new MatTableDataSource<MobileBD>();
  totalItems: number = 0
  pageSize: number = 10;
  pageIndex: number = 0;



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private mobilServices: MobilServices
  ) { }

  ngAfterViewInit() {
    this.loadMobiles();
    this.paginator.page.subscribe(() => {
      this.pageIndex = this.paginator.pageIndex;
      this.pageSize = this.paginator.pageSize;
      this.loadMobiles();
    });
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadMobiles() {
    const offset = this.pageIndex * this.pageSize;

    this.mobilServices.getMobile(this.pageSize, offset).subscribe(res => {
      this.dataSource.data = res.data;     // los mobiles
      this.totalItems = res.total;         // total general de BD
    });
  }
  accionDeFila(_t43: any) {
    throw new Error('Method not implemented.');
  }




}
