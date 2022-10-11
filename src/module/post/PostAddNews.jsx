import React, { useEffect, useState } from "react";

import slugify from "slugify";
import styled from "styled-components";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import ImageUpload from "../../components/image/ImageUpload";
import { postStatus } from "../../utils/constants";
import { Dropdown } from "../../components/dropdown/index";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import { useForm } from "react-hook-form";
import Toggle from "../../components/toggle/Toggle";
import { db } from "../../firebase-app/firebase-config";
import { async } from "@firebase/util";
import { useAuth } from "../../contexts/authContext";
import { toast } from "react-toastify";

const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const { userInfo } = useAuth();
  console.log(
    "🚀 ~ file: PostAddNews.jsx ~ line 33 ~ PostAddNew ~ userInfo",
    userInfo
  );
  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 1,
      categoryId: "",
      hot: false,
      image: "",
    },
  });

  // watchStatus là cái watch trong react-hook-form dùng để theo dõi sự thay đổi của nó khi mình sử dụng custom component như radio, checkbox, toggle không phải những cái của form bình thường input, checkbox,...
  const watchStatus = watch("status");
  const watchCategory = watch("category");
  const watchHot = watch("hot");
  console.log("PostAddNew ~ watchCategory", watchCategory);

  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // custom hook
  const {
    image,
    handleResetUpload,
    progress,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues);

  const addPostHandler = async (values) => {
    setLoading(true);
    try {
      const cloneValues = { ...values };
      // Nếu không nhập slug thì values.slug là slugify(values.title) còn trường hợp người dùng nhập tiếng việt thì nó sẽ slugify qua không dấu
      cloneValues.slug = slugify(values.title || values.slug, { lower: true });
      // Chuyển values.status thành kiểu number thay vì string
      cloneValues.status = Number(values.status);

      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...cloneValues,
        image,
        userId: userInfo.uid,
        createAt: serverTimestamp(),
      });

      // Nếu thành công hiện toast
      toast.success("Create new post successfully!");
      reset({
        title: "",
        slug: "",
        status: 1,
        categoryId: "",
        hot: false,
        image: "",
      });
      handleResetUpload();
      setSelectCategory({});

      console.log(
        "🚀 ~ file: PostAddNews.jsx ~ line 37 ~ addPostHandler ~ cloneValues",
        cloneValues
      );
    } catch (error) {
      setLoading(false);
    } finally {
      // finally cho dù try hay catch thì nó cũng chạy đến cuối cùng
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getData();
  }, []);

  useEffect(() => {
    document.title = "Monkey Blogging - Add new post";
  });

  const handleClickOption = (item) => {
    // item này sẽ là object gồm id, name, slug
    setValue("categoryId", item.id);
    setSelectCategory(item);
  };

  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>

          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={handleSelectImage}
              className="h-[250px]"
              progress={progress}
              image={image}
              handleDeleteImage={handleDeleteImage}
            ></ImageUpload>
          </Field>

          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select
                placeholder={`${selectCategory?.name || "Select category"}`}
              ></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleClickOption(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {selectCategory?.name && (
              <span className="inline-block p-3 rounded-lg bg-green-50 text-sm font-medium text-green-600">
                {selectCategory?.name}
              </span>
            )}
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Feature post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>

          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                onClick={() => setValue("status", "approved")}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                onClick={() => setValue("status", "pending")}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                onClick={() => setValue("status", "reject")}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </div>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Author</Label>
            <Input control={control} placeholder="Find the author"></Input>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto w-[250px] "
          isLoading={loading}
          disabled={loading}
        >
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
