import { Component, OnInit } from '@angular/core';

import { Contato } from './contato.model';
import { ContatoService } from './contato.service';
import { DialogService } from './../dialog.service';


@Component({
    moduleId: module.id,    
    selector: 'contatos-lista',
    templateUrl: 'contatos-lista.component.html',
})

export class ContatosListaComponent implements OnInit{

    contatos: Contato[];
    mensagem: {};
    classesCSS: {};
    constructor(
        private contatoService: ContatoService,
        private dialog: DialogService
    ){}

    ngOnInit(): void
    {
        this.contatoService.getContatos().then((contatos: Contato[])=>{
            this.contatos = contatos;

        }).catch(err => {
            console.log('Aconteceu um erro: ',err);
        });
    }

    onDelete(contato: Contato): void 
    {

        this.dialog.confirm('Deseja deletar o contato de '+ contato.nome +'?')
            .then((canDelete: boolean) => {
                if(canDelete){
                    this.contatoService
                        .delete(contato)
                        .then(() => {
                            this.contatos = this.contatos.filter((c: Contato) => c.id != contato.id);
                            this.mostrarMensagem({
                                tipo: 'success', 
                                mensagem: 'Contato deletado com sucesso!'
                            });

                        }).catch(err =>{
                            console.log(err);
                        });
                }
                else{
                }
            })
    }

    private mostrarMensagem(mensagem: {tipo: string, mensagem: string}): void
    {
        this.mensagem = mensagem;
        this.montarClasses(mensagem.tipo);
        setTimeout(()=>{
            this.mensagem = undefined;
        }, 3000);
    }

    private montarClasses(tipo: string): void
    {
        this.classesCSS = {
            alert: true
        }
        this.classesCSS['alert-'+tipo] = true; // alert-tipo
    }
}