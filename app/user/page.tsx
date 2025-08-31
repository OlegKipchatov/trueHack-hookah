"use client";

import { CreateBowl } from "@/features/create-bowl";
import { EditBowl } from "@/features/edit-bowl";
import { useBowls, BowlCard } from "@/entities/bowl";

export type UserPageProps = {};

const UserPage = ({}: UserPageProps) => {
  const { bowls, addBowl, updateBowl } = useBowls();

  return (
    <section className="p-4">
      <CreateBowl onCreate={addBowl} />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {bowls.map((bowl) => (
          <EditBowl key={bowl.id} bowl={bowl} onSave={updateBowl}>
            <BowlCard bowl={bowl} />
          </EditBowl>
        ))}
      </div>
    </section>
  );
};

export default UserPage;
