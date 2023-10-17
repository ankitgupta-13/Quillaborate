import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import DocumentPage from "./pages/DocumentPage";
import DocumentUser from "./container/user/DocumentUser";
import Profile from "./container/Profile";

const App = () => {
  return (
    <div className="font-poppins">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="auth/sign-in" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/dashboard/document-user/dashboard"
            element={<Navigate replace to="/dashboard" />}
          />
          <Route
            path="/dashboard/dashboard"
            element={<Navigate replace to="/dashboard" />}
          />
          <Route path="/dashboard/document-user" element={<DocumentUser />} />
          <Route
            path="/dashboard/document-user/document-user"
            element={<Navigate replace to="/dashboard/document-user" />}
          />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/document/:document_id" element={<DocumentPage />} />
          <Route path="/document-example" element={<DocumentPage />} />
          {/* <Route path="/document-detail/:document_id" element={<DocumentDetail />} /> */}
          {/* <Route path='/pdf-example' element={<PDFViewer />} /> */}
          {/* <Route path='/dragdrop-example' element={<DragDropExample />} /> */}
          {/* <Route path='*' element={<Navigate replace to='/dashboard' />} /> */}
        </Routes>
      </Router>
      <div className="text-sms">
        <ToastContainer
          position="bottom-right"
          // theme='dark'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default App;
