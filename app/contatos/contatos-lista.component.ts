import { Component, OnInit } from '@angular/core';

import { Contato } from './contato.model';
import { ContatoService } from './contato.service';
import { DialogService } from './../dialog.service';


@Component({
    moduleId: module.id,    
    selector: 'contatos-lista',
    templateUrl: 'contatos-lista.component.html',
    styleUrls: ['../app.css']
})

export class ContatosListaComponent implements OnInit{

    contatos: Contato[] = [];
    mensagem: {};
    classesCSS: {};
    private currentTimeout: any;

    constructor(
        private contatoService: ContatoService,
        private dialog: DialogService
    ){}

    ngOnInit(): void
    {
        this.contatoService.findAll().then((contatos: Contato[])=>{
            this.contatos = contatos;

        }).catch(err => {
            console.log('Aconteceu um erro: ',err);
            this.mostrarMensagem({
                tipo: 'danger', 
                texto: 'Ocorreu um erro ao buscar a lista de contatos'
            });
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
                                texto: 'Contato deletado com sucesso!'
                            });

                        }).catch(err =>{
                            console.log(err);
                            this.mostrarMensagem({
                                tipo: 'danger', 
                                texto: 'Ocorreu um erro ao deletar contato'+contato.nome
                            });
                        });
                }
                else{
                }
            })
    }

    private mostrarMensagem(mensagem: {tipo: string, texto: string}): void
    {
        this.mensagem = mensagem;
        this.montarClasses(mensagem.tipo);
        if(mensagem.tipo != 'danger')
        {
            if(this.currentTimeout)
            {
                clearTimeout(this.currentTimeout);
            }else
            {
                this.currentTimeout = setTimeout(()=>{
                this.mensagem = undefined;
                }, 3000);
            }
        }
    }

    private montarClasses(tipo: string): void
    {
        this.classesCSS = {
            alert: true
        }
        this.classesCSS['alert-'+tipo] = true; // alert-tipo
    }
}