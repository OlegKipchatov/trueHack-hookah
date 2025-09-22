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
import { Cell, Pie, PieChart, type PieLabelRenderProps } from "recharts";

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

const renderPieLabel = ({ name, percent }: PieLabelRenderProps) => {
  if (!name) {
    return null;
  }

  const percentage = Math.round((percent ?? 0) * 100);

  return `${name} ${percentage}%`;
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
  const chartData = tobaccos.map((tobacco, index) => ({
    name: getTobaccoName(tobacco.name, index),
    value: tobacco.percentage,
  }));

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

                    return (
                      <li
                        key={`${tobaccoName}-${index}`}
                        className="flex items-center justify-between gap-4 border-b border-gray-200 py-3 text-lg dark:border-gray-700"
                      >
                        <span className="flex-1 text-left">{tobaccoName}</span>
                        <span className="min-w-[3.5rem] text-right">
                          {tobacco.percentage}%
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="mx-auto w-full max-w-md md:ml-auto md:mr-0 md:w-1/2 md:max-w-lg">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                  <PieChart height={360} width={360}>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      innerRadius={90}
                      label={renderPieLabel}
                      labelStyle={{
                        fill: colors.zinc[700] ?? "#3f3f46",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                      }}
                      nameKey="name"
                      outerRadius={150}
                      paddingAngle={2}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`${entry.name}-${index}`}
                          fill={TOBACCO_COLORS[index % TOBACCO_COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
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
