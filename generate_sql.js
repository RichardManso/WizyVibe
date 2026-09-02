import { effectRegistry } from './src/data/registry.js';
import fs from 'fs';

let sql = `-- Migration SQL pour WizyVibe

CREATE TABLE IF NOT EXISTS public.effects (
    id text PRIMARY KEY,
    name text NOT NULL,
    description text NOT NULL,
    category text NOT NULL,
    "tailwindClasses" text NOT NULL,
    css text,
    "reactCode" text,
    parameters jsonb,
    "isPremium" boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.effects ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON public.effects FOR SELECT USING (true);

INSERT INTO public.effects (id, name, description, category, "tailwindClasses", css, "reactCode", parameters, "isPremium") VALUES
`;

const values = effectRegistry.map(effect => {
  return `(
    '${effect.id}',
    '${effect.name.replace(/'/g, "''")}',
    '${effect.description.replace(/'/g, "''")}',
    '${effect.category}',
    '${effect.tailwindClasses.replace(/'/g, "''")}',
    ${effect.css ? `'${effect.css.replace(/'/g, "''")}'` : 'NULL'},
    ${effect.reactCode ? `'${effect.reactCode.replace(/'/g, "''")}'` : 'NULL'},
    ${effect.parameters ? `'${JSON.stringify(effect.parameters).replace(/'/g, "''")}'::jsonb` : 'NULL'},
    ${effect.isPremium ? 'true' : 'false'}
  )`;
});

sql += values.join(',\n') + ';';

fs.writeFileSync('supabase_schema.sql', sql);
console.log('Schema generated successfully!');
