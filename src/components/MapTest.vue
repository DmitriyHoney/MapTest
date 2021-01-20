<template>
  <div class="map-container">
      {{driversCoords}}
    <yandex-map :coords="coords" :zoom="4" @map-was-initialized="initMap"/>
    <button @click="changeCoords">Change coords</button>
    <button @click="prevCoords">Prev coords</button>
  </div>
</template>

<script>
import Marker from '../assets/marker2.png'
export default {
  name: "MapTest",
  data: () => ({
    coords: [54, 39],
    count: 0,
    objectManager: null,
    cluster: null,
    driversCoords: [
        [37.714929, 55.837369],
        [37.74, 55.85],
        [37.75, 55.837369],
    ],

    Map: null
  }),
  computed: {},

  mounted() {

  },

  watch: {
      driversCoords(val) {
        // this.cluster.removeAll()
        // let placemarks = this.driversCoords.map((coords, idx) => this.createPlacemark(coords, `text-${idx}`, idx))
        // this.cluster.add(placemarks)
        console.log('val');
        if (!this.objectManager) return false
        let data = {
            "type": "FeatureCollection",
            "features": []
          }

          this.objectManager.removeAll();
          let result =   val
          .map((coords, idx) => {
              return {
                "type": "Feature",
                "id": idx,
                "geometry": {
                  "type": "Point",
                  "id": idx,
                  "coordinates": [coords[0], coords[1]]},
                  "properties": {
                    "balloonContent": false,

                    "clusterCaption" : idx,
                    "hintContent": false,
                  }
              }
      })
      console.log('result', result);
      data["features"] =  result
        this.objectManager.add(data);
        this.Map.geoObjects.add(this.objectManager);
  }
  },

  methods: {


    initMap(Map) {
      this.Map = Map
      this.objectManager = this.createObjectManager();
      // let layoutBallon = this.createClusterBallonLayout()
      this.Map.geoObjects.add(this.objectManager);



    //   this.cluster = this.createClusterer(layoutBallon)
    //   let placemarks = this.driversCoords.map((coords, idx) => this.createPlacemark(coords, `text-${idx}`, idx))
    //   this.cluster.add(placemarks)
    //   this.Map.geoObjects.add(this.cluster)
    },


    //Syntax
    createGeoObject({coords}) {
        return new ymaps.GeoObject({
            geometry: { type: "Point", coordinates: coords },
            properties: {
                clusterCaption: 'ЖК Огни Сочи - 1',
                // Зададим содержимое заголовка балуна.
                balloonContentHeader: '<a href = "#">ЖК Огни Сочи - 1</a>',
                // Зададим содержимое основной части балуна.
                balloonContentBody: '<img src="http://lorempixel.com/200/150/city/"/>' + '<br/>' +
                '<a href="tel:+7-123-456-78-90">+7 (123) 456-78-90</a>',
                // Зададим содержимое нижней части балуна.
                balloonContentFooter: 'Информация предоставлена:<br/>OOO "Тест"',
                // Зададим содержимое всплывающей подсказки.
                hintContent: 'ЖК Огни Сочи',
                iconCaption: 'ЖК Огни Сочи'
            }
        })
    },
    createObjectManager() {
        return new ymaps.ObjectManager({
            clusterize: true,
            gridSize: 32,
            clusterDisableClickZoom: true
        });
    },
    createClusterer(customBalloonContentLayout) {
        return new ymaps.Clusterer({
            clusterDisableClickZoom: true,
            clusterOpenBalloonOnClick: true,
            // Устанавливаем режим открытия балуна.
            // В данном примере балун никогда не будет открываться в режиме панели.
            clusterBalloonPanelMaxMapArea: 0,
            // По умолчанию опции балуна balloonMaxWidth и balloonMaxHeight не установлены для кластеризатора,
            // так как все стандартные макеты имеют определенные размеры.
            clusterBalloonMaxHeight: 200,
            // Устанавливаем собственный макет контента балуна.
            clusterBalloonContentLayout: customBalloonContentLayout
        });
    },
    createClusterBallonLayout() {
        return ymaps.templateLayoutFactory.createClass([
            `<ul class="map-ballon__list">
                {% for geoObject in properties.geoObjects %}
                 <li class="map-ballon__item">
                 <div
                    onmouseover="this.style.backgroundColor='#f5f5f5';" onmouseout="this.style.backgroundColor='#fff';"
                    style="padding: 7px 12px; transition: all .2s linear; cursor: pointer"
                    data-id="{{geoObject.properties.balloonContentHeader.id}}"
                    class="list_item_map"
                  >
                    {{geoObject.properties.balloonContentHeader}}
                    <i class="mdi mdi-car map-ballon__icon"></i>
                  </div>
                </li>
                {% endfor %}
              </ul>`
            ].join(''))
    },
    createPlacemark(coords, text, id) { //создание точки
        return new ymaps.Placemark(coords, {
            // Устаналиваем данные, которые будут отображаться в балуне.
            balloonContentHeader: 'Заголовок метки №' + text,
            placemarkId: id,
            iconCaption: 'asd'
        },
        {
            iconLayout: 'default#imageWithContent',
            iconImageHref: Marker,
            iconImageSize: [69, 28],
            iconImageOffset: [0, 0],
            iconImageOffset: [-5, -38],
            balloonContentLayout: '<div style="width: 69px">111</div>',
            iconContent: 'nameDriver',
            iconContentOffset: [0, 28],

        }
        );
    },




    changeCoords() {
        this.count++;
        this.driversCoords = [
            [37.714929, 55.837369],
            [37.74, 55.8522],
            [37.75, 55.837369],
        ]
    },
    prevCoords() {
        this.count++;
        this.driversCoords = [
            [37.714929, 55.837369],
            [37.74, 55.85],
            [37.75, 55.837369]
        ]
    },
  },
};
</script>

<style lang="scss" scoped>
.map-container {
  height: 500px;
  width: 800px;
  & .ymap-container  {
    height: 100%;
    width: 100%;
  }
}
</style>
