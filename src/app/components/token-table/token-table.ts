import { Component, Input } from '@angular/core';
import { Token } from '../../models/token';

@Component({
  selector: 'app-token-table',
  imports: [],
  templateUrl: './token-table.html',
  styleUrl: './token-table.css',
})
export class TokenTable {

  @Input() tokens: Token[] = [];

}