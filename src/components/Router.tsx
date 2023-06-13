import React from 'react';
import { Route, Outlet, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import GameBoard from './GameBoard';
import MainPage from './MainPage';
import Header from './Header';
import Footer from './Footer';
import Stats from './Stats';

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
        <Route path="game-board" element={<GameBoard />} />
        <Route path="stats" element={<Stats />} />
        <Route path="*" element="<div>404</div>" />
      </Route>
    </Route>
  )
);

export default router;
