import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { useTranslations } from 'next-intl';

import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";


export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1>{t("title")}</h1>


    </section>
  );
}
