<template>
    <IonPage>
        <SecondLayout>
            <template v-slot:title>
                Lista de projetos
            </template>
            <template v-slot:content>
                <div v-for="project in projects">
                    <h3>{{ project.data.name }}</h3>
                    <button @click="methods.accessProject(project.key)">Acessar</button>
                    <button @click="methods.removeProject(project.key)">Apagar</button>
                </div>
            </template>
        </SecondLayout>
    </IonPage>
</template>

<script setup>
    import SecondLayout from '../components/layout/second-layout.vue'
    import { inject, ref } from 'vue'
    import { useRouter } from 'vue-router' 
    
    import { 
        IonPage,
    } from '@ionic/vue'

    const storage = inject('storage')
    const questions = inject('questions')
    const projects = ref({})
    const router = useRouter()

    const methods = {
        listProjects: (table) => {
            storage.listProjects().then((data) => {
                data.forEach((data, key) => {

                    if (/^e\d+$/.test(key))
                    table[key] = {
                        data,
                        key,
                    }
                });
            })
        },
        accessProject: (key) => {
            storage.accessProject(key).then((data) => {
                storage.setQuestionsData(data, questions.project, key).then(() => {
                    router.push({
                        path: '/map',
                    })
                })
            }, (error) => {
                console.log(error)
            })
        },
        removeProject: (key) => {
            storage.deleteProject(key).then((data) => {
                delete projects.value[key]
            }, (error) => {
                console.log(error)
            })
        },
    }

    methods.listProjects(projects.value)
</script>