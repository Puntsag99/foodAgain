import { UserContextProvider } from "@/providers/UserProvider";

const layout = () => {
  return (
    <UserContextProvider>
      <div>layout</div>
    </UserContextProvider>
  );
};

export default layout;
