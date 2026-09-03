import { Component, signal, ViewChild } from '@angular/core';
import { CodeEditor } from './components/code-editor/code-editor';
import { ErrorPanel } from './components/error-panel/error-panel';
import { TokenTable } from './components/token-table/token-table';
import { Lexer } from './services/lexer';
import { Token } from './models/token';
import { LexicalError } from './models/lexical-error';
import { Parser } from './services/parser';
import { SyntacticError } from './models/syntactic-error';
import { SyntacticErrorPanel } from './components/syntactic-error-panel/syntactic-error-panel';

@Component({
  selector: 'app-root',
    imports: [
    CodeEditor,
    ErrorPanel,
    SyntacticErrorPanel,
    TokenTable
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('datastruct-ide');
  tokens: Token[] = [];
  errors: LexicalError[] = [];
  syntacticErrors: SyntacticError[] = [];
  @ViewChild(CodeEditor)
  codeEditor!: CodeEditor;

  constructor(
  private lexer: Lexer,
  private parser: Parser
) {}

analyzeCode(): void {
  const sourceCode = this.codeEditor.codeContent;

  // Lexical analysis
  this.lexer.analyze(sourceCode);
  this.tokens = [...this.lexer.tokens];
  this.errors = [...this.lexer.errors];

  // Syntactic analysis
if (this.errors.length === 0) {
  this.parser.analyze(sourceCode);
  this.syntacticErrors = [...this.parser.errors];
} else {
  this.syntacticErrors = [];
}}
}
