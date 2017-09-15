"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
const contato_service_1 = require("./contato.service");
const dialog_service_1 = require("./../dialog.service");
let ContatosListaComponent = class ContatosListaComponent {
    constructor(contatoService, dialog) {
        this.contatoService = contatoService;
        this.dialog = dialog;
        this.contatos = [];
    }
    ngOnInit() {
        this.contatoService.findAll().then((contatos) => {
            this.contatos = contatos;
        }).catch(err => {
            console.log('Aconteceu um erro: ', err);
            this.mostrarMensagem({
                tipo: 'danger',
                texto: 'Ocorreu um erro ao buscar a lista de contatos'
            });
        });
    }
    onDelete(contato) {
        this.dialog.confirm('Deseja deletar o contato de ' + contato.nome + '?')
            .then((canDelete) => {
            if (canDelete) {
                this.contatoService
                    .delete(contato)
                    .then(() => {
                    this.contatos = this.contatos.filter((c) => c.id != contato.id);
                    this.mostrarMensagem({
                        tipo: 'success',
                        texto: 'Contato deletado com sucesso!'
                    });
                }).catch(err => {
                    console.log(err);
                    this.mostrarMensagem({
                        tipo: 'danger',
                        texto: 'Ocorreu um erro ao deletar contato' + contato.nome
                    });
                });
            }
            else {
            }
        });
    }
    mostrarMensagem(mensagem) {
        this.mensagem = mensagem;
        this.montarClasses(mensagem.tipo);
        if (mensagem.tipo != 'danger') {
            if (this.currentTimeout) {
                clearTimeout(this.currentTimeout);
            }
            else {
                this.currentTimeout = setTimeout(() => {
                    this.mensagem = undefined;
                }, 3000);
            }
        }
    }
    montarClasses(tipo) {
        this.classesCSS = {
            alert: true
        };
        this.classesCSS['alert-' + tipo] = true; // alert-tipo
    }
};
ContatosListaComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'contatos-lista',
        templateUrl: 'contatos-lista.component.html',
        styleUrls: ['../app.css']
    }),
    __metadata("design:paramtypes", [contato_service_1.ContatoService,
        dialog_service_1.DialogService])
], ContatosListaComponent);
exports.ContatosListaComponent = ContatosListaComponent;
//# sourceMappingURL=contatos-lista.component.js.map