/// <reference types="react-scripts" />

interface Window {
  config: {
    title: string;
    user: string;
    repository: string;
    authors: string;
    perPage: number;
    organization: boolean;
    order: string;

    host: string;
    hash: string;
  };
}

declare module 'graphql-tag.macro' {
  export default function gql(literals: any, ...placeholders: any[]): any;
}
