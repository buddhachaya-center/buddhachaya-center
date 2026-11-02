import ReactMarkdown from 'react-markdown';

export default function PostBody({ markdown, lang }: { markdown: string; lang: 'my' | 'en' | 'de' }) {
  return (
    <div lang={lang} className="text-[#334155] text-base sm:text-lg leading-relaxed">
      <ReactMarkdown
        disallowedElements={['img']}
        unwrapDisallowed
        components={{
          h1: ({ children }) => (
            <h1 className="font-display font-extrabold text-[#1E3F20] text-2xl sm:text-3xl mt-8 mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-display font-extrabold text-[#1E3F20] text-xl sm:text-2xl mt-6 mb-4">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-display font-extrabold text-[#1E3F20] text-lg sm:text-xl mt-5 mb-3">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="leading-relaxed mb-4">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-4">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="mb-1">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#D4AF37] pl-4 italic text-[#334155] mb-4">{children}</blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-[#1E3F20] underline"
              {...(href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {children}
            </a>
          ),
          hr: () => (
            <hr className="border-[#E5E1D4] my-8" />
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
