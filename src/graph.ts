import { graphConfig } from "./authConfig";


export async function callMsGraph(accessToken: string){
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

export async function callMsGraphUsers(accessToken: string){
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

export async function callPeopleNameAndEmail(accessToken: string, query: string){
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append("ConsistencyLevel", "Eventual")

    const options = {
        method: "GET",
        headers: headers
    };

    //sanitise
    query = query.replace(/[^a-zA-Z0-9\s\.\-_@]/g, ""); //removes any characters that are not letters, numbers, spaces, dots, dashes, underscores or @
    query.trim();

    return fetch(graphConfig.graphUsersEndpoint+ 
        '?$filter=startsWith(displayName,\'' + query + '\')&$select=displayName',
        options).then(response => response.json()).catch(error => console.log(error));
        
}