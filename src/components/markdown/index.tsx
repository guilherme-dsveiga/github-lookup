import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";

type MarkdownProps = {
  content: string;
  url: string;
};

function Markdown({ content, url }: MarkdownProps) {
  return (
    <div className="text-sm text-stone-200 inline-block w-full">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        className={"markdown"}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");

            return !inline && match ? (
              <SyntaxHighlighter
                style={dracula}
                PreTag="div"
                language={match[1]}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          img({ src, ...props }: any) {
            if (src.startsWith("/")) {
              return <img src={`${url}${src}?raw=true`} {...props} />;
            } else {
              return <img src={src} {...props} />;
            }
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default Markdown;
