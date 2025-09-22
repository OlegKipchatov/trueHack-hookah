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
import { Cell, Pie, PieChart } from "recharts";

import { useBowls } from "@/entities/bowl";
import { Button } from "@/shared/ui/button";
import { EmptyMessage } from "@/shared/ui/empty-message";
import { Page } from "@/shared/ui/page";
import { PageTitle } from "@/shared/ui/page-title";

const TOBACCO_COLORS = [
  "#F87171",
  "#60A5FA",
  "#34D399",
  "#FBBF24",
  "#A78BFA",
  "#F472B6",
  "#38BDF8",
  "#FB7185",
];

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
    name:
      tobacco.name && tobacco.name.trim().length > 0
        ? tobacco.name
        : `Табак ${index + 1}`,
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
              <div className="mx-auto w-full max-w-md md:mx-0 md:w-1/2 md:max-w-lg">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
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
                          fill={TOBACCO_COLORS[index % TOBACCO_COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
              </div>
              <div className="md:flex md:w-1/2 md:justify-end">
                <ul className="mx-auto w-full max-w-xl md:ml-auto md:mr-0">
                  {tobaccos.map((tobacco, index) => (
                    <li
                      key={`${tobacco.name}-${index}`}
                      className="flex items-center justify-between gap-4 border-b border-gray-200 py-3 text-lg dark:border-gray-700"
                    >
                      <span className="flex-1 text-left">{tobacco.name}</span>
                      <span className="min-w-[3.5rem] text-right">
                        {tobacco.percentage}%
                      </span>
                    </li>
                  ))}
                </ul>
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
