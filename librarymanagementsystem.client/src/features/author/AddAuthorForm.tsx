import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface AuthorData {
  firstName: string;
  lastName: string;
  nationality: string;
}

interface AddAuthorFormProps {
  onAddAuthor: (authorData: AuthorData) => void;
}

const AddAuthorForm: React.FC<AddAuthorFormProps> = ({ onAddAuthor }) => {
  const navigate = useNavigate();

  const [authorData, setAuthorData] = useState<AuthorData>({
    firstName: "",
    lastName: "",
    nationality: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthorData({ ...authorData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Call the function passed from the parent component to add the author
    try {
      // Call the function passed from the parent component to add the author
      await onAddAuthor(authorData);
      // If the author was added successfully, navigate to the authors list
      console.log("Author added successfully");
      navigate("/authors");
    } catch (error) {
      console.error("Error adding author:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={authorData.firstName}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={authorData.lastName}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <label>
        Nationality:
        <input
          type="text"
          name="nationality"
          value={authorData.nationality}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <button type="submit">Add Author</button>
    </form>
  );
};

export default AddAuthorForm;
