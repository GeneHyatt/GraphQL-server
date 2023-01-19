import React from 'react';
import logo from './logo.svg';
import './App.css';
// import locations from "./pages/locations"
import {useQuery} from "react-query";
import {gql, request} from "graphql-request";

const endpoint = "http://localhost:4000/graphql/";
const COUNTIES_QUERY = gql`
  {
      counties {
          county
      }
  }
`;

function App() {
  const { data, isLoading, error } = useQuery("county_list", () => {
    console.log('data', data, error);
    return request(endpoint, COUNTIES_QUERY);
  });

  console.log('loading', isLoading);

  return (
    <div className="App">
      <h1>Hey!!! Birds!!</h1>
      {error && error.message &&
        <pre>{error.message}</pre>
      }
      {
        isLoading && <h2>'Loading...'</h2>
      }
      {data &&
        <ul>
          {data.counties.map((county) => (
            <li key={county.county}>{county.county}</li>
          ))}
        </ul>
      }
    </div>
  );
}

export default App;
