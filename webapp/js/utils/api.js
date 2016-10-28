
export function fetchNamespacs() {
  return (dispatch) => {
    fetch("https://play.dhis2.org/demo/api/dataStore").then(({namespaces}) => {
      dispatch({ type: "FETCH_NAMESPACES", namespaces });
    });
  }
}
