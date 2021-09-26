var faker = require('faker');

var databaseShows = { shows: []};

var images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm8B6B5EPHIAhFF_JGZrLxgFCzMBed142yQWpFSKFKbWi5REC2fPcN4BGCUpbBOIvYUns&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Pgll8hifq3iax2DQiqh8s0XWePAoYft03NJOC0u0ev7vqV4yfvbBauefs9cSPrKvkV8&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxnlFIJ1Pug3nDQPNZrcDFHX8gNdOfZG-T5MWk8_BpAzklHJENzcWBXe9_HKsA4JQxmRs&usqp=CAU",
    "https://m.media-amazon.com/images/I/81IEOHNn2FL._SY445_.jpg",
    "https://fbcoverstreet.com/content/ix97cvO1aKrXDXWcDbwtYBUHSABTzlysfU8Xo9vbxxy6eKBzjlpkNczhc2nct4By.jpg",
    "https://kanelandkrier.com/wp-content/uploads/2017/06/13rw-674x1000.jpg",
    "https://pbs.twimg.com/media/A3qH2qUCUAEm1dD.jpg",
    "https://cdn.shopify.com/s/files/1/0799/0083/products/Various_Lost_CoverAr_3000DPI300RGB1000144427.jpg?v=1568699493",
    "https://i.pinimg.com/originals/c1/24/d0/c124d080fb660225b173dc425c697b32.jpg",
    "https://www.indiewire.com/wp-content/uploads/2017/09/imperial-dreams-2014.jpg?w=426"
]

var titles = [
    "Friends", "The Walking Dead", "How I Met Your Mother", "The Cosby Show", "DEXTER", "13 Reasons Why", "Vampire Diaries", "Lost", "QuickSand", "Imperial Dreams"
]

for (var i = 1; i<= 10; i++) {
    for(var j = 0; j < 10; j++) {
        databaseShows.shows.push({
            id: i+j,
            name: titles[j],
            description: faker.lorem.sentences(),
            imageUrl: images[j],
            cast: 'Unknown',
            rating: "0 stars"
          });
    }
  
}

console.log(JSON.stringify(databaseShows));
