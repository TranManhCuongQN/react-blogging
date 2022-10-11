import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

export default function useFirebaseImage(setValue, getValues) {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");

  if (!setValue || !getValues) return;

  const handleUploadImage = (file) => {
    const storage = getStorage();

    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded (chức năng progress khi upload ảnh)
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(
          "🚀 ~ file: PostAddNews.jsx ~ line 80 ~ handleUploadImage ~ Error",
          error
        );
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          // Khi Upload thành công rồi
          setImage(downloadURL);
        });
      }
    );
  };

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    // Nếu không có file thì ko chạy gì hết
    if (!file) return;
    setValue("image_name", file.name);
    handleUploadImage(file);
  };

  const handleDeleteImage = () => {
    const storage = getStorage();
    const imageRef = ref(storage, "images/" + getValues("image_name"));

    deleteObject(imageRef)
      .then(() => {
        setImage("");
        setProgress(0);
        console.log("Remove image successfully");
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: PostAddNews.jsx ~ line 124 ~ handleDeleteImage ~ error",
          error
        );
        console.log("Can not delete image");
      });
  };

  const handleResetUpload = () => {
    setImage("");
    setProgress(0);
  };
  return {
    image,
    handleResetUpload,
    progress,
    handleSelectImage,
    handleDeleteImage,
  };
}
