import { reservedWords } from './reserved-words';

export function highlightSyntax(sourceCode: string): string {
  let result = '';
  let index = 0;

  while (index < sourceCode.length) {
    const currentChar = sourceCode[index];

    // Single-line comments
    if (currentChar === '/' && sourceCode[index + 1] === '/') {
      let comment = '';

      while (index < sourceCode.length && sourceCode[index] !== '\n') {
        comment += sourceCode[index];
        index++;
      }

      result += `<span class="syntax-comment">${escapeHtml(comment)}</span>`;
      continue;
    }

    // Multiline comments
    if (currentChar === '/' && sourceCode[index + 1] === '*') {
      let comment = '';

      while (index < sourceCode.length) {
        comment += sourceCode[index];

        if (sourceCode[index] === '*' && sourceCode[index + 1] === '/') {
          comment += '/';
          index += 2;
          break;
        }

        index++;
      }

      result += `<span class="syntax-comment">${escapeHtml(comment)}</span>`;
      continue;
    }

    // Strings
    if (currentChar === '"') {
      let stringLiteral = '"';

      index++;

      while (index < sourceCode.length && sourceCode[index] !== '"' && sourceCode[index] !== '\n') {
        stringLiteral += sourceCode[index];
        index++;
      }

      if (index < sourceCode.length && sourceCode[index] === '"') {
        stringLiteral += '"';
        index++;
      }

      result += `<span class="syntax-string">${escapeHtml(stringLiteral)}</span>`;
      continue;
    }

    // Words: reserved words or identifiers
    if (isLetter(currentChar)) {
      let word = '';

      while (index < sourceCode.length && isLetterOrDigit(sourceCode[index])) {
        word += sourceCode[index];
        index++;
      }

      if (reservedWords.includes(word)) {
        result += `<span class="syntax-reserved">${escapeHtml(word)}</span>`;
      } else {
        result += `<span class="syntax-identifier">${escapeHtml(word)}</span>`;
      }

      continue;
    }

    // Numbers
    if (isDigit(currentChar)) {
      let number = '';

      while (index < sourceCode.length && isDigit(sourceCode[index])) {
        number += sourceCode[index];
        index++;
      }

      result += `<span class="syntax-number">${number}</span>`;
      continue;
    }

    // Operators
    if (isOperator(currentChar)) {
      result += `<span class="syntax-operator">${escapeHtml(currentChar)}</span>`;
      index++;
      continue;
    }

    // Spaces, line breaks and unrecognized characters
    result += escapeHtml(currentChar);
    index++;
  }

  return result;
}

function isLetter(char: string): boolean {
  return /[a-zA-Z_]/.test(char);
}

function isLetterOrDigit(char: string): boolean {
  return /[a-zA-Z0-9_]/.test(char);
}

function isDigit(char: string): boolean {
  return /[0-9]/.test(char);
}

function isOperator(char: string): boolean {
  return ['=', ',', ';', '(', ')'].includes(char);
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
