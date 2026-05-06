import { useNavigate, Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <main className="container my-5" style={{ flex: 1 }}>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card-eco">
            <div className="p-4 p-md-5">
              <h2 className="eco-page-title text-center mb-4">Welcome Back</h2>
              <LoginForm onSuccess={() => navigate("/")} />
              <p className="text-center mt-4 mb-0">
                Don&apos;t have an account?{" "}
                <Link to="/register" style={{ color: "var(--green-primary)" }}>
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
