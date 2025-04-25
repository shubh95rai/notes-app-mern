import { getToken } from "@/utils/auth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = getToken();

  return token ? children : <Navigate to="/login" />;
}
