import React, { useState, ChangeEvent, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthorData {
  id: string; // Add the id field for updating
  firstName: string;
  lastName: string;
  nationality: string;
}

interface UpdateAuthorFormProps {
  onUpdateAuthor: (authorData: AuthorData) => void;
}

const UpdateAuthorForm: React.FC<UpdateAuthorFormProps> = ({
  onUpdateAuthor,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialAuthorData: AuthorData =
    location.state && (location.state as { author: AuthorData }).author;

  // const initialAuthorData: AuthorData | undefined = location.state;

  const [authorData, setAuthorData] = useState<AuthorData>(
    initialAuthorData || {
      id: "",
      firstName: "",
      lastName: "",
      nationality: "",
    }
  );

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthorData({ ...authorData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onUpdateAuthor(authorData); // Call the function passed from the parent component to update the author
    navigate("/authors");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={authorData.firstName}
          placeholder={initialAuthorData.firstName}
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
          placeholder={initialAuthorData.lastName}
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
          placeholder={initialAuthorData.nationality}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <button type="submit">Update Author</button>
    </form>
  );
};

export default UpdateAuthorForm;
