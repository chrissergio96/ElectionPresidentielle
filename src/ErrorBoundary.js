import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Erreur capturée :", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Une erreur est survenue dans l'affichage des résultats.</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
