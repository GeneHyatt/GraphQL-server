import React from "react";
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";

const endpoint = "http://localhost:4000/graphql/";
const COUNTIES_QUERY = gql`
    {
        sightings {
            count
        }
    }
`;

export default function App() {
    const { data, isLoading, error } = useQuery("county_list", () => {
        return request(endpoint, COUNTIES_QUERY);
    });

    if (isLoading) return "Loading...";
    if (error) return <pre>{error.message}</pre>;

    return (
        <div>
            <h1>SpaceX Launches</h1>
            <ul>
                {data.sightings.map((sighting) => (
                    <li key={sighting.count}>{sighting.count}</li>
                ))}
            </ul>
        </div>
    );
}