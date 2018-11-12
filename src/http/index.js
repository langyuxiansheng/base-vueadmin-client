import apis from './wrapper';

export const {
    userLogin,
    userLogout,
    getGameList,
    getPlatformAdminList,
    addPlatformAdmin,
    updatePlatformAdmin,
    delPlatformAdmin,
    addPlatformRole,
    getPlatformRoles,
    delPlatformRole
} = apis;