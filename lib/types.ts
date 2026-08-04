export type ProjectType = 'design' | 'code';

export type LinkType = 'github' | 'vercel' | 'live_site' | 'instagram' | 'ebook' | 'other';

export type ProjectLink = {
  id: string;
  label: string;
  url: string;
  type: LinkType;
};

export type ProjectImage = {
  id: string;
  imageUrl: string;
  position: number;
};

export type Tag = {
  id: string;
  namePt: string;
  nameEn: string;
  slug: string;
};

export type Project = {
  id: string;
  slug: string;
  type: ProjectType;
  titlePt: string;
  titleEn: string;
  descriptionPt: string;
  descriptionEn: string;
  coverImageUrl: string;
  bannerImageUrl: string;
  position: number;
  published: boolean;
  featured: boolean;
  featuredPosition: number | null;
  images: ProjectImage[];
  links: ProjectLink[];
  tags: Tag[];
};
