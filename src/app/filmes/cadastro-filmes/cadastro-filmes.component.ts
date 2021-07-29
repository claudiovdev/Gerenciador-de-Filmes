import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators } from '@angular/forms';
import { FilmesService } from 'src/app/core/filmes.service';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;
  generos: Array<string>;

  constructor( public validacao: ValidarCamposService,
    private fb: FormBuilder,
    private filmeService: FilmesService) { }

  get f(){
    return this.cadastro.controls;
  }

  public ngOnInit(): void {
    this.cadastro = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: ['', [Validators.minLength(10)]],
      dtLancamento: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]]
      /* Aqui nós criamos as as regras onde definimos quais campos seriam obrigatórios */
    });

    this.generos = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifica', 'Comédia', 'Drama'];
  }
    submit(): void {
      this.cadastro.markAllAsTouched();
      if(this.cadastro.invalid){
        return;
        
      }
      // markAllAsTouched explicação:
      // o markAllAsTouched passa a informação de que todas minhas opções no formulário foram clicadas ou estão sujas

      const filme = this.cadastro.getRawValue() as Filme;
      this.salvar(filme);
    }

    reiniciarForm(): void{
      this.cadastro.reset();
    }

    private salvar(filme : Filme): void{
      this.filmeService.salvar(filme).subscribe(()=>{
        alert('Sucesso');
      },
        ()=>{
          alert('Erro ao salvar!!!')
        }
      )
    }
}
