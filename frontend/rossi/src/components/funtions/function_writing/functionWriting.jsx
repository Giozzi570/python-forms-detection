import React from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia, dark,vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
function CodeBlock({ code }) {

  return (
    <div className="relative bg-gray-900 text-green-300 p-4 rounded-lg font-mono w-full">
      <pre className="overflow-x-auto overflow-y-auto max-h-[400px] w-full">
        <SyntaxHighlighter language="javascript" style={vscDarkPlus} >
          {code}
        </SyntaxHighlighter>
      </pre>
      <button
        onClick={() => navigator.clipboard.writeText(code)}
        className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600"
      >
        Copiar
      </button>
    </div>
  );
;
}

// Uso
export default CodeBlock;
