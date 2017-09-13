import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContatosListaComponent } from './contatos-lista.component';
import { ContatoRoutingModule } from './contato-routing.module';
import { ContatoDetalheComponent } from './contato-detalhe.component';


@NgModule({
    imports: [
        CommonModule,
        ContatoRoutingModule
        
    ], 
    declarations:[
        ContatosListaComponent,
        ContatoDetalheComponent
    ],
    exports: [
        ContatosListaComponent
    ]
})

export class ContatosModule{}
