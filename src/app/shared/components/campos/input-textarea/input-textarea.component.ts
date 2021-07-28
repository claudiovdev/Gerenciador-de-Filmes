import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'dio-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss']
})
export class InputTextareaComponent implements OnInit {

  @Input() titulo: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  
  constructor(public validacao: ValidarCamposService) { }

  ngOnInit() { }

  get formControl(): AbstractControl{
    return this.formGroup.controls[this.controlName];
  }

}


