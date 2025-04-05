import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axiosInstance from "../api/axiosInstance";
import axios, { AxiosError } from "axios";  
// import Select from "react-select";
import { useDropzone, Accept } from "react-dropzone";

// Define the BlogFormValues interface
interface BlogFormValues {
  author: string;
  title: string;
  publishedDate: string;
  category: string;
  subcategory: string[];
  summary: string;
  tags: string;
  description: string;
  images: File[];
}

const categories = [
  { value: "tech", label: "Tech" },
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food" },
];

// const subcategories = [
//   { value: "ai", label: "AI" },
//   { value: "ml", label: "Machine Learning" },
//   { value: "nature", label: "Nature" },
//   { value: "adventure", label: "Adventure" },
// ];

const BlogForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<BlogFormValues>();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Dropzone configuration
  const acceptFormats: Accept = {
    "image/*": [],
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptFormats,
    onDrop: (acceptedFiles: File[]) => {
      setUploadedFiles((prevFiles) => {
        const newFiles = [...prevFiles, ...acceptedFiles];
        setValue("images", newFiles); // Update form state directly
        return newFiles;
      });
    },
  });

  const onSubmit: SubmitHandler<BlogFormValues> = async (values) => {
    console.log("Submitted Data:", values);

    // Create FormData to append data and images
    const formData = new FormData();

    // Append regular fields
    formData.append("author", values.author);
    formData.append("title", values.title); // fixed to match the backend field
    formData.append("publishedDate", values.publishedDate);
    formData.append("category", values.category);
    //formData.append("subcategory", JSON.stringify(values.subcategory)); // Convert to JSON string
    formData.append("summary", values.summary);
    formData.append("description", values.description);
    //formData.append("tags", values.tags); // Add if needed
   


    // Append images (if any)
    if (values.images && values.images.length > 0) {
      values.images.forEach((file) => {
        formData.append("images", file); // Use 'file' if that's what the backend expects
      });
    }

    // Perform the POST request with form data
    try {
      const response = await axiosInstance.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
      console.log("Form submitted successfully:", response.data);
      alert("Your Blog is posted successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error("Axios Error:", axiosError.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
    }

    onClose(); // Close the modal after submitting the form
    
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-blue-100 bg-opacity-10">
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

            {/* Publication Date */}
            <div>
              <label>Publication Date:</label>
              <input
                type="date"
                {...register("publishedDate", { required: "Published Date is required" })}
                className="border p-2 w-full"
              />
              {errors.publishedDate && <div className="text-red-500">{errors.publishedDate.message}</div>}
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
            {/* <div>
              <label>Sub-category:</label>
              <Select
                isMulti
                options={subcategories}
                onChange={(selected) =>
                  setValue("subcategory", selected ? selected.map((item) => item.value) : [])
                }
                className="border p-2 w-full"
              />
              {errors.subcategory && <div className="text-red-500">{errors.subcategory.message}</div>}
            </div> */}

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
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default BlogForm;
