export interface LatexDocument {
  preamble: string;
  body: string;
  sections: { title: string; content: string }[];
}

export function parseLatex(latex: string): LatexDocument {
  const docStart = latex.indexOf('\\begin{document}');
  const docEnd = latex.lastIndexOf('\\end{document}');
  
  if (docStart === -1 || docEnd === -1) {
    return { preamble: '', body: latex, sections: [] };
  }

  const preamble = latex.substring(0, docStart);
  const body = latex.substring(docStart + '\\begin{document}'.length, docEnd);

  // Regex to catch \section{}, \cvsection{}, \ressection{}, etc.
  const sectionRegex = /\\(?:cv|res)?section(?:\[.*?\])?\{(.*?)\}([\s\S]*?)(?=\\(?:cv|res)?section(?:\[.*?\])?\{|$)/g;
  const sections: { title: string; content: string }[] = [];
  let match;
  
  // Clone body for regex to avoid state issues
  const tempBody = body;
  while ((match = sectionRegex.exec(tempBody)) !== null) {
    sections.push({
      title: match[1].trim(),
      content: match[2].trim()
    });
  }

  return { preamble, body, sections };
}

export function preserveLatexSyntax(original: string, modified: string): string {
  // A utility to ensure that if the AI returned only the body or broke the preamble,
  // we can reconstruct it safely.
  if (!modified.includes('\\begin{document}')) {
    const docStart = original.indexOf('\\begin{document}');
    const docEnd = original.lastIndexOf('\\end{document}');
    if (docStart !== -1 && docEnd !== -1) {
       return original.substring(0, docStart + '\\begin{document}'.length) + '\n' + modified + '\n\\end{document}';
    }
  }
  return modified;
}
