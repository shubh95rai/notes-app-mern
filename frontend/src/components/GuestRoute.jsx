import { getToken } from "@/utils/auth";
import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }) {
  const token = getToken();

  return token ? <Navigate to="/" /> : children;
}
