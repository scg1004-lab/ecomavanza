import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, ChevronRight, User } from 'lucide-react';
import { getArticleById } from '../services/articlesService';

interface BlogArticleProps {
  articleId: string;
}

// Custom Markdown inline styling renderer (handles bold formatting)
const renderInline = (text: string): React.ReactNode[] => {
  // Regex to split by bold (**text** or <strong>text</strong> or <b>text</b>)
  const parts = text.split(/(\*\*.*?\*\*|<strong>.*?<\/strong>|<b>.*?<\/b>)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-extrabold text-[#0e3a4d]">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
      return <strong key={i} className="font-extrabold text-[#0e3a4d]">{part.slice(8, -9)}</strong>;
    }
    if (part.startsWith('<b>') && part.endsWith('</b>')) {
      return <strong key={i} className="font-extrabold text-[#0e3a4d]">{part.slice(3, -4)}</strong>;
    }
    return part;
  });
};

// Custom Markdown Block Parser & Renderer to match the premium signature Ecom Avanza styling
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const normalized = content.replace(/\r\n/g, '\n');
  const blocks = normalized.split(/\n\s*\n/);

  return (
    <div className="space-y-8 text-slate-700 leading-relaxed font-medium">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Horizontal Rule
        if (trimmed === '---' || trimmed === '***') {
          return <div key={idx} className="my-10 h-px bg-slate-100" />;
        }

        // Headings (H3 with optional numbered badge)
        if (trimmed.startsWith('### ')) {
          const headingText = trimmed.substring(4).trim();
          const numMatch = headingText.match(/^(\d+)[\.\s]+(.*)/);
          
          if (numMatch) {
            const num = numMatch[1];
            const title = numMatch[2];
            return (
              <h3 key={idx} className="text-2xl font-black text-[#0e3a4d] mt-8 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#f0f9fa] flex items-center justify-center text-[#4fd1d1] font-black text-sm shrink-0">
                  {num}
                </span>
                <span>{renderInline(title)}</span>
              </h3>
            );
          }
          
          return (
            <h3 key={idx} className="text-2xl font-black text-[#0e3a4d] mt-8 mb-4">
              {renderInline(headingText)}
            </h3>
          );
        }

        // Subheadings (H4)
        if (trimmed.startsWith('#### ')) {
          const headingText = trimmed.substring(5).trim();
          return (
            <h4 key={idx} className="text-xl font-black text-[#0e3a4d] mt-6">
              {renderInline(headingText)}
            </h4>
          );
        }

        // Blockquotes / Callout box
        if (trimmed.startsWith('> ')) {
          const quoteLines = trimmed.split('\n').map(line => line.replace(/^>\s?/, ''));
          const quoteText = quoteLines.join(' ');
          return (
            <div key={idx} className="bg-[#f0f9fa] border-l-4 border-[#4fd1d1] p-6 rounded-r-2xl italic text-sm text-slate-800 my-6">
              {renderInline(quoteText)}
            </div>
          );
        }

        // Unordered Lists
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const items = trimmed
            .split('\n')
            .map(line => line.replace(/^[\-\*]\s+/, '').trim())
            .filter(item => item.length > 0);
            
          return (
            <ul key={idx} className="list-disc pl-6 space-y-2 text-sm text-slate-600 my-4">
              {items.map((item, itemIdx) => (
                <li key={itemIdx}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }

        // Lead Paragraph (first block)
        if (idx === 0) {
          return (
            <p key={idx} className="text-lg md:text-xl font-semibold text-[#0e3a4d] leading-relaxed">
              {renderInline(trimmed)}
            </p>
          );
        }

        // Standard Paragraph
        return (
          <p key={idx} className="leading-relaxed">
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

const BlogArticle: React.FC<BlogArticleProps> = ({ articleId }) => {
  const article = getArticleById(articleId);

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-black text-[#0e3a4d]">Artículo no encontrado</h2>
        <a href="#" className="flex items-center gap-2 text-[#4fd1d1] font-bold">
          <ArrowLeft size={16} /> Volver al inicio
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-28 pb-24">
      {/* Breadcrumb & Back button */}
      <div className="container mx-auto px-6 max-w-4xl mb-8">
        <div className="flex items-center justify-between">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[#0e3a4d]/70 hover:text-[#0e3a4d] transition-colors font-bold text-sm group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Volver a la portada
          </a>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span>Inicio</span>
            <ChevronRight size={12} />
            <span>Recursos</span>
            <ChevronRight size={12} />
            <span className="text-[#0e3a4d]">{article.category}</span>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-6 max-w-4xl">
        {/* Title and metadata */}
        <div className="mb-10 text-center md:text-left">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#f0f9fa] text-[#4fd1d1] font-black text-xs uppercase tracking-wider mb-6">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0e3a4d] tracking-tighter leading-none mb-8">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-slate-500 font-semibold border-y border-slate-100 py-4">
            <div className="flex items-center gap-2">
              <User size={16} className="text-[#4fd1d1]" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[#4fd1d1]" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[#4fd1d1]" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2.5rem] overflow-hidden shadow-2xl mb-12 border border-slate-100 aspect-video max-h-[480px] w-full"
        >
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Content parsed dynamically from Markdown */}
        <div className="prose prose-slate max-w-none">
          <MarkdownRenderer content={article.content} />
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-[#0e3a4d] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,#4fd1d1_0%,transparent_60%)] opacity-20"></div>
          <div className="relative z-10 max-w-2xl">
            <span className="text-[#4fd1d1] font-bold text-xs uppercase tracking-widest block mb-4">Auditoría Estratégica Gratuita</span>
            <h3 className="text-2xl md:text-4xl font-black mb-6 tracking-tight">
              {article.ctaText}
            </h3>
            <p className="text-slate-300 mb-8 font-medium leading-relaxed">
              En Ecom Avanza analizamos posicionamiento, publicidad, conversión y rentabilidad para identificar oportunidades reales de mejora y ayudarte a tomar decisiones con mayor confianza.
            </p>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 bg-[#4fd1d1] text-[#0e3a4d] px-8 py-4 rounded-xl font-black transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#4fd1d1]/20 group"
            >
              Reservar Auditoría Gratuita
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogArticle;
