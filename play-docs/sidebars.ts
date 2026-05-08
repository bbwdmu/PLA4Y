import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'overview',
    'installation',
    'documentation-status',
    {
      type: 'category',
      label: 'NUGS - Systems',
      items: [
        'NUGS - Systems/Interaction',
        'NUGS - Systems/Collectible',
        'NUGS - Systems/Doors',
        'NUGS - Systems/Health',
        'NUGS - Systems/Mascot',
        'NUGS - Systems/Ability',
      ],
    },
    {
      type: 'category',
      label: 'UI',
      items: ['UI/UI'],
    },
  ],
};

export default sidebars;
