

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
      console.log(handEval + " or " + (secondHandEval + handEval - 1));
    } else return handEval;
  }

  var Deckcards = function() {
    return {
      deck: [],
      shuffleDeck: function(){
        for (i = 1; i <= 13; i++){
          // if (i >= 11){
          // switch (i){
          //   case i == 11:
          //     i = "J"; break;
          //   case i == 12:
          //     i = "Q"; break;
          //   case i == 13:
          //     i = "K"; break;
          //   }
          // }
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
        }else return handCount(this.hand);
      },
      splitCards: function(){
        if (this.hand[0].length > 3 && this.hand.length > 3){
          var cardOne = johnny.hand[0].split("")[0] + johnny.hand[0].split("")[1];
          var cardTwo = johnny.hand[0].split("")[0] + johnny.hand[0].split("")[1];
          if (cardOne == cardTwo){
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
        if (handCount(this.hand) < 16){

        }

      }
    };
  };




  var deck = Deckcards();
  deck.shuffleDeck();
  var johnny = Player();
  deck.dealCards(johnny.hand);
  deck.dealCards(johnny.hand);
