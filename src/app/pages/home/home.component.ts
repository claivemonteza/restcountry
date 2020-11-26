import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Country } from 'src/app/model/country.model';
import { CountryService } from 'src/app/services/country/country.service';
import { ExporterService } from 'src/app/services/exporter/exporter.service';
import { DetailsComponent } from 'src/app/pages/details/details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  option: Country[];
  dataSource: MatTableDataSource<Country>;
  displayedColumns: string[] = ['name', 'capital', 'population', 'area', 'flag'];

  constructor(private service: CountryService, private exporterService: ExporterService, public dialog: MatDialog) { 
    this.option = [];
    this.dataSource = new MatTableDataSource<Country>([]);
  }

  ngOnInit(): void {
    this.service.getCountriesWithSelectFields().subscribe(data => {
      this.option = data;
      this.dataSource.data = data as Country[];
    });
  }

  openDialog(country) {
    this.dialog.open(DetailsComponent, {
      autoFocus: false,
      panelClass: 'app-dialog',
      width: '60%',
      data: country,
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exportAsXLSX(): void {
    //console.log(this.option);
    this.exporterService.exportToExcel(this.option, 'REST_Countries-XLSX');
  }

  exportAsCSV(): void {
   // console.log(this.option);
    this.exporterService.exportToCSV(this.option, 'REST_Countries-CSV');
  }

  exportAsXML(): void {
    //console.log(this.option);
    this.exporterService.exportToXML(this.option, 'REST_Countries-XML');
  }

}
