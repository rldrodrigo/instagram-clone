import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
/* Estado void, é um estado especial, ele é um estado
reservado da biblioteca de animações do angular que faz
com que seja identificado um elemento que ainda não foi
criado na árvore de elementos do DOM
 */
@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(-50px, 0' }),
        animate('500ms 0s ease-in-out') //duração, delay e aceleração
      ])
    ]),
    trigger('animacao-painel', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(50px, 0' }),
        animate('500ms 0s ease-in-out') //duração, delay e aceleração
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  public estadoBanner: string = "criado"
  public estadoPainel: string = "criado"

  public cadastro: boolean = false

  constructor() { }

  ngOnInit() {
  }
  public exibirPainel(event: string): void {
    console.log(event)
    this.cadastro = event === 'cadastro' ? true : false
  }
}
