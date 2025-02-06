import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { useTranslations } from 'next-intl';

import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import PushNotificationManagerPage from "@/components/PushNotificationManager";


export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1>{t("title")}</h1>
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Get&nbsp;</span>
        <span className={title({ color: "yellow" })}>the best&nbsp;</span>
        <br />
        <span className={title()}>concert tickets at unbeatable prices.</span>
        <div className={subtitle({ class: "mt-4" })}>
          Buy and resell tickets securely, hassle-free.
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={`${buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })} text-black`}
          href="/"
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href="/"
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <PushNotificationManagerPage />
    </section>
  );
}
