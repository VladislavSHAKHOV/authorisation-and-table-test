import Login from "../components/Login/Login";
import Table from "../components/Table/Table";
import { LOGIN_ROUTE, TABLE_ROUTE } from "../utils/consts";


export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        element: <Login />
    },
];

export const privateRoutes = [
    {
        path: TABLE_ROUTE,
        element: <Table />
    },
];
