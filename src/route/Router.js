import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Movies } from "../page/Movie/index";
import { MovieDetails } from "../page/MovieDetails/index";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="*" element={<p>erro page</p>} />
      </Routes>
    </BrowserRouter>
  );
};
