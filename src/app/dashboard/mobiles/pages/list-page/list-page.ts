import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from "@angular/material/icon";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { Toolbar } from '../../../../components/toolbar/toolbar';
import { MobileBD } from '../../interfaces/mobileBD.interface';
import { MobilServices } from '../../services/mobil.services';
import { PrettyNamePipe } from "../../../../pipes/prettyName.pipe";
import { DefaultValuePipe } from "../../../../pipes/default-value.pipe";
import { NotificationToastServices } from '../../../../services/notification-toast.services';
import { MobileDevice } from '../../interfaces/responsemobile.interface';







@Component({
  selector: 'app-list-page',
  imports: [Toolbar, MatFormFieldModule, MatInputModule, MatTableModule, MatIcon, MatPaginatorModule, MatSortModule, PrettyNamePipe, DefaultValuePipe, ReactiveFormsModule,RouterModule],
  templateUrl: './list-page.html',
  styleUrl: './list-page.css',
})
export class ListPage {

  searchControl = new FormControl('');
  columns: string[] = ['tipo', 'nombre', 'imei1', 'imei2', 'sistema_operativo'];
  displayedColumns = [...this.columns, 'actions'];

  dataSource = new MatTableDataSource<MobileDevice>();
  totalItems: number = 0
  pageSize: number = 5;
  pageIndex: number = 0;



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private mobilServices: MobilServices,
    private notificationToast: NotificationToastServices
  ) { }

  ngAfterViewInit() {
    this.loadMobiles();
    this.paginator.page.subscribe(() => {
      this.pageIndex = this.paginator.pageIndex;
      this.pageSize = this.paginator.pageSize;
      this.loadMobiles();
    });

    // Debounce para el buscador (espera antes de consultar al backend)
    this.searchControl.valueChanges
      .pipe(
        debounceTime(1000),        // espera 1segundo para realizar la busqueda
        distinctUntilChanged()     // evita repetir misma búsqueda
      )
      .subscribe(value => {
        this.pageIndex = 0;       // Reinicia a primera página
        this.loadMobiles(value || '');
      });
    this.dataSource.sort = this.sort;
  }


  loadMobiles(search: string = '') {
    const offset = this.pageIndex * this.pageSize;

    this.mobilServices.getMobileWhitPagination(this.pageSize, offset, search)
      .subscribe(res => {
        this.dataSource.data = res.data;
        this.totalItems = res.total;
      });
  }

  async delete(mobile: MobileBD) {
    console.log(mobile);
    let confirmacion = await this.notificationToast.toastConfirm(mobile.nombre);
    if (!confirmacion) return
    this.mobilServices.deleteMobile(mobile.id).subscribe(res => {
      this.loadMobiles(this.searchControl.value || '');
    });
  }
  edit() {
    throw new Error('Method not implemented.');
  }


}
