// Importar dependências externas (bibliotecas) antes de importar os arquivos
import Vue from 'vue';
import axios from 'axios';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min';

import App from './App.vue';
import router from './router';

// A global axios fica disponível no contexto global da window, do navegador
global.axios = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  // axios,: poderia colocar o axios aqui para utilizar a variável axios do contexto do view, mas se não colocar ele utiliza a variável do contexto da window (navegador)
  render: h => h(App),
}).$mount('#app');
