type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
};

const json = (res: any, statusCode: number, body: unknown) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
};

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { error: 'Method not allowed' });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return json(res, 500, { error: 'Email service is not configured' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body;
  const { name = '', email = '', company = '', message = '' } = body as ContactPayload;

  if (!name.trim() || !email.trim() || !company.trim() || !message.trim()) {
    return json(res, 400, { error: 'Todos los campos son obligatorios' });
  }

  if (!isValidEmail(email)) {
    return json(res, 400, { error: 'El email no es valido' });
  }

  const text = [
    'Nueva solicitud de auditoria gratuita',
    '',
    `Nombre: ${name}`,
    `Email: ${email}`,
    `Marca/Empresa: ${company}`,
    '',
    'Situacion actual o desafio:',
    message,
  ].join('\n');

  const emailResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      reply_to: email,
      subject: `Nueva auditoria ECOM AVANZA - ${company}`,
      text,
    }),
  });

  if (!emailResponse.ok) {
    const error = await emailResponse.text();
    console.error('Resend error:', error);
    return json(res, 502, { error: 'No se pudo enviar el email' });
  }

  return json(res, 200, { ok: true });
}
