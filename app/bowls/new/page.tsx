'use client';

import { useRouter } from 'next/navigation';
import { BowlForm } from '@/features/upsert-bowl/ui/bowl-form';
import { useBowls, type Bowl } from '@/entities/bowl';

export type NewBowlPageProps = {};

const NewBowlPage = ({}: NewBowlPageProps) => {
  const { addBowl } = useBowls();
  const router = useRouter();

  const handleSubmit = (bowl: Bowl) => {
    addBowl(bowl);
    router.push('/user');
  };

  return (
    <section className="p-4">
      <BowlForm onSubmit={handleSubmit} />
    </section>
  );
};

export default NewBowlPage;
