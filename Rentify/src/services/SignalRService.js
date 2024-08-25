import * as signalR from "@microsoft/signalr";

export const createConnection = (token) => {
  return new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5079/Chat", {
      accessTokenFactory: () => token,
      withCredentials: true,
    })
    .withAutomaticReconnect()
    .build();
};
