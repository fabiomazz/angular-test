import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Comunicato } from '../_models/comunicato';

import { ComunicatoService } from '../_services/index';


@Component({
  selector: 'app-root',
  templateUrl: './comunicato.component.html'
})

export class ComunicatoComponent implements OnInit {

    comunicato:Comunicato;

    ngOnInit() {}


    constructor(
        private comunicatoService: ComunicatoService,
        private router: Router,
        private route: ActivatedRoute 
    ) 
    { 

       route.data.subscribe((value:any) => {
                this.comunicato = value.comunicato.json();
        })
     

    }


    
    getComunicato(id: number): void {
        //console.log("qui" + id);
        this.comunicatoService.getComunicato(id).then(data => {
            this.comunicato = data.json();
        });
    
    }
    
    
}