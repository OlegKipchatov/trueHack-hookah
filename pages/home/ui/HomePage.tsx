import React from "react";

export const HomePage: React.FC = () => (
  <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black text-center p-4">
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
      <a
        href="https://t.me/+BjywrBIpCoQ1YTA6"
        className="underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        канал разработки
      </a>{" "}
      и следите за обновлениями.
    </p>
  </main>
);

export default HomePage;
