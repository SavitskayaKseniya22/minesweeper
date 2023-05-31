import React from 'react';
import { Route, Outlet, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import GameBoard from './GameBoard';
import MainPage from './MainPage';
import Header from './Header';
import Footer from './Footer';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      }
    >
      <Route path="/" element={<Outlet />}>
        <Route index element={<MainPage />} />
        <Route
          path="game-board"
          element={<GameBoard />}
          action={async ({ request }) => {
            const formData = await request.formData();
            return Object.fromEntries(formData);
          }}
        />
        <Route path="*" element="<div>404</div>" />
      </Route>
    </Route>
  )
);

export default router;
