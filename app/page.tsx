import { Link } from "@heroui/react";

export type HomePageProps = {};

const HomePage = ({}: HomePageProps) => {
  return (
    <section className="flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-5xl font-bold">BowlBuilder</h1>
      <h2 className="mt-4 text-lg max-w-xl">
        Сервис для создания и сохранения собственных миксов для кальянных чаш
      </h2>
      <p className="mt-8 text-sm font-medium tracking-wide text-gray-500">
        Создайте свою идеальную чашу.
      </p>
      <p className="mt-6 text-sm">
        Подписывайтесь на{
          " "
        }
        <Link
          href="https://t.me/+BjywrBIpCoQ1YTA6"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          канал разработки
        </Link>{" "}
        и следите за обновлениями.
      </p>
    </section>
  );
};

export default HomePage;
