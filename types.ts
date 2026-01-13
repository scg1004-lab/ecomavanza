
// Add React import to resolve the 'React' namespace error in TypeScript.
import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  label: string;
  detail: string;
}

export interface ServicePillar {
  id: string;
  title: string;
  description: string;
  items: ServiceItem[];
  icon: React.ReactNode;
}

export interface AdvantageCard {
  title: string;
  description: string;
  icon: string;
}

export interface Article {
  title: string;
  description: string;
  link: string;
  image: string;
}

export type ChatMessage = {
  role: 'user' | 'model';
  text: string;
};