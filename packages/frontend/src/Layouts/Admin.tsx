import { useEffect } from "react";

export default function Admin() {
  useEffect(() => {}, []);

  return (
    <div className="NotFound text-center">
      <h3>Admin</h3>
      <div className="grid min-h-screen w-full">
        Welcome to admin page, navigate with the menu to edit each page
      </div>
    </div>
  );
}
