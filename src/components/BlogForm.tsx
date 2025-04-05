import { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axiosInstance from "../api/axiosInstance";
import axios, { AxiosError } from "axios";  
import { useDropzone, Accept } from "react-dropzone";
import { AuthContext } from "../lib/AuthProvider";

interface BlogFormValues {
  author: string;
  authorEmail:string;
  title: string;
  category: string;
  subcategory: string;
  summary: string;
  description: string;
  images: File[];
}

const categories = [
  { value: "tech", label: "Tech" },
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food" },
  { value: "hiking", label: "Hiking" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "education", label: "Education" },
  { value: "health", label: "Health" },
  { value: "fashion", label: "Fashion" },
  { value: "finance", label: "Finance" },
  { value: "personal", label: "Personal" },
  { value: "business", label: "Business" },
  { value: "sports", label: "Sports" },
];

const subcategories = [
  { value: "ai", label: "AI" },
  { value: "ml", label: "Machine Learning" },
  { value: "nature", label: "Nature" },
  { value: "adventure", label: "Adventure" },
  { value: "deep-learning", label: "Deep Learning" },
  { value: "wildlife", label: "Wildlife" },
  { value: "coding", label: "Coding" },
  { value: "camping", label: "Camping" },
  { value: "budget-travel", label: "Budget Travel" },
  { value: "recipes", label: "Recipes" },
  { value: "fitness", label: "Fitness" },
  { value: "self-help", label: "Self Help" },
];

const BlogForm = ({
  isOpen,
  onClose,
  postToEdit,
}: {
  isOpen: boolean;
  onClose: () => void;
  postToEdit?: any; // Replace with proper type if you have one
}) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext!;
  //console.log(user);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<BlogFormValues>();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  useEffect(() => {
    if (user?.displayName && user?.email) {
      setValue("author", user.displayName);
      setValue("authorEmail", user.email);
    }
  }, [user?.displayName, setValue]);

  useEffect(() => {
    if (postToEdit) {
      setValue("author", postToEdit.author || "");
      setValue("title", postToEdit.title || "");
      setValue("category", postToEdit.category || "");
      setValue("subcategory", postToEdit.subcategory || "");
      setValue("summary", postToEdit.summary || "");
      setValue("description", postToEdit.description || "");
    }
  }, [postToEdit, setValue]);

  const acceptFormats: Accept = {
    "image/*": [],
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptFormats,
    onDrop: (acceptedFiles: File[]) => {
      setUploadedFiles((prevFiles) => {
        const newFiles = [...prevFiles, ...acceptedFiles];
        setValue("images", newFiles);
        return newFiles;
      });
    },
  });

  const onSubmit: SubmitHandler<BlogFormValues> = async (values) => {
    console.log("Submitted Data:", values);
    const formData = new FormData();

    formData.append("author", values.author);
    formData.append("authorEmail", values.authorEmail);
    formData.append("title", values.title); 
    formData.append("category", values.category);
    formData.append("subcategory", values.subcategory);
    formData.append("summary", values.summary);
    formData.append("description", values.description);

    if (values.images && values.images.length > 0) {
      values.images.forEach((file) => {
        formData.append("images", file);
      });
    }

    try {
      if (postToEdit?._id) {
        const response = await axiosInstance.put<any>(`/posts/${postToEdit._id}`, formData);
        console.log("Form updated successfully:", response.data);
        alert("Blog updated successfully!");
      } else {
        const response = await axiosInstance.post<any>("/posts", formData);
        console.log("Form submitted successfully:", response.data);
        alert("Your Blog is posted successfully!");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error("Axios Error:", axiosError.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
    }

    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-transpa bg-opacity-10 z-50">
        <div className="bg-white p-6 rounded-lg w-2/3">
          <h2 className="text-xl font-bold mb-4">Blog Form</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Author Name */}
            <div>
              <label>Author Name:</label>
              <input
                type="text"
                {...register("author", { required: "Author is required" })}
                className="border p-2 w-full"
              />
              {errors.author && <div className="text-red-500">{errors.author.message}</div>}
            </div>

            {/* Blog Title */}
            <div>
              <label>Blog Title:</label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className="border p-2 w-full"
              />
              {errors.title && <div className="text-red-500">{errors.title.message}</div>}
            </div>

            {/* Category */}
            <div>
              <label>Category:</label>
              <select
                {...register("category", { required: "Category is required" })}
                className="border p-2 w-full"
                defaultValue=""
              >
                <option value="">Select</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {errors.category && <div className="text-red-500">{errors.category.message}</div>}
            </div>

            {/* Sub-category */}
            <div>
              <label>Sub-Category:</label>
              <select
                {...register("subcategory", { required: "Category is required" })}
                className="border p-2 w-full"
                defaultValue=""
              >
                <option value="">Select</option>
                {subcategories.map((subcat) => (
                  <option key={subcat.value} value={subcat.value}>
                    {subcat.label}
                  </option>
                ))}
              </select>
              {errors.category && <div className="text-red-500">{errors.category.message}</div>}
            </div>

            {/* Summary */}
            <div>
              <label>Summary:</label>
              <textarea
                {...register("summary", { required: "Summary is required" })}
                className="border p-2 w-full"
              />
              {errors.summary && <div className="text-red-500">{errors.summary.message}</div>}
            </div>

            {/* Main Content */}
            <div>
              <label>Main Content:</label>
              <textarea
                {...register("description", { required: "Main content is required" })}
                className="border p-2 w-full"
              />
              {errors.description && <div className="text-red-500">{errors.description.message}</div>}
            </div>

            {/* Image Upload */}
            <div>
              <label>Images Upload:</label>
              <div {...getRootProps()} className="border-dashed border-2 p-4 text-center cursor-pointer">
                <input {...getInputProps()} />
                <p>Drop files here or click to upload</p>
              </div>
              <div className="mt-2">
                {uploadedFiles.map((file, index) => (
                  <p key={index} className="text-sm">{file.name}</p>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-[#003B95] text-white px-4 py-2 rounded"
              >
                {postToEdit ? "Update" : "Publish"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default BlogForm;
