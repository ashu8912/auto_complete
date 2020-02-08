import "./codemirror.css";
import "./main.css";

const CodeMirror = require("codemirror");
require("codemirror/mode/javascript/javascript");
require("codemirror/addon/hint/show-hint.js");
require("codemirror/addon/hint/anyword-hint.js");
//require("codemirror/addon/hint/javascript-hint.js");
const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
  mode: "javascript",
  hint: CodeMirror.hint.javascript
});
editor.on("keydown", function(cm, event) {
  if (
    (!event.ctrlKey && (event.keyCode >= 65 && event.keyCode <= 90)) ||
    (event.keyCode >= 97 && event.keyCode <= 122) ||
    (event.keyCode >= 46 && event.keyCode <= 57)
  ) {
    CodeMirror.commands.autocomplete(cm, null, { completeSingle: false });
  }
});

CodeMirror.hint.javascript = function(editor) {
  var list = ["Hello", "ashu", "p5.js", "p5.js is awesome", "setup", "draw"];
  var cursor = editor.getCursor();
  var currentLine = editor.getLine(cursor.line);
  var start = cursor.ch;
  var end = start;
  while (end < currentLine.length && /[\w$]+/.test(currentLine.charAt(end)))
    ++end;
  while (start && /[\w$]+/.test(currentLine.charAt(start - 1))) --start;
  var curWord = start != end && currentLine.slice(start, end);
  var regex = new RegExp("^" + curWord, "i");
  var result = {
    list: (!curWord
      ? list
      : list.filter(function(item) {
          return item.match(regex);
        })
    ).sort(),
    from: CodeMirror.Pos(cursor.line, start),
    to: CodeMirror.Pos(cursor.line, end)
  };

  return result;
};
