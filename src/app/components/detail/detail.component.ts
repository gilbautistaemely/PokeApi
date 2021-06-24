import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  pokemon: any = ''
  Type = []
  Img = ''

  constructor(private services: PokemonService, private activate: ActivatedRoute) {
    this.activate.params.subscribe(
      params => {
        this.getDetails(params['id']);
      }
    )
  }

  ngOnInit(): void {
  }

  getDetails(id) {
    this.services.getPokemon(id).subscribe(
      res => {
        this.pokemon = res
        this.Img = this.pokemon.sprites.front_default;
        this.Type = res.types[0].type.name;
      },
      err => { }
    )
  }

  pdf(name, height, weight, imagen, id,tipo) {
     name = name.toUpperCase()
    var doc = new jsPDF("p", "mm", "a4");
    doc.setFont("Times-Roman","bold");
    doc.setFontSize(40);
    doc.text(`${name}`,70, 40,)
    doc.setFontSize(20);
    doc.text(`Características de ${name}`,50, 160)
    doc.text(`Tipo de Pokemon: ${tipo}`,60, 180)
    doc.text(`Altura: ${height}`,60, 190)
    doc.text(`Ancho: ${weight}`,60, 200)
    doc.addImage(imagen, 'JPEG', 55, 50, 100, 100);

    doc.addImage(imagen, 'JPEG', 15, 30, 15, 15);
    doc.addImage(imagen, 'JPEG', 180, 30, 15, 15);
    doc.addImage(imagen, 'JPEG', 15, 200, 15, 15);
    doc.addImage(imagen, 'JPEG', 180, 200, 15, 15);

    doc.save(`Pokemon ${name}`);
  }

}
