import React from 'react';
import { Route, Outlet, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import GameBoard from './routes/board/GameBoard';
import MainPage from './routes/main/MainPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Stats from './routes/stats/Stats';
import NotFound from './routes/not-found/NotFound';

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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
);

export default router;
