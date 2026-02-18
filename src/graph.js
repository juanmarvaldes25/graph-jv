import { graphConfig } from "./authConfig";


export async function callMsGraph(accessToken){
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };
  // Append the headers and type to fetch call
    return fetch(graphConfig.graphMeEndpoint, options).then(response => response.json()).catch(error => console.log(error));
}

export async function callMsGraphUsers(accessToken){
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append("ConsistencyLevel", "Eventual")

    const options = {
        method: "GET",
        headers: headers
    };
  // Append the headers and type to fetch call
    return fetch(graphConfig.graphUsersEndpoint, options).then(response => response.json()).catch(error => console.log(error));
}