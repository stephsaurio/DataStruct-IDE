import { Component, signal, ViewChild } from '@angular/core';
import { CodeEditor } from './components/code-editor/code-editor';
import { ErrorPanel } from './components/error-panel/error-panel';
import { TokenTable } from './components/token-table/token-table';
import { Lexer } from './services/lexer';

@Component({
  selector: 'app-root',
  imports: [CodeEditor, ErrorPanel, TokenTable],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

  protected readonly title = signal('datastruct-ide');

  @ViewChild(CodeEditor)
  codeEditor!: CodeEditor;

  constructor(private lexer: Lexer) {}

  analyzeCode(): void {
    const sourceCode = this.codeEditor.codeContent;

    this.lexer.analyze(sourceCode);

    console.log('Tokens:', this.lexer.tokens);
    console.log('Lexical errors:', this.lexer.errors);
  }
}