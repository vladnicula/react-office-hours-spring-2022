import { Component } from "react";

export class ErrorBoundary extends Component {
    state = {
        hasError: false
    }
  
    static getDerivedStateFromError(error: unknown) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }

    // useEffect(() => {}, [])
    componentDidMount () {

    }

    // useEffect(() => { <<<<< return () => {} >>>> }, [])
    componentWillUnmount () {

    }
  
    componentDidCatch(error: unknown, errorInfo: unknown) {
        // You can also log the error to an error reporting service
        //   logErrorToMyService(error, errorInfo);
        console.error("Log error to error service", error)
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Invoice app error handler.</h1>;
      }
  
      return this.props.children; 
    }
  }
  