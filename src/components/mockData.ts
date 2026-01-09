import { Story, Item } from '../types';

export const stories: Story[] = [
  {
    id: '1',
    title: 'Wedding Album Returned After 3 Years',
    description: 'Maria reunited with her wedding photos thought lost forever. Every memory restored.',
    image: 'https://d64gsuwffb70l.cloudfront.net/690c55f62a1c1509e277d961_1762416178403_54f7ddd4.webp',
    type: 'reunion',
    date: '2025-11-01',
    impact: '1 family restored'
  },
  {
    id: '2',
    title: 'Vintage Jewelry Box Found Owner',
    description: 'Grandmother\'s heirloom returned to family after storage default.',
    image: 'https://d64gsuwffb70l.cloudfront.net/690c55f62a1c1509e277d961_1762416180161_7ffd3cc5.webp',
    type: 'reunion',
    date: '2025-10-28',
    impact: '3 generations reunited'
  },
  {
    id: '3',
    title: 'Military Medals Rescued',
    description: 'Veteran\'s service medals recovered and returned with full honors.',
    image: 'https://d64gsuwffb70l.cloudfront.net/690c55f62a1c1509e277d961_1762416181878_1e958305.webp',
    type: 'rescue',
    date: '2025-10-25',
    impact: 'Honor restored'
  }
];

export const items: Item[] = [
  {
    id: '1',
    name: 'Family Photo Album',
    image: 'https://d64gsuwffb70l.cloudfront.net/690c55f62a1c1509e277d961_1762416188709_50f511f7.webp',
    category: 'return',
    status: 'pending',
    sentimentalValue: 'Wedding photos 2018-2022',
    unitId: 'U-2847',
    ownerContact: 'maria.garcia@email.com'
  }
];
