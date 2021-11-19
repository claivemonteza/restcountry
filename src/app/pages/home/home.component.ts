import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Country } from 'src/app/model/country.model';
import { CountryService } from 'src/app/services/country/country.service';
import { ExporterService } from 'src/app/services/exporter/exporter.service';
import { DetailsComponent } from 'src/app/pages/details/details.component';
import { ThemeService } from 'src/app/services/theme/theme.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  source: Country[] = [];
  dataSource: MatTableDataSource<Country>;
  displayedColumns: string[] = ['name', 'capital', 'population', 'area', 'flag'];
  regionFilter: string;

  constructor(private themeService: ThemeService, private service: CountryService, private exporterService: ExporterService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Country>([]);
  }

  ngOnInit(): void {
    this.service.getAllCountries().subscribe(data => {
      this.source = data;
      this.dataSource.data = data;
    }); 
  }

  /* Open Dialog box */
  openDialog(country) {
    this.dialog.open(DetailsComponent, {
      autoFocus: false,
      panelClass: 'app-dialog',
      width: '60%',
      data: country,
    });
  }

  /* Search*/
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  search(filterValue: string) {
    this.dataSource.data = this.source
      ? this.source.filter((country) =>
        this.regionFilter === 'All' ? this.source : this.regionFilter
          ? country.region.includes(this.regionFilter)
          : country
      )
      : this.source
  }

  filter(filter: string) {
    if(filter === 'All') {
      this.dataSource.data = this.source;
    }else {
      this.dataSource.data = this.source.filter((country) => country.region === filter);
    }
  }

  /* Report */
  exportAsXLSX(): void {
    this.exporterService.exportToExcel(this.source, 'REST_Countries-XLSX');
  }

  exportAsCSV(): void {
    this.exporterService.exportToCSV(this.source, 'REST_Countries-CSV');
  }

  exportAsXML(): void {
    this.exporterService.exportToXML(this.source, 'REST_Countries-XML');
  }

  /* Change theme */
  toogleTheme() {
    this.themeService.toggleMode();
  }

}
