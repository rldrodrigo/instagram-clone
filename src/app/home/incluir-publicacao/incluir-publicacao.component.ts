import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as firebase from 'firebase';

import { Bd } from 'src/app/bd.service';
import { Progresso } from 'src/app/progresso.service';

import { interval, Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import 'rxjs'

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>()

  public email: string = ''
  private imagem: any

  public progressoPublicacao: string = 'pendente'
  public porcentagemUpload: number = 0

  public formulario: FormGroup = new FormGroup(
    {
      'titulo': new FormControl(null)
    }
  )

  constructor(
    private bd: Bd,
    private progresso: Progresso
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.email != null)
        this.email = user.email
    })
  }

  public publicar(): void {
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    })

    let acompanhamentoUpload = interval(1000)

    let continua = new Subject()

    continua.next(true)

    acompanhamentoUpload
      .pipe(takeUntil(continua))
      .subscribe(() => {
        this.progressoPublicacao = 'andamento'
        this.porcentagemUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes) * 100)

        if (this.progresso.status === 'concluido') {
          this.progressoPublicacao = 'concluido'
          //Emitir um evento do component parent (home)
          this.atualizarTimeLine.emit()
          continua.next(false)
        }
      })
  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files
  }

}
