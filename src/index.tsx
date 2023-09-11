//@ts-ignore
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/MovieInfoPage.css'
import './styles/DarkTheme.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {MoviesPageContainer} from "./containers/MoviesPageContainer";
import {MoviesListComponent} from "./components/MoviesListComponent";
import {MovieInfoPageComponent} from "./components/MovieInfoPageComponent";
import store from "./redux/store";
import React from "react";
import {Provider} from "react-redux";

const AppLayout = () => (
    <>
        <MoviesPageContainer/>
    </>
)
const router = createBrowserRouter([
    {
        element: <AppLayout/>,
        children: [
            {
                path: '/',
                element: <MoviesListComponent/>,
                children: [
                    {
                        path: '/:page?',
                        element: <MoviesListComponent/>

                    },
                ]
            },
            {
                path: '/:page/:id',
                element: <MovieInfoPageComponent/>
            }

        ]
    },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);

