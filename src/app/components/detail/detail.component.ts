import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { jsPDF } from 'jspdf';

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

  pdf(name) {
    const doc = new jsPDF();
    
    doc.save(`Pokemon ${name}`);
  }

}
