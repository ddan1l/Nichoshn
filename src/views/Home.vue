<template>
  <div>
    <section class="carousel">
      <v-row>
        <v-col sm="7">
          <v-carousel class="slider"  v-model="carouselModel" height="auto" hide-delimiters :show-arrows="false" >
            <v-carousel-item class="px-10" v-for="(item,i) in homeSlider" :key="i" eager>
              <v-img :src="item.image" height="100%" eager/>
            </v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col sm="5">
          <div class="infoBlock white--text ">
            <div class="title">
              {{homeSlider[carouselModel].title}}
            </div>
            <div class="description">
              {{homeSlider[carouselModel].description}}
            </div>
            <v-btn elevation="0" class="button rounded-0 px-8 py-6" color="transparent" :to="homeSlider[carouselModel].route">
              {{homeSlider[carouselModel].buttonText}}
            </v-btn>
          </div>
          <div class="navCarousel mt-7">
            <p class="current">{{ carouselModel + 1 >= 10 ? carouselModel + 1 : '0' + (carouselModel + 1) }}</p>
            <v-progress-linear
                style="width: 165px"
                :value="valueDeterminate"
                color="black"
            ></v-progress-linear>
            <p class="length">{{ homeSlider.length >= 10 ? carouselModel  : '0' + (homeSlider.length) }}</p>
            <v-btn class="pa-6 ml-7 mr-4 navButtons" icon @click="carouselModel === 0 ? undefined : carouselModel--">
              <v-icon size="11">fas fa-chevron-left</v-icon>
            </v-btn>
            <v-btn class="pa-6 navButtons" icon @click="carouselModel === homeSlider.length -1 ? undefined : carouselModel++">
              <v-icon size="11">fas fa-chevron-right</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </section>
    <section class="info">
      <div class="bonus">Бонусная программа</div>
      <div class="brands">Подлинные бренды</div>
      <div class="reserve">Резерв товаров</div>
    </section>
  </div>
</template>

<script>


export default {
  name: "Home",
  data(){
    return {
      carouselModel: 0,
      homeSlider: [
        {
          image: "https://firebasestorage.googleapis.com/v0/b/nichoshn-8e955.appspot.com/o/HomeSlider%2FMens%2Fafefb266-0454-4842-9368-f8c7064db3f9.jpg?alt=media&token=959ea3c4-eb13-4727-9612-2c2338a40620",
          title: "SALE UP -60%",
          description: "На коллекции осень-зима 2020",
          buttonText: "Смотреть",
          route: '/'
        },
        {
          image: "https://firebasestorage.googleapis.com/v0/b/nichoshn-8e955.appspot.com/o/HomeSlider%2FMens%2F807b3590-0747-4f11-973c-658658456c60.jpg?alt=media&token=947ed53c-bc11-4d7e-ad27-a2b3351ce6fe",
          title: "Горячее предложение!",
          description: "sale up -90% на прошлые коллекции осень-зима",
          buttonText: "На шоппинг",
          route: '/'
        },
        {
          image: "https://firebasestorage.googleapis.com/v0/b/nichoshn-8e955.appspot.com/o/HomeSlider%2FMens%2F0b9914d8-1b8b-4378-bf53-a4dd52bf4701.jpg?alt=media&token=665bd0a1-b65f-441b-b273-07696c9a747f",
          title: "NEW COLLECTION SS21",
          description: "",
          buttonText: "Смотреть",
          route: '/'
        },
        {
          image: "https://firebasestorage.googleapis.com/v0/b/nichoshn-8e955.appspot.com/o/HomeSlider%2FMens%2F55150307-5209-4c4d-8340-48109c9c1f90.jpg?alt=media&token=81803b3e-4c74-4655-8f5e-bf0911c31ea0",
          title: "Оcень-Зима 2020",
          description: "Люксовый шоппинг онлайн",
          buttonText: "Смотреть",
          route: '/'
        },
        {
          image: "https://firebasestorage.googleapis.com/v0/b/nichoshn-8e955.appspot.com/o/HomeSlider%2FMens%2F07e7c819-13e7-4ab9-9dc1-66eb45a19670.jpg?alt=media&token=a6fecdae-09b5-4eb6-8948-f0802e0ccd0f",
          title: "Аксессуары. Новинки",
          description: "Уместное дополнение любого образа",
          buttonText: "Смотреть",
          route: '/'
        },
        {
          image: "https://firebasestorage.googleapis.com/v0/b/nichoshn-8e955.appspot.com/o/HomeSlider%2FMens%2Fd20e466e-a750-44ad-b3d6-147c46d721eb.jpg?alt=media&token=055ef77d-5f5b-45e8-9f63-0f6a8300ceef",
          title: "Обувь. Новинки",
          description: "Выбирайте свою идеальную пару",
          buttonText: "Смотреть",
          route: '/'
        }
      ],
      preloadImages: {
        list: []
      },
    }
  },
  created() {
    this.loadImages()
  },
  computed:{
    valueDeterminate(){
      return 100 / (this.homeSlider.length) * (this.carouselModel + 1 )
    }
  },
  methods:{
    loadImages() {
      if (!this.preloadImages.list) {
        this.preloadImages.list = [];
      }
      let list = this.preloadImages.list;
      for (let item of this.homeSlider){
        let img = new Image();
        img.onload = function() {
          let index = list.indexOf(this);
          if (index !== -1) {
            list.splice(index, 1);
          }
        }
        list.push(img);
        img.src = item.image;
      }
    }
}
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,300&display=swap');

.navCarousel{
  font-family: 'Montserrat', sans-serif;
  display: flex;
  align-items: center;
}
.navCarousel >.length, .current{
  font-size: 11px;
  margin: 12px 15px;
}
.navCarousel > .current{
  font-weight: 500;
}
.navCarousel > .length{
  color: #919191;
}
.navCarousel > .navButtons{
  border: 1px solid #f5f5f5;
  transition: .3s;
}
.navCarousel > .navButtons:hover{
  border: 1px solid;
  transition: .3s;
}
/deep/.v-btn:not(.v-btn--text):not(.v-btn--outlined):hover::before {
  opacity: 0.04;
}
.slider *{
  transition: 1s;
}
.infoBlock > .title{
  font-size: 30px !important;
  font-weight: 300;
  padding-top: 100px;
}
.infoBlock > .description{
  font-size: 14px !important;
  font-weight: 300;
  padding-top: 25px;
  color: #919191;
}
.infoBlock > .button{
  margin: 45px 0;
  text-transform: capitalize;
  color: white;
  font-weight: 300;
  position: relative;
  border: 1px solid #5b5b5b  !important;
  transition: .3s;
}
.infoBlock > .button:hover:after{
  transform: scaleY(1);
}
.infoBlock > .button:hover{
  color: black;
}
.infoBlock > .button:after{
  transition: .3s;
  content: '';
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  transform: scaleY(0.05);
  z-index: -1;
  transform-origin: center bottom;
}
.infoBlock {
  margin-top: 65px;
  font-family: 'Montserrat', sans-serif !important;
  position: relative;
  margin-left: -130px;
  z-index: 3;
  background-color: #232323;
  width: 542px;
  padding: 30px 70px;
}

/deep/.v-btn:not(.v-btn--text):not(.v-btn--outlined).v-btn--active::before {
    opacity: 0;
}
/deep/.v-progress-linear {
  height: 2px !important;
}

.info{
  background-color: white !important;
  margin: 80px 0;
  display: flex;
  justify-content: center;
}
.bonus, .brands, .reserve{
  font-weight: 500;
  font-family: 'Montserrat', sans-serif !important;
  position: relative;
  padding: 0 15px 0 75px;
  height: 60px;
  display: flex;
  align-items: center;
}
.brands{
  margin: 0 140px;
}
.bonus::before, .brands::before, .reserve::before{
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #232323;
  border: 5px solid #e8e8e8;
  background-position: center;
}

.bonus::before {
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMjAgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogc2tldGNodG9vbCA1Mi40ICg2NzM3OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+MjlDN0FCODgtOTM0OS00OUY2LUJGQzEtQjNEOEQyODczRENBPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBza2V0Y2h0b29sLjwvZGVzYz4KICAgIDxnIGlkPSJwcm9kdWN0LTEzNjAiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJtYWluLXdvbWVuIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjUyLjAwMDAwMCwgLTg5Ny4wMDAwMDApIiBmaWxsPSIjRkZGRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8ZyBpZD0iRml0Y2giIHRyYW5zZm9ybT0idHJhbnNsYXRlKDgyLjAwMDAwMCwgODc1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9ImJvbnVzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNTAuMDAwMDAwLCAwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSLQoNC10LfQtdGA0LItQ29weSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSJib251cyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjAuMDAwMDAwLCAyMi4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0yIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMS41LDEuNSBMMS41LDEzLjUgTDE4LjUsMTMuNSBMMTguNSwxLjUgTDEuNSwxLjUgWiBNMSwwLjUgTDE5LDAuNSBDMTkuMjc2MTQyNCwwLjUgMTkuNSwwLjcyMzg1NzYyNSAxOS41LDEgTDE5LjUsMTQgQzE5LjUsMTQuMjc2MTQyNCAxOS4yNzYxNDI0LDE0LjUgMTksMTQuNSBMMSwxNC41IEMwLjcyMzg1NzYyNSwxNC41IDAuNSwxNC4yNzYxNDI0IDAuNSwxNCBMMC41LDEgQzAuNSwwLjcyMzg1NzYyNSAwLjcyMzg1NzYyNSwwLjUgMSwwLjUgWiIgaWQ9IlJlY3RhbmdsZS02Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgtNiIgcG9pbnRzPSIxLjE1ODgwNTAxIDQuNjgzNjA4NjIgMS4xNTg4MDUwMSAzLjY4MzYwODYyIDE4Ljc3NTY3MDEgMy42ODM2MDg2MiAxOC43NzU2NzAxIDQuNjgzNjA4NjIiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==);
}
.brands::before {
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogc2tldGNodG9vbCA1Mi40ICg2NzM3OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+RDAxQjVCQUYtQkMwQy00RkIxLUJEQzgtQzFGNzg1RTdBRkUzPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBza2V0Y2h0b29sLjwvZGVzYz4KICAgIDxnIGlkPSJwcm9kdWN0LTEzNjAiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJtYWluLXdvbWVuIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjExLjAwMDAwMCwgLTg5Mi4wMDAwMDApIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxnIGlkPSJGaXRjaCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoODIuMDAwMDAwLCA4NzUuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iMTAwJSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTExLjUwMDAwMCwgMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0i0KDQtdC30LXRgNCyIj4KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Im5vdW5fVGFnXzY2MjEzMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTguMDAwMDAwLCAxOC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMi40OTA4MzI2LDEzLjk1NzE3MSBDMTkuODkxNTIwNiwxMS4zNDY4NTY4IDE3LjI4ODI0MTksOC43NDA1MTA5IDE0LjY3NzQwNzYsNi4xNDE3MjM0MSBDMTMuOTA2MTcwNyw1LjM3Mzk3Mjg1IDEyLjk2MTE1NTIsNC45OTY5OTQ2NiAxMS44NjY5MTY4LDUuMDAwMDE4MDQgQzEwLjQ3OTcxMDQsNS4wMDM5ODYyMyA5LjA5MjY5Mjg5LDUuMDAwNzczODkgNy43MDU0ODY0OCw1LjAwMTE1MTgxIEM2LjU2MjMyNTYzLDUuMDAxMzQwNzcgNi4wMDQ3MjMwNSw1LjU1MzEwODM1IDYuMDAzOTY3NSw2LjY4NDc5ODc2IEM2LjAwMzU4OTcyLDcuMzkwNTY5OTUgNi4wMDM5Njc1LDguMDk2MzQxMTUgNi4wMDM5Njc1LDguODAyMTEyMzUgQzYuMDAzOTY3NSw5LjUzMTg4MTY1IDUuOTkzNTc4NTYsMTAuMjYxNjUxIDYuMDA2NDIzMDYsMTAuOTkxMjMxMyBDNi4wMjQxNzg3LDExLjk4ODAwMzIgNi4zNjMwNDY5MywxMi44NjkzMTk2IDcuMDY2NDcyNDEsMTMuNTc4NjgxMSBDOS42ODU0Mjg5NywxNi4yMTk2MDcgMTIuMzE0MDE4OSwxOC44NTEyNzM4IDE0Ljk0Mjc5NzcsMjEuNDgyNTYyNiBDMTUuNjEwMTQ1MywyMi4xNTA1NDE1IDE2LjQ0NzQ5MzYsMjIuMTc4ODg1OCAxNy4xMDY3MTg4LDIxLjUyNjIxMjcgQzE4LjkxNzIyNzIsMTkuNzM0MTAxOSAyMC43MTk4MDIyLDE3LjkzMzY3NjcgMjIuNTA4OTY2LDE2LjEyMDIxMzIgQzIzLjE3NDk5MTMsMTUuNDQ1NDMxNyAyMy4xNTgxODAyLDE0LjYyNzQxNzQgMjIuNDkwODMyNiwxMy45NTcxNzEgWiBNOS4yNzU0MzM3OCw5LjU3NjkxMjE5IEM4LjU2MDQ2Mzc3LDkuNTc5ODI3ODUgNy45NjgyODU0NCw4Ljk5Njg2NjkzIDcuOTYxNTk3MDYsOC4yODM1NTg3NSBDNy45NTQ3MzcxOSw3LjU1NTUwMDc2IDguNTUxMDMxNDUsNi45NTcxMDM5OCA5LjI3OTAzNTIyLDYuOTYxNTYzMjIgQzkuOTkyMjkwMjYsNi45NjU4NTA5NiAxMC41Nzc0MzcyLDcuNTU2MTg2OCAxMC41NzY5MjI3LDguMjcwODY3MDUgQzEwLjU3NjIzNjgsOC45ODU3MTg4MSA5Ljk5MDA2MDgxLDkuNTczOTk2NTMgOS4yNzU0MzM3OCw5LjU3NjkxMjE5IFoiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTYuMzA1NTg4MjYsNS42NjQ0ODA5IEM3LjIzNTk4MTgyLDIuMzAwMzc3MzYgNi41NDg2MTkwOCwwLjkxOTcyODM4NSA0LjI0MzUwMDA1LDEuNTIyNTMzOTcgQzEuOTM4MzgxMDIsMi4xMjUzMzk1NSAwLjgxMzY4NjkyMywxLjYxNzgyODIzIDAuODY5NDE3NzYsMy40MDYxNjQyNGUtMTMiIGlkPSJQYXRoLTciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K);
}
.reserve::before {
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTVweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTUgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogc2tldGNodG9vbCA1Mi40ICg2NzM3OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+QjE3NzRDMjYtNDI5NS00OUE4LUE4MTUtMUVENEYyQjUzMjQ5PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBza2V0Y2h0b29sLjwvZGVzYz4KICAgIDxnIGlkPSJwcm9kdWN0LTEzNjAiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJtYWluLW1lZ2FtZW51IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTI5MC4wMDAwMDAsIC02Mi4wMDAwMDApIiBmaWxsPSIjRkZGRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8ZyBpZD0iSGVhZC1uZXciPgogICAgICAgICAgICAgICAgPGcgaWQ9ImNhcnQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyOTAuMDAwMDAwLCA2Mi4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMi4zMzQ0NDMyMSwxLjUgTDEuNTM0NDQzMjEsMTMuNSBMMTMuNDY1NTU2OCwxMy41IEwxMi42NjU1NTY4LDEuNSBMMi4zMzQ0NDMyMSwxLjUgWiBNMS44NjY2NjY2NywwLjUgTDEzLjEzMzMzMzMsMC41IEMxMy4zOTY1NjUzLDAuNSAxMy42MTQ3MTYsMC43MDQwOTE1NzUgMTMuNjMyMjI1OSwwLjk2Njc0MDQ5NSBMMTQuNDk4ODkyNiwxMy45NjY3NDA1IEMxNC41MTgxMzIsMTQuMjU1MzMxOSAxNC4yODkyMzIxLDE0LjUgMTQsMTQuNSBMMSwxNC41IEMwLjcxMDc2Nzk0MiwxNC41IDAuNDgxODY3OTkxLDE0LjI1NTMzMTkgMC41MDExMDc0MjEsMTMuOTY2NzQwNSBMMS4zNjc3NzQwOSwwLjk2Njc0MDQ5NSBDMS4zODUyODQwMiwwLjcwNDA5MTU3NSAxLjYwMzQzNDczLDAuNSAxLjg2NjY2NjY3LDAuNSBaIiBpZD0iUmVjdGFuZ2xlLTciPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNC40ODQ2MTgzOCw1IEM0LjQ4NDYxODM4LDQuNzIzODU3NjMgNC43MDg0NzYwMSw0LjUgNC45ODQ2MTgzOCw0LjUgQzUuMjYwNzYwNzUsNC41IDUuNDg0NjE4MzgsNC43MjM4NTc2MyA1LjQ4NDYxODM4LDUgQzUuNDg0NjE4MzgsNi40MzIyMTYyOCA1Ljk5MzkxNzU1LDcuMjk2MDk2NjIgNy41Mzc2MzkyOSw3LjI5NjA5NjYyIEM5LjAzNzg5NDI1LDcuMjk2MDk2NjIgOS41LDYuNDMzNzY0MDkgOS41LDUgQzkuNSw0LjcyMzg1NzYzIDkuNzIzODU3NjMsNC41IDEwLDQuNSBDMTAuMjc2MTQyNCw0LjUgMTAuNSw0LjcyMzg1NzYzIDEwLjUsNSBDMTAuNSw2LjkxMjg0ODk3IDkuNzU4NzQ2ODYsOC4yOTYwOTY2MiA3LjUzNzYzOTI5LDguMjk2MDk2NjIgQzUuMzAwNTkzNzMsOC4yOTYwOTY2MiA0LjQ4NDYxODM4LDYuOTEyMDI3ODggNC40ODQ2MTgzOCw1IFoiIGlkPSJQYXRoLTQiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+);
  background-size: 17px;
}
</style>
