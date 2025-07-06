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
        const data = await this.database.set(newId, object);

        return {
            data,
            key: newId,
        }
    },
    listProjects: async function() {
        return await this.database
    },
    deleteProject: async function(key) {
        return await this.database.remove(key)
    },
    accessProject: async function(key) {
        const project = await this.database.get(key)
        const acData = await this.database.get(key + '_AC')
        const admData = await this.database.get(key + '_ADM')
        const aoData = await this.database.get(key + '_AO')
        const apData = await this.database.get(key + '_AP')

        return {
            project,
            AC: acData,
            ADM: admData,
            AO: aoData,
            AP: apData,
        }
    },
    setQuestion: async function(key, data) {
        const database = await this.database.get(key)
        let status = null, KeyValue = null, xKey = null

        if (database) {
            status = await this.database.get(key)

            for (xKey in data) {
                KeyValue = xKey 
            }

            status[KeyValue] = data[KeyValue]
            status = await this.database.set(key, status)
        } else {
            status = await this.database.set(key, data)
        }

        return status
    },
    resetQuestionsData: async function(localData) {
        localData.isInLoco.value = null
        localData.lengthTeam.value = ''
        localData.name.value = null
        localData.projectId.value = null

        for (let group in localData.data) {
            if (group != 'PC') {
                
                let lengthRoom = localData.data[group].questions.length

                for (let i = 0; i < lengthRoom; i++) {
                    localData.data[group].questions[i].valuesRequirements.value = []
                    localData.data[group].questions[i].value.value = null
                    localData.data[group].questions[i].lengthRoom.value = null
                }
            }
        }

        return true
    },
    createGroupReq: async function(namespace, groupEntity) {
        let database = await this.database.get(namespace)

        if (!database) {
            database = await this.database.set(namespace, groupEntity)
        }

        return database
    },
    createReq: async function(namespace, entity) {
        let database = await this.database.get(namespace)

        if (!database) {           
            const newEntity = {
                [entity.hashId]: {
                    [entity.reqId]: {
                        reqs: {
                            [entity.viewId]: entity.data,
                        }   
                    }
                }
            }

            database = await this.database.set(namespace, newEntity)
        } else {           
            let dataChanged = false

            if (!database.hasOwnProperty([entity.hashId])) {
                database[entity.hashId] = {
                    [entity.reqId]: {
                        reqs: {
                            [entity.viewId]: entity.data,
                        }
                    }
                }

                dataChanged = true
            }

            if (!database[entity.hashId].hasOwnProperty([entity.reqId])) {
                database[entity.hashId][entity.reqId] = {
                    reqs: {
                        [entity.viewId]: entity.data
                    }
                }

                dataChanged = true
            }
            
            if (!database[entity.hashId][entity.reqId]['reqs'].hasOwnProperty([entity.viewId])) {
                database[entity.hashId][entity.reqId]['reqs'][entity.viewId] = entity.data

                dataChanged = true
            }


            if (database[entity.hashId][entity.reqId]['reqs'][entity.viewId] != entity.data) {
                database[entity.hashId][entity.reqId]['reqs'][entity.viewId] = entity.data

                dataChanged = true
            }

            if (dataChanged) {
                database = await this.database.set(namespace, database)
            }
        }

        return database
    },
    removeReq: async function(namespace, entity) {
        let database = await this.database.get(namespace)

        delete database[entity.hashId][entity.reqId]

        database = await this.database.set(namespace, database)

        return database
    },
    setQuestionsData: async function(database, localData, key) {
        localData.isInLoco.value = database.project.isInLoco
        localData.projectId.value = key
        localData.name.value = database.project.name
        localData.lengthTeam.value = database.project.lengthTeam

        for (let group in localData.data) {
            if (group != 'PC') {
                let lengthRoom = localData.data[group].questions.length
                let databaseReqs = await this.database.get(key + '_' + group + '_REQS')

                for (let i = 0; i < lengthRoom; i++) {
                    let hashId = localData.data[group].questions[i].id 
                    
                    if (database[group] && database[group][hashId]) {
                        localData.data[group].questions[i].value.value = database[group][hashId].value
                        localData.data[group].questions[i].lengthRoom.value = database[group][hashId].lengthRoom 
        
                        if (databaseReqs && databaseReqs[hashId]) {
                            localData.data[group].questions[i].valuesRequirements.value = databaseReqs[hashId]
                        }
                    }
                }
            }
        }

        return localData
    }
}