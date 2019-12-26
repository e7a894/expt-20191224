import { Configuration } from '@nuxt/types';
import { config as dotenvConfig } from 'dotenv';
import createClient from './src/plugins/contentful';

dotenvConfig();

interface blogPost {
  title: string;
  body: string;
  publishedAt: Date;
  headerImage: any;
  slug: string;
}

const env = {
  CTF_SPACE_ID: process.env.CTF_SPACE_ID || '',
  CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN || '',
  CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID || ''
};

const cdaClient = createClient(env);

const config: Configuration = {
  build: {
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.devtool = 'inline-cheap-module-source-map';
      }
    }
  },
  buildModules: ['@nuxtjs/dotenv', '@nuxt/typescript-build'],
  env,
  generate: {
    routes() {
      return cdaClient
        .getEntries<blogPost>({
          content_type: env.CTF_BLOG_POST_TYPE_ID
        })
        .then(entries => {
          return [...entries.items.map(entry => `/blog/${entry.fields.slug}`)];
        });
    }
  },
  srcDir: 'src'
};

export default config;
