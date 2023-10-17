import { lazy, Suspense } from "preact/compat";
import t from "../i18n/i18n";
const MyProjects = lazy(() => import("./MyProjects/MyProjects"));
const Customize = lazy(() => import("./Customize/Customize"));
const Pepsi = lazy(() => import("./PepsiTheCat/Pepsi"));
const SkillsMain = lazy(() => import("./Skills/SkillsMain"));
const Terminal = lazy(() => import("./Terminal/Terminal"));

const apps: App[] = [
    {
        name: t('app.skills'),
        window: {
            width: 700,
            height: 550,
            resizable: true,
            maximizable: true,
            minimizable: true,
            fullscreenable: true,
            title: t('app.skills.title')
        },
        icon: '/apps/skills.png',
        component: () => <Suspense fallback={<></>}><SkillsMain /></Suspense>
    },
    {
        name: t('app.projects'),
        window: {
            width: 900,
            height: 600,
            resizable: true,
            maximizable: true,
            minimizable: true,
            fullscreenable: true,
            title: t('app.projects')
        },
        icon: '/apps/portfolio.png',
        component: () => <Suspense fallback={<></>}><MyProjects/></Suspense>
    },
    {
        name: t('app.terminal'),
        window: {
            width: 600,
            height: 384,
            resizable: false,
            maximizable: false,
            minimizable: false,
            fullscreenable: false,
            title: t('app.terminal')
        },
        icon: '/apps/terminal.png',
        component: () => <Suspense fallback={<></>}><Terminal /></Suspense>
    },
    {
        name: 'Borjú',
        window: {
            width: 600,
            height: 500,
            resizable: true,
            maximizable: true,
            minimizable: true,
            fullscreenable: true,
            title: 'Borjú Galléria'
        },
        icon: '/apps/pepsifolder.png',
        component: () => <Suspense fallback={<></>}><Pepsi/></Suspense>
    },


    // Hidden apps
    {
        name: 'os_customize',
        window: {
            width: 900,
            height: 600,
            resizable: false,
            maximizable: false,
            minimizable: false,
            fullscreenable: true,
            title: t('app.os.customize.title')
        },
        hide: true,
        icon: '/context/customize.png',
        component: () => <Suspense fallback={<></>}><Customize /></Suspense>
    }
]

export default apps;
