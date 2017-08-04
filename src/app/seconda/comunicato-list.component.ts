import { Component, OnInit, Input,EventEmitter, Output } from '@angular/core';
import { Router, Routes, ActivatedRoute, Params} from '@angular/router';
import { Search } from '../_models/search';
import { Comunicato } from '../_models/comunicato';
import { ArgomentoService, ComunicatoService, SyncComService } from '../_services/index';
import { Subscription }   from 'rxjs/Subscription';


@Component({
  selector: '',
  templateUrl: './comunicato-list.component.html'
})




export class ComunicatoListComponent{

    argomenti;
    comunicati = [];
    model = new Search('', '', []);
    subscription: Subscription;


    //@Input() comunicati:Comunicato[];
    @Output() notify: EventEmitter<Search> = new EventEmitter();


ngOnInit() {
    this.route.params.subscribe((params:Params) => {
        //console.log(params);
        let objPar:any = params;
        if(objPar.params != undefined){
            try{

                objPar = JSON.parse(objPar.params);
                //console.log(objPar.params); 
                if((typeof objPar == 'object') && (objPar.com || objPar.q || objPar.arg_id)){

                    //allora cerco di valorizzare la pagina-figlia
                    //console.log(objPar);
                    if(objPar.com != undefined){
                        this.model.com = objPar.com;
                    }

                    if(objPar.q != undefined){
                        this.model.q = objPar.q;
                    }

                    if(objPar.arg_id != undefined){
                        this.model.arg_id = objPar.arg_id;
                    }

                    this.speakToParent();
                    this.getComunicati();

                }

            } catch (e){}
        }
    });
    //this.argomenti = this.getArgomenti();

}


    constructor(
        private comunicatoService: ComunicatoService,
        private argomentoService: ArgomentoService,
        private route: ActivatedRoute,
        private router: Router,
        private r: ActivatedRoute,
        private syncComService: SyncComService,
        //public model: Search,
        //private argomentoService: ArgomentoService,
    ) {}

    onSelect(comunicato: Comunicato) {
        let r = this.router;
        this.router.navigate(['/comunicato', comunicato.id]);
    }


    getComunicati(): void {
        this.notify.emit(this.model);
        //console.log("xxxxxxx");
        //console.log(this.model);
        this.comunicatoService.getList(this.model).then(comunicati => {
            //console.log(comunicati);
            this.comunicati = comunicati;
        });
        
    
    }

    speakToParent(){
        let search = this.model;

         /*
            tramite questo servizio valorizzo una variabile che
            può essere ascoltata e letta da altri component, che utilizzano lo stesso servizio 
            (in questo caso vedi seconda-pagina.component.ts)
        */
        this.syncComService.syncSearch(search);
    }
    
    /*
    updateArgId(){
        let selectedArgIds = [];
        for (let father of this.argomenti) {

            let selectedChildren = father._embedded.argomento.filter((child) => child.checked == true);
            if(selectedChildren.length > 0){
                for (let child of selectedChildren){
                    selectedArgIds.push(child.id);                
                }
            }
            
        }

        //console.log(selectedArgIds);
        this.model.arg_id = selectedArgIds; 
        console.log("chiamata funzione: navigateToComunicati");
    }
    */
}