const highway = document.querySelector('.highway')
const template = document.querySelector('#highway-template').content;
const item = template.cloneNode(true);
const highwayTitle = item.querySelector('#highway-title');
const highwayText = item.querySelector('.content__text')
const highwayImageFirst = item.querySelector('#highway-image-1')
const highwayImageSecond = item.querySelector('#highway-image-2')
const highwayButtonRight = item.querySelector('#highwayButtonRight');
const highwayButtonLeft = item.querySelector('#highwayButtonLeft');

const highwayTitles = ['Шоссе', 'Грэвел', 'ТТ']
const highwayTexts = ['На шоссейном велосипеде можно ездить по асфальту на разных градиентах: будь то горы или равнины. Гонки проходят в командном пелотоне, но&nbsp;тренироваться можно и самостоятельно.',
'Грэвел похож на шоссейный велосипед, но конструкция рамы немного отличается, и на нём стоят более широкие покрышки, всё для того чтобы проехать по лёгкому бездорожью.',
'ТТ — это велосипед для триатлона или раздельного старта, гооняют на таком велике только по равнинному асфальту, велик очень быстрые и аэродинамичный.']
const highwayImages = [
  {first: 'highway_1.png',
  second: 'highway_2.png'},
  {first: 'highway_3.png',
  second: 'highway_4.png'},
  {first: 'highway_5.png',
  second: 'highway_6.png'}
]

const createHighway = (x) => {
  highwayTitle.textContent = highwayTitles[x]
  highwayText.textContent = highwayTexts[x]
  highwayImageFirst.src = './images/' + highwayImages[x].first
  highwayImageSecond.src = './images/' + highwayImages[x].second
  highway.append(item)
}
createHighway(0);

highwayButtonRight.addEventListener('click', () => {
  document.querySelector("#bikes > div.bikes__types > div:nth-child(4)").remove();
  document.querySelector("#bikes > div.bikes__types > div:nth-child(3)").remove();
  document.querySelector("#bikes > div.bikes__types > div:nth-child(2)").remove();
  renderCard(bikeTypes[3].name,bikeTypes[3].type)
  renderCard(bikeTypes[4].name,bikeTypes[4].type)
  renderCard(bikeTypes[5].name,bikeTypes[5].type)
  // bikes.append(createCard(bikeTypes[4].name, bikeTypes[4].link));

  if (highwayTitle.textContent === highwayTitles[0]) {
    createHighway(1);
  } else if (highwayTitle.textContent === highwayTitles[1]) {
    document.querySelector("#bikes > div.bikes__types > div:nth-child(4)").remove();
    document.querySelector("#bikes > div.bikes__types > div:nth-child(3)").remove();
    document.querySelector("#bikes > div.bikes__types > div:nth-child(2)").remove();
    renderCard(bikeTypes[6].name,bikeTypes[6].type)
    renderCard(bikeTypes[7].name,bikeTypes[7].type)
    renderCard(bikeTypes[8].name,bikeTypes[8].type)
    createHighway(2);

  } else {
    createHighway(0);
  }
})

highwayButtonLeft.addEventListener('click', () => {
  if (highwayTitle.textContent === highwayTitles[0]) {
    createHighway(2);
  } else if (highwayTitle.textContent === highwayTitles[1]) {
    createHighway(0);
  } else {
    createHighway(1);
  }
})

const bikes = document.querySelector('.bikes__types')
const bikesTemplate = document.querySelector('#bikes-template').content;
const bikesTemplateItem = bikesTemplate.cloneNode(true);
const bikeName = bikesTemplateItem.querySelector('.bikes__tipe')
const bikesImage = bikesTemplateItem.querySelector('.bikes__image')
const bikesName = bikesTemplateItem.querySelector('.bikes__name')
const bikeTypes = [
  {name: 'Cervelo Caledonia-5',
   type: './images/bike-1.png'},
   {name: 'Cannondale Systemsix Himod',
   type: './images/bike-2.png'},
   {name: 'Trek Domane SL-7',
   type: './images/bike-3.png'},
   {name: 'Cervelo Aspero GRX 810',
   type: './images/bike-4.png'},
   {name: 'Specialized S-Works Diverge',
   type: './images/bike-5.png'},
   {name: 'Cannondale Topstone Lefty 3',
   type: './images/bike-6.png'},
   {name: 'Specialized S-Works Shiv',
   type: './images/bike-7.png'},
   {name: 'BMC Timemachine 01 ONE',
   type: './images/bike-8.png'},
   {name: 'Cervelo P-Series',
   type: './images/bike-9.png'}
]



function createCard(name, type) {
  const userElement = bikesTemplate.cloneNode(true);
  userElement.querySelector('.bikes__image').src = type;
  userElement.querySelector('.bikes__name').textContent = name;
  return userElement;
}

// let bike1 = {name: 'Cervelo Caledonia-5',
// type: './images/bike-1.png'}
// let bike2 = {name: 'Cannondale Systemsix Himod',
// type: './images/bike-2.png'}
// let bike3 = {name: 'Trek Domane SL-7',
// type: './images/bike-3.png'}

// let pog1 = createCard(bike1.name, bike1.type)
// let pog2 = createCard(bike2.name, bike2.type)
// bikes.append(pog1)

function renderCard (name, link) {
  bikes.append(createCard(name, link));
}
  // bikeTypes[0].closest('.place').remove();

// function toWindows(bikeTypes) {
//   return inputArray.reduce((acc, _, index, arr) => {
//       if (index+3 > arr.length) {
//         return acc;
//       }
//       return acc.concat([arr.slice(index, index+3)]);
//     }, [])
// }


let range = n => [...Array(n).keys()]
function toWindows(inputArray, size) {
    return inputArray
        .reduce((acc, _, index, arr) => {
            if (index + size > arr.length) {
               return acc;
            }
            return acc.concat(
                [arr.slice(index, index + size)]
            );
        }, [])
}


class EndlessList {
  constructor(init_val, list_of_members, step, size) {
    this.cursor = init_val - step
    this.list_of_members = list_of_members
    this.size = size
    this.step = step
    this.bikesList = toWindows(list_of_members, size)
  }

  getNextWindow() {
    this.cursor += this.step
    if (this.cursor > this.bikesList.length - 1) {
      this.cursor = 0
    }
    return this.bikesList[this.cursor]

  }
  getPrevWindow() {
    this.cursor -= this.step
    if (this.cursor < 0 ) {
      this.cursor = this.bikesList.length - 1
    }
    return this.bikesList[this.cursor]
  }
}

el = new EndlessList(
  init_val=0,
  list_of_members = bikeTypes,
  step=3,
  size=3,
)

for (let i of el.getNextWindow()) {
  renderCard(i.name, i.type)
}
