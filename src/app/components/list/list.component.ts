import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['id','name'];
  data : any[] = []
  dataSource  = new MatTableDataSource<any>(this.data);
  pokemons = [];

  @ViewChild(MatPaginator,{static: true }) paginator: MatPaginator;

  constructor(private service : PokemonService, private route: Router) { }

  ngOnInit(): void {
    this.get()
  }

  get(){
    let Data
    
    for (let i = 1; i <= 100; i++) {
      this.service.getAll().subscribe(
        res => {
          console.log(res.results[i].name)
          Data = {
            id: i,
            name: res.results[i].name
          };
          this.data.push(Data);
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getDetails(row){
    this.route.navigateByUrl(`detail/${row.name}`)
  }
}
