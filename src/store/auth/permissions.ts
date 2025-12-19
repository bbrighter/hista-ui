import { entity } from '../../api/generatedApi'

export type Permissions = Array<Permission>

type Permission = {
    piid: string
    apps: { [key: string]: boolean }
}

export type Instance = {
    id: string
    productId: string
    productName: string
    url: string
}
