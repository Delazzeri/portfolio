import fs from 'node:fs';
import path from 'node:path';

import { cache } from 'react';

import type { Project } from './types';
import { youtubeEmbedUrl } from './video';

/**
 * Lê os projetos de `public/projetos/<pasta>/` (a pasta vira o slug).
 *
 *   info.txt       campos "chave: valor" (ver FIELDS) — obrigatório
 *   descricao.txt  texto do modal; \n é quebra de linha, \n\n separa parágrafos — obrigatório
 *   capa.*         imagem 16:10 (jpg, jpeg, png, webp ou avif) — opcional
 *   galeria-N.*    imagens extras, ordenadas por N — opcional
 *
 * Erros de preenchimento quebram o build com o arquivo e o campo, para não publicar projeto torto.
 */

const PROJECTS_DIR = path.join(process.cwd(), 'public', 'projetos');
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;
const BOM = 0xfeff; // Bloco de Notas do Windows pode salvar com BOM
const TYPES: Project['type'][] = ['pessoal', 'freelance', 'faculdade', 'trabalho'];
type Field =
  | 'titulo'
  | 'resumo'
  | 'ano'
  | 'tipo'
  | 'destaque'
  | 'papel'
  | 'stack'
  | 'video'
  | 'site'
  | 'repositorio'
  | 'linkedin'
  | 'figma';

const FIELDS: Field[] = [
  'titulo',
  'resumo',
  'ano',
  'tipo',
  'destaque',
  'papel',
  'stack',
  'video',
  'site',
  'repositorio',
  'linkedin',
  'figma',
];

/** Minúsculas e sem acento ("Título" → "titulo"). */
function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim()
    .toLowerCase();
}

function isField(key: string): key is Field {
  return FIELDS.some((field) => field === key);
}

function isType(value: string): value is Project['type'] {
  return TYPES.some((type) => type === value);
}

function readText(file: string) {
  // Remove BOM (Bloco de Notas do Windows) e normaliza quebras de linha.
  const text = fs.readFileSync(file, 'utf8');
  const withoutBom = text.charCodeAt(0) === BOM ? text.slice(1) : text;
  return withoutBom.replace(/\r\n?/g, '\n');
}

function parseInfo(file: string) {
  const info: Partial<Record<Field, string>> = {};

  readText(file)
    .split('\n')
    .forEach((line, index) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;

      const separator = trimmed.indexOf(':');
      if (separator === -1) {
        throw new Error(`${file}:${index + 1} — linha sem "campo: valor": "${trimmed}"`);
      }

      const key = normalize(trimmed.slice(0, separator));
      const value = trimmed.slice(separator + 1).trim();
      if (!isField(key)) {
        throw new Error(
          `${file}:${index + 1} — campo desconhecido "${key}". Use: ${FIELDS.join(', ')}.`,
        );
      }
      if (value) info[key] = value;
    });

  return info;
}

function parseYes(value: string | undefined, file: string) {
  if (value === undefined) return false;
  const normalized = normalize(value);
  if (normalized === 'sim') return true;
  if (normalized === 'nao') return false;
  throw new Error(`${file} — "destaque" deve ser "sim" ou "não" (recebido "${value}").`);
}

/** Primeira frase da descrição, como resumo de reserva (usado na meta description). */
function firstSentence(text: string) {
  const line = text.split('\n').find((l) => l.trim()) ?? '';
  const sentence = line.match(/^.*?[.!?](\s|$)/)?.[0] ?? line;
  return sentence.trim().slice(0, 160);
}

function publicUrl(slug: string, file: string) {
  return `/projetos/${slug}/${file}`;
}

function loadProject(slug: string): Project {
  const dir = path.join(PROJECTS_DIR, slug);
  const infoFile = path.join(dir, 'info.txt');
  const descriptionFile = path.join(dir, 'descricao.txt');

  if (!fs.existsSync(infoFile)) throw new Error(`Falta ${infoFile}`);
  if (!fs.existsSync(descriptionFile)) throw new Error(`Falta ${descriptionFile}`);

  const info = parseInfo(infoFile);
  const description = readText(descriptionFile).trim();

  if (!info.titulo) throw new Error(`${infoFile} — campo "titulo" é obrigatório.`);

  const year = Number(info.ano);
  if (!Number.isInteger(year)) {
    throw new Error(`${infoFile} — "ano" deve ser um número, ex.: 2025 (recebido "${info.ano}").`);
  }

  const type = normalize(info.tipo ?? '');
  if (!isType(type)) {
    throw new Error(
      `${infoFile} — "tipo" deve ser: ${TYPES.join(', ')} (recebido "${info.tipo}").`,
    );
  }

  if (info.video && !youtubeEmbedUrl(info.video)) {
    throw new Error(
      `${infoFile} — "video" deve ser um link do YouTube (recebido "${info.video}").`,
    );
  }

  const files = fs.readdirSync(dir);
  const cover = files.find((file) => /^capa\./i.test(file) && IMAGE_EXT.test(file));
  const gallery = files
    .flatMap((file) => {
      const match = file.match(/^galeria-(\d+)\./i);
      return match && IMAGE_EXT.test(file) ? [{ file, order: Number(match[1]) }] : [];
    })
    .sort((a, b) => a.order - b.order)
    .map(({ file }) => publicUrl(slug, file));

  const summary = info.resumo ?? firstSentence(description);

  // PT apenas por enquanto; o EN entra na Fase 5 (ex.: descricao.en.txt).
  return {
    slug,
    title: info.titulo,
    summary: { pt: summary, en: summary },
    description: { pt: description, en: description },
    cover: cover && publicUrl(slug, cover),
    gallery: gallery.length > 0 ? gallery : undefined,
    video: info.video,
    stack: (info.stack ?? '')
      .split(',')
      .map((tech) => tech.trim())
      .filter(Boolean),
    role: info.papel ? { pt: info.papel, en: info.papel } : undefined,
    year,
    featured: parseYes(info.destaque, infoFile),
    type,
    links: {
      live: info.site,
      repo: info.repositorio,
      linkedinPost: info.linkedin,
      figma: info.figma,
    },
  };
}

/** Todos os projetos, do mais recente ao mais antigo (empate: ordem da pasta). */
export const getProjects = cache((): Project[] => {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  return fs
    .readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
    .map(loadProject)
    .sort((a, b) => b.year - a.year);
});
