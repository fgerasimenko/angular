import { Component, Input, EventEmitter, OnInit, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Contato } from './contato.model';
import { ContatoService } from './contato.service';


@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html',
    styleUrls: ['../app.css','./contato-busca.css']
})
export class ContatoBuscaComponent implements OnInit, OnChanges {

    @Input() busca: string;
    @Output() buscaChange: EventEmitter<string> = new EventEmitter<string>();
    contatos: Observable<Contato[]>;
    private termosDaBusca: Subject<string> = new Subject<string>();
    
    constructor(
        private contatoService: ContatoService,
        private router: Router
    ) { }

    ngOnInit() : void
    {
        this.contatos = this.termosDaBusca
            .debounceTime(500) // espere 300ms para requisitar ao servidor
            .distinctUntilChanged() // Ignore se a proxima busca for igual ao anterior
            .switchMap(term => term ? this.contatoService.search(term) : Observable.of<Contato[]>([]))
            .catch(err => {
                console.log(err);
                return Observable.of<Contato[]>([]);
            });

            //Era teste, o async fez isso
            // this.contatos.subscribe((contatos: Contato[]) =>{
            //     console.log('retornou do servidor ', contatos);
            // })
    }

    ngOnChanges(changes: SimpleChanges): void {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
        let busca: SimpleChange = changes['busca'];
        this.buscar(busca.currentValue);
    }
 
    buscar(termo: string): void
    {
        if(termo)
            termo = termo.trim();

        this.termosDaBusca.next(termo);
        this.buscaChange.emit(termo);
        
    }

    verDetalhe(contato: Contato) : void
    {
        let link = ['contato/save', contato.id];
        this.router.navigate(link);
        this.buscaChange.emit('');
    }
}