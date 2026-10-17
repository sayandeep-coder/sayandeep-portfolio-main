export interface NavLink {
  label: string;
  targetId: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Method', targetId: 'method' },
  { label: 'Case studies', targetId: 'work' },
  { label: 'Experience', targetId: 'experience' },
  { label: 'Stack', targetId: 'stack' },
];

export const CONTACT_INFO = {
  name: 'Sayandeep Purkait',
  title: 'Tech Lead & AI Engineer',
  roleCurrent: 'Technical Team Lead · Secondz',
  location: 'Mumbai, India',
  email: 'sayandeeppurkait789@gmail.com',
  github: 'https://github.com/sayandeep-coder',
  linkedin: 'https://www.linkedin.com/in/sayandeeppurkait/',
  agentforgeRepo: 'https://github.com/sayandeep-coder/agentforge',
  siteUrl: 'https://contactsayandeep.xyz',
};
