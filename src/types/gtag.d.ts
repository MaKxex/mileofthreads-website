interface Window {
  gtag: (
    command: 'config' | 'event' | 'js',
    targetId: string,
    config?: {
      [key: string]: any;
    }
  ) => void;
}
