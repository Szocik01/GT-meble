import { Navigate, Route, Routes } from "react-router-dom";
import TwoColumns from "../UI/Layouts/TwoColumns";
import AdminNavigation from "../components/AdminComponents/AdminNavigation";
import SubpagesContainer from "../components/AdminComponents/SubpagesContainer";
import Service from "../components/AdminComponents/AdminSubpages/Service";
import Realizations from "../components/AdminComponents/AdminSubpages/Realizations";
import AddRealization from "../components/AdminComponents/AdminSubpages/AddRealization";
import EditRealization from "../components/AdminComponents/AdminSubpages/EditRealization";

export default function Admin() {
  return (
    <TwoColumns sideElement={<AdminNavigation />} marginTop={true} marginBottom={true}>
      <Routes>
        <Route element={<SubpagesContainer />}>
          <Route path="/realizations" element={<Realizations/>} />
          <Route path="/add-realization" element={<AddRealization/>} />
          <Route path="/edit-realization/:realizationId" element={<EditRealization/>} />
          <Route path="/service" element={<Service/>} />
          <Route path="*" element={<Navigate to="/admin/realizations"/>}/>
        </Route>
      </Routes>
    </TwoColumns>
  );
}
