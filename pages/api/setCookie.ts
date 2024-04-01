import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

const setCookie = (req: NextApiRequest, res: NextApiResponse): void => {
  const domain = process.env.URL_BASE;
  const cookies = cookie.parse(req.headers.cookie || '');

  // Opciones para la cookie
  const options: cookie.CookieSerializeOptions = {
    httpOnly: true,
    maxAge: 86400, // Tiempo en segundos
    domain: domain ? new URL(domain).hostname : '',
    path: '/', // Ruta en la que es válida la cookie
    secure: process.env.NODE_ENV === 'production', // Solo enviar en HTTPS si estamos en producción
  };

  // Filtrar solo las cookies que están presentes en req.cookies
  const validCookies: Record<string, string> = Object.keys(req.cookies).reduce(
    (acc: Record<string, string>, cookieName: string) => {
      const cookieValue = req.cookies[cookieName];
      acc[cookieName] = cookieValue;
      return acc;
    },
    {}
  );

  // Agregar las query parameters como cookies
  Object.entries(req.query).forEach(([key, value]) => {
    validCookies[key] = value as string;
  });

  // Serializar todas las cookies válidas
  const serializedCookies: string[] = Object.entries(validCookies).map(([cookieName, cookieVal]) => {
    return cookie.serialize(cookieName, cookieVal, options);
  });

  // Establecer las cookies en la cabecera de la respuesta
  res.setHeader('Set-Cookie', serializedCookies);

  // Envía una respuesta vacía
  res.end();
};

export default setCookie;
