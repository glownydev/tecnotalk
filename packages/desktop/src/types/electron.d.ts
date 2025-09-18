interface Window {
  electron: {
    speechRecognition: (text: string) => Promise<boolean>;
    darkMode: {
      toggle: () => Promise<void>;
      system: () => Promise<void>;
    };
  };
}