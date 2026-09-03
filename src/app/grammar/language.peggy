program
  = _ statements:statement* {
      return statements;
    }

statement
  = stackDeclaration
  / queueDeclaration
  / listDeclaration
  / hashDeclaration
  / treeDeclaration
  / pushStatement
  / popStatement
  / enqueueStatement
  / dequeueStatement
  / insertStatement
  / removeStatement
  / setStatement
  / getStatement

stackDeclaration
  = "STACK" __ identifier:identifier _ ";" _ {
      return {
        type: "StackDeclaration",
        identifier: identifier
      };
    }

identifier
  = first:[a-zA-Z_] rest:[a-zA-Z0-9_]* {
      return first + rest.join("");
    }

_
  = (whitespace / singleLineComment / multilineComment)*

__
  = (whitespace / singleLineComment / multilineComment)+

whitespace
  = [ \t\r\n]

singleLineComment
  = "//" [^\r\n]*

multilineComment
  = "/*" (!"*/" .)* "*/"
  
queueDeclaration
  = "QUEUE" __ identifier:identifier _ ";" _ {
      return {
        type: "QueueDeclaration",
        identifier: identifier
      };
    }

listDeclaration
  = "LIST" __ identifier:identifier _ ";" _ {
      return {
        type: "ListDeclaration",
        identifier: identifier
      };
    }

hashDeclaration
  = "HASH" __ identifier:identifier _ ";" _ {
      return {
        type: "HashDeclaration",
        identifier: identifier
      };
    }

treeDeclaration
  = "TREE" __ identifier:identifier _ ";" _ {
      return {
        type: "TreeDeclaration",
        identifier: identifier
      };
    }
    pushStatement
  = "PUSH" _ "(" _ identifier:identifier _ "," _ value:value _ ")" _ ";" _ {
      return {
        type: "PushStatement",
        identifier: identifier,
        value: value
      };
    }
    popStatement
  = "POP" _ "(" _ identifier:identifier _ ")" _ ";" _ {
      return {
        type: "PopStatement",
        identifier: identifier
      };
    }
    enqueueStatement
  = "ENQUEUE" _ "(" _ identifier:identifier _ "," _ value:value _ ")" _ ";" _ {
      return {
        type: "EnqueueStatement",
        identifier: identifier,
        value: value
      };
    }

dequeueStatement
  = "DEQUEUE" _ "(" _ identifier:identifier _ ")" _ ";" _ {
      return {
        type: "DequeueStatement",
        identifier: identifier
      };
    }
    value
  = stringLiteral
  / integerLiteral

integerLiteral
  = digits:[0-9]+ {
      return parseInt(digits.join(""), 10);
    }

stringLiteral
  = '"' content:[^"\r\n]* '"' {
      return content.join("");
    }
    insertStatement
  = "INSERT" _ "(" _ identifier:identifier _ "," _ value:value _ ")" _ ";" _ {
      return {
        type: "InsertStatement",
        identifier: identifier,
        value: value
      };
    }

removeStatement
  = "REMOVE" _ "(" _ identifier:identifier _ "," _ value:value _ ")" _ ";" _ {
      return {
        type: "RemoveStatement",
        identifier: identifier,
        value: value
      };
    }
setStatement
  = "SET" _ "(" _ identifier:identifier _ "," _ key:value _ "," _ value:value _ ")" _ ";" _ {
      return {
        type: "SetStatement",
        identifier: identifier,
        key: key,
        value: value
      };
    }

getStatement
  = "GET" _ "(" _ identifier:identifier _ "," _ key:value _ ")" _ ";" _ {
      return {
        type: "GetStatement",
        identifier: identifier,
        key: key
      };
    }