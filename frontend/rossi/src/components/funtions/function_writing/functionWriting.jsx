import React from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia, dark, vscDarkPlus, materialDark, ghcolors } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from "react";
import './function.css'
function CodeBlock({ codejs }) {
  const [js,Setjs] = useState(false)
  return (
    <div className="text-green-300 font-mono" id="container-code">
      <pre className="rounded-3xl whitespace-pre-wrap break-words overflow-visible">
        <SyntaxHighlighter language="javascript" style={ghcolors} showLineNumbers customStyle={{maxHeight: "350px", overflowX: "auto", borderRadius: "15px"}} >
          {codejs}
        </SyntaxHighlighter>
      </pre>
    </div>
  );
;
}

// Uso
export default CodeBlock;
