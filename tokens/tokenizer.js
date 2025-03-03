function tokenize(sourceCode) {
  const keywords = [
    "for",
    "console.printf",
    "null",
    "ifelse",
    "ifelse elif",
    "definition",
    "function",
    "while",
    "int",
    "char",
    "string",
    "bool",
    "nil",
    "dnil",
    "&&",
    "!",
    "++",
    "--",
    "||",
  ];

  const tokens = [];
  const lines = sourceCode.split("\n");

  for (let line of lines) {
    let token = "";
    for (let char of line) {
      if (char.match(/[a-zA-Z0-9]/)) {
        token += char;
      } else if (char.match(/[;:<>\!\+\-\&\|$$$$$$\{\}\*]/)) {
        if (token) {
          if (keywords.includes(token)) {
            tokens.push({ type: "keyword", value: token });
          } else if (!isNaN(token)) {
            tokens.push({ type: "number", value: parseInt(token) });
          } else {
            tokens.push({ type: "identifier", value: token });
          }
          token = "";
        }
        tokens.push({ type: "symbol", value: char });
      } else if (char.match(/\s/)) {
        if (token) {
          if (keywords.includes(token)) {
            tokens.push({ type: "keyword", value: token });
          } else if (!isNaN(token)) {
            tokens.push({ type: "number", value: parseInt(token) });
          } else {
            tokens.push({ type: "identifier", value: token });
          }
          token = "";
        }
      } else if (char === '"') {
        // Handle string literals
        let stringLiteral = "";
        for (let nextChar of line.slice(line.indexOf(char) + 1)) {
          if (nextChar === '"') {
            break;
          }
          stringLiteral += nextChar;
        }
        tokens.push({ type: "string", value: stringLiteral });
        line = line.slice(line.indexOf(char) + stringLiteral.length + 2);
        token = "";
      } else if (char === "'") {
        // Handle character literals
        let charLiteral = line[line.indexOf(char) + 1];
        tokens.push({ type: "char", value: charLiteral });
        line = line.slice(line.indexOf(char) + 3);
        token = "";
      } else if (char === "/") {
        // Handle comments
        if (line[line.indexOf(char) + 1] === "/") {
          // Line comment
          line = "";
          token = "";
        } else if (line[line.indexOf(char) + 1] === "*") {
          // Block comment
          let commentEnd = line.indexOf("*/");
          if (commentEnd !== -1) {
            line = line.slice(commentEnd + 2);
            token = "";
          } else {
            // Comment spans multiple lines
            line = "";
            token = "";
          }
        }
      }
    }
    if (token) {
      if (keywords.includes(token)) {
        tokens.push({ type: "
