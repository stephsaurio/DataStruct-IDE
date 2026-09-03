import { Injectable } from '@angular/core';
import { parse, ParserError } from '../grammar/language-parser.js';
import { SyntacticError } from '../models/syntactic-error';

@Injectable({
  providedIn: 'root'
})
export class Parser {

  errors: SyntacticError[] = [];

  analyze(sourceCode: string): void {
    this.errors = [];

    try {
      parse(sourceCode);
    } catch (error: unknown) {
      const parserError = error as ParserError;

      this.errors.push({
        message: parserError.message,
        line: parserError.location?.start.line ?? 1,
        column: parserError.location?.start.column ?? 1
      });
    }
  }
}