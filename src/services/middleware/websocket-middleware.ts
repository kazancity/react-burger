import { Middleware } from "redux";
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import { refreshToken } from "../../utils/API";
import { AppActions, AppDispatch, RootState } from "../store";

export type wsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsSendMessage?: ActionCreatorWithPayload<any>;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<any>;
};

export const socketMiddleware = (
  wsUrl: string,
  wsActions: wsActionTypes,
): Middleware<{}, RootState, AppDispatch> => {
  return ((store) => {
    let socket: WebSocket | null = null;
    let url: string | null = null;
    let closing: boolean = false;

    return (next) => (action: AppActions) => {
      const {
        wsConnect,
        wsDisconnect,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsActions;
      const { dispatch } = store;

      if (wsConnect.match(action)) {
        url = `${wsUrl}${action.payload}`;
        socket = new WebSocket(url);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = (event) => {
          dispatch(onError(event.type));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          if (parsedData.message === "Invalid or missing token") {
            refreshToken().then((refreshData) => {
              const wssUrl = new URL(url!);
              wssUrl.searchParams.set(
                "token",
                refreshData.accessToken.replace("Bearer ", ""),
              );
              dispatch(wsConnect(wssUrl.toString()));
            });
          } else {
            dispatch(onMessage(parsedData));
          }
        };

        socket.onclose = () => {
          if (closing) {
            dispatch(onClose());
          } else {
            dispatch(wsConnect(url!));
          }
        };

        if (wsDisconnect.match(action)) {
          closing = true;
          socket.close();
        }

        if (wsSendMessage?.match(action)) {
          socket.send(JSON.stringify(action.payload));
        }
      }
      next(action);
    };
  }) as Middleware;
};
