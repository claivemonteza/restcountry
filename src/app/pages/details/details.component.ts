import { Component, OnInit, Inject } from '@angular/core';
import { Country } from 'src/app/model/country.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DetailsComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Country) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close(DetailsComponent);
  }
}
