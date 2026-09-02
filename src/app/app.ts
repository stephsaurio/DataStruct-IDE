import { Component, signal } from '@angular/core';
import { CodeEditor } from './components/code-editor/code-editor';

@Component({
  selector: 'app-root',
  imports: [CodeEditor],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('datastruct-ide');
}