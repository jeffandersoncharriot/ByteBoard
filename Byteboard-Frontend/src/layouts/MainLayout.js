import React from "react";
import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import ErrorBoundary from "../components/ErrorBoundary";
import SystemError from "../pages/SystemError";
import Alert from "react-bootstrap/Alert"
import { useLocation} from "react-router-dom"

/**
 * Main layout for the pages
 * error boundary added for any error
 * @returns webpage layout
 */
function MainLayout() {
  const { state } = useLocation()

  return <div>
    <ErrorBoundary fallback={SystemError("Unexpected error")}>
      {state && state.errorMessage && <Alert variant="danger">{state.errorMessage}</Alert>}
      <Header />
      <div className="menuDisplay"><Outlet /></div>
      <Footer />
    </ErrorBoundary>
  </div>
}

export default MainLayout