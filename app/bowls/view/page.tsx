"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { colors } from "@heroui/theme";
import { Cell, Pie, PieChart } from "recharts";

import { useBowls } from "@/entities/bowl";
import { Button } from "@/shared/ui/button";
import { EmptyMessage } from "@/shared/ui/empty-message";
import { Page } from "@/shared/ui/page";
import { PageTitle } from "@/shared/ui/page-title";

const TOBACCO_COLORS = [
  colors.cyan[200] ?? "#D7F8FE",
  colors.blue[200] ?? "#99c7fb",
  colors.green[200] ?? "#a2e9c1",
  colors.yellow[200] ?? "#fbdba7",
  colors.pink[200] ?? "#ffb8eb",
  colors.purple[200] ?? "#c9a9e9",
  colors.red[200] ?? "#faa0bf",
  colors.zinc[200] ?? "#e4e4e7",
];

const getTobaccoName = (name: string, index: number) => {
  if (name && name.trim().length > 0) {
    return name;
  }

  return `Табак ${index + 1}`;
};

export type ViewBowlPageProps = {};

const ViewBowlContent = ({}: ViewBowlPageProps) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { bowls, removeBowl, isLoading } = useBowls();
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const bowl = bowls.find((item) => item.id === id);
  const tobaccos = bowl?.tobaccos ?? [];
  const hasTobaccos = tobaccos.length > 0;
  const usePercentages = bowl?.usePercentages ?? true;
  const chartData = usePercentages
    ? tobaccos.reduce<{ name: string; value: number }[]>(
        (acc, tobacco, index) => {
          if (typeof tobacco.percentage !== "number") {
            return acc;
          }

          acc.push({
            name: getTobaccoName(tobacco.name, index),
            value: tobacco.percentage,
          });

          return acc;
        },
        [],
      )
    : [];
  const hasPercentages = chartData.length > 0;

  const status = !isLoading && !bowl && (
    <EmptyMessage color="danger" variant="solid">
      Чаша не найдена
    </EmptyMessage>
  );

  const handleDelete = () => {
    if (!bowl) return;

    removeBowl(bowl.id);
    router.push("/user");
  };

  return (
    <Page isLoading={isLoading} status={status}>
      {bowl && (
        <>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <PageTitle withBackButton className="mb-0">
              {bowl.name}
            </PageTitle>
            <div className="flex gap-2">
              <Link href={`/bowls/edit?id=${bowl.id}`}>
                <Button
                  isIconOnly
                  aria-label="Edit bowl"
                  hint="Edit bowl"
                  size="sm"
                >
                  <Icon icon="akar-icons:edit" width={16} />
                </Button>
              </Link>
              <Button
                isIconOnly
                aria-label="Delete bowl"
                color="danger"
                hint="Delete bowl"
                size="sm"
                onPress={onOpen}
              >
                <Icon icon="akar-icons:cross" width={16} />
              </Button>
            </div>
          </div>
          {hasTobaccos ? (
            <div className="mt-6 flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
              <div className="md:flex md:w-1/2 md:justify-start">
                <ul className="mx-auto w-full max-w-xl md:ml-0 md:mr-auto">
                  {tobaccos.map((tobacco, index) => {
                    const tobaccoName = getTobaccoName(tobacco.name, index);
                    const percentageLabel =
                      usePercentages && typeof tobacco.percentage === "number"
                        ? `${tobacco.percentage}%`
                        : "—";

                    return (
                      <li
                        key={`${tobaccoName}-${index}`}
                        className="flex items-center justify-between gap-4 border-b border-zinc-200 py-3 text-lg dark:border-zinc-700"
                      >
                        <span className="flex-1 text-left">{tobaccoName}</span>
                        <span className="min-w-[3.5rem] text-right">
                          {percentageLabel}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="mx-auto w-full max-w-md md:w-1/2 md:max-w-lg">
                {usePercentages ? (
                  hasPercentages ? (
                    <div className="flex flex-col items-center rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                      <PieChart height={360} width={360}>
                        <Pie
                          data={chartData}
                          dataKey="value"
                          innerRadius={90}
                          nameKey="name"
                          outerRadius={150}
                          paddingAngle={2}
                        >
                          {chartData.map((entry, index) => (
                            <Cell
                              key={`${entry.name}-${index}`}
                              fill={
                                TOBACCO_COLORS[index % TOBACCO_COLORS.length]
                              }
                            />
                          ))}
                        </Pie>
                      </PieChart>
                      <ul className="mt-6 flex w-full flex-col items-center gap-3">
                        {chartData.map((entry, index) => (
                          <li
                            key={`${entry.name}-${index}`}
                            className="mx-auto flex w-full max-w-xs items-center gap-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
                          >
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{
                                backgroundColor:
                                  TOBACCO_COLORS[index % TOBACCO_COLORS.length],
                              }}
                            />
                            <span className="flex-1 truncate text-center">
                              {entry.name}
                            </span>
                            <span className="min-w-[3rem] text-right text-zinc-700 dark:text-zinc-100">
                              {entry.value}%
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <EmptyMessage className="mt-0 w-full" variant="flat">
                      Проценты для табаков не указаны
                    </EmptyMessage>
                  )
                ) : (
                  <Button
                    className="flex w-full flex-col rounded-2xl border border-dashed border-zinc-300 bg-transparent p-0 text-left shadow-none transition-colors hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-500"
                    variant="light"
                    onPress={() => router.push(`/bowls/edit?id=${bowl.id}`)}
                  >
                    <EmptyMessage
                      className="mt-0 w-full rounded-2xl border-none bg-transparent py-6 text-base"
                      color="primary"
                      variant="flat"
                    >
                      Проценты для этой чаши отключены. Нажмите, чтобы настроить
                      их.
                    </EmptyMessage>
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <EmptyMessage>Табаки отсутствуют</EmptyMessage>
          )}
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader>Delete bowl</ModalHeader>
                  <ModalBody>
                    <p>Are you sure?</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button
                      color="danger"
                      onPress={() => {
                        handleDelete();
                        onClose();
                      }}
                    >
                      Delete
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </Page>
  );
};

const ViewBowlPage = (props: ViewBowlPageProps) => {
  return (
    <Suspense>
      <ViewBowlContent {...props} />
    </Suspense>
  );
};

export default ViewBowlPage;
