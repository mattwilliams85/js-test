const data = [
  { type: 'person', order: 1,   name: 'Brian' },
  { type: 'place',  order: 2,   name: 'Ohio'  },
  { type: 'place',  order: 12,  name: 'Ohio'  },
  { type: 'person', order: 14,  name: 'Sarah' },
  { type: 'person', order: 199, name: 'Sam'   },
  { type: 'person', order: 19,  name: 'Eric'  },
  { type: 'place',  order: 20,  name: 'Home'  }
]

// SORT FUNCTION
function sortMerge () {
  sort()
  for (let i = 0; i < data.length; i++) {
    merge(i, [data[i]])
  }
  create()
}

function sort () {
  data.sort((a, b) => {
    return a.order > b.order ? 1 : -1
  })
}

function merge (i, people) {
  if (data[i].type !== 'person') return

  if (data[i + 1] && data[i + 1].type === 'person') {
    let group = [...people, data[i + 1]]
    return merge(i + 1, group)
  }

  let pLength = people.length,
      newElem = {
        type: 'person',
        order: people[0].order,
        people: people.map((p) => { return p.name })
      }

  data.splice(i - (pLength - 1), pLength, newElem)
}

// DOM MANIPULATION
function create () {
  for (let i in data) {
    let type = data[i].type
    let item = $('#blueprint')
      .clone()
      .attr('id', data[i].order)

    if (data[i].people) {
      if (data[i].people.length > 1) type = 'people'
      item.find('#name').text(data[i].people.join(', '))
    } else {
      item.find('#name').text(data[i].name)
    }

    item.find('#type').text(type)
    item.find('#subtext').text(type)
    item.find('#order').text('#' + data[i].order)
    $('#resources').append(item)
    item.addClass(type)
        .removeClass('hidden')
  }
}

$('.filter').click(function() {
  $('.filter').removeClass('active')
  $(this).addClass('active')
  $('.person, .place, .people').show()

  switch(this.id) {
    case 'people':
      $('.place').hide()
      break
    case 'places':
      $('.person, .people').hide()
  }
})

sortMerge()
