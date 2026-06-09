import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, ChevronRight, User } from 'lucide-react';

interface Article {
  title: string;
  subtitle?: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  content: React.ReactNode;
  ctaText: string;
}

interface BlogArticleProps {
  articleId: string;
}

const BlogArticle: React.FC<BlogArticleProps> = ({ articleId }) => {
  const articles: Record<string, Article> = {
    'seo-amazon': {
      title: "SEO Amazon: los 7 factores que realmente mejoran el posicionamiento de un producto",
      category: "Posicionamiento Orgánico",
      readTime: "Lectura de 6 min",
      date: "9 de Junio, 2026",
      author: "Equipo Ecom Avanza",
      image: "/blog_seo_amazon.png",
      ctaText: "¿Quieres saber qué está frenando tus ventas en Amazon?",
      content: (
        <div className="space-y-8 text-slate-700 leading-relaxed font-medium">
          <p className="text-lg md:text-xl font-semibold text-[#0e3a4d] leading-relaxed">
            Si vendes en Amazon, seguramente te has hecho esta pregunta alguna vez:
            ¿Por qué algunos productos aparecen constantemente en la primera página mientras otros apenas reciben visitas?
          </p>
          <p>
            La respuesta corta es sencilla: <strong>Amazon quiere mostrar los productos que tienen más probabilidades de generar una venta.</strong>
          </p>
          <p>
            A diferencia de Google, donde el contenido y los enlaces tienen mucho peso, Amazon es un buscador orientado a la compra. Su objetivo es que el cliente encuentre lo que busca y termine comprando.
          </p>
          <p>
            Por eso, cuando hablamos de SEO Amazon, no se trata únicamente de añadir palabras clave a un listado. Se trata de optimizar todos los elementos que ayudan a vender más.
          </p>
          
          <div className="my-10 h-px bg-slate-100"></div>

          <h3 className="text-2xl font-black text-[#0e3a4d] mt-8 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#f0f9fa] flex items-center justify-center text-[#4fd1d1] font-black text-sm">1</span>
            Utilizar las palabras clave correctas
          </h3>
          <p>Todo empieza aquí. Amazon necesita entender qué producto estás vendiendo para mostrarlo en las búsquedas adecuadas.</p>
          <p>Las palabras clave más importantes deberían aparecer de forma natural en:</p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600">
            <li>El título.</li>
            <li>Los bullet points.</li>
            <li>La descripción.</li>
            <li>El contenido A+.</li>
            <li>Los términos de búsqueda del backend (Search Terms).</li>
          </ul>
          <p className="bg-[#f0f9fa] border-l-4 border-[#4fd1d1] p-4 rounded-r-xl italic text-sm text-slate-800">
            "Uno de los errores más comunes es intentar posicionar para demasiadas palabras clave al mismo tiempo. Es mejor aparecer bien para las búsquedas que realmente generan ventas que intentar abarcarlo todo."
          </p>

          <h3 className="text-2xl font-black text-[#0e3a4d] mt-8 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#f0f9fa] flex items-center justify-center text-[#4fd1d1] font-black text-sm">2</span>
            Un título que ayude a posicionar y vender
          </h3>
          <p>El título es uno de los elementos más importantes del listado. No solo ayuda al algoritmo a entender el producto, también influye directamente en el porcentaje de clics (CTR).</p>
          <p>Un buen título suele incluir:</p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600">
            <li>La palabra clave principal.</li>
            <li>Alguna característica diferenciadora (tamaño, color, pack).</li>
            <li>Información relevante para el comprador.</li>
          </ul>
          <p>El objetivo no es llenar el título de palabras sin sentido. El objetivo es que el cliente entienda rápidamente qué está viendo y se anime a hacer clic.</p>

          <h3 className="text-2xl font-black text-[#0e3a4d] mt-8 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#f0f9fa] flex items-center justify-center text-[#4fd1d1] font-black text-sm">3</span>
            Imágenes que aumenten la conversión
          </h3>
          <p>Muchas veces el problema no es el posicionamiento. Es la conversión (CR). Puedes aparecer para una búsqueda importante, pero si el cliente no hace clic o no compra, Amazon terminará reduciendo tu visibilidad.</p>
          <p>Las imágenes suelen ser uno de los factores que más impacto tienen. Además de la imagen principal, las imágenes secundarias deberían responder preguntas como:</p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600">
            <li>¿Qué problema resuelve el producto?</li>
            <li>¿Qué beneficios aporta?</li>
            <li>¿Qué lo diferencia de otras opciones del mercado?</li>
          </ul>
          <p>Una ficha visualmente clara e infográfica suele convertir mejor. Y una mejor conversión siempre se traduce en mejores posiciones orgánicas.</p>

          <h3 className="text-2xl font-black text-[#0e3a4d] mt-8 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#f0f9fa] flex items-center justify-center text-[#4fd1d1] font-black text-sm">4</span>
            El porcentaje de conversión
          </h3>
          <p>Amazon presta muchísima atención a cómo responden los clientes cuando visitan una ficha. Si dos productos reciben el mismo número de visitas pero uno vende significativamente más, el algoritmo entiende cuál está satisfaciendo mejor la búsqueda del usuario.</p>
          <p>Por eso, pequeños cambios en el listado pueden tener un gran impacto:</p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600">
            <li>Mejorar imágenes principales y de detalle.</li>
            <li>Reescribir los bullet points enfocándolos en beneficios y no en características.</li>
            <li>Añadir contenido A+ premium con tablas comparativas.</li>
            <li>Resolver las dudas más frecuentes en la descripción.</li>
          </ul>
          <p>En muchas cuentas que analizamos, el problema principal no es la falta de tráfico. Es que la ficha de producto no convierte lo suficiente.</p>

          <h3 className="text-2xl font-black text-[#0e3a4d] mt-8 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#f0f9fa] flex items-center justify-center text-[#4fd1d1] font-black text-sm">5</span>
            Las reseñas y valoraciones
          </h3>
          <p>Las reseñas no son un factor mágico y directo de posicionamiento, pero sí influyen directamente en la confianza del comprador. Y la confianza influye directamente en las ventas.</p>
          <p>Un producto con mejores valoraciones suele conseguir más clics, más conversiones y menos dudas antes de comprar. La clave no está únicamente en acumular reseñas a toda costa, sino en mantener una valoración competitiva (idealmente por encima de 4.3 estrellas) dentro de tu categoría.</p>

          <h3 className="text-2xl font-black text-[#0e3a4d] mt-8 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#f0f9fa] flex items-center justify-center text-[#4fd1d1] font-black text-sm">6</span>
            Mantener stock disponible
          </h3>
          <p>Parece obvio, pero sigue siendo uno de los errores más caros que cometen muchos vendedores. Cuando un producto se queda sin stock, deja de generar ventas de inmediato.</p>
          <p>Y cuando deja de generar ventas, pierde fuerza y relevancia dentro del algoritmo de Amazon. Recuperar las posiciones originales después de una rotura de stock puede llevar semanas o incluso meses, dependiendo de la categoría y la competencia. Por eso la gestión de inventario es una parte fundamental del SEO.</p>

          <h3 className="text-2xl font-black text-[#0e3a4d] mt-8 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#f0f9fa] flex items-center justify-center text-[#4fd1d1] font-black text-sm">7</span>
            La velocidad de ventas
          </h3>
          <p>Amazon analiza constantemente el rendimiento de cada ASIN a corto y medio plazo. Cuando un producto empieza a vender por encima de la media de su categoría, gana visibilidad de forma exponencial.</p>
          <p>Por eso, las mejores estrategias de crecimiento combinan SEO y publicidad (Amazon PPC). La publicidad no mejora directamente el posicionamiento orgánico, pero genera ventas adicionales que ayudan al algoritmo a identificar que existe demanda real para ese producto, acelerando el SEO.</p>

          <div className="my-10 h-px bg-slate-100"></div>

          <h4 className="text-xl font-black text-[#0e3a4d] mt-6">Entonces, ¿qué factor es el más importante?</h4>
          <p>Si tuviéramos que resumir el SEO Amazon en una sola frase, sería esta: <strong>Amazon posiciona los productos que tienen más probabilidades de venderse.</strong></p>
          <p>Las palabras clave ayudan al algoritmo a entender qué es el producto, pero las ventas, la conversión, las imágenes, las reseñas y la experiencia de usuario son las que determinan qué productos ocupan las primeras posiciones.</p>
          
          <h4 className="text-xl font-black text-[#0e3a4d] mt-6">Conclusión</h4>
          <p>No existe un truco ni una optimización milagrosa. El crecimiento sostenible llega cuando todos los elementos funcionan juntos de manera coordinada. Cuando eso ocurre, Amazon tiene todos los motivos para seguir recomendando tu producto en lo más alto.</p>
        </div>
      )
    },
    'amazon-ppc': {
      title: "Amazon PPC: cuánto invertir para crecer sin disparar el ACOS",
      category: "Amazon Ads",
      readTime: "Lectura de 5 min",
      date: "9 de Junio, 2026",
      author: "Equipo Ecom Avanza",
      image: "/blog_amazon_ppc.png",
      ctaText: "¿No tienes claro si tus campañas están siendo rentables?",
      content: (
        <div className="space-y-8 text-slate-700 leading-relaxed font-medium">
          <p className="text-lg md:text-xl font-semibold text-[#0e3a4d] leading-relaxed">
            Una de las preguntas que más escuchamos de vendedores en Amazon es: ¿Cuánto debería invertir en publicidad?
            Y la respuesta suele decepcionar: no existe una cifra universal ni una fórmula mágica aplicable a todas las marcas.
          </p>
          <p>
            Sin embargo, sí hay una realidad que vemos constantemente: muchos vendedores están invirtiendo demasiado poco para crecer, o demasiado para lo que están vendiendo. Ambos extremos destruyen la rentabilidad.
          </p>

          <div className="my-10 h-px bg-slate-100"></div>

          <h3 className="text-2xl font-black text-[#0e3a4d] mt-8 mb-4">El error de fijar un presupuesto al azar</h3>
          <p>Algunos vendedores deciden invertir 20€, 50€ o 100€ al día simplemente porque les parece una cantidad razonable y cómoda. El problema es que el sistema de pujas de Amazon no funciona por impulsos.</p>
          <p>El presupuesto publicitario debe estar directamente relacionado con:</p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600">
            <li>El precio de venta del producto.</li>
            <li>El margen neto disponible.</li>
            <li>El volumen de búsquedas de los términos clave.</li>
            <li>El nivel de competencia de la categoría.</li>
            <li>El objetivo de la campaña (lanzamiento vs. rentabilidad).</li>
          </ul>

          <h3 className="text-2xl font-black text-[#0e3a4d] mt-8 mb-4">Antes de invertir más, conoce tus números reales</h3>
          <p>La publicidad no debería gestionarse mirando únicamente la facturación final. Antes de aumentar cualquier presupuesto, debes hacerte la siguiente pregunta: <strong>¿Cuánto puedes permitirte gastar para conseguir una venta sin perder dinero?</strong></p>
          <p>Sorprendentemente, muchos vendedores no tienen este número claro. Conocen el precio del producto, pero no han restado con precisión costes clave como:</p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600">
            <li>Coste de fabricación/adquisición del producto.</li>
            <li>Transporte internacional, nacional y aranceles.</li>
            <li>Comisiones fijas de venta de Amazon (normalmente 15%).</li>
            <li>Tarifas de logística FBA (almacenamiento y envío).</li>
            <li>Tasa estimada de devoluciones.</li>
            <li>Impuestos (IVA).</li>
          </ul>
          <p>Cuando restas todo esto, obtienes tu margen neto. Ese margen determina tu límite de gasto publicitario. Si tu margen es de 9€ por unidad, gastar 12€ de media en publicidad para conseguir una venta te está costando dinero directamente.</p>

          <h3 className="text-2xl font-black text-[#0e3a4d] mt-8 mb-4">Entender el ACOS antes de aumentar la inversión</h3>
          <p>El ACOS (Advertising Cost of Sales) representa la relación entre el gasto publicitario y las ventas generadas directamente por la publicidad. La pregunta clave no es si tu ACOS es alto o bajo, sino si es menor que tu margen neto.</p>
          <p className="bg-[#f0f9fa] border-l-4 border-[#4fd1d1] p-4 rounded-r-xl italic text-sm text-slate-800">
            "Un ACOS del 25% puede ser excelente para una cuenta con un margen del 40% (ya que sigue siendo rentable por sí sola), pero completamente desastroso para un vendedor cuyo margen de producto sea del 15%."
          </p>

          <h3 className="text-2xl font-black text-[#0e3a4d] mt-8 mb-4">Un ACOS bajo no siempre es una buena noticia</h3>
          <p>Muchos vendedores ven un ACOS del 10% y asumen que todo funciona a la perfección. Sin embargo, en muchas ocasiones un ACOS extremadamente bajo indica que las campañas no están captando suficiente tráfico o están limitando la visibilidad del producto en búsquedas competitivas. Si quieres escalar tus ventas globales, debes buscar el equilibrio óptimo entre rentabilidad y volumen de tráfico.</p>

          <h3 className="text-2xl font-black text-[#0e3a4d] mt-8 mb-4">La importancia de analizar el TACOS</h3>
          <p>El TACOS (Total Advertising Cost of Sales) analiza el impacto del gasto publicitario sobre las <strong>ventas totales</strong> del negocio (tanto orgánicas como patrocinadas). Esta métrica es la más importante para la salud de tu cuenta, ya que te indica si el dinero invertido en anuncios está empujando el posicionamiento orgánico general del negocio.</p>

          <h4 className="text-xl font-black text-[#0e3a4d] mt-6">Conclusión</h4>
          <p>La inversión en publicidad debe estructurarse desde una hoja financiera y no desde la consola de anuncios. Si conoces tus márgenes netos, sabrás exactamente cuál es tu límite y podrás escalar tu presupuesto de forma segura. La publicidad bien estructurada multiplica las ventas; la publicidad mal planificada acelera las pérdidas.</p>
        </div>
      )
    },
    'errores-vendedores': {
      title: "7 errores que siguen frenando a muchos vendedores Amazon en 2026",
      category: "Estrategia de Negocio",
      readTime: "Lectura de 7 min",
      date: "9 de Junio, 2026",
      author: "Equipo Ecom Avanza",
      image: "/blog_vendedores_errores.png",
      ctaText: "¿Quieres detectar qué está frenando el crecimiento de tu cuenta?",
      content: (
        <div className="space-y-8 text-slate-700 leading-relaxed font-medium">
          <p className="text-lg md:text-xl font-semibold text-[#0e3a4d] leading-relaxed">
            Amazon cambia de manera constante. Cada año aparecen nuevas herramientas de publicidad, nuevas normativas, tarifas actualizadas y mayor competencia en todas las categorías.
          </p>
          <p>
            Sin embargo, hay algo que apenas varía: los errores que cometen los vendedores. Pequeños detalles operativos que, sumados, acaban bloqueando el posicionamiento, mermando los márgenes y frenando el crecimiento de la cuenta.
          </p>

          <div className="my-10 h-px bg-slate-100"></div>

          <h3 className="text-2xl font-black text-[#0e3a4d] mt-8 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#f0f9fa] flex items-center justify-center text-[#4fd1d1] font-black text-sm">1</span>
            Elegir productos sin analizar realmente la demanda
          </h3>
          <p>Muchos fracasos ocurren antes de crear el listado de producto. Es común enamorarse de una idea o producto tras un análisis rápido. Sin embargo, antes de realizar cualquier inversión en inventario, es imprescindible analizar el volumen de búsquedas mensual, la fuerza de los competidores establecidos y las barreras de entrada específicas.</p>

          <h3 className="text-2xl font-black text-[#0e3a4d] mt-8 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#f0f9fa] flex items-center justify-center text-[#4fd1d1] font-black text-sm">2</span>
            Descuidar las imágenes del listado
          </h3>
          <p>Tus imágenes son tu mejor vendedor. Los listings exitosos no solo muestran fotos estéticas del producto sobre fondo blanco, sino que utilizan infografías claras que explican de inmediato qué hace el producto, cómo soluciona un problema, cómo se usa y por qué es superior a la competencia.</p>

          <h3 className="text-2xl font-black text-[#0e3a4d] mt-8 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#f0f9fa] flex items-center justify-center text-[#4fd1d1] font-black text-sm">3</span>
            Obsesionarse con el posicionamiento y olvidarse de la conversión
          </h3>
          <p>El tráfico web por sí solo no sirve de nada si no hay ventas. Si tu ficha de producto recibe miles de clics gracias a la publicidad pero nadie compra, el algoritmo de Amazon lo detectará como un listado de baja relevancia y bajará tus posiciones orgánicas. La conversión de la ficha es la base de todo.</p>

          <h3 className="text-2xl font-black text-[#0e3a4d] mt-8 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#f0f9fa] flex items-center justify-center text-[#4fd1d1] font-black text-sm">4</span>
            No conocer los números reales del negocio
          </h3>
          <p>Este es el error más peligroso. Muchos empresarios conocen su facturación bruta, pero no controlan los márgenes netos reales después de deducir comisiones, transporte, mermas, publicidad y devoluciones. Trabajar a ciegas impide saber si un producto realmente está generando beneficios o pérdidas silenciosas.</p>

          <h3 className="text-2xl font-black text-[#0e3a4d] mt-8 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#f0f9fa] flex items-center justify-center text-[#4fd1d1] font-black text-sm">5</span>
            Tomar decisiones basándose en un solo dato
          </h3>
          <p>Métricas como el ACOS o las ventas brutas diarias no cuentan la historia completa por sí solas. La optimización del negocio debe considerar la evolución del posicionamiento orgánico, el TACOS, el margen de contribución y el coste de adquisición del cliente en su conjunto.</p>

          <h3 className="text-2xl font-black text-[#0e3a4d] mt-8 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#f0f9fa] flex items-center justify-center text-[#4fd1d1] font-black text-sm">6</span>
            Descuidar la gestión de inventario
          </h3>
          <p>Quedarse sin stock es uno de los golpes más duros para un producto exitoso. Se detiene el historial de ventas y se cede terreno a los competidores, lo que obliga a gastar grandes sumas en publicidad para recuperar las posiciones perdidas una vez que el inventario vuelve a estar disponible.</p>

          <h3 className="text-2xl font-black text-[#0e3a4d] mt-8 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#f0f9fa] flex items-center justify-center text-[#4fd1d1] font-black text-sm">7</span>
            Buscar constantemente el atajo perfecto
          </h3>
          <p>Las marcas que crecen de manera sostenible no lo hacen mediante trucos temporales o técnicas prohibidas, sino enfocándose en los fundamentos: productos excelentes, listados optimizados con alta conversión, campañas publicitarias eficientes, buena salud financiera y un control estricto del inventario.</p>

          <div className="my-10 h-px bg-slate-100"></div>

          <h4 className="text-xl font-black text-[#0e3a4d] mt-6">Lo que hemos aprendido vendiendo en Amazon</h4>
          <p>En nuestra trayectoria gestionando marcas propias y cuentas de clientes, hemos aprendido que la constancia y el rigor estratégico superan siempre a la improvisación. Corregir estos 7 errores básicos suele liberar más potencial de crecimiento que cualquier táctica avanzada de marketing.</p>
        </div>
      )
    }
  };

  const article = articles[articleId];

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

        {/* Content */}
        <div className="prose prose-slate max-w-none">
          {article.content}
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
