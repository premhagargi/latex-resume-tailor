export const SAMPLE_LATEX_RESUME = `%==============================================================
%  John Doe — Endpoint Clinical: Front-End Engineer
%==============================================================
\\documentclass[10pt,letterpaper]{article}

\\usepackage[top=0.32in,bottom=0.32in,left=0.48in,right=0.48in]{geometry}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{lmodern}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{xcolor}
\\usepackage{fontawesome5}
\\usepackage{hyperref}

\\definecolor{accent}{HTML}{004E90}
\\definecolor{rulegray}{HTML}{9AA0A6}
\\hypersetup{colorlinks=true, urlcolor=accent, linkcolor=accent}

\\titleformat{\\section}
  {\\normalsize\\bfseries}{}{0em}{}[{\\color{rulegray}\\titlerule[0.7pt]}]
\\titlespacing*{\\section}{0pt}{4pt}{2pt}

\\setlist[itemize]{leftmargin=1.05em, itemsep=0.2pt, topsep=0.5pt,
                  parsep=0pt, label=\\textbullet}

\\newcommand{\\workentry}[3]{%
  \\noindent\\textbf{#1}\\hfill{\\small\\itshape #3}\\par
  \\noindent{\\small\\itshape #2}\\par\\vspace{0.5pt}%
}
\\newcommand{\\projentry}[2]{%
  \\noindent\\textbf{\\href{#2}{#1}}\\,{\\footnotesize\\textcolor{accent}{\\faExternalLinkAlt}}%
  \\par\\vspace{0.3pt}%
}
\\newcommand{\\skillrow}[2]{\\noindent\\textbf{#1:}\\ #2\\par\\vspace{1pt}}

\\setlength{\\parindent}{0pt}
\\pagestyle{empty}
\\linespread{0.92}\\selectfont

\\begin{document}

%==================== HEADER ====================
\\begin{center}
  {\\LARGE\\bfseries John Doe}\\\\[2pt]
  {\\itshape\\color{accent} Front-End Engineer | React \\textbullet{} TypeScript \\textbullet{} Accessible, High-Performance Interfaces}\\\\[4pt]
  {\\small
    \\faEnvelope\\ \\href{mailto:johndoe@example.com}{johndoe@example.com}
    \\quad\\textcolor{rulegray}{$|$}\\quad
    \\faPhone\\ +1 555-019-2049
    \\quad\\textcolor{rulegray}{$|$}\\quad
    \\faGlobe\\ \\href{https://johndoe.app/}{johndoe.app}
    \\quad\\textcolor{rulegray}{$|$}\\quad
    \\faLinkedin\\ \\href{https://linkedin.com/in/johndoe}{linkedin.com/in/johndoe}
  }
\\end{center}
\\vspace{-1pt}

%==================== SUMMARY ====================
\\section{Professional Summary}
Front-End Engineer with 3+ years of \\textbf{professional software development experience} building \\textbf{scalable, clean, and maintainable} web applications using \\textbf{React, JavaScript (ES6+), and TypeScript}. Experienced translating design specs into \\textbf{responsive, high-performance interfaces}, integrating \\textbf{RESTful APIs}, and writing \\textbf{unit and integration tests} (Jest, React Testing Library). Comfortable with \\textbf{modern state management} (Redux, Zustand, Context API), \\textbf{accessibility standards}, and \\textbf{CI/CD pipelines} in Agile/Scrum teams.

%==================== EXPERIENCE ====================
\\section{Experience}

\\workentry{Software Developer}{Acme AI Corp --- AI-Native SaaS Platform}{Apr 2026 -- Present}
\\begin{itemize}
  \\item \\textbf{Scalable, maintainable front-end code:} Built \\textbf{React 19 + TypeScript} applications with a \\textbf{modular, reusable component library} --- dashboards, data tables, multi-step workflows --- using \\textbf{Tailwind CSS} and \\textbf{shadcn/ui}; components shared across three internal products.
  \\item \\textbf{Design-to-code translation:} Translated product requirements and UI mockups into \\textbf{responsive web components} for a \\textbf{Next.js (App Router) + TypeScript} SaaS frontend --- dynamic kanban boards, interactive charts, and role-based dashboards.
  \\item \\textbf{Performance \\& cross-browser compatibility:} Optimized applications for \\textbf{speed and cross-browser compatibility} via code splitting and lazy loading; state managed with \\textbf{Zustand} and \\textbf{Context API} patterns.
  \\item \\textbf{RESTful API integration:} Integrated front-end applications with \\textbf{RESTful APIs} (Python + FastAPI) --- JWT/OTP auth, httpOnly refresh tokens, and JSON data contracts for secure, reliable data flow.
  \\item \\textbf{Testing \\& code reviews:} Wrote \\textbf{unit and integration tests} (Vitest, React Testing Library); participated in \\textbf{code reviews} and design discussions; shipped via \\textbf{Docker + GitHub Actions CI/CD}.
\\end{itemize}

\\vspace{0.5pt}
\\workentry{Software Developer}{Globex Consulting Private Limited --- E-Commerce \\& Enterprise Platforms}{Aug 2023 -- Mar 2026}
\\begin{itemize}
  \\item \\textbf{Responsive component development:} Built \\textbf{interactive, responsive UI components} with \\textbf{React, Angular, Next.js, Tailwind, and Material UI}, driving \\textbf{20\\% higher engagement} and \\textbf{15\\% better retention} across e-commerce platforms.
  \\item \\textbf{RESTful API integration:} Designed and consumed \\textbf{RESTful APIs} with JSON data contracts for frontend--backend integration, reducing data overhead by \\textbf{25\\%}.
  \\item \\textbf{State management \\& performance:} Used \\textbf{Redux} for state management; delivered \\textbf{performance optimization} via code splitting and lazy loading; ensured \\textbf{cross-browser compatibility} across supported platforms.
  \\item \\textbf{Agile collaboration \\& CI/CD:} Collaborated with designers, product managers, and QA in \\textbf{Agile (Scrum)} sprints; automated deployments with \\textbf{GitLab CI/CD}, AWS S3, and CloudFront.
\\end{itemize}

%==================== PROJECTS ====================
\\section{Projects}

\\projentry{ArchForge --- Distributed Systems Design Platform}{https://archforge.example.com/}
\\begin{itemize}
  \\item Open-source \\textbf{React 19, TypeScript, Next.js 16} platform on an interactive canvas --- \\textbf{React Flow, Zustand} state management; built with attention to \\textbf{UI/UX detail} and responsive interaction patterns.
\\end{itemize}

\\vspace{0.5pt}
\\projentry{FloodGate --- Distributed Rate Limiter (npm)}{https://floodgate-rl.example.com/}
\\begin{itemize}
  \\item Production-grade \\textbf{Node.js} rate limiter (npm: \\textbf{floodgate-rl}) with sliding-window and token-bucket algorithms backed by \\textbf{atomic Redis Lua scripts}; \\textbf{comprehensive automated test suites} for concurrency correctness.
\\end{itemize}

%==================== SKILLS ====================
\\section{Technical Skills}
\\skillrow{Frontend}{\\textbf{React.js} (18/19), \\textbf{TypeScript}, \\textbf{JavaScript (ES6+)}, Next.js, Angular; \\textbf{HTML5}, \\textbf{CSS3}, Tailwind CSS, shadcn/ui, Material UI}
\\skillrow{State Management}{\\textbf{Redux}, \\textbf{Zustand}, \\textbf{Context API}, TanStack Query}
\\skillrow{Testing \\& Build Tools}{\\textbf{Jest}, Vitest, \\textbf{React Testing Library}, unit \\& integration testing; \\textbf{Vite}, Webpack}
\\skillrow{APIs \\& Backend}{\\textbf{RESTful APIs}, Python, FastAPI, Node.js, NestJS, JWT/OTP auth, secure API design}
\\skillrow{CI/CD \\& Process}{\\textbf{GitHub Actions}, GitLab CI/CD, Docker, \\textbf{Git}; \\textbf{Agile/Scrum}, code reviews, cross-functional collaboration}

%==================== EDUCATION ====================
\\section{Education \\& Certifications}
\\noindent\\textbf{Global Institute of Technology}, New York --- {\\small B.S., Computer Science --- GPA: 3.8/4.0}\\hfill{\\small\\itshape 2019--2023}\\\\
{\\small\\textbf{Certs:} Micro Front-End Architecture with React (LinkedIn) \\textbullet{} CI/CD for Beginners (SimpliLearn, 2025)}

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
