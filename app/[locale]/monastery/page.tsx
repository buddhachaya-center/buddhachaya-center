import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: `Monastery - ${locale}`,
  };
}

export default async function MonasteryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-display font-bold text-[#333C3E]">
        Monastery - {locale}
      </h1>
    </div>
  );
}
