import React from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia, dark, vscDarkPlus, materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from "react";
import './function.css'
function CodeBlock({ codejs, codepy, modals, modalNameParam }) {
const pythonPylanceStyle = {
  ...vscDarkPlus, // partimos del tema base
  comment: { color: "#6A9955", fontStyle: "italic" },        // comentarios
  keyword: { color: "#C586C0", fontWeight: "bold" },         // keywords de Python
  string: { color: "#CE9178" },                              // strings
  number: { color: "#B5CEA8" },                              // números
  function: { color: "#DCDCAA" },                            // nombres de funciones
  variable: { color: "#9CDCFE" },                            // variables
  operator: { color: "#D4D4D4" },                            // operadores
  punctuation: { color: "#D4D4D4" },                         // signos de puntuación
  className: { color: "#4EC9B0" },                           // nombres de clases
  builtin: { color: "#DCDCAA" },                             // funciones built-in
  constant: { color: "#4FC1FF" },                            // constantes
};


  const [python,SetPython] = useState(true)
  const [js,Setjs] = useState(false)
  const visibleJs = () => {
    SetPython(true)
    Setjs(false)
  }
  const visiblePy = () => {
    SetPython(false)
    Setjs(true)
  }
  const styleJs = ` max-h-[400px] w-full ${js ? "hidden" : ""}`
  const stylePy = ` max-h-[400px] w-full ${python ? "hidden" : ""}`
  return (
    <div className="relative bg-[#1e1e1e] text-green-300font-mono w-full" id="container-code">
      <div id="types-code">
          <button id="button-js" onClick={visibleJs}>JavaScript</button>
          <button id="button-py" onClick={visiblePy}>Python</button>
      </div>
      <pre className={styleJs}>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus} showLineNumbers customStyle={{maxHeight: "350px", overflowX: "auto"}} >
          {codejs}
        </SyntaxHighlighter>
      </pre>
      <pre className={stylePy}>
        <div className="flex overflow-x-auto">
          {[...modals].map((name) => (
          <div className="modal-code-py" key={name.Name} onClick={()=> modalNameParam(name.Name)}><img width={15} src="./py2.png" alt="" />{name.Name}</div>
        ))}
        </div>
        <SyntaxHighlighter language="python" style={pythonPylanceStyle} showLineNumbers customStyle={{maxHeight: "350px", overflowX: "auto"}}>
          {codepy}
        </SyntaxHighlighter>
      </pre>
    </div>
  );
;
}

// Uso
export default CodeBlock;
