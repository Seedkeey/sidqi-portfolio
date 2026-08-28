import { notFound } from "next/navigation";
import { PortfolioShell } from "@/components/portfolio-shell";
import { locales, type Locale } from "@/lib/content";
import { getGitHubStats } from "@/lib/github";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocalePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) notFound();

  const github = await getGitHubStats();

  return <PortfolioShell locale={locale as Locale} github={github} />;
}
