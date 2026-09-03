import { Injectable } from '@angular/core';
import { Token } from '../models/token';
import { LexicalError } from '../models/lexical-error';
import { reservedWords } from '../utils/reserved-words';

@Injectable({
  providedIn: 'root',
})
export class Lexer {
  tokens: Token[] = [];
  errors: LexicalError[] = [];

  private isLetter(char: string): boolean {
    return /[a-zA-Z_]/.test(char);
  }

  private isLetterOrDigit(char: string): boolean {
    return /[a-zA-Z0-9_]/.test(char);
  }

  private isDigit(char: string): boolean {
    return /[0-9]/.test(char);
  }

  private isOperator(char: string): boolean {
    return ['=', ',', ';', '(', ')'].includes(char);
  }

  analyze(sourceCode: string): void {
    this.tokens = [];
    this.errors = [];

    let index = 0;
    let line = 1;
    let column = 1;

    while (index < sourceCode.length) {
      const currentChar = sourceCode[index];

      //ignora spaces and tabs
      if (currentChar === ' ' || currentChar === '\t') {
        index++;
        column++;
        continue;
      }

      //line breaks
      if (currentChar === '\n') {
        index++;
        line++;
        column = 1;
        continue;
      }

      //reserved words and identificadores
      if (this.isLetter(currentChar)) {
        const startColumn = column;
        let lexeme = '';

        while (index < sourceCode.length && this.isLetterOrDigit(sourceCode[index])) {
          lexeme += sourceCode[index];
          index++;
          column++;
        }

        const tokenType = reservedWords.includes(lexeme) ? lexeme : 'ID';

        this.tokens.push({
          type: tokenType,
          lexeme: lexeme,
          line: line,
          column: startColumn,
        });

        continue;
      }
      //numerical literals
      if (this.isDigit(currentChar)) {
        const startColumn = column;
        let lexeme = '';

        while (index < sourceCode.length && this.isDigit(sourceCode[index])) {
          lexeme += sourceCode[index];
          index++;
          column++;
        }

        this.tokens.push({
          type: 'NUMERO',
          lexeme: lexeme,
          line: line,
          column: startColumn,
        });

        continue;
      }
      //operators
      if (this.isOperator(currentChar)) {
        this.tokens.push({
          type: currentChar,
          lexeme: currentChar,
          line: line,
          column: column,
        });

        index++;
        column++;

        continue;
      }

      //string literals
      // Recognize string literals
      if (currentChar === '"') {
        const startColumn = column;
        const startLine = line;
        let lexeme = '"';

        index++;
        column++;

        while (
          index < sourceCode.length &&
          sourceCode[index] !== '"' &&
          sourceCode[index] !== '\n'
        ) {
          lexeme += sourceCode[index];
          index++;
          column++;
        }

        // Valid string
        if (index < sourceCode.length && sourceCode[index] === '"') {
          lexeme += '"';

          index++;
          column++;

          this.tokens.push({
            type: 'CADENA',
            lexeme: lexeme,
            line: startLine,
            column: startColumn,
          });
        } else {
          // Unclosed string
          this.errors.push({
            message: 'Unclosed string',
            line: startLine,
            column: startColumn,
          });
        }

        continue;
      }
      //single line comments
      if (currentChar === '/' && sourceCode[index + 1] === '/') {
        index += 2;
        column += 2;

        while (index < sourceCode.length && sourceCode[index] !== '\n') {
          index++;
          column++;
        }

        continue;
      }

      //multiline comments
      if (currentChar === '/' && sourceCode[index + 1] === '*') {
        const startLine = line;
        const startColumn = column;

        index += 2;
        column += 2;

        while (
          index < sourceCode.length &&
          !(sourceCode[index] === '*' && sourceCode[index + 1] === '/')
        ) {
          if (sourceCode[index] === '\n') {
            index++;
            line++;
            column = 1;
          } else {
            index++;
            column++;
          }
        }

        // Closed comment
        if (
          index < sourceCode.length &&
          sourceCode[index] === '*' &&
          sourceCode[index + 1] === '/'
        ) {
          index += 2;
          column += 2;
        } else {
          // Unclosed multiline comment
          this.errors.push({
            message: 'Unclosed multiline comment',
            line: startLine,
            column: startColumn,
          });
        }

        continue;
      }
      // Temporary advance for tokens not implemented yet
      // Unrecognized character
      this.errors.push({
        message: `Unrecognized character: ${currentChar}`,
        line: line,
        column: column,
      });

      index++;
      column++;
    }
  }
}
