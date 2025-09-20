import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-xl p-8 text-center">
        <h1 className="text-4xl font-bold mb-6">Tecnotalk</h1>
        <p className="text-gray-600 mb-8">
          Bienvenue sur la plateforme de gestion de Tecnotalk.
        </p>
        <Link
          href="/admin"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Accéder à l'administration
        </Link>
      </div>
    </div>
  );
}