'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-xl p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Une erreur s'est produite</h1>
        <p className="text-gray-600 mb-4">
          Désolé, quelque chose s'est mal passé. Veuillez réessayer plus tard.
        </p>
        <button
          onClick={reset}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}