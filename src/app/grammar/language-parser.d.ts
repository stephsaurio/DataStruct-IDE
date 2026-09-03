export interface ParserLocation {
  start: {
    line: number;
    column: number;
  };
  end: {
    line: number;
    column: number;
  };
}

export interface ParserError extends Error {
  location?: ParserLocation;
}

export function parse(input: string): unknown;