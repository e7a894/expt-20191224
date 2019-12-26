import { createClient as contentCreateClient } from 'contentful';

const defaultConfig = {
  CTF_SPACE_ID: process.env.CTF_SPACE_ID || '',
  CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN || ''
};

export default function createClient(config = defaultConfig) {
  return contentCreateClient({
    space: config.CTF_SPACE_ID,
    accessToken: config.CTF_CDA_ACCESS_TOKEN
  });
}
