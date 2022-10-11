import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import DashboardHeading from "../../module/dashboard/DashboardHeding";
import React from "react";
import { useForm } from "react-hook-form";
import FieldCheckboxes from "../../components/field/FieldCheckboxes";
import slugify from "slugify";
import { categoryStatus } from "../../utils/constants";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import { toast } from "react-toastify";

const CategoryAddNew = () => {
  const {
    control,
    setValue,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createdAt: new Date(),
    },
  });

  const handleAddNewCategory = async (values) => {
    if (!isValid) return;
    const newValues = { ...values };
    newValues.slug = slugify(newValues.name || newValues.slug, {
      lower: true,
    });
    newValues.status = Number(newValues.status);

    try {
      const colRef = collection(db, "categories");
      await addDoc(colRef, {
        ...newValues,
        createdAt: serverTimestamp(),
      });
      toast.success("Create new category successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      reset({
        name: "",
        slug: "",
        status: 1,
        createdAt: new Date(),
      });
    }
  };

  const watchStatus = watch("status");

  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewCategory)} autoComplete="off">
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          kind="primary"
          className="mx-auto w-[250px]"
          type="submit"
          disable={isSubmitting}
          isLoading={isSubmitting}
        >
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
