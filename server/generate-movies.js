var faker = require('faker');

var databaseMovies = { movies: []};
var images = ["https://lumiere-a.akamaihd.net/v1/images/p_blackwidow_disneyplus_21043-1_63f71aa0.jpeg", 
"https://img.buzzfeed.com/buzzfeed-static/static/2015-02/20/15/enhanced/webdr04/enhanced-13983-1424463205-1.jpg",
"https://i.pinimg.com/originals/77/dd/e2/77dde25c01cee19450acd7c9d29b71d6.jpg",
"https://i.pinimg.com/originals/92/93/c5/9293c51df9cd62f56c23fd668b309bad.jpg",
"https://lh3.googleusercontent.com/proxy/CrhJvdU0Mq_ADNGvhLu58kCkOQGz2fduDYiy1NVJsZBuW9J1TubykKlXpnDespkbF36h654KubgcikUZW_WKP3g73xH6OqnJpgXbQlSmh0uknFw",
"https://i.redd.it/0i66a9beqg821.jpg",
"https://i.pinimg.com/originals/54/82/4b/54824bba85e70318af1b53de24cd6bbf.jpg",
"https://images.squarespace-cdn.com/content/v1/5acd17597c93273e08da4786/1547847934765-ZOU5KGSHYT6UVL6O5E5J/Shrek+Poster.png",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTxZQWBWqsEkjccmyJ0epL2iXSm-GtIWPlUQ&usqp=CAU",
"https://gaiakhat.github.io/core-interaction/studio/assets/img/jaws.jpg"
]
var titles = ['Black Widow', 'Mean girls', "How to lose a guy in 10 days", "Twilight", "Free Guy", "Baby", "Titanic", "Shrek", "Joker", "Jaws" ]
for (var i = 1; i<= 10; i++) {
  for(var j = 0; j<10; j++) {
    databaseMovies.movies.push({
      id: i+j,
      name: titles[j],
      description: faker.lorem.sentences(),
      imageUrl: images[j],
      cast: 'Unknown',
      rating: "0 stars"
    })
  }
}

console.log(JSON.stringify(databaseMovies));
