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
const highwayTexts = [
  'На шоссейном велосипеде можно ездить по асфальту на разных градиентах: будь то горы или равнины. Гонки проходят в командном пелотоне, но&nbsp;тренироваться можно и самостоятельно.',
  'Грэвел похож на шоссейный велосипед, но конструкция рамы немного отличается, и на нём стоят более широкие покрышки, всё для того чтобы проехать по лёгкому бездорожью.',
  'ТТ — это велосипед для триатлона или раздельного старта, гооняют на таком велике только по равнинному асфальту, велик очень быстрые и аэродинамичный.'
]

const createHighway = (x) => {
  highwayTitle.textContent = highwayTitles[x]
  highwayText.textContent = highwayTexts[x]
  highwayImageFirst.src = './images/' + highwayImages[x].first
  highwayImageSecond.src = './images/' + highwayImages[x].second
  highway.append(item)
}

const bikes = document.querySelector('.bikes__types')
const bikesTemplate = document.querySelector('#bikes-template').content;
const bikesTemplateItem = bikesTemplate.cloneNode(true);
const bikeName = bikesTemplateItem.querySelector('.bikes__tipe')
const bikesImage = bikesTemplateItem.querySelector('.bikes__image')
const bikesName = bikesTemplateItem.querySelector('.bikes__name')
const bikeTypes = [
  [
    {
      name: 'Cervelo Caledonia-5',
      type: './images/bike-1.png',
    },
    {
      name: 'Cannondale Systemsix Himod',
      type: './images/bike-2.png',
    },
    {
      name: 'Trek Domane SL-7',
      type: './images/bike-3.png',
    },
  ],
  [
    {
      name: 'Cervelo Aspero GRX 810',
      type: './images/bike-4.png',
    },
    {
      name: 'Specialized S-Works Diverge',
      type: './images/bike-5.png',
    },
    {
      name: 'Cannondale Topstone Lefty 3',
      type: './images/bike-6.png',
    },
  ],
  [
    {
      name: 'Specialized S-Works Shiv',
      type: './images/bike-7.png',
    },
    {
      name: 'BMC Timemachine 01 ONE',
      type: './images/bike-8.png',
    },
    {
      name: 'Cervelo P-Series',
      type: './images/bike-9.png',
    }
  ],
]

const highwayImages = [
  {
    first: 'highway_1.png',
    second: 'highway_2.png'
  },
  {
    first: 'highway_3.png',
    second: 'highway_4.png'
  },
  {
    first: 'highway_5.png',
    second: 'highway_6.png'
  }
]
const arrCss = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
]

class BlockManager {
  constructor(init_val, items) {
    this.cursor = init_val
    this.current_cursor = this.cursor
    this.items = items
    this.size = items[0].length
  }
  cursorIncrement() {
    this.current_cursor = this.cursor
    this.cursor++
    if (this.cursor > this.size - 1) {
      this.cursor = 0
    }
  }
  cursorDecrement() {
    this.current_cursor = this.cursor
    this.cursor--
    if (this.cursor < 0) {
      this.cursor = this.size - 1
    }
  }
  getNext() {
    this.cursorIncrement()
    const data = this.collectData()

    return data
  }
  getPrev() {
    this.cursorDecrement()
    const data = this.collectData()
    return data
  }
  collectData() {
    const data = []
    this.items.forEach(element => {
      data.push(element[this.cursor])
    });
    return data
  }
}

bl = new BlockManager(
  init_val = 1,
  items = [
    arrCss,
    highwayImages,
    bikeTypes,
  ]
)

function createCard(name, type) {
  const userElement = bikesTemplate.cloneNode(true);
  userElement.querySelector('.bikes__image').src = type;
  userElement.querySelector('.bikes__name').textContent = name;
  return userElement;
}

function renderCard (name, link) {
  bikes.append(createCard(name, link));
}


let range = n => [...Array(n).keys()]

highwayButtonRight.addEventListener('click', () => {
  removeOldCards()
  renderBigBlock(1)
})

highwayButtonLeft.addEventListener('click', () => {
  removeOldCards()
  renderBigBlock(0)
})


const highlightSelection = (arr) => {
  smallNames = document.querySelectorAll("#bikes > div.bikes__header > ul > li.bikes__link")
  smallNames.forEach((elem, index) => {
    if (arr[index]) {
      elem.classList.add("bikes__link_bold")
    } else {
      elem.classList.remove("bikes__link_bold")
    }
  })
}

const renderBigBlock = (direction) => {
  let blData
  if (direction) {
    blData = bl.getNext()
  } else {
    blData = bl.getPrev()
  }
  highlightSelection(blData[0])
  createHighway(bl.cursor)
  blData[2].forEach(element => {
    renderCard(element.name, element.type) 
  });
}
const removeOldCards = () => {
  range(3).forEach( _ => {
    document.querySelector("#bikes > div.bikes__types > div:nth-child(2)").remove();
  }
  )
}
// init first block
renderBigBlock()