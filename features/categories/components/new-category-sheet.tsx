import { z } from "zod";
import { useNewCategroy } from "@/features/categories/hooks/use-new-category"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CategoryForm } from "./category-form";
import { insertCategorieSchema } from "@/db/schema";
import { useCreateCategory } from "@/features/categories/api/use-create-category";

const formSchema = insertCategorieSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategroy();

  const mutation = useCreateCategory();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create a new category to organize your transactions.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            name: "",
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
