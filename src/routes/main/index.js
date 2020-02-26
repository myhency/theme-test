import OverviewLayout from "../../layouts/MainLayout";
import Overview from "../../pages/Overview";

const contextPath = '/home/';

const mainRoutes = [
    {
        path: contextPath,
        name: 'Home',
        component: Overview,
        topMenu: false
    },
    {
        path: contextPath + 'overview',
        name: 'Overview',
        component: Overview,
        topMenu: true
    },
    {
        path: contextPath + 'sites',
        name: 'Sites',
        component: Overview,
        topMenu: true
    },
    {
        path: contextPath + 'services',
        name: 'Services',
        component: Overview,
        topMenu: true
    },
    {
        name: 'Pages',
        topMenu: false,
        subRoutes: [
            {
                path: contextPath + 'overview',
                name: 'Overview',
                component: Overview,
                topMenu: true
            }
        ]
    }
]

export default mainRoutes;