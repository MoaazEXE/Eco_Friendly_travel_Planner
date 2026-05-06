import { Link } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="container my-5" style={{ flex: 1 }}>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card-eco">
            <div className="p-4 p-md-5">
              <h2 className="eco-page-title text-center mb-4">Create an Account</h2>
              <RegisterForm />
              <p className="text-center mt-4 mb-0">
                Already have an account?{" "}
                <Link to="/login" style={{ color: "var(--green-primary)" }}>
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
