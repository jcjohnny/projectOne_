$( document ).ready( function() {


  $("#startbutton").on('click', function(){
    var playerName = $(".form-name")[0].value;
    var buyInAmount = parseInt($(".form-buyin")[0].value);
      if ($(".form-name")[0].value.length > 0 && ($(".form-buyin")[0].value).length > 0){
    $("#amount-bank").text(buyInAmount);
    $("#currentplayername").text(playerName);
    $("#blackjack").css("display", "none");
    $("#hit").toggle();
    $("#stay").toggle();
      }
  });

  $("#chip10").on('click', function(){
    var bankAmount = parseInt($("#amount-bank").text());
    var prevAmount = parseInt($("#amount-bet").text());
    if (bankAmount > 10){
      $("#amount-bank").text( bankAmount - 10);
      $("#amount-bet").text( prevAmount + 10);
    }
  });

  $("#chip25").on('click', function(){
    var bankAmount = parseInt($("#amount-bank").text());
    var prevAmount = parseInt($("#amount-bet").text());
    if (bankAmount > 25){
      $("#amount-bank").text( bankAmount - 25);
      $("#amount-bet").text( prevAmount + 25);
    }
  });

  $("#chip50").on('click', function(){
    var bankAmount = parseInt($("#amount-bank").text());
    var prevAmount = parseInt($("#amount-bet").text());
    if (bankAmount > 50){
      $("#amount-bank").text( bankAmount - 50);
      $("#amount-bet").text( prevAmount + 50);
    }
  });

  $("#betreset").on('click', function(){
    var betAmount = parseInt($("#amount-bet").text());
    var bankAmount = parseInt($("#amount-bank").text());
    $("#amount-bet").text(0);
    $("#amount-bank").text(betAmount + bankAmount);
  });

  $("#play").on('click', function(){
    if (parseInt($("#amount-bet").text()) > 0){
      $("#hit").toggle();
      $("#stay").toggle();
      $("#play").toggle();
      $("#cardhide").toggle();
      deckOcards.dealCards(playerJohnny.hand);
      placeCardPlayer(playerJohnny.hand);

      deckOcards.dealCards(cardDealer.hand);
      placeCardDealer(cardDealer.hand);
      deckOcards.dealCards(playerJohnny.hand);
      placeCardPlayer(playerJohnny.hand);
      deckOcards.dealCards(cardDealer.hand);
      placeCardDealer(cardDealer.hand);
      $("#player-amount").text(playerJohnny.evaluateCards());
      if (cardDealer.hand[1].length === 3){
        return   $("#dealer-amount").text(10);
      } else return $("#dealer-amount").text(cardDealer.hand[1].split("")[0]);
    }
  });

  $("#hit").on('click', function(){
    deckOcards.dealCards(playerJohnny.hand);
    placeCardPlayer(playerJohnny.hand);
    $("#player-amount").text(playerJohnny.evaluateCards());
    if (playerJohnny.bust === true){
      $("#youbusted").css("display", "block");
      $("#amount-bet").text(0);
        $("#cardhide").toggle();
    }
  });

  $("#stay").on('click', function(){
    $("#cardhide").toggle();
    while ( cardDealer.evaluateCards() < 17){
      deckOcards.dealCards(cardDealer.hand);
      placeCardDealer(cardDealer.hand);
      $("#dealer-amount").text(cardDealer.evaluateCards());
    }
    var currentDealerHand = cardDealer.evaluateCards() ;
    var currentPlayerHand = playerJohnny.evaluateCards();
    if (currentDealerHand <= 21 && currentDealerHand < currentPlayerHand  ){
      $("#youwin").css("display", "block");
      $("#amount-bet").text(0);
      $("#amount-bank").text(parseInt($("#amount-bank").text()) + parseInt($("#amount-bet").text()));
    } else $("#youlose").css("display", "block");
    $("#amount-bet").text(0);
  });


  $(".playagain").on('click', function(){
    playerJohnny.hand = [];
    cardDealer.hand = [];
    $("#youlose").css("display", "none");
    $("#youwin").css("display", "none");
    $("#youbusted").css("display", "none");
    $("#hit").toggle();
    $("#stay").toggle();
    $("#play").toggle();
    $(".card-design").removeClass().empty();
  });

  $(".notagain").on('click', function(){
    playerJohnny.hand = [];
    cardDealer.hand = [];
    $("#youlose").css("display", "none");
    $("#youwin").css("display", "none");
    $("#youbusted").css("display", "none");
    $("#hit").toggle();
    $("#stay").toggle();
    $("#play").toggle();
    $("#blackjack").css("display", "block");
    $(".card-design").removeClass().empty();

  });
  });



//start functions
//suits
d = "&#x2660";
c = "&#x2660";
h = "&#x2660";
s = "&#x2660";

var suitDetect = function(card){

};

var placeCardPlayer = function(player){
    var newCard = player[player.length-1];
    if (newCard.length === 3){
      var firstNum = newCard.split("")[0];
      var secondNum = newCard.split("")[1];
      var suit = newCard.split("")[2];
    $(".cards").eq(1).append($("<div>").attr("class","card-design").append($("<div>").attr("class", "number").text(firstNum + secondNum)));
  } else {
    var numCard = $(".cards").eq(1).append($("<div>").attr("class","card-design").append($("<div>").attr("class", "number").text(newCard.split("")[0])));
    return numCard;
}
};

var placeCardDealer = function(player){
    var newCard = player[player.length-1];
    if (newCard.length === 3){
      var firstNum = newCard.split("")[0];
      var secondNum = newCard.split("")[1];
      var suit = newCard.split("")[2];
    $(".cards").eq(0).append($("<div>").attr("class","card-design").append($("<div>").attr("class", "number").text(firstNum + secondNum)));
  } else {
    var numCard = $(".cards").eq(0).append($("<div>").attr("class","card-design").append($("<div>").attr("class", "number").text(newCard.split("")[0])));
    return numCard;
}
};


//http://jsfromhell.com/array/shuffle
function shuffle(o){
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
}


function handCount(cards){
  var handEval = 0;
  var secondHandEval = 0;
  for (i = 0; i < cards.length; i++){
    if (cards[i].length == 3){
      handEval+= 10;
    } else if (parseInt(cards[i].split("")[0]) == 1) {
      secondHandEval += 11;
      handEval += 1;
    } else handEval += parseInt((cards[i].split("")[0]));
  }
  if (secondHandEval > 0){
    this.secondHand = secondHandEval;
  } else return handEval;

}

var Deckcards = function() {
  return {
    deck: [],
    shuffleDeck: function(){
      for (i = 1; i <= 13; i++){
        this.deck.push(i + "d"); this.deck.push(i + "c"); this.deck.push(i + "h"); this.deck.push(i + "s");
      }
      shuffle(this.deck);
    },
    reDeck: function(){
      if (this.deck.length <= 8){
        this.deck = [];
        this.shuffleDeck();
      }
    },
    dealCards: function(dealerPlayer){
      dealerPlayer.push(this.deck.pop());
    }
  };
};


var Player = function(){
  return{
    bust: false,
    hand: [],
    bankRoll: 0,
    evaluateCards: function(){
      if (handCount(this.hand) > 21){
        this.bust = true;
        console.log("you busted bro");
      }else return handCount(this.hand);
    },
    splitCards: function(){
      if (this.hand[0].length > 3 && this.hand.length > 3){
        var cardOne = playerJohnny.hand[0].split("")[0] + playerJohnny.hand[0].split("")[1];
        var cardTwo = playerJohnny.hand[0].split("")[0] + playerJohnny.hand[0].split("")[1];
        if (cardOne === cardTwo){
          this.hand = [this.hand[0]];
          this.handTwo = [this.hand[1]];
        }
      } else if (this.hand[0].split("")[0] == this.hand[1].split("")[0]){
        this.handTwo = [this.hand[1]];
        this.hand = [this.hand[0]];
      } else console.log("can't split hand");
    }
  };
};

var Dealer = function(){
  return{
    bust: false,
    hand: [],
    evaluateCards: function(){
       return handCount(this.hand);
    }
  };
};

var playGame = function(){
  return {
  inPlay: false,
  // startPlayers: function(){
  //   var cardDealer = Dealer();
  //   var playerJohnny = Player();
  //   var deckOcards = Deckcards();
  // },
  // dealHands: function(){
  //   deckOcards.shuffleDeck();
  // }
};
};



var cardDealer = Dealer();
var playerJohnny = Player();
var deckOcards = Deckcards();
deckOcards.shuffleDeck();
