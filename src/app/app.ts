import { Component, signal, ViewChild } from '@angular/core';
import { CodeEditor } from './components/code-editor/code-editor';
import { ErrorPanel } from './components/error-panel/error-panel';
import { TokenTable } from './components/token-table/token-table';
import { Lexer } from './services/lexer';
import { Token } from './models/token';
import { LexicalError } from './models/lexical-error';
@Component({
  selector: 'app-root',
  imports: [CodeEditor, ErrorPanel, TokenTable],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('datastruct-ide');
  tokens: Token[] = [];
  errors: LexicalError[] = [];
  @ViewChild(CodeEditor)
  codeEditor!: CodeEditor;

  constructor(private lexer: Lexer) {}

analyzeCode(): void {
  const sourceCode = this.codeEditor.codeContent;

  this.lexer.analyze(sourceCode);

  this.tokens = [...this.lexer.tokens];
  this.errors = [...this.lexer.errors];
}
}
