-- Tool tags can now carry an icon (logo) uploaded once via the admin
-- "Ferramentas" library, rendered instead of the text label on cards
-- and project detail pages. Nullable: topic tags and legacy tool tags
-- typed in before this feature don't need one (text fallback stays).
alter table public.tags add column icon_url text;
