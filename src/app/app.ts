import { Component, signal } from '@angular/core';
import { CodeEditor } from './components/code-editor/code-editor';
import { ErrorPanel } from './components/error-panel/error-panel';
import { TokenTable } from './components/token-table/token-table';

@Component({
  selector: 'app-root',
  imports: [
    CodeEditor,
    ErrorPanel,
    TokenTable
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('datastruct-ide');
}