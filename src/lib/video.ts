const YOUTUBE_ID = /^[\w-]{11}$/;

/**
 * Converte um link do YouTube (watch, youtu.be, shorts, embed) na URL do player incorporado
 * (domínio youtube-nocookie: não grava cookies até o play). Retorna null se não for YouTube.
 */
export function youtubeEmbedUrl(url: string) {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\.|^m\./, '');
  let id: string | null = null;

  if (host === 'youtu.be') {
    id = parsed.pathname.slice(1);
  } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    const [, kind, value] = parsed.pathname.split('/');
    id = kind === 'watch' ? parsed.searchParams.get('v') : (value ?? null);
  }

  return id && YOUTUBE_ID.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
}
