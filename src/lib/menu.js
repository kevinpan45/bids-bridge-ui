let menus = [
    {
        name: "marketplace",
        alias: "Marketplace",
        icon: "marketplace",
        enabled: true,
        items: [
            { name: "Explore Data", link: "/marketplace/data", alias: "Data", enabled: true },
            { name: "Explore APP", link: "/marketplace/app", alias: "APP", enabled: true }
        ]
    },
    { name: "job", link: "/job", alias: "Job", icon: "job", enabled: true },
    { name: "pipeline", link: "/pipeline", alias: "Pipeline", icon: "pipeline", enabled: true },
    { name: "dataset", link: "/dataset", alias: "Dataset", icon: "dataset", enabled: true },
    { name: "storage", link: "/storage", alias: "Storage", icon: "storage", enabled: true },
    { name: "profile", link: "/profile", alias: "Profile", icon: "profile", enabled: true },
    { name: "setting", link: "/setting", alias: "Settings", icon: "setting", enabled: true },
];

export function getMenus() {
    return menus;
}