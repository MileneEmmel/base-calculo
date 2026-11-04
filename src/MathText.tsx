import katex from "katex";
import "katex/dist/katex.min.css";
import { memo } from "react";

export default memo(function MathText({ children }: { children: string }) {
  const parts = children.split(/(\\\([\s\S]+?\\\))/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("\\(") && part.endsWith("\\)")) {
          const expression = part.slice(2, -2);
          try {
            return (
              <span
                className="math-inline"
                key={`${expression}-${index}`}
                dangerouslySetInnerHTML={{
                  __html: katex.renderToString(expression, {
                    throwOnError: false,
                    strict: false,
                    output: "htmlAndMathml",
                  }),
                }}
              />
            );
          } catch {
            return <span key={index}>{expression}</span>;
          }
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
});
