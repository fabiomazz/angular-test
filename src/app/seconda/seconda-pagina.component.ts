import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArgomentoService, SyncComService } from '../_services/index';
import { Argomento } from '../_models/index';
import { Comunicato } from '../_models/comunicato';
import { Search } from '../_models/search';
import { ComunicatoListComponent } from '../seconda/comunicato-list.component';
import { Router,ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './seconda-pagina.component.html',
  styleUrls: ['../app.component.css'],
  //directives: [ComunicatoListComponent]
})
export class SecondaPaginaComponent implements OnDestroy{
  title = 'Seconda pagina export';
  argomenti;
  argomento;
  comunicati = [];
  model = new Search('', '', []);

  /*
  notify(model:Search):void {
    console.log('ricevo la notifica');
    this.model = model;
  }
  */

ngOnInit() {}


  constructor(
        //private params: Params,
        private route: ActivatedRoute,
        private router: Router,
        private argomentoService: ArgomentoService,
        private syncComService: SyncComService
        ) { 
            
            console.log(route.data);
            //console.log(params);
            route.data.subscribe((value:any) => {
                this.argomenti = this.normalizeArgomenti(value.argomenti);
            });


            /*
            
                

            */
            syncComService.search.subscribe(params => {
                console.log(params);
                this.model = params;
                this.checkArg(params.arg_id);
            });


        }


    ngOnDestroy() {
        // prevent memory leak when component destroyed
        //this.syncComService.search.unsubscribe();
    }


   onClickMe():void{
       alert('click');
   }     

   /*
   onChange(params):void{
       this.getComunicati(params);
   };
   */

   /*
    getComunicati(): void {
        this.updateArgId();
        this.comunicatoService.getList(this.model).then(comunicati => this.comunicati = comunicati);
        
    
    }
    */
    navigateToComunicati(params: number){
        
        this.updateArgId();
      
        this.router.navigate(['/seconda-pagina', JSON.stringify(this.model)]);


    }

    getArgomento(id: number): void {
        this.argomentoService.getArgomento(id).then(argomento => this.argomento = argomento);
    }

    getArgomenti(): void {
        this.argomentoService.getList().then(argomenti => this.argomenti = argomenti);
    }

    normalizeArgomenti(argomenti:any[]){
        //devo filtrare i padri e ordinarli alfabeticamente ....
        //var father = $filter('filter')(argomenti, {parent_id:null});
        let father =  argomenti.filter((arg) => arg.parent_id == null);
        
        //devo riorganizzare i figli ....
        for (let argomento of father) {
            let figli = argomenti.filter((arg) => arg.parent_id == argomento.id);

            argomento.open = false;
            argomento.childrenIds = [];
            argomento.selection = '';

            //preparo un array per ogni padre con gli ids dei figli ... tornerà comodo
            for (let f of figli){
                f.checked = false;
                f.argomento = f.argomento.replace('/', ' / ');
                argomento.childrenIds.push(f.id);
                
            }

            argomento._embedded = {argomento:figli};

        }

        return father;

    }

    /**
     * params: ids Array di id argomento
     * desc: aggiorna il modello in modo da gestire l'apertura dei padri, il flag dei padri
     *  e gli elementi selezionati
     */
    checkArg(ids){
        let selectedArgIds = [];
        for (let father of this.argomenti) {
            father.open = false;
            let totChildren = father._embedded.argomento.length;
            let selectedChildren = 0;
            father.selection = ''; 
            for (let c of father._embedded.argomento){
                c.checked = false;
                if(ids.indexOf(c.id) >= 0){
                    selectedChildren++;
                    father.open = true;
                    c.checked = true;    
                }

                if(selectedChildren > 0){
                    father.selection = 'par';
                }

                if(totChildren == selectedChildren){
                    father.selection = 'all';
                }

            }
        }
    }
    
    /**
     * elabora il modello modificato nella vista e carica l'array degli id degli argomenti selezionati
     */
    updateArgId():void{
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
        //console.log("chiamata funzione: navigateToComunicati");
    }


}