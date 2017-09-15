import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Contato } from './contato.model';
import { ContatoService } from './contato.service';


@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html',
    styleUrls: ['./contato-busca.css']
})
export class ContatoBuscaComponent implements OnInit {

    contatos: Observable<Contato[]>;
    private termosDaBusca: Subject<string> = new Subject<string>();

    constructor(
        private contatoService: ContatoService
    ) { }

    ngOnInit() : void
    {
        this.contatos = this.termosDaBusca
            .debounceTime(500) // espere 300ms para requisitar ao servidor
            .distinctUntilChanged() // Ignore se a proxima busca for igual ao anterior
            .switchMap(term => {
                console.log('Fez a busca', term);
                return term ? this.contatoService.search(term) : Observable.of<Contato[]>([]);
            }).catch(err => {
                console.log(err);
                return Observable.of<Contato[]>([]);
            });
            // this.contatos.subscribe((contatos: Contato[]) =>{
            //     console.log('retornou do servidor ', contatos);
            // })
    }

    buscar(termo: string): void
    {
        this.termosDaBusca.next(termo.trim());
    }
}