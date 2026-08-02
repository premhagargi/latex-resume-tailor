export const SAMPLE_LATEX_RESUME = `%==============================================================
%  Prem Hagaragi — Endpoint Clinical: Front-End Engineer
%==============================================================
\\documentclass[10pt,letterpaper]{article}

\\usepackage[top=0.32in,bottom=0.32in,left=0.48in,right=0.48in]{geometry}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{lmodern}
\\usepackage{titlesec}
\\usepackage{enumitem}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-1pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-5pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}
\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

\\begin{center}
    \\textbf{\\Huge \\scshape Prem Hagaragi} \\\\ \\vspace{1pt}
    \\small +91-9876543210 $|$ \\href{mailto:prem.hagaragi@example.com}{\\underline{prem.hagaragi@example.com}} $|$ 
    \\href{https://linkedin.com/in/premhagargi}{\\underline{linkedin.com/in/premhagargi}} $|$
    \\href{https://github.com/premhagargi}{\\underline{github.com/premhagargi}}
\\end{center}

%----------- EXPERIENCE -----------
\\section{Experience}
  \\resumeSubHeadingListStart

    \\resumeSubheading
      {Senior Fullstack Software Engineer}{Apr 2024 -- Present}
      {TechCorp Solutions}{Bengaluru, India}
      \\resumeItemListStart
        \\resumeItem{Architected and deployed a distributed microservices platform using React, TypeScript, Node.js, and PostgreSQL, handling 2M+ daily active requests with 99.99\\% uptime.}
        \\resumeItem{Optimized frontend bundle size by 42\\% and reduced initial page load latency from 2.8s to 650ms by implementing code-splitting, Webpack dynamic imports, and Redis edge caching.}
        \\resumeItem{Designed real-time WebSockets and streaming infrastructure for low-latency messaging, improving data throughput by 3x during peak traffic events.}
        \\resumeItem{Mentored a team of 5 engineers, introduced automated CI/CD pipelines via GitHub Actions and Docker, reducing deployment cycle times from 3 days to 15 minutes.}
      \\resumeItemListEnd

    \\resumeSubheading
      {Software Development Engineer II}{Jan 2022 -- Mar 2024}
      {Nexus Systems Inc}{Bengaluru, India}
      \\resumeItemListStart
        \\resumeItem{Engineered high-concurrency RESTful and GraphQL APIs using Golang and Express.js, serving 500k+ monthly active users.}
        \\resumeItem{Implemented database indexing strategies and query optimizations in PostgreSQL and Redis, cutting p99 query latency by 68\\%.}
        \\resumeItem{Integrated OAuth 2.0 and JWT security protocols, auditing system vulnerabilities and zero-day threats.}
      \\resumeItemListEnd

  \\resumeSubHeadingListEnd

%----------- PROJECTS -----------
\\section{Projects}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {\\textbf{CueDesk AI Assist} $|$ \\emph{Electron, React, TypeScript, Deepgram, LLMs}}{May 2024 -- Present}
      {Personal Project}{}
      \\resumeItemListStart
        \\resumeItem{Developed a stealth real-time AI copilot desktop application built on Electron, React, and Zustand, supporting live voice transcription via Deepgram WebSockets with sub-300ms latency.}
        \\resumeItem{Implemented dynamic prompt engines and context windows using Cerebras Hardware SDK and Gemini 3.5, delivering stream-rendered interview solutions under 1.2 seconds.}
      \\resumeItemListEnd
  \\resumeSubHeadingListEnd

%----------- TECHNICAL SKILLS -----------
\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Languages}{: JavaScript, TypeScript, Python, Golang, HTML/CSS, SQL} \\\\
     \\textbf{Frameworks}{: React.js, Next.js, Node.js, Express.js, TailwindCSS, Electron, Vite} \\\\
     \\textbf{Infrastructure}{: Docker, Kubernetes, AWS (S3, EC2, Lambda), PostgreSQL, Redis, Git, CI/CD} \\\\
     \\textbf{Concepts}{: System Design, Microservices, REST APIs, GraphQL, WebSockets, Performance Optimization, ATS Engineering}
    }}
 \\end{itemize}

\\end{document}
`;

export const SAMPLE_JOB_DESCRIPTION = `Senior Fullstack Engineer / Product Engineer — High-Growth Product Unicorn

About the Role:
We are looking for a Senior Fullstack / Product Engineer to join our core product engineering team. You will architect, build, and scale customer-facing features and high-throughput backend services serving millions of users globally.

Key Responsibilities:
- Design and implement end-to-end features using React, TypeScript, Next.js, Node.js, and modern cloud infrastructure.
- Drive system design and backend architecture for high-concurrency microservices, caching layers (Redis), and relational databases (PostgreSQL).
- Write clean, testable code and spearhead performance optimizations to reduce p99 latencies and client load times.
- Collaborate closely with Product Managers and Designers to deliver high-impact product features with strong telemetry and analytics.
- Lead engineering best practices, CI/CD automation, code reviews, and mentor junior engineers.

Requirements & Tech Stack:
- 3+ years of professional software engineering experience building product applications at scale.
- Strong proficiency in TypeScript, React, Next.js, Node.js, and PostgreSQL.
- Proven track record of quantitative performance improvements (latency, bundle size, throughput, cost efficiency).
- Experience with real-time systems (WebSockets, streaming), Redis, Docker, and AWS.
- Exceptional product mindset and problem-solving skills for Tier-1 product engineering environments.
`;
