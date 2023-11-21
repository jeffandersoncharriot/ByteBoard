import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


/** The error boundary has a function component wrapper.  */
/**
 * The error boundary is a functional component that wraps the class component.
 * @param {object} props The children and the fallback component
 * @returns The error boundary
 */
function ErrorBoundary({ children, fallback }) {
    const [hasError, setHasError] = useState(false);
    const location = useLocation();
    useEffect(() => {
        if (hasError) {
            setHasError(false);
        }
    }, [location.key]);
    return (
        /** The class component error boundary is a child of the functional component.  */
        <ErrorBoundaryInner hasError={hasError} setHasError={setHasError} fallback={fallback}>
            {children}
        </ErrorBoundaryInner>
    );
}
/** The class component accepts getters and setters for the parent functional component's error state. */
class ErrorBoundaryInner extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(_error) {
        return { hasError: true };
    }
    componentDidUpdate(prevProps, _previousState) {
        if (!this.props.hasError && prevProps.hasError) {
            this.setState({ hasError: false });
        }
    }
    componentDidCatch(_error, _errorInfo) {
        this.props.setHasError(true);
    }
    render() {
        return this.state.hasError ? this.props.fallback : this.props.children;
    }
}
export default ErrorBoundary;

