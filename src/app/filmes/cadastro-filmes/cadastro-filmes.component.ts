import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  id: number;
  cadastro: FormGroup;
  generos: Array<string>;

  constructor( 
    public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private filmeService: FilmesService,
    private router: Router,
    private activateRoute: ActivatedRoute
    ) { }

  get f(){
    return this.cadastro.controls;
  }

  public ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
    if(this.id){
      this.filmeService.visualizar(this.id).subscribe((filme: Filme)=> this.criarFormulario(filme));
    }else{
      this.criarFormulario(this.criarFilmeEmBranco());
    }

  

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
      if(this.id){
        filme.id = this.id;
        this.editar(filme)
      }else{
      this.salvar(filme);
      }
    }

    reiniciarForm(): void{
      this.cadastro.reset();
    }

    private criarFormulario(filme: Filme): void{
      this.cadastro = this.fb.group({
        titulo: [filme.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
        urlFoto: [filme.urlFoto, [Validators.minLength(10)]],
        dtLancamento: [filme.dtLancamento, [Validators.required]],
        descricao: [filme.descricao, [Validators.required]],
        nota: [filme.nota, [Validators.required, Validators.min(0), Validators.max(10)]],
        urlIMDb: [filme.urlIMDb, [Validators.minLength(10)]],
        genero: [filme.genero, [Validators.required]]
        /* Aqui nós criamos as as regras onde definimos quais campos seriam obrigatórios */
      });
    }
    private criarFilmeEmBranco(): Filme{
      return {
        id: null,
        titulo: null,
        dtLancamento: null,
        urlFoto: null,
        descricao: null,
        nota: null,
        urlIMDb: null,
        genero: null,
      }as Filme;
    }

    private salvar(filme : Filme): void{
      this.filmeService.salvar(filme).subscribe(()=>{
        const config = {
          data: {
            btnSucesso: 'Ir para a listagem',
            btnCancelar: 'Cadastrar um novo filme',
            corBtnCancelar: 'primary',
            possuirBtnFechar: true
          } as Alerta
        };

        const dialogRef = this.dialog.open(AlertaComponent, config)
        dialogRef.afterClosed().subscribe((opcao: boolean) =>{
          if(opcao){
            this.router.navigateByUrl('filmes');
          } else{
            this.reiniciarForm()
          }
        });
      },
        ()=>{
          const config = {
            data: {
              titulo: 'Erro ao salvar o registro',
              descricao: 'Não conseguimos salvar seu registron tentar novamente mais tarde!',
              corBtnSucesso: 'warn',
              btnSucesso: 'Fechar',
              
            } as Alerta
          };
          this.dialog.open(AlertaComponent, config);
        });
    }

    private editar(filme : Filme): void{
      this.filmeService.editar(filme).subscribe(()=>{
        const config = {
          data: {
            descricao: 'Seu regristro foi atualizado com sucesso!',
            btnSucesso: 'Ir para a listagem',
          } as Alerta
        };

        const dialogRef = this.dialog.open(AlertaComponent, config)
        dialogRef.afterClosed().subscribe(() =>{
          this.router.navigateByUrl('filmes')
        });
      },
        ()=>{
          const config = {
            data: {
              titulo: 'Erro ao salvar o registro',
              descricao: 'Não conseguimos salvar seu registron tentar novamente mais tarde!',
              corBtnSucesso: 'warn',
              btnSucesso: 'Fechar',
              
            } as Alerta
          };
          this.dialog.open(AlertaComponent, config);
        });
    }
}
