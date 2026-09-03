import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { highlightSyntax } from '../../utils/syntax-highlighter';
@Component({
  selector: 'app-code-editor',
  imports: [FormsModule],
  templateUrl: './code-editor.html',
  styleUrl: './code-editor.css',
  encapsulation: ViewEncapsulation.None,
})
export class CodeEditor {
  codeContent = '';

  get lineCount(): number {
    if (this.codeContent.length === 0) {
      return 1;
    }

    return this.codeContent.split('\n').length;
  }

  get highlightedCode(): string {
    return highlightSyntax(this.codeContent);
  }

  private escapeHtml(text: string): string {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
