import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-code-editor',
  imports: [FormsModule],
  templateUrl: './code-editor.html',
  styleUrl: './code-editor.css',
})
export class CodeEditor {

  codeContent = `STACK myStack;
QUEUE customerQueue;

PUSH(myStack,10);
ENQUEUE(customerQueue,"Juan");`;

  get lineCount(): number {
    if (this.codeContent.length === 0) {
      return 1;
    }

    return this.codeContent.split('\n').length;
  }
}