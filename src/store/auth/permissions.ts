import { entity } from '../../api/generatedApi'

export type Permissions = Array<Permission>

type Permission = {
    piid: string
    apps: { [key: string]: boolean }
}

export const toPermission = (resp: entity.AuthData): Permissions => {
    return resp.instances.map(i => ({
        piid: i.piid,
        apps: i.appMapping,
    }))
}