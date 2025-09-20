export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-xl p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">404 - Page non trouvée</h1>
        <p className="text-gray-600 mb-4">
          Désolé, la page que vous recherchez n'existe pas.
        </p>
        <a
          href="/"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}