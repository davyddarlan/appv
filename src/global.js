import ReqQtdAmbientes from './components/requirements/qtd-ambientes.vue'
import ReqAreaFisica from './components/requirements/area-fisica.vue'
import ReqLavatorio from './components/requirements/lavatorio.vue'
import ReqAutomacaoTorneira from './components/requirements/automacao-torneira.vue'
import ReqVentilacao from './components/requirements/ventilacao.vue'
import ReqPiso from './components/requirements/piso.vue'
import ReqParede from './components/requirements/parede.vue'
import ReqTeto from './components/requirements/teto.vue'
import ReqForro from './components/requirements/forro.vue'
import ReqRodape from './components/requirements/rodape.vue'
import ReqRalo from './components/requirements/ralo-simfonado.vue'
import ReqPeDireito from './components/requirements/pe-direito.vue'
import ReqCubaFuda from './components/requirements/cuba-funda.vue'
import ReqGasesMedicinais from './components/requirements/gases-medicinais.vue'
import ReqLuminaria from './components/requirements/luminaria-protecao.vue'

export default (app) => {
    app.component('ReqQtdAmbientes', ReqQtdAmbientes)
    app.component('ReqAreaFisica', ReqAreaFisica)
    app.component('ReqLavatorio', ReqLavatorio)
    app.component('ReqAutomacaoTorneira', ReqAutomacaoTorneira)
    app.component('ReqVentilacao', ReqVentilacao)
    app.component('ReqPiso', ReqPiso)
    app.component('ReqParede', ReqParede)
    app.component('ReqTeto', ReqTeto)
    app.component('ReqForro', ReqForro)
    app.component('ReqRodape', ReqRodape)
    app.component('ReqRalo', ReqRalo)
    app.component('ReqPeDireito', ReqPeDireito)
    app.component('ReqCubaFuda', ReqCubaFuda)
    app.component('ReqGasesMedicinais', ReqGasesMedicinais)
    app.component('ReqLuminaria', ReqLuminaria)
}