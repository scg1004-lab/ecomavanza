import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, Search, Plus, Edit, Trash2, Eye, Copy, Download, 
  ArrowLeft, Check, AlertCircle, ToggleLeft, ToggleRight, 
  FileCode, X, Save, EyeOff, User, Calendar, Clock, Sparkles,
  Printer, Mail, FileText
} from 'lucide-react';
import { 
  Article, getArticles, saveArticle, deleteArticle, 
  generateTypeScriptCode 
} from '../services/articlesService';

// Custom Markdown inline styling renderer (used for Live Preview)
const renderInlinePreview = (text: string): React.ReactNode[] => {
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

// Custom Markdown renderer for editor Live Preview
const MarkdownPreviewRenderer: React.FC<{ content: string }> = ({ content }) => {
  if (!content.trim()) {
    return <div className="text-slate-400 italic">Escribe contenido en Markdown para ver la vista previa.</div>;
  }
  const normalized = content.replace(/\r\n/g, '\n');
  const blocks = normalized.split(/\n\s*\n/);

  return (
    <div className="space-y-6 text-slate-700 leading-relaxed font-medium">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Horizontal Rule
        if (trimmed === '---' || trimmed === '***') {
          return <div key={idx} className="my-8 h-px bg-slate-100" />;
        }

        // Headings (H3 with optional numbered badge)
        if (trimmed.startsWith('### ')) {
          const headingText = trimmed.substring(4).trim();
          const numMatch = headingText.match(/^(\d+)[\.\s]+(.*)/);
          
          if (numMatch) {
            const num = numMatch[1];
            const title = numMatch[2];
            return (
              <h3 key={idx} className="text-xl font-black text-[#0e3a4d] mt-6 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#f0f9fa] flex items-center justify-center text-[#4fd1d1] font-black text-xs shrink-0">
                  {num}
                </span>
                <span>{renderInlinePreview(title)}</span>
              </h3>
            );
          }
          
          return (
            <h3 key={idx} className="text-xl font-black text-[#0e3a4d] mt-6 mb-3">
              {renderInlinePreview(headingText)}
            </h3>
          );
        }

        // Subheadings (H4)
        if (trimmed.startsWith('#### ')) {
          const headingText = trimmed.substring(5).trim();
          return (
            <h4 key={idx} className="text-lg font-black text-[#0e3a4d] mt-4">
              {renderInlinePreview(headingText)}
            </h4>
          );
        }

        // Blockquotes / Callout box
        if (trimmed.startsWith('> ')) {
          const quoteLines = trimmed.split('\n').map(line => line.replace(/^>\s?/, ''));
          const quoteText = quoteLines.join(' ');
          return (
            <div key={idx} className="bg-[#f0f9fa] border-l-4 border-[#4fd1d1] p-4 rounded-r-xl italic text-xs text-slate-800 my-4">
              {renderInlinePreview(quoteText)}
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
            <ul key={idx} className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 my-3">
              {items.map((item, itemIdx) => (
                <li key={itemIdx}>{renderInlinePreview(item)}</li>
              ))}
            </ul>
          );
        }

        // Lead Paragraph (first block)
        if (idx === 0) {
          return (
            <p key={idx} className="text-base font-semibold text-[#0e3a4d] leading-relaxed">
              {renderInlinePreview(trimmed)}
            </p>
          );
        }

        // Standard Paragraph
        return (
          <p key={idx} className="text-sm leading-relaxed">
            {renderInlinePreview(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

const Backoffice: React.FC = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [loginError, setLoginError] = useState('');

  // Articles List & Filter State
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Editor State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [validationError, setValidationError] = useState('');

  // Export Modal State
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Backoffice mode tab (Blog or Facturas)
  const [backofficeMode, setBackofficeMode] = useState<'blog' | 'facturas'>('blog');

  // Invoice Generator State
  const [issuerName, setIssuerName] = useState('EMPORIUM E-COMMERCE SL');
  const [issuerNif, setIssuerNif] = useState('B56834153');
  const [issuerAddr, setIssuerAddr] = useState('Avd. Gandía 43 A 2º-16');
  const [issuerCity, setIssuerCity] = useState('03700 - Denia');
  const [issuerCountry, setIssuerCountry] = useState('España');
  const [issuerLogo, setIssuerLogo] = useState('EA');

  const [invoiceNum, setInvoiceNum] = useState('001');
  const [invoiceDate, setInvoiceDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  const [clientName, setClientName] = useState('LEJOSEL, S.L.');
  const [clientNif, setClientNif] = useState('B70792148');
  const [clientAddr, setClientAddr] = useState('Plaza Poeta Alfonso Canales, 4, 1º, 29001 Málaga');

  const [invoiceLines, setInvoiceLines] = useState<Array<{ id: number; desc: string; qty: number; price: number }>>([
    { id: 1, desc: '5 sesiones Gestión cuenta Amazon', qty: 1, price: 375 }
  ]);

  const [invoiceIva, setInvoiceIva] = useState(21);
  const [invoiceCurrency, setInvoiceCurrency] = useState('€');
  const [invoiceNotes, setInvoiceNotes] = useState('');
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  // Helper to add invoice line
  const addInvoiceLine = () => {
    const newId = invoiceLines.length > 0 ? Math.max(...invoiceLines.map(l => l.id)) + 1 : 1;
    setInvoiceLines([
      ...invoiceLines,
      { id: newId, desc: '', qty: 1, price: 0 }
    ]);
  };

  // Helper to remove invoice line
  const removeInvoiceLine = (id: number) => {
    setInvoiceLines(invoiceLines.filter(l => l.id !== id));
  };

  // Helper to update invoice line field
  const updateInvoiceLine = (id: number, field: 'desc' | 'qty' | 'price', value: any) => {
    setInvoiceLines(invoiceLines.map(l => {
      if (l.id === id) {
        if (field === 'qty') {
          return { ...l, qty: parseInt(value) || 0 };
        }
        if (field === 'price') {
          return { ...l, price: parseFloat(value) || 0 };
        }
        return { ...l, [field]: value };
      }
      return l;
    }));
  };

  // Calculation helpers
  const getSubtotal = () => {
    return invoiceLines.reduce((acc, l) => acc + (l.qty * l.price), 0);
  };

  const getIvaAmount = () => {
    return getSubtotal() * (invoiceIva / 100);
  };

  const getInvoiceTotal = () => {
    return getSubtotal() + getIvaAmount();
  };

  const formatCurrency = (amount: number) => {
    return amount.toFixed(2).replace('.', ',') + ' ' + invoiceCurrency;
  };

  // Email helper
  const sendByMail = () => {
    const subject = encodeURIComponent(`Factura ${invoiceNum} - ${issuerName}`);
    const body = encodeURIComponent(`Estimado/a ${clientName},\n\nAdjunto encontrarás la factura nº ${invoiceNum}.\nPara guardarla en PDF usa Imprimir → Guardar como PDF.\n\nSaludos,\n${issuerName}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  // Sync articles list on mount
  useEffect(() => {
    setArticles(getArticles());
  }, []);


  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passphrase === 'avanza2026') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Contraseña incorrecta. Inténtalo de nuevo.');
    }
  };

  // Helper to slugify title
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[áäâà]/g, 'a')
      .replace(/[éëêè]/g, 'e')
      .replace(/[íïîì]/g, 'i')
      .replace(/[óöôò]/g, 'o')
      .replace(/[úüûù]/g, 'u')
      .replace(/ñ/g, 'n')
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  // Open Editor for Creating New Article
  const handleAddNew = () => {
    const today = new Date();
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const formattedDate = `${today.getDate()} de ${months[today.getMonth()]}, ${today.getFullYear()}`;

    setEditingArticle({
      id: '',
      title: '',
      desc: '',
      category: 'Estrategia',
      readTime: 'Lectura de 5 min',
      date: formattedDate,
      author: 'Equipo Ecom Avanza',
      image: '/blog_seo_amazon.png',
      ctaText: '¿Quieres saber qué está frenando tus ventas en Amazon?',
      content: '',
      isDraft: true
    });
    setValidationError('');
    setActiveTab('edit');
    setIsEditorOpen(true);
  };

  // Open Editor for Editing Existing Article
  const handleEdit = (article: Article) => {
    setEditingArticle({ ...article });
    setValidationError('');
    setActiveTab('edit');
    setIsEditorOpen(true);
  };

  // Handle Input Changes in Editor
  const handleInputChange = (field: keyof Article, value: any) => {
    if (!editingArticle) return;
    const updated = { ...editingArticle, [field]: value };
    
    // Auto-generate slug/id from title if editing a new article (no id yet)
    if (field === 'title' && !editingArticle.id) {
      updated.id = slugify(value);
    }
    
    setEditingArticle(updated);
  };

  // Save Article
  const handleSave = () => {
    if (!editingArticle) return;
    
    const { id, title, desc, category, readTime, date, author, image, ctaText, content } = editingArticle;
    
    if (!id || !title?.trim() || !desc?.trim() || !category?.trim() || !content?.trim()) {
      setValidationError('Por favor rellena todos los campos obligatorios (ID, Título, Descripción corta, Categoría, y Contenido).');
      return;
    }

    // Verify Slug Uniqueness if it is a new article
    const existing = getArticles();
    const isNew = !existing.some(a => a.id === id);
    // If we're updating, we don't block
    const isEditingExisting = editingArticle.id === editingArticle.id && existing.some(a => a.id === id);
    
    const articleToSave: Article = {
      id: id,
      title: title,
      desc: desc,
      category: category || 'Estrategia',
      readTime: readTime || 'Lectura de 5 min',
      date: date || '',
      author: author || 'Equipo Ecom Avanza',
      image: image || '/blog_seo_amazon.png',
      ctaText: ctaText || '¿Quieres saber qué está frenando tus ventas en Amazon?',
      content: content,
      isDraft: editingArticle.isDraft !== undefined ? editingArticle.isDraft : true
    };

    saveArticle(articleToSave);
    setArticles(getArticles());
    setIsEditorOpen(false);
    setEditingArticle(null);
  };

  // Delete Article
  const handleDelete = (id: string, title: string) => {
    if (confirm(`¿Estás seguro de que quieres eliminar el artículo "${title}"?`)) {
      deleteArticle(id);
      setArticles(getArticles());
    }
  };

  // Toggle Draft Status directly from dashboard
  const handleToggleDraft = (article: Article) => {
    const updated = { ...article, isDraft: !article.isDraft };
    saveArticle(updated);
    setArticles(getArticles());
  };

  // Handle Clipboard Copy
  const handleCopyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle Download file
  const handleDownloadFile = (code: string) => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'articlesService.ts';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredArticles = articles.filter(art => 
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const exportedCode = generateTypeScriptCode(articles);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f0f9fa] flex items-center justify-center px-6 pt-24 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white max-w-md w-full rounded-[2.5rem] p-10 shadow-2xl border border-slate-100 relative overflow-hidden"
        >
          {/* Top Decorative Circle */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#4fd1d1]/10 rounded-full blur-2xl"></div>
          
          <div className="text-center mb-8 relative z-10">
            <div className="w-16 h-16 bg-[#0e3a4d] rounded-2xl flex items-center justify-center text-[#4fd1d1] mx-auto mb-6 shadow-xl shadow-[#0e3a4d]/10">
              <Lock size={28} />
            </div>
            <h2 className="text-3xl font-black text-[#0e3a4d] tracking-tight leading-none mb-3">Backoffice Acceso</h2>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Ecom Avanza - Blog Editor</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Contraseña de administrador</label>
              <input
                required
                type="password"
                placeholder="Escribe la contraseña..."
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none"
              />
            </div>

            {loginError && (
              <div className="rounded-xl bg-red-50 px-5 py-3 text-xs font-bold text-red-700 flex items-center gap-2">
                <AlertCircle size={16} />
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#0e3a4d] text-[#4fd1d1] py-5 rounded-2xl text-lg font-black shadow-xl shadow-[#0e3a4d]/10 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Ingresar al Panel
            </button>
            
            <a href="#" className="block text-center text-xs text-slate-400 hover:text-[#0e3a4d] font-bold transition-colors mt-4">
              ← Volver a la web pública
            </a>
          </form>
        </motion.div>
      </div>
    );
  }

  if (backofficeMode === 'facturas' && isPreviewVisible) {
    return (
      <div className="bg-slate-100 min-h-screen pt-28 pb-24 print-invoice-container">
        <style>{`
          @media print {
            body {
              background: white !important;
              color: black !important;
            }
            header, footer, nav, button, .no-print, .preview-bar {
              display: none !important;
            }
            main {
              margin: 0 !important;
              padding: 0 !important;
            }
            .invoice-preview-sheet {
              box-shadow: none !important;
              border: none !important;
              border-radius: 0 !important;
              max-width: 100% !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            .print-invoice-container {
              background: white !important;
              padding: 0 !important;
              min-height: auto !important;
            }
          }
        `}</style>
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Action Bar */}
          <div className="preview-bar flex justify-between items-center mb-6 no-print bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <button
              onClick={() => setIsPreviewVisible(false)}
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-[#0e3a4d] px-5 py-2.5 rounded-xl font-bold text-sm transition-all"
            >
              <ArrowLeft size={16} />
              Volver a editar
            </button>
            <div className="flex gap-3">
              <button
                onClick={sendByMail}
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-teal-600/10"
              >
                <Mail size={16} />
                Enviar por email
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 bg-[#0e3a4d] hover:bg-[#0e3a4d]/90 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-[#0e3a4d]/10"
              >
                <Printer size={16} className="text-[#4fd1d1]" />
                Imprimir / PDF
              </button>
            </div>
          </div>

          {/* Invoice A4 Sheet */}
          <div className="invoice-preview-sheet bg-white rounded-[2rem] p-12 md:p-16 shadow-xl border border-slate-100 font-sans text-[#111] max-w-4xl mx-auto">
            {/* Cabecera */}
            <div className="flex justify-between items-start mb-10 pb-8 border-b border-slate-100">
              <div>
                <h1 className="text-4xl font-black uppercase tracking-tight text-[#0e3a4d] mb-4">Factura</h1>
                <div className="text-sm leading-relaxed text-slate-700">
                  <strong className="block text-base font-extrabold text-[#0e3a4d] mb-1">{issuerName}</strong>
                  <div>NIF: {issuerNif}</div>
                  <div>{issuerAddr}</div>
                  <div>{issuerCity}</div>
                  <div>{issuerCountry}</div>
                </div>
              </div>

              {/* Logo EcomAvanza corporativo */}
              <div className="flex items-center gap-3 select-none shrink-0 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="w-10 h-10 bg-[#0e3a4d] rounded-xl flex items-center justify-center text-white font-black text-xl relative overflow-hidden shadow-md">
                   <span className="relative z-10">E</span>
                   <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#4fd1d1] rotate-45 translate-x-1 translate-y-1"></div>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-lg font-black tracking-tighter leading-none text-[#0e3a4d]">
                    ECOM
                  </span>
                  <span className="text-[0.55rem] font-black tracking-[0.3em] leading-none text-[#4fd1d1]">
                    AVANZA
                  </span>
                </div>
              </div>
            </div>

            {/* Meta e Info de Factura */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="text-xs uppercase font-black tracking-widest text-[#4fd1d1] mb-2">Facturar a</h3>
                <div className="text-sm leading-relaxed text-slate-800">
                  <strong className="block font-extrabold text-[#0e3a4d] mb-1">{clientName}</strong>
                  <div className="whitespace-pre-line">{clientAddr}</div>
                  <div className="mt-1 font-bold">NIF: {clientNif}</div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-end text-right">
                <div className="mb-4">
                  <div className="text-[10px] uppercase font-black tracking-widest text-slate-400">Nº de Factura</div>
                  <div className="text-xl font-black text-[#0e3a4d]">{invoiceNum}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-slate-400">Fecha</div>
                  <div className="text-sm font-bold text-[#0e3a4d]">
                    {invoiceDate ? new Date(invoiceDate).toLocaleDateString('es-ES') : ''}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabla de líneas */}
            <div className="overflow-x-auto mb-10">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0e3a4d] text-white text-xs font-black uppercase tracking-wider">
                    <th className="py-3 px-4 rounded-l-xl text-center w-20">Cant.</th>
                    <th className="py-3 px-4">Descripción</th>
                    <th className="py-3 px-4 text-right w-36">Precio Unitario</th>
                    <th className="py-3 px-4 rounded-r-xl text-right w-36">Importe</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {invoiceLines.map((line) => (
                    <tr key={line.id}>
                      <td className="py-4 px-4 text-center text-slate-600 font-bold">{line.qty}</td>
                      <td className="py-4 px-4 font-semibold text-slate-800">{line.desc}</td>
                      <td className="py-4 px-4 text-right text-slate-600 font-medium">{formatCurrency(line.price)}</td>
                      <td className="py-4 px-4 text-right font-bold text-[#0e3a4d]">{formatCurrency(line.qty * line.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totales */}
            <div className="flex justify-end mb-10">
              <table className="w-64 text-sm font-semibold text-slate-700">
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-2 text-slate-400 uppercase font-black text-[10px] tracking-wider">Subtotal</td>
                    <td className="py-2 text-right font-bold text-[#0e3a4d]">{formatCurrency(getSubtotal())}</td>
                  </tr>
                  {invoiceIva > 0 && (
                    <tr className="border-b border-slate-100">
                      <td className="py-2 text-slate-400 uppercase font-black text-[10px] tracking-wider">IVA ({invoiceIva}%)</td>
                      <td className="py-2 text-right font-bold text-[#0e3a4d]">{formatCurrency(getIvaAmount())}</td>
                    </tr>
                  )}
                  <tr className="text-lg font-black text-[#0e3a4d]">
                    <td className="py-3 uppercase text-xs tracking-wider">Total</td>
                    <td className="py-3 text-right text-2xl font-black text-[#0e3a4d]">{formatCurrency(getInvoiceTotal())}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Observaciones */}
            {invoiceNotes && (
              <div className="border-t border-slate-100 pt-6 mt-8">
                <h4 className="text-[10px] uppercase font-black tracking-widest text-[#4fd1d1] mb-2">Observaciones / Forma de pago</h4>
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{invoiceNotes}</p>
              </div>
            )}

            {/* Pie de factura */}
            <div className="mt-12 pt-6 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <div>Generado con Facturador EcomAvanza</div>
              <div>{new Date().toLocaleDateString('es-ES')}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f0f9fa] min-h-screen pt-28 pb-24">

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 mb-8 no-print gap-2">
          <button
            onClick={() => { setBackofficeMode('blog'); setIsPreviewVisible(false); }}
            className={`py-3.5 px-6 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${
              backofficeMode === 'blog'
                ? 'border-[#0e3a4d] text-[#0e3a4d]'
                : 'border-transparent text-slate-400 hover:text-[#0e3a4d]'
            }`}
          >
            Gestión de Blog
          </button>
          <button
            onClick={() => setBackofficeMode('facturas')}
            className={`py-3.5 px-6 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${
              backofficeMode === 'facturas'
                ? 'border-[#0e3a4d] text-[#0e3a4d]'
                : 'border-transparent text-slate-400 hover:text-[#0e3a4d]'
            }`}
          >
            Generador de Facturas
          </button>
        </div>

        {backofficeMode === 'blog' ? (
          <>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-[#0e3a4d]/5 text-[#0e3a4d] font-black text-[10px] uppercase tracking-widest">
                    Panel de Control
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-green-600 font-extrabold uppercase bg-green-50 px-2 py-0.5 rounded-full">
                    <Sparkles size={10} /> Conectado local
                  </span>
                </div>
                <h1 className="text-4xl font-black text-[#0e3a4d] tracking-tight">Blog Amazon - Backoffice</h1>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setIsExportOpen(true)}
                  className="inline-flex items-center gap-2 bg-white text-[#0e3a4d] border border-[#0e3a4d]/10 hover:border-[#0e3a4d]/30 px-6 py-3.5 rounded-2xl font-black text-sm shadow-sm transition-all active:scale-95"
                >
                  <FileCode size={18} className="text-[#4fd1d1]" />
                  Exportar Cambios a Código
                </button>
                <button
                  onClick={handleAddNew}
                  className="inline-flex items-center gap-2 bg-[#0e3a4d] text-white hover:bg-[#0e3a4d]/90 px-6 py-3.5 rounded-2xl font-black text-sm shadow-lg shadow-[#0e3a4d]/10 transition-all active:scale-95"
                >
                  <Plus size={18} className="text-[#4fd1d1]" />
                  Añadir Nuevo Artículo
                </button>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-slate-100">
              {/* Search bar & statistics */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 border-b border-slate-100 pb-6">
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Buscar artículo por título o categoría..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm"
                  />
                </div>
                <div className="text-sm font-bold text-slate-500 shrink-0">
                  Total: <span className="text-[#0e3a4d] font-black">{articles.length}</span> artículos |
                  Publicados: <span className="text-green-600 font-black">{articles.filter(a => !a.isDraft).length}</span> |
                  Borradores: <span className="text-amber-500 font-black">{articles.filter(a => a.isDraft).length}</span>
                </div>
              </div>

              {/* Table list */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-wider">
                      <th className="pb-4 pl-4">Detalles del Artículo</th>
                      <th className="pb-4">Categoría</th>
                      <th className="pb-4">Fecha / Autor</th>
                      <th className="pb-4 text-center">Estado</th>
                      <th className="pb-4 pr-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                    {filteredArticles.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-400 font-medium italic">
                          No se encontraron artículos.
                        </td>
                      </tr>
                    ) : (
                      filteredArticles.map((art) => (
                        <tr key={art.id} className="hover:bg-slate-50/50 transition-colors">
                          {/* Image + Title */}
                          <td className="py-5 pl-4 flex items-center gap-4 max-w-sm">
                            <div className="w-14 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                              <img src={art.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-extrabold text-[#0e3a4d] truncate max-w-xs" title={art.title}>
                                {art.title}
                              </h4>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight block truncate">
                                ID/Slug: {art.id}
                              </span>
                            </div>
                          </td>
                          {/* Category */}
                          <td className="py-5">
                            <span className="px-2.5 py-1 rounded-full bg-[#f0f9fa] text-[#4fd1d1] font-black text-xs uppercase tracking-wider">
                              {art.category}
                            </span>
                          </td>
                          {/* Date & Author */}
                          <td className="py-5 text-xs">
                            <div className="font-bold text-[#0e3a4d]">{art.date}</div>
                            <div className="text-slate-400">{art.author}</div>
                          </td>
                          {/* Status (Toggle) */}
                          <td className="py-5 text-center">
                            <button
                              onClick={() => handleToggleDraft(art)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider transition-colors ${
                                art.isDraft 
                                  ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' 
                                  : 'bg-green-50 text-green-600 hover:bg-green-100'
                              }`}
                            >
                              {art.isDraft ? (
                                <>
                                  <EyeOff size={12} />
                                  Borrador
                                </>
                              ) : (
                                <>
                                  <Eye size={12} />
                                  Publicado
                                </>
                              )}
                            </button>
                          </td>
                          {/* Actions */}
                          <td className="py-5 pr-4 text-right">
                            <div className="inline-flex gap-2">
                              <a
                                href={`#blog/${art.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-slate-400 hover:text-[#0e3a4d] hover:bg-slate-100 rounded-xl transition-all"
                                title="Ver en el Blog"
                              >
                                <Eye size={16} />
                              </a>
                              <button
                                onClick={() => handleEdit(art)}
                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                title="Editar"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(art.id, art.title)}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                title="Eliminar"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-[#0e3a4d]/5 text-[#0e3a4d] font-black text-[10px] uppercase tracking-widest">
                    Facturación
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-green-600 font-extrabold uppercase bg-green-50 px-2 py-0.5 rounded-full">
                    <Sparkles size={10} /> Herramienta de Gestión
                  </span>
                </div>
                <h1 className="text-4xl font-black text-[#0e3a4d] tracking-tight">Generador de Facturas</h1>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Emisor Card */}
              <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 space-y-6">
                <h2 className="text-sm font-black uppercase tracking-widest text-[#0e3a4d] border-b border-slate-100 pb-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#4fd1d1] rounded-full"></span>
                  Datos del Emisor (Tu empresa)
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Nombre / Razón social</label>
                    <input
                      type="text"
                      value={issuerName}
                      onChange={(e) => setIssuerName(e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">CIF / NIF</label>
                    <input
                      type="text"
                      value={issuerNif}
                      onChange={(e) => setIssuerNif(e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Dirección</label>
                    <input
                      type="text"
                      value={issuerAddr}
                      onChange={(e) => setIssuerAddr(e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">CP - Ciudad</label>
                    <input
                      type="text"
                      value={issuerCity}
                      onChange={(e) => setIssuerCity(e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">País</label>
                    <input
                      type="text"
                      value={issuerCountry}
                      onChange={(e) => setIssuerCountry(e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Siglas logo (2-3 letras)</label>
                    <input
                      type="text"
                      maxLength={4}
                      value={issuerLogo}
                      onChange={(e) => setIssuerLogo(e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Cliente y Factura Meta Card */}
              <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 space-y-6">
                <h2 className="text-sm font-black uppercase tracking-widest text-[#0e3a4d] border-b border-slate-100 pb-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#4fd1d1] rounded-full"></span>
                  Datos del Cliente y Factura
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Nº Factura</label>
                    <input
                      type="text"
                      value={invoiceNum}
                      onChange={(e) => setInvoiceNum(e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Fecha</label>
                    <input
                      type="date"
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Cliente - Nombre / Razón social</label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Cliente - NIF / CIF</label>
                    <input
                      type="text"
                      value={clientNif}
                      onChange={(e) => setClientNif(e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Cliente - Dirección completa</label>
                  <textarea
                    rows={2}
                    value={clientAddr}
                    onChange={(e) => setClientAddr(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Lines Card */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 mb-8 space-y-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-[#0e3a4d] border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#4fd1d1] rounded-full"></span>
                Líneas de Factura
              </h2>

              <div className="hidden md:grid grid-cols-12 gap-4 font-black text-[10px] text-slate-400 uppercase tracking-widest px-4 border-b border-slate-100 pb-2">
                <span className="col-span-5">Descripción</span>
                <span className="col-span-2 text-center">Cant.</span>
                <span className="col-span-2 text-right">Precio Unit.</span>
                <span className="col-span-2 text-right">Importe</span>
                <span className="col-span-1"></span>
              </div>

              <div className="space-y-3">
                {invoiceLines.map((line) => (
                  <div key={line.id} className="grid grid-cols-12 gap-4 border-b md:border-none border-slate-100 pb-4 md:pb-0 items-center">
                    <div className="col-span-12 md:col-span-5 space-y-1">
                      <label className="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Descripción</label>
                      <input
                        type="text"
                        placeholder="Descripción del servicio o producto"
                        value={line.desc}
                        onChange={(e) => updateInvoiceLine(line.id, 'desc', e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-semibold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm"
                      />
                    </div>
                    
                    <div className="col-span-4 md:col-span-2 space-y-1">
                      <label className="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Cantidad</label>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={line.qty}
                        onChange={(e) => updateInvoiceLine(line.id, 'qty', e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-semibold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm text-center"
                      />
                    </div>

                    <div className="col-span-4 md:col-span-2 space-y-1">
                      <label className="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Precio Unitario</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={line.price}
                        onChange={(e) => updateInvoiceLine(line.id, 'price', e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-semibold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm text-right"
                      />
                    </div>

                    <div className="col-span-4 md:col-span-2 space-y-1">
                      <label className="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Importe</label>
                      <div className="w-full bg-slate-100 rounded-2xl py-3.5 px-5 text-slate-500 font-bold text-sm text-right">
                        {formatCurrency(line.qty * line.price)}
                      </div>
                    </div>

                    <div className="col-span-12 md:col-span-1 flex justify-end md:justify-center">
                      <button
                        onClick={() => removeInvoiceLine(line.id)}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                        title="Eliminar línea"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addInvoiceLine}
                className="w-full py-4 bg-slate-50 hover:bg-slate-100/80 text-[#0e3a4d] border border-dashed border-[#0e3a4d]/20 rounded-2xl font-black text-sm transition-all shadow-sm"
              >
                + Añadir Línea de Factura
              </button>
            </div>

            {/* IVA, Currency and Notes Card */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 mb-8 space-y-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-[#0e3a4d] border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#4fd1d1] rounded-full"></span>
                IVA y Observaciones
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">IVA (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={invoiceIva}
                    onChange={(e) => setInvoiceIva(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Moneda</label>
                  <select
                    value={invoiceCurrency}
                    onChange={(e) => setInvoiceCurrency(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm"
                  >
                    <option value="€">€ Euro</option>
                    <option value="$">$ USD</option>
                    <option value="£">£ GBP</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Notas / Forma de pago (opcional)</label>
                <textarea
                  rows={3}
                  value={invoiceNotes}
                  onChange={(e) => setInvoiceNotes(e.target.value)}
                  placeholder="Ej: Transferencia bancaria. IBAN: ES00 0000 0000 0000..."
                  className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm resize-none"
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex justify-end">
              <button
                onClick={() => setIsPreviewVisible(true)}
                className="inline-flex items-center gap-2 bg-[#0e3a4d] text-white hover:bg-[#0e3a4d]/90 px-8 py-4 rounded-2xl font-black text-sm shadow-lg shadow-[#0e3a4d]/10 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <Eye size={18} className="text-[#4fd1d1]" />
                Previsualizar Factura
              </button>
            </div>
          </>
        )}
      </div>


      {/* Editor Drawer/Modal Overlay */}
      <AnimatePresence>
        {isEditorOpen && editingArticle && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditorOpen(false)}
              className="absolute inset-0 bg-black"
            />
            {/* Form Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl bg-white h-screen shadow-2xl flex flex-col z-10"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 shrink-0 bg-[#0e3a4d] text-white">
                <div>
                  <h3 className="text-xl font-black">
                    {editingArticle.title ? 'Editar Artículo' : 'Añadir Nuevo Artículo'}
                  </h3>
                  <p className="text-xs text-[#4fd1d1] font-bold">
                    {editingArticle.id ? `ID: ${editingArticle.id}` : 'Creando artículo nuevo'}
                  </p>
                </div>
                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Validation error banner */}
              {validationError && (
                <div className="bg-red-50 px-8 py-3 text-xs font-bold text-red-700 flex items-center gap-2 border-b border-red-100 shrink-0">
                  <AlertCircle size={16} />
                  {validationError}
                </div>
              )}

              {/* Drawer Tabs */}
              <div className="flex border-b border-slate-100 px-8 bg-slate-50 shrink-0">
                <button
                  onClick={() => setActiveTab('edit')}
                  className={`py-3 px-5 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
                    activeTab === 'edit'
                      ? 'border-[#4fd1d1] text-[#0e3a4d]'
                      : 'border-transparent text-slate-400 hover:text-[#0e3a4d]'
                  }`}
                >
                  Editor de Datos
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`py-3 px-5 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
                    activeTab === 'preview'
                      ? 'border-[#4fd1d1] text-[#0e3a4d]'
                      : 'border-transparent text-slate-400 hover:text-[#0e3a4d]'
                  }`}
                >
                  Vista Previa en Vivo
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-8">
                {activeTab === 'edit' ? (
                  <div className="space-y-6">
                    {/* General Fields */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                          Título del Artículo <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          value={editingArticle.title || ''}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          placeholder="Ej. Estrategias de PPC en Amazon"
                          className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                          ID / Slug del Artículo (Solo minúsculas y guiones) <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          value={editingArticle.id || ''}
                          onChange={(e) => handleInputChange('id', slugify(e.target.value))}
                          placeholder="ej-estrategias-de-ppc-en-amazon"
                          className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                          Categoría <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          value={editingArticle.category || ''}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          placeholder="Ej. Amazon Ads"
                          className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                          Tiempo de Lectura
                        </label>
                        <input
                          type="text"
                          value={editingArticle.readTime || ''}
                          onChange={(e) => handleInputChange('readTime', e.target.value)}
                          placeholder="Ej. Lectura de 5 min"
                          className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                          Fecha de Publicación
                        </label>
                        <input
                          type="text"
                          value={editingArticle.date || ''}
                          onChange={(e) => handleInputChange('date', e.target.value)}
                          placeholder="Ej. 10 de Junio, 2026"
                          className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                          Autor
                        </label>
                        <input
                          type="text"
                          value={editingArticle.author || ''}
                          onChange={(e) => handleInputChange('author', e.target.value)}
                          className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                          Estado del artículo
                        </label>
                        <div className="flex items-center gap-3 py-2">
                          <button
                            type="button"
                            onClick={() => handleInputChange('isDraft', !editingArticle.isDraft)}
                            className="text-[#0e3a4d] focus:outline-none"
                          >
                            {editingArticle.isDraft ? (
                              <ToggleLeft size={40} className="text-slate-400" />
                            ) : (
                              <ToggleRight size={40} className="text-[#4fd1d1]" />
                            )}
                          </button>
                          <span className="text-sm font-bold text-[#0e3a4d]">
                            {editingArticle.isDraft 
                              ? 'Guardar como Borrador (No visible en portada)' 
                              : 'Guardar y Publicar (Visible para todos)'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                        URL de Imagen de Portada
                      </label>
                      <input
                        type="text"
                        value={editingArticle.image || ''}
                        onChange={(e) => handleInputChange('image', e.target.value)}
                        placeholder="Ej. /blog_seo_amazon.png o una URL de Imgur/Unsplash"
                        className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm"
                      />
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight ml-4">
                        Puedes alojar imágenes en Imgur o Unsplash y pegar el enlace directo aquí.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                        Descripción Corta (Usada en las tarjetas del blog) <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={editingArticle.desc || ''}
                        onChange={(e) => handleInputChange('desc', e.target.value)}
                        placeholder="Escribe un resumen atractivo para los listados de artículos..."
                        className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                        Llamada a la Acción (CTA en pie de página)
                      </label>
                      <input
                        type="text"
                        value={editingArticle.ctaText || ''}
                        onChange={(e) => handleInputChange('ctaText', e.target.value)}
                        placeholder="Ej. ¿Quieres saber qué está frenando tus ventas en Amazon?"
                        className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-5 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm"
                      />
                    </div>

                    {/* Markdown Content Editor */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between ml-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Contenido del Artículo (Markdown) <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[9px] text-[#4fd1d1] font-black uppercase tracking-wider">
                          Usa ### para títulos | - para listas | &gt; para citas
                        </span>
                      </div>
                      <textarea
                        required
                        rows={15}
                        value={editingArticle.content || ''}
                        onChange={(e) => handleInputChange('content', e.target.value)}
                        placeholder={`El primer párrafo se renderizará automáticamente como introducción destacada.\n\n### 1. Utilizar palabras clave\nContenido de la sección...\n\n- Detalle 1\n- Detalle 2\n\n> "Una cita importante en caja de color"`}
                        className="w-full bg-slate-50 border-none rounded-2xl py-5 px-6 text-[#0e3a4d] font-mono focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-sm resize-y"
                      />
                    </div>
                  </div>
                ) : (
                  // Live Preview Tab
                  <div className="bg-slate-50/50 rounded-3xl p-6 md:p-10 border border-slate-100 max-w-3xl mx-auto">
                    {/* Fake Blog Header */}
                    <div className="mb-6 pb-6 border-b border-slate-200/60">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#f0f9fa] text-[#4fd1d1] font-black text-[10px] uppercase tracking-wider mb-4">
                        {editingArticle.category || 'Categoría'}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-black text-[#0e3a4d] mb-4">
                        {editingArticle.title || 'Título del Artículo'}
                      </h2>
                      <div className="flex flex-wrap gap-4 text-xs text-slate-400 font-bold uppercase">
                        <span className="flex items-center gap-1"><User size={12} /> {editingArticle.author}</span>
                        <span className="flex items-center gap-1"><Calendar size={12} /> {editingArticle.date}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {editingArticle.readTime}</span>
                      </div>
                    </div>
                    
                    {/* Rendered content */}
                    <MarkdownPreviewRenderer content={editingArticle.content || ''} />

                    {/* Fake CTA Footer */}
                    <div className="mt-8 bg-[#0e3a4d] rounded-2xl p-6 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#4fd1d1]/10 rounded-full blur-xl"></div>
                      <div className="relative z-10 text-xs">
                        <span className="text-[#4fd1d1] font-black block mb-2 uppercase">Auditoría Estratégica Gratuita</span>
                        <h4 className="font-extrabold text-sm mb-2">{editingArticle.ctaText}</h4>
                        <div className="inline-block bg-[#4fd1d1] text-[#0e3a4d] px-4 py-2 rounded-lg font-black text-[10px] mt-2">
                          Reservar Auditoría
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer Actions */}
              <div className="px-8 py-5 border-t border-slate-100 bg-slate-50 flex justify-between shrink-0">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-6 py-3 rounded-xl border border-slate-200 hover:border-slate-300 font-bold text-slate-500 hover:text-slate-700 transition-colors text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 bg-[#0e3a4d] hover:bg-[#0e3a4d]/90 text-white px-8 py-3 rounded-xl font-black text-sm shadow-md shadow-[#0e3a4d]/10 transition-all"
                >
                  <Save size={16} className="text-[#4fd1d1]" />
                  Guardar Artículo
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Export Code Modal */}
      <AnimatePresence>
        {isExportOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExportOpen(false)}
              className="absolute inset-0 bg-black"
            />
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white w-full max-w-3xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl z-10 border border-slate-100 flex flex-col max-h-[85vh]"
            >
              <button
                onClick={() => setIsExportOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="mb-6">
                <h3 className="text-2xl font-black text-[#0e3a4d] tracking-tight mb-2">Sincronización con Git / Código</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-semibold">
                  Dado que esta web funciona de manera estática en producción, tus artículos creados o modificados se guardan actualmente en la memoria de tu navegador (`localStorage`).
                  Para publicarlos definitivamente para todo el mundo, copia este código, reemplaza el contenido de tu archivo <code className="bg-slate-50 text-[#0e3a4d] px-1.5 py-0.5 rounded font-mono border border-slate-100 text-xs">services/articlesService.ts</code> y haz un commit.
                </p>
              </div>

              {/* Code display */}
              <div className="flex-1 overflow-y-auto bg-slate-900 rounded-2xl p-5 border border-slate-800 font-mono text-[11px] text-slate-300 relative max-h-[45vh] shadow-inner select-all">
                <pre>{exportedCode}</pre>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row sm:justify-end gap-3">
                <button
                  onClick={() => handleCopyToClipboard(exportedCode)}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-black transition-all ${
                    copied 
                      ? 'bg-green-600 text-white' 
                      : 'bg-white text-[#0e3a4d] border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      ¡Copiado!
                    </>
                  ) : (
                    <>
                      <Copy size={16} className="text-[#4fd1d1]" />
                      Copiar Código
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDownloadFile(exportedCode)}
                  className="inline-flex items-center justify-center gap-2 bg-[#0e3a4d] text-white hover:bg-[#0e3a4d]/90 px-6 py-3.5 rounded-xl font-black text-sm shadow-md transition-all"
                >
                  <Download size={16} className="text-[#4fd1d1]" />
                  Descargar articlesService.ts
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Backoffice;
