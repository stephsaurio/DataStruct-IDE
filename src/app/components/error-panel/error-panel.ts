import { Component, Input } from '@angular/core';
import { LexicalError } from '../../models/lexical-error';

@Component({
  selector: 'app-error-panel',
  imports: [],
  templateUrl: './error-panel.html',
  styleUrl: './error-panel.css',
})
export class ErrorPanel {

  @Input() errors: LexicalError[] = [];

}