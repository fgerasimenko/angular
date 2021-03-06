import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

import { ServiceInterface } from './../interfaces/service.interface';

import { Contato } from './contato.model';
import { CONTATOS } from './contatos-mock';

@Injectable()

export class ContatoService implements ServiceInterface<Contato>
{
    private apiUrl: string ='app/contatos';
    private headers: Headers = new Headers({'Content-Type': 'application/json'});
    //private contatosUrl:
    constructor(
        private http: Http
    ){}

    findAll(): Promise<Contato[]>
    {
        return this.http.get(this.apiUrl)
            .toPromise()
            .then(response => response.json().data as Contato[])
            .catch(this.handleError);
    }

    find(id: number): Promise<Contato>
    {
        return this.findAll()
                .then((contatos: Contato[]) => contatos.find(contato => contato.id === id));
    } 

    create(contato: Contato): Promise<Contato>
    {
        return this.http
            .post(this.apiUrl, JSON.stringify(contato), {headers: this.headers})
            .toPromise()
            .then((response: Response) => response.json().data as Contato)
            .catch(this.handleError);
    }

    update(contato: Contato): Promise<Contato>
    {
        const url = `${this.apiUrl}/${contato.id}` // app/contatos/:id
        return this.http
            .put(url, JSON.stringify(contato), {headers: this.headers})
            .toPromise()
            .then(() => contato as Contato)
            .catch(this.handleError);
    }

    delete(contato: Contato): Promise<Contato>
    {
        const url = `${this.apiUrl}/${contato.id}` // app/contatos/:id
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => contato as Contato)
            .catch(this.handleError);
    }

    private handleError(err: any): Promise<any>
    {
        console.log('Error:', err);
        return Promise.reject(err.message || err);
    }

    search(term: string): Observable<Contato[]>
    {
        return this.http
            .get(`${this.apiUrl}/?nome=${term}`)
            .map((res: Response) => res.json().data as Contato[]);
    }
//SIMULANDO CONEXÃO LENTA E CHAMADA DE PROMISES ENCADEADAS
/*
    getContatosSlowly(): Promise<Contato[]>{
        return new Promise((resolve, reject)=> {
            setTimeout(resolve,6000);
        })
        .then(() => {
            console.log('Primeiro then!');
            return 'Curso Angular 2';
        })
        .then((param: string)=> {
            console.log('Segundo Then!');
            console.log(param);

            return new Promise((resolve1,reject1) => {
                setTimeout(()=> 
                {
                    console.log('Após 4 segundos...');
                    resolve1();      
                }, 4000);
            });
        })
        .then(()=> {
            console.log('Terceiro Then!');
            return this.getContatos();
        });
    }
*/
}