
import Vue from 'vue';
import YmapPlugin from 'vue-yandex-maps'

const settings = {
  apiKey: '38daab83-3d55-4b80-a2af-1a460568ef63',
  lang: 'ru_RU',
  coordorder: 'longlat',
  version: '2.1'
}

Vue.use(YmapPlugin, settings)

export default YmapPlugin
