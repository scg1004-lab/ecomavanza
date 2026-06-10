import React from 'react';

export interface Article {
  id: string;
  title: string;
  desc: string; // Brief description used for card listings
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  ctaText: string;
  content: string; // Markdown content
  isDraft?: boolean;
}

export const DEFAULT_ARTICLES: Article[] = [
  {
    id: "seo-amazon",
    title: "SEO Amazon: los 7 factores que realmente mejoran el posicionamiento de un producto",
    desc: "Descubre cómo funciona el algoritmo de Amazon y qué cambios pueden aumentar tu visibilidad orgánica y tus ventas.",
    category: "Posicionamiento Orgánico",
    readTime: "Lectura de 6 min",
    date: "9 de Junio, 2026",
    author: "Equipo Ecom Avanza",
    image: "/blog_seo_amazon.png",
    ctaText: "¿Quieres saber qué está frenando tus ventas en Amazon?",
    isDraft: false,
    content: `Si vendes en Amazon, seguramente te has hecho esta pregunta alguna vez: ¿Por qué algunos productos aparecen constantemente en la primera página mientras otros apenas reciben visitas?

La respuesta corta es sencilla: **Amazon quiere mostrar los productos que tienen más probabilidades de generar una venta.**

A diferencia de Google, donde el contenido y los enlaces tienen mucho peso, Amazon es un buscador orientado a la compra. Su objetivo es que el cliente encuentre lo que busca y termine comprando.

Por eso, cuando hablamos de SEO Amazon, no se trata únicamente de añadir palabras clave a un listado. Se trata de optimizar todos los elementos que ayudan a vender más.

---

### 1. Utilizar las palabras clave correctas
Todo empieza aquí. Amazon necesita entender qué producto estás vendiendo para mostrarlo en las búsquedas adecuadas.

Las palabras clave más importantes deberían aparecer de forma natural en:
- El título.
- Los bullet points.
- La descripción.
- El contenido A+.
- Los términos de búsqueda del backend (Search Terms).

> "Uno de los errores más comunes es intentar posicionar para demasiadas palabras clave al mismo tiempo. Es mejor aparecer bien para las búsquedas que realmente generan ventas que intentar abarcarlo todo."

### 2. Un título que ayude a posicionar y vender
El título es uno de los elementos más importantes del listado. No solo ayuda al algoritmo a entender el producto, también influye directamente en el porcentaje de clics (CTR).

Un buen título suele incluir:
- La palabra clave principal.
- Alguna característica diferenciadora (tamaño, color, pack).
- Información relevante para el comprador.

El objetivo no es llenar el título de palabras sin sentido. El objetivo es que el cliente entienda rápidamente qué está viendo y se anime a hacer clic.

### 3. Imágenes que aumenten la conversión
Muchas veces el problema no es el posicionamiento. Es la conversión (CR). Puedes aparecer para una búsqueda importante, pero si el cliente no hace clic o no compra, Amazon terminará reduciendo tu visibilidad.

Las imágenes suelen ser uno de los factores que más impacto tienen. Además de la imagen principal, las imágenes secundarias deberían responder preguntas como:
- ¿Qué problema resuelve el producto?
- ¿Qué beneficios aporta?
- ¿Qué lo diferencia de otras opciones del mercado?

Una ficha visualmente clara e infográfica suele convertir mejor. Y una mejor conversión siempre se traduce en mejores posiciones orgánicas.

### 4. El porcentaje de conversión
Amazon presta muchísima atención a cómo responden los clientes cuando visitan una ficha. Si dos productos reciben el mismo número de visitas pero uno vende significativamente más, el algoritmo entiende cuál está satisfaciendo mejor la búsqueda del usuario.

Por eso, pequeños cambios en el listado pueden tener un gran impacto:
- Mejorar imágenes principales y de detalle.
- Reescribir los bullet points enfocándolos en beneficios y no en características.
- Añadir contenido A+ premium con tablas comparativas.
- Resolver las dudas más frecuentes en la descripción.

En muchas cuentas que analizamos, el problema principal no es la falta de tráfico. Es que la ficha de producto no convierte lo suficiente.

### 5. Las reseñas y valoraciones
Las reseñas no son un factor mágico y directo de posicionamiento, pero sí influyen directamente en la confianza del comprador. Y la confianza influye directamente en las ventas.

Un producto con mejores valoraciones suele conseguir más clics, más conversiones y menos dudas antes de comprar. La clave no está únicamente en acumular reseñas a toda costa, sino en mantener una valoración competitiva (idealmente por encima de 4.3 estrellas) dentro de tu categoría.

### 6. Mantener stock disponible
Parece obvio, pero sigue siendo uno de los errores más caros que cometen muchos vendedores. Cuando un producto se queda sin stock, deja de generar ventas de inmediato.

Y cuando deja de generar ventas, pierde fuerza y relevancia dentro del algoritmo de Amazon. Recuperar las posiciones originales después de una rotura de stock puede llevar semanas o incluso meses, dependiendo de la categoría y la competencia. Por eso la gestión de inventario es una parte fundamental del SEO.

### 7. La velocidad de ventas
Amazon analiza constantemente el rendimiento de cada ASIN a corto y medio plazo. Cuando un producto empieza a vender por encima de la media de su categoría, gana visibilidad de forma exponencial.

Por eso, las mejores estrategias de crecimiento combinan SEO y publicidad (Amazon PPC). La publicidad no mejora directamente el posicionamiento orgánico, pero genera ventas adicionales que ayudan al algoritmo a identificar que existe demanda real para ese producto, acelerando el SEO.

---

#### Entonces, ¿qué factor es el más importante?
Si tuviéramos que resumir el SEO Amazon en una sola frase, sería esta: **Amazon posiciona los productos que tienen más probabilidades de venderse.**

Las palabras clave ayudan al algoritmo a entender qué es el producto, pero las ventas, la conversión, las imágenes, las reseñas y la experiencia de usuario son las que determinan qué productos ocupan las primeras posiciones.

#### Conclusión
No existe un truco ni una optimización milagrosa. El crecimiento sostenible llega cuando todos los elementos funcionan juntos de manera coordinada. Cuando eso ocurre, Amazon tiene todos los motivos para seguir recomendando tu producto en lo más alto.`
  },
  {
    id: "amazon-ppc",
    title: "Amazon PPC: cuánto invertir para crecer sin disparar el ACOS",
    desc: "Aprende a calcular un presupuesto publicitario rentable y evita los errores que hacen perder dinero a muchos vendedores.",
    category: "Amazon Ads",
    readTime: "Lectura de 5 min",
    date: "9 de Junio, 2026",
    author: "Equipo Ecom Avanza",
    image: "/blog_amazon_ppc.png",
    ctaText: "¿No tienes claro si tus campañas están siendo rentables?",
    isDraft: false,
    content: `Una de las preguntas que más escuchamos de vendedores en Amazon es: ¿Cuánto debería invertir en publicidad? Y la respuesta suele decepcionar: no existe una cifra universal ni una fórmula mágica aplicable a todas las marcas.

Sin embargo, sí hay una realidad que vemos constantemente: muchos vendedores están invirtiendo demasiado poco para crecer, o demasiado para lo que están vendiendo. Ambos extremos destruyen la rentabilidad.

---

### El error de fijar un presupuesto al azar
Algunos vendedores deciden invertir 20€, 50€ o 100€ al día simplemente porque les parece una cantidad razonable y cómoda. El problema es que el sistema de pujas de Amazon no funciona por impulsos.

El presupuesto publicitario debe estar directamente relacionado con:
- El precio de venta del producto.
- El margen neto disponible.
- El volumen de búsquedas de los términos clave.
- El nivel de competencia de la categoría.
- El objetivo de la campaña (lanzamiento vs. rentabilidad).

### Antes de invertir más, conoce tus números reales
La publicidad no debería gestionarse mirando únicamente la facturación final. Antes de aumentar cualquier presupuesto, debes hacerte la siguiente pregunta: **¿Cuánto puedes permitirte gastar para conseguir una venta sin perder dinero?**

Sorprendentemente, muchos vendedores no tienen este número claro. Conocen el precio del producto, pero no han restado con precisión costes clave como:
- Coste de fabricación/adquisición del producto.
- Transporte internacional, nacional y aranceles.
- Comisiones fijas de venta de Amazon (normalmente 15%).
- Tarifas de logística FBA (almacenamiento y envío).
- Tasa estimada de devoluciones.
- Impuestos (IVA).

Cuando restas todo esto, obtienes tu margen neto. Ese margen determina tu límite de gasto publicitario. Si tu margen es de 9€ por unidad, gastar 12€ de media en publicidad para conseguir una venta te está costando dinero directamente.

### Entender el ACOS antes de aumentar la inversión
El ACOS (Advertising Cost of Sales) representa la relación entre el gasto publicitario y las ventas generadas directamente por la publicidad. La pregunta clave no es si tu ACOS es alto o bajo, sino si es menor que tu margen neto.

> "Un ACOS del 25% puede ser excelente para una cuenta con un margen del 40% (ya que sigue siendo rentable por sí sola), pero completamente desastroso para un vendedor cuyo margen de producto sea del 15%."

### Un ACOS bajo no siempre es una buena noticia
Muchos vendedores ven un ACOS del 10% y asumen que todo funciona a la perfección. Sin embargo, en muchas ocasiones un ACOS extremadamente bajo indica que las campañas no están captando suficiente tráfico o están limitando la visibilidad del producto en búsquedas competitivas. Si quieres escalar tus ventas globales, debes buscar el equilibrio óptimo entre rentabilidad y volumen de tráfico.

### La importancia de analizar el TACOS
El TACOS (Total Advertising Cost of Sales) analiza el impacto del gasto publicitario sobre las **ventas totales** del negocio (tanto orgánicas como patrocinadas). Esta métrica es la más importante para la salud de tu cuenta, ya que te indica si el dinero invertido en anuncios está empujando el posicionamiento orgánico general del negocio.

#### Conclusión
La inversión en publicidad debe estructurarse desde una hoja financiera y no desde la consola de anuncios. Si conoces tus márgenes netos, sabrás exactamente cuál es tu límite y podrás escalar tu presupuesto de forma segura. La publicidad bien estructurada multiplica las ventas; la publicidad mal planificada acelera las pérdidas.`
  },
  {
    id: "errores-vendedores",
    title: "7 errores que siguen frenando a muchos vendedores Amazon en 2026",
    desc: "Después de gestionar nuestras propias marcas y cuentas de clientes, estos son los errores que más vemos repetir una y otra vez.",
    category: "Estrategia de Negocio",
    readTime: "Lectura de 7 min",
    date: "9 de Junio, 2026",
    author: "Equipo Ecom Avanza",
    image: "/blog_vendedores_errores.png",
    ctaText: "¿Quieres detectar qué está frenando el crecimiento de tu cuenta?",
    isDraft: false,
    content: `Amazon cambia de manera constante. Cada año aparecen nuevas herramientas de publicidad, nuevas normativas, tarifas actualizadas y mayor competencia en todas las categorías.

Sin embargo, hay algo que apenas varía: los errores que cometen los vendedores. Pequeños detalles operativos que, sumados, acaban bloqueando el posicionamiento, mermando los márgenes y frenando el crecimiento de la cuenta.

---

### 1. Elegir productos sin analizar realmente la demanda
Muchos fracasos ocurren antes de crear el listado de producto. Es común enamorarse de una idea o producto tras un análisis rápido. Sin embargo, antes de realizar cualquier inversión en inventario, es imprescindible analizar el volumen de búsquedas mensual, la fuerza de los competidores establecidos y las barreras de entrada específicas.

### 2. Descuidar las imágenes del listado
Tus imágenes son tu mejor vendedor. Los listings exitosos no solo muestran fotos estéticas del producto sobre fondo blanco, sino que utilizan infografías claras que explican de inmediato qué hace el producto, cómo soluciona un problema, cómo se usa y por qué es superior a la competencia.

### 3. Obsesionarse con el posicionamiento y olvidarse de la conversión
El tráfico web por sí solo no sirve de nada si no hay ventas. Si tu ficha de producto recibe miles de clics gracias a la publicidad pero nadie compra, el algoritmo de Amazon lo detectará como un listado de baja relevancia y bajará tus posiciones orgánicas. La conversión de la ficha es la base de todo.

### 4. No conocer los números reales del negocio
Este es el error más peligroso. Muchos empresarios conocen su facturación bruta, pero no controlan los márgenes netos reales después de deducir comisiones, transporte, mermas, publicidad y devoluciones. Trabajar a ciegas impide saber si un producto realmente está generando beneficios o pérdidas silenciosas.

### 5. Tomar decisiones basándose en un solo dato
Métricas como el ACOS o las ventas brutas diarias no cuentan la historia completa por sí solas. La optimización del negocio debe considerar la evolución del posicionamiento orgánico, el TACOS, el margen de contribución y el coste de adquisición del cliente en su conjunto.

### 6. Descuidar la gestión de inventario
Quedarse sin stock es uno de los golpes más duros para un producto exitoso. Se detiene el historial de ventas y se cede terreno a los competidores, lo que obliga a gastar grandes sumas en publicidad para recuperar las posiciones perdidas una vez que el inventario vuelve a estar disponible.

### 7. Buscar constantemente el atajo perfecto
Las marcas que crecen de manera sostenible no lo hacen mediante trucos temporales o técnicas prohibidas, sino enfocándose en los fundamentos: productos excelentes, listados optimizados con alta conversión, campañas publicitarias eficientes, buena salud financiera y un control estricto del inventario.

---

#### Lo que hemos aprendido vendiendo en Amazon
En nuestra trayectoria gestionando marcas propias y cuentas de clientes, hemos aprendido que la constancia y el rigor estratégico superan siempre a la improvisación. Corregir estos 7 errores básicos suele liberar más potencial de crecimiento que cualquier táctica avanzada de marketing.`
  }
];

const LOCAL_STORAGE_KEY = 'ecomavanza_blog_articles';

export const getArticles = (): Article[] => {
  if (typeof window === 'undefined') return DEFAULT_ARTICLES;
  
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!saved) {
    // If not in localStorage, save default articles
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_ARTICLES));
    return DEFAULT_ARTICLES;
  }
  
  try {
    return JSON.parse(saved);
  } catch (error) {
    console.error("Failed to parse articles from localStorage:", error);
    return DEFAULT_ARTICLES;
  }
};

export const getArticleById = (id: string): Article | undefined => {
  const articles = getArticles();
  return articles.find(a => a.id === id);
};

export const saveArticle = (article: Article): void => {
  const articles = getArticles();
  const index = articles.findIndex(a => a.id === article.id);
  
  if (index >= 0) {
    articles[index] = article;
  } else {
    articles.push(article);
  }
  
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(articles));
};

export const deleteArticle = (id: string): void => {
  const articles = getArticles();
  const filtered = articles.filter(a => a.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
};

// Generates the typescript file content so the user can easily sync code changes
export const generateTypeScriptCode = (articles: Article[]): string => {
  const formattedArticles = JSON.stringify(articles, null, 2);
  return `import React from 'react';

export interface Article {
  id: string;
  title: string;
  desc: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  ctaText: string;
  content: string;
  isDraft?: boolean;
}

export const DEFAULT_ARTICLES: Article[] = ${formattedArticles};

const LOCAL_STORAGE_KEY = 'ecomavanza_blog_articles';

export const getArticles = (): Article[] => {
  if (typeof window === 'undefined') return DEFAULT_ARTICLES;
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_ARTICLES));
    return DEFAULT_ARTICLES;
  }
  try {
    return JSON.parse(saved);
  } catch (error) {
    console.error("Failed to parse articles from localStorage:", error);
    return DEFAULT_ARTICLES;
  }
};

export const getArticleById = (id: string): Article | undefined => {
  const articles = getArticles();
  return articles.find(a => a.id === id);
};

export const saveArticle = (article: Article): void => {
  const articles = getArticles();
  const index = articles.findIndex(a => a.id === article.id);
  if (index >= 0) {
    articles[index] = article;
  } else {
    articles.push(article);
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(articles));
};

export const deleteArticle = (id: string): void => {
  const articles = getArticles();
  const filtered = articles.filter(a => a.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
};
`;
};
