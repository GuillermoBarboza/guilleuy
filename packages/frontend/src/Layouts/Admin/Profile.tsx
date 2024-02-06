import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API, Storage, Auth } from "aws-amplify";
import { onError } from "../../lib/errorLib";
import config from "../../config";
import LoaderButton from "../../Components/LoaderButton";
import { s3Upload, s3Delete } from "../lib/awsLib";

export default function AdminProfile() {
  // Ref for the file input
  const file = useRef<null | File>(null);

  // User profile state
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    profilePictureUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user profile on component mount
  useEffect(() => {
    async function loadUserProfile() {
      try {
        // Fetch the current authenticated user
        const currentUser = await Auth.currentAuthenticatedUser();
        //const userEmail = currentUser.attributes.email;

        console.log(currentUser);
        // Fetch additional user profile information if needed
        const userProfile = await API.get(
          "notes",
          `/profile/${currentUser.attributes.sub}`,
          {}
        );
        console.log("PROFILE", userProfile);
        setProfile({ ...userProfile });
      } catch (e) {
        onError(e);
      }
    }

    loadUserProfile();
  }, []);

  // Handle file change for profile picture
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.files === null) return;
    file.current = event.currentTarget.files[0];
  }

  // Save profile changes
  async function saveProfile(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      let profilePictureUrl;

      if (file.current) {
        profilePictureUrl = await s3Upload(file.current);
      } else {
        profilePictureUrl = profile.profilePictureUrl;
      }
      console.log("profile:", profile);
      const currentUser = await Auth.currentAuthenticatedUser();
      // Update user profile with new data
      const userEdited = await API.put("notes", `/profile`, {
        body: {
          profile: { ...profile, profilePictureUrl },
          sub: currentUser.attributes.sub,
        },
      });
      console.log(userEdited);
      setIsLoading(false);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  // Render the user profile form
  return (
    <div className="UserProfile">
      <form onSubmit={saveProfile}>
        <div>
          <label>Username</label>
          <input
            type="text"
            placeholder={
              profile.username?.length > 1 ? profile.username : "Must edit name"
            }
            value={profile.username || ""}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
        </div>
        <div>
          <p>
            Name:{" "}
            {profile.username?.length > 1 ? profile.username : "No Name YET"}{" "}
          </p>
          <p>Email: {profile.email} </p>
        </div>
        <div>
          <label>Profile Picture</label>
          {profile.profilePictureUrl && (
            <img src={profile.profilePictureUrl} alt="Profile" />
          )}
          <input onChange={handleFileChange} type="file" />
        </div>
        <LoaderButton isLoading={isLoading} type="submit">
          Save Profile
        </LoaderButton>
      </form>
    </div>
  );
}
