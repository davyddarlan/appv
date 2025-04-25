 import { Storage, Drivers } from '@ionic/storage';

 export default {
    database: null,
    create: async function () {
        const storage = new Storage({
            name: 'appv',
            driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
        })
        this.database = await storage.create()
    },
    createProject: async function(object) {
        const currentId = await this.database.length()
        const newId = 'e' + (currentId + 1)

        this.database.set(newId, object)
    },
    listProjects: function () {
        /*this.database.forEach((value, key) => {
            console.log(key)
            console.log(value)
        })*/
    }
 }