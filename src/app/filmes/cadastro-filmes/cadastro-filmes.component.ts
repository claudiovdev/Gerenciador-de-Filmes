import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;

  constructor( public validacao: ValidarCamposService,
    private fb: FormBuilder) { }

  get f(){
    return this.cadastro.controls;
  }

  public ngOnInit(): void {
    this.cadastro = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(256)]],
      urlFoto: ['', [Validators.minLength(10)]],
      dtLancamento: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]]
      /* Aqui nós criamos as as regras onde definimos quais campos seriam obrigatórios */
    });
  }
    salvar(): void {
      this.cadastro.markAllAsTouched();
      if(this.cadastro.invalid){
        return;
      }
      // markAllAsTouched explicação:
      // o markAllAsTouched passa a informação de que todas minhas opções no formulário foram clicadas ou estão sujas

      alert('SUCESSO!! /n/n' + JSON.stringify(this.cadastro.value, null, 4))
    }

    reiniciarForm(): void{
      this.cadastro.reset();
    }
}
