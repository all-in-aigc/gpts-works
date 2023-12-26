import { Category } from "@/app/types/category";
import { getCategories } from "@/app/models/categories";

async function getData(): Promise<Category[] | undefined> {
  const categories = await getCategories(1, 50);

  return categories;
}

interface Props {
  activeSlug: string;
}

export default async ({ activeSlug }: Props) => {
  const categories = await getData();

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-5 py-4 md:px-10 md:py-4 lg:py-4">
        <div className="flex flex-wrap">
          {categories &&
            categories.map((category: Category, idx: number) => {
              return (
                <a
                  key={idx}
                  href={`/gpts/${category.slug}`}
                  className={`text-sm border px-2 py-1 mx-1 my-1 rounded-md hover:bg-primary hover:text-white cursor-pointer ${
                    activeSlug === category.slug ? "bg-primary text-white" : ""
                  }`}
                >
                  {category.name}
                </a>
              );
            })}
        </div>
      </div>
    </section>
  );
};
