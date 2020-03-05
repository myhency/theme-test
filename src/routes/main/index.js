import Overview from "../../pages/Overview";
import SiteList from "../../pages/SiteList";
import SiteListNew from "../../pages/SiteList";
import ServiceList from "../../pages/ServiceList";
import RegisterSite from "../../pages/RegisterSite";
import SiteDetails from "../../pages/SiteDetails";
import ServiceDetails from "../../pages/ServiceDetails";
import InstanceList from "../../pages/InstanceList";
import InstanceDetails from "../../pages/InstanceDetails";
import LogList from "../../pages/LogList";

const contextPath = '/home/';

const mainRoutes = [
    {
        path: contextPath + 'overview',
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
        component: SiteList,
        topMenu: true
    },
    {
        path: contextPath + 'services',
        name: 'Services',
        component: ServiceList,
        topMenu: true
    },
    {
        path: contextPath + 'instances',
        name: 'Instances',
        component: InstanceList,
        topMenu: true
    },
    {
        path: contextPath + 'logs',
        name: 'Logs',
        component: LogList,
        topMenu: true
    },
    {
        path: contextPath + 'sites/sitedetails',
        name: 'SiteDetails',
        component: SiteDetails,
        topMenu: false
    },
    {
        path: contextPath + 'services/servicedetails',
        name: 'ServiceDetails',
        component: ServiceDetails,
        topMenu: false
    },
    {
        path: contextPath + 'instances/instancedetails',
        name: 'InstanceDetails',
        component: InstanceDetails,
        topMenu: false
    }
]

export default mainRoutes;