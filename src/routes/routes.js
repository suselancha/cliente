//Layouts
import LayoutAdmin from '../layouts/LayoutAdmin';

//Cargar las paginas
import Dashboard from '../pages/Dashboard';
import Usuario from '../pages/Usuario';
import Error404 from '../pages/Error404';
import Frontend from '../pages/Frontend';

const routes = [
    {
        path: "/administrador",
        layout: LayoutAdmin,
        component: Dashboard,
        exact: true
    },
    {
        path: "/:nombreUsuario",
        layout: LayoutAdmin,
        component: Usuario,
        exact: true
    },
    {
        path: "/",
        component: Frontend,
        layout: LayoutAdmin,
        exact: true
    },
    {
        component: Error404
    }
];

export default routes;