/// <reference types="react-scripts" />

declare global {
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
}
