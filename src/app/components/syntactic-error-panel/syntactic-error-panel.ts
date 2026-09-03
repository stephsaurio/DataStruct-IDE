import { Component, Input } from '@angular/core';
import { SyntacticError } from '../../models/syntactic-error';

@Component({
  selector: 'app-syntactic-error-panel',
  imports: [],
  templateUrl: './syntactic-error-panel.html',
  styleUrl: './syntactic-error-panel.css',
})
export class SyntacticErrorPanel {

  @Input()
  errors: SyntacticError[] = [];
}