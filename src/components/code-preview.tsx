import { useEffect, useRef } from "react";
import "./preview-wrapper.css";
interface PreviewProps {
  code: string;
}

const html = `
    <html>
      <head>
        <style> html {
          background-color: white;
        } </style>
      </head>
      <body>
        <div id="root"> </div>
        <script>
        window.addEventListener('message', (event)=>{
          
          try {
            
            eval(event.data);

          } catch (error) {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color:red;" id="error-message"> <h4>Runtime Error </h4>' + error + '</div>';
            throw error;
          }
        }, false);
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const refIframe = useRef<any>();

  useEffect(() => {
    //reset iframe
    // console.log(refIframe.current);
    refIframe.current.srcdoc = html;
    refIframe.current.contentWindow.postMessage(
      code,
      // allow commincation from outter sources
      "*"
    );

    return () => {
      // onmount or next invocation of useEffect
    };
  }, [code]);

  return (
    <div className={"preview-wrapper"}>
      <iframe
        ref={refIframe}
        title="code-preview"
        srcDoc={html}
        // allows = "allow-same-origin" || "" | false - sandboxes from other JS scopes
        sandbox="allow-scripts"
        style={{
          backgroundColor: "snow",
        }}
        // src="test.html"
        // frameBorder="0"
      />
    </div>
  );
};

export default Preview;
