'use client';

import { CreateBowl } from '@/features/create-bowl';
import { useBowls, BowlCard } from '@/entities/bowl';

const UserPage = () => {
  const { bowls, addBowl } = useBowls();

  return (
    <section className="p-4">
      <CreateBowl onCreate={addBowl} />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {bowls.map((bowl) => (
          <BowlCard key={bowl.id} bowl={bowl} />
        ))}
      </div>
    </section>
  );
};

export default UserPage;
