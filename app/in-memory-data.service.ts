import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Contato } from './contatos/contato.model';

export class InMemoryDataService implements InMemoryDbService{
    createDb(): {}
    {
        let contatos: Contato[] = [
            {
                id:1, 
                nome: 'Fulano de tal', 
                email: 'fulano@email.com', 
                telefone: '(11) 90000-0000'
            },
            {
                id:2, 
                nome: 'Fabio Gerasimenko', 
                email: 'fgerasimenko@hotmail.com', 
                telefone: '(11) 98388-1762'
            },
            {
                id:3, 
                nome: 'Pedro Henrique Santos Silva', 
                email: 'seila@hotmail.com', 
                telefone: '(11) 98672-6217'
            },
            {
                id:4, 
                nome: 'João Victor Santos Silva', 
                email: 'jao@bol.com', 
                telefone: '(11) 98111-1111'
            },
            {
                id:5, 
                nome: 'Alexssander Soares Sawicki', 
                email: 'alexsssapdjeifjos@hotmail.com', 
                telefone: '(11) 98222-2222'
            },
            {
                id:6, 
                nome: 'Stefan Soares Sawicki', 
                email: 'stefan@gob.com', 
                telefone: '(11) 98333-3333'
            }
        ];

        return {contatos};
    }
}